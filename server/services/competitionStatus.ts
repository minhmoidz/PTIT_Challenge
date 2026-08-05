import type { CompetitionStatusOverride } from '@prisma/client';
import { serverEnv } from '../config/env';
import { prisma } from '../db/prisma';
import { dbStore } from '../db/store';

export interface CompetitionStatusResponse {
  currentStatus: 'upcoming' | 'open' | 'paused' | 'closed' | 'live' | 'completed';
  registrationAvailable: boolean;
  serverTime: string;
  timezone: string;
  openAt: string;
  closeAt: string;
  statusOverride: string | null;
  statusMessage: string;
  nextMilestone: {
    title: string;
    dateLabel: string;
    startAt: string;
  };
}

type StatusOverride = 'upcoming' | 'open' | 'paused' | 'closed' | 'live' | 'completed';

/**
 * Cached so `getStatus()` can stay synchronous — every public request reads it.
 * The cache is hydrated from the database at boot and written through on every
 * update, so an admin's schedule change survives a restart or redeploy.
 * The env vars are only the seed values for a competition that has no row yet.
 */
let dynamicOpenAt: string = serverEnv.PICC_REGISTRATION_OPEN_AT;
let dynamicCloseAt: string = serverEnv.PICC_REGISTRATION_CLOSE_AT;
let dynamicStatusOverride: StatusOverride | null = null;

const OVERRIDE_TO_DB: Record<StatusOverride, CompetitionStatusOverride> = {
  upcoming: 'UPCOMING',
  open: 'OPEN',
  paused: 'PAUSED',
  closed: 'CLOSED',
  live: 'LIVE',
  completed: 'COMPLETED',
};

const OVERRIDE_FROM_DB: Record<CompetitionStatusOverride, StatusOverride> = {
  UPCOMING: 'upcoming',
  OPEN: 'open',
  PAUSED: 'paused',
  CLOSED: 'closed',
  LIVE: 'live',
  COMPLETED: 'completed',
};

/** YYYY-MM-DD in Vietnam time. The stored value is an ISO instant (often UTC
 *  after a round-trip through Postgres), so slicing the string directly would
 *  show the previous day for any +07:00 boundary. */
const formatDateInVn = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' });
};

export class CompetitionStatusService {
  /** Loads persisted config into the cache. Call once during startup. */
  public static async hydrate(): Promise<void> {
    const competitionId = await dbStore.ensureCompetition();
    const row = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!row) return;

    if (row.registrationOpenAt) dynamicOpenAt = row.registrationOpenAt.toISOString();
    if (row.registrationCloseAt) dynamicCloseAt = row.registrationCloseAt.toISOString();
    dynamicStatusOverride = row.statusOverride ? OVERRIDE_FROM_DB[row.statusOverride] : null;

    // First boot: persist the env defaults so the DB becomes the source of truth.
    if (!row.registrationOpenAt || !row.registrationCloseAt) {
      await prisma.competition.update({
        where: { id: competitionId },
        data: {
          registrationOpenAt: new Date(dynamicOpenAt),
          registrationCloseAt: new Date(dynamicCloseAt),
        },
      });
    }
  }

  public static async updateConfig(newConfig: {
    openAt?: string;
    closeAt?: string;
    statusOverride?: StatusOverride | null;
  }): Promise<void> {
    const data: {
      registrationOpenAt?: Date;
      registrationCloseAt?: Date;
      statusOverride?: CompetitionStatusOverride | null;
    } = {};

    if (newConfig.openAt) {
      const parsed = new Date(newConfig.openAt);
      if (isNaN(parsed.getTime())) throw { status: 400, code: 'VALIDATION_ERROR', message: 'Thời gian mở đăng ký không hợp lệ.' };
      data.registrationOpenAt = parsed;
    }
    if (newConfig.closeAt) {
      const parsed = new Date(newConfig.closeAt);
      if (isNaN(parsed.getTime())) throw { status: 400, code: 'VALIDATION_ERROR', message: 'Thời gian đóng đăng ký không hợp lệ.' };
      data.registrationCloseAt = parsed;
    }

    const effectiveOpen = data.registrationOpenAt ?? new Date(dynamicOpenAt);
    const effectiveClose = data.registrationCloseAt ?? new Date(dynamicCloseAt);
    if (effectiveClose <= effectiveOpen) {
      throw { status: 400, code: 'VALIDATION_ERROR', message: 'Thời gian đóng phải sau thời gian mở đăng ký.' };
    }

    if (newConfig.statusOverride !== undefined) {
      data.statusOverride = newConfig.statusOverride ? OVERRIDE_TO_DB[newConfig.statusOverride] : null;
    }

    const competitionId = await dbStore.ensureCompetition();
    await prisma.competition.update({ where: { id: competitionId }, data });

    if (data.registrationOpenAt) dynamicOpenAt = data.registrationOpenAt.toISOString();
    if (data.registrationCloseAt) dynamicCloseAt = data.registrationCloseAt.toISOString();
    if (newConfig.statusOverride !== undefined) dynamicStatusOverride = newConfig.statusOverride;
  }

  public static getStatus(): CompetitionStatusResponse {
    const now = new Date();
    const serverTime = now.toISOString();
    const timezone = 'Asia/Ho_Chi_Minh';

    const openAtStr = dynamicOpenAt;
    const closeAtStr = dynamicCloseAt;

    const openAt = new Date(openAtStr);
    const closeAt = new Date(closeAtStr);

    let currentStatus: 'upcoming' | 'open' | 'paused' | 'closed' | 'live' | 'completed' = 'upcoming';

    if (dynamicStatusOverride) {
      currentStatus = dynamicStatusOverride;
    } else if (now < openAt) {
      currentStatus = 'upcoming';
    } else if (now >= openAt && now <= closeAt) {
      currentStatus = 'open';
    } else {
      currentStatus = 'closed';
    }

    const explicitlyEnabled = process.env.PICC_REGISTRATION_ENABLED !== 'false';
    const registrationAvailable = (currentStatus === 'open' || currentStatus === 'live') && explicitlyEnabled;

    const statusMessage =
      currentStatus === 'upcoming'
        ? `Cổng đăng ký mở từ ${formatDateInVn(openAtStr)} đến ${formatDateInVn(closeAtStr)}.`
        : currentStatus === 'open'
          ? 'Cổng đăng ký đang mở. Vui lòng hoàn thành biểu mẫu nộp hồ sơ.'
          : currentStatus === 'live'
            ? 'Cuộc thi đang diễn ra! Theo dõi thông báo mới nhất.'
            : currentStatus === 'paused'
              ? 'Đăng ký đang tạm dừng. Theo dõi thông báo mới nhất.'
              : `Cổng đăng ký đã khép lại vào ${formatDateInVn(closeAtStr)}.`;

    const nextMilestone =
      now < openAt
        ? { title: 'Mở Cổng Đăng Ký Trực Tuyến', dateLabel: formatDateInVn(openAtStr), startAt: openAtStr }
        : { title: 'Hạn Cuối Nộp Hồ Sơ Đăng Ký', dateLabel: formatDateInVn(closeAtStr), startAt: closeAtStr };

    return {
      currentStatus,
      registrationAvailable,
      serverTime,
      timezone,
      openAt: openAtStr,
      closeAt: closeAtStr,
      statusOverride: dynamicStatusOverride,
      statusMessage,
      nextMilestone,
    };
  }
}
