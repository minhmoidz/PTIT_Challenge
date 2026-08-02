import crypto from 'crypto';
import type { UserRoleCode } from '@prisma/client';
import { serverEnv } from '../config/env';
import { prisma } from '../db/prisma';
import { dbStore } from '../db/store';

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRoleCode;
  permissions: string[];
}

const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * scrypt params — N=2^15 is the current OWASP baseline for interactive logins.
 * `maxmem` must exceed 128 * N * r (~33 MB here); Node defaults to 32 MB and
 * would otherwise reject these parameters outright.
 */
const SCRYPT = { N: 32768, r: 8, p: 1, keylen: 64, maxmem: 64 * 1024 * 1024 } as const;

const scryptAsync = (password: string, salt: crypto.BinaryLike, keylen: number): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keylen, SCRYPT, (err, derived) =>
      err ? reject(err) : resolve(derived),
    );
  });

const ROLE_PERMISSIONS: Record<UserRoleCode, string[]> = {
  SUPER_ADMIN: [
    'dashboard.read',
    'registration.read',
    'registration.review',
    'registration.update',
    'registration.export',
    'publicTeam.read',
    'publicTeam.edit',
    'publicTeam.publish',
    'competition.read',
    'competition.update',
    'content.read',
    'content.edit',
    'content.publish',
    'user.manage',
    'audit.read',
  ],
  ORGANIZER: [
    'dashboard.read',
    'registration.read',
    'registration.review',
    'registration.export',
    'publicTeam.read',
    'publicTeam.edit',
    'competition.read',
    'competition.update',
    'content.read',
  ],
  REVIEWER: ['dashboard.read', 'registration.read', 'registration.review', 'publicTeam.read'],
  CONTENT_EDITOR: ['dashboard.read', 'content.read', 'content.edit', 'publicTeam.read'],
  VIEWER: ['dashboard.read', 'registration.read', 'publicTeam.read', 'content.read'],
};

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRoleCode;
  exp: number;
}

type AdminRecord = {
  id: string;
  email: string;
  displayName: string;
  status: string;
  userRoles: Array<{ role: { code: UserRoleCode } }>;
};

const b64url = (buf: Buffer | string) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromB64url = (value: string) => Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

const toAdminUser = (record: AdminRecord): AdminUser => {
  const role = (record.userRoles[0]?.role.code ?? 'VIEWER') as UserRoleCode;

  return {
    id: record.id,
    email: record.email,
    displayName: record.displayName,
    role,
    permissions: ROLE_PERMISSIONS[role] ?? [],
  };
};

export class AuthService {
  /* ── Password hashing ────────────────────────────────────────── */

  /** Returns `scrypt$<salt-hex>$<hash-hex>` — the salt is unique per user. */
  public static async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16);
    const hash = await scryptAsync(password, salt, SCRYPT.keylen);
    return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
  }

  private static async verifyPassword(password: string, stored: string): Promise<boolean> {
    const [scheme, saltHex, hashHex] = stored.split('$');
    if (scheme !== 'scrypt' || !saltHex || !hashHex) return false;

    const expected = Buffer.from(hashHex, 'hex');
    const actual = await scryptAsync(password, Buffer.from(saltHex, 'hex'), expected.length);
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  }

  private static parseToken(token: string | undefined | null): TokenPayload | null {
    if (!token) return null;

    const [body, signature] = token.split('.');
    if (!body || !signature) return null;

    const expected = crypto.createHmac('sha256', serverEnv.JWT_SECRET).update(body).digest();
    const provided = fromB64url(signature);
    if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) return null;

    try {
      const payload = JSON.parse(fromB64url(body).toString('utf8')) as TokenPayload;
      if (typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;
      return payload;
    } catch {
      return null;
    }
  }

  private static async loadAdminUserById(id: string): Promise<AdminUser | null> {
    const record = await prisma.user.findUnique({
      where: { id },
      include: { userRoles: { include: { role: true } } },
    });

    if (!record || record.status !== 'ACTIVE') return null;
    return toAdminUser(record);
  }

  /* ── Login ───────────────────────────────────────────────────── */

  public static async login(email: string, password: string): Promise<{ token: string; user: AdminUser } | null> {
    const cleanEmail = String(email).toLowerCase().trim();

    const record = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { userRoles: { include: { role: true } } },
    });

    if (!record || record.status !== 'ACTIVE') {
      // Spend comparable time on unknown users so the response time does not
      // reveal whether an account exists.
      await scryptAsync(String(password), 'timing-equaliser', SCRYPT.keylen);
      return null;
    }

    if (!(await AuthService.verifyPassword(String(password), record.passwordHash))) {
      await dbStore.addAuditLog('ADMIN_LOGIN_FAILED', 'User', record.id, { actorUserId: record.id });
      return null;
    }

    const user = toAdminUser(record);

    await prisma.user.update({ where: { id: record.id }, data: { lastLoginAt: new Date() } });
    await dbStore.addAuditLog('ADMIN_LOGIN', 'User', record.id, { actorUserId: record.id });

    return { token: AuthService.createSession(user), user };
  }

  /* ── Stateless sessions ──────────────────────────────────────── */

  /**
   * Tokens are HMAC-signed rather than held in a Map, so a restart or a second
   * instance does not silently log every admin out.
   */
  public static createSession(user: AdminUser): string {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.displayName,
      role: user.role,
      exp: Date.now() + SESSION_TTL_MS,
    };
    const body = b64url(JSON.stringify(payload));
    const signature = crypto.createHmac('sha256', serverEnv.JWT_SECRET).update(body).digest();
    return `${body}.${b64url(signature)}`;
  }

  public static async verifyToken(token: string | undefined | null): Promise<AdminUser | null> {
    const payload = AuthService.parseToken(token);
    if (!payload) return null;
    return AuthService.loadAdminUserById(payload.sub);
  }

  public static hasPermission(user: AdminUser, permission: string): boolean {
    return user.permissions.includes(permission);
  }

  public static hasAnyPermission(user: AdminUser, permissions: string[]): boolean {
    return permissions.some((permission) => AuthService.hasPermission(user, permission));
  }

  /* ── User management ─────────────────────────────────────────── */

  public static async createAdminUser(
    email: string,
    displayName: string,
    password: string,
    role: UserRoleCode = 'ORGANIZER',
  ): Promise<AdminUser> {
    const cleanEmail = email.toLowerCase().trim();
    const roleRow = await prisma.role.upsert({
      where: { code: role },
      update: {},
      create: { code: role, name: role.replace(/_/g, ' ').toLowerCase() },
    });

    const passwordHash = await AuthService.hashPassword(password);
    const user = await prisma.user.upsert({
      where: { email: cleanEmail },
      update: { displayName, passwordHash, status: 'ACTIVE' },
      create: { email: cleanEmail, displayName, passwordHash },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: roleRow.id } },
      update: {},
      create: { userId: user.id, roleId: roleRow.id },
    });

    await dbStore.addAuditLog('CREATE_ADMIN_USER', 'User', user.id);

    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role,
      permissions: ROLE_PERMISSIONS[role],
    };
  }

  /**
   * Creates the first SUPER_ADMIN from env vars when no user exists yet.
   * Nothing is hardcoded: without both vars set, the table simply stays empty
   * and the operator is told how to seed it.
   */
  public static async bootstrapFromEnv(): Promise<void> {
    const count = await prisma.user.count();
    if (count > 0) return;

    const email = serverEnv.PICC_ADMIN_EMAIL;
    const password = serverEnv.PICC_ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn(
        '\n[Auth] No admin account exists yet.\n' +
          '[Auth] Set PICC_ADMIN_EMAIL and PICC_ADMIN_PASSWORD and restart, or run `pnpm admin:create`.\n',
      );
      return;
    }

    await AuthService.createAdminUser(email, 'Quản trị viên PICC', password, 'SUPER_ADMIN');
    console.log(`[Auth] Bootstrapped initial SUPER_ADMIN: ${email.toLowerCase().trim()}`);
  }
}
