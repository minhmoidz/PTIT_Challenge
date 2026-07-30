import fs from 'fs';
import path from 'path';
import type { DBRegistrationRecord } from './store';

export interface DBAuditLogRecord {
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations-backup.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'audit-logs-backup.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadJsonArray<T>(file: string, label: string): T[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`[Persistence] Failed to load ${label}:`, err);
    return [];
  }
}

function saveJsonArray<T>(file: string, data: T[], label: string): void {
  try {
    ensureDataDir();
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tmp, file);
  } catch (err) {
    console.error(`[Persistence] Failed to save ${label}:`, err);
  }
}

export function loadRegistrations(): DBRegistrationRecord[] {
  return loadJsonArray<DBRegistrationRecord>(REGISTRATIONS_FILE, 'registrations');
}

export function saveRegistrations(registrations: DBRegistrationRecord[]): void {
  saveJsonArray(REGISTRATIONS_FILE, registrations, 'registrations');
}

export function loadAuditLogs(): DBAuditLogRecord[] {
  return loadJsonArray<DBAuditLogRecord>(AUDIT_LOGS_FILE, 'audit logs');
}

export function saveAuditLogs(logs: DBAuditLogRecord[]): void {
  saveJsonArray(AUDIT_LOGS_FILE, logs, 'audit logs');
}
