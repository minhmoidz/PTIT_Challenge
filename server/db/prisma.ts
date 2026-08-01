import { PrismaClient } from '@prisma/client';

/**
 * Single Prisma client for the process.
 *
 * `globalThis` caching keeps tsx/vitest hot-reloads from opening a new pool on
 * every reload, which exhausts the Supabase pooler's connection limit.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Fails fast instead of letting the app boot into a state where writes look
 * like they succeed but land nowhere. Registrations are the one thing we cannot
 * lose, so an unreachable database must stop startup.
 */
export const assertDatabaseReachable = async (): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (err) {
    console.error('\n[DB] Cannot reach the database. Refusing to start.');
    console.error('[DB] Check DATABASE_URL / DIRECT_URL in your .env file.');
    console.error(`[DB] ${String(err).split('\n')[0]}\n`);
    throw new Error('DATABASE_UNREACHABLE');
  }
};
