import { serverEnv } from '../config/env';

export interface CompetitionStatusResponse {
  currentStatus: 'upcoming' | 'open' | 'paused' | 'closed' | 'completed';
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

let dynamicOpenAt: string = serverEnv.PICC_REGISTRATION_OPEN_AT;
let dynamicCloseAt: string = serverEnv.PICC_REGISTRATION_CLOSE_AT;
let dynamicStatusOverride: 'upcoming' | 'open' | 'paused' | 'closed' | null = null;

export class CompetitionStatusService {
  public static updateConfig(newConfig: { openAt?: string; closeAt?: string; statusOverride?: 'upcoming' | 'open' | 'paused' | 'closed' | null }) {
    if (newConfig.openAt) dynamicOpenAt = newConfig.openAt;
    if (newConfig.closeAt) dynamicCloseAt = newConfig.closeAt;
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

    let currentStatus: 'upcoming' | 'open' | 'paused' | 'closed' | 'completed' = 'upcoming';

    if (dynamicStatusOverride) {
      currentStatus = dynamicStatusOverride;
    } else if (now < openAt) {
      currentStatus = 'upcoming';
    } else if (now >= openAt && now <= closeAt) {
      currentStatus = 'open';
    } else {
      currentStatus = 'closed';
    }

    const registrationAvailable = currentStatus === 'open';

    const statusMessage =
      currentStatus === 'upcoming'
        ? `Cổng đăng ký mở từ ${openAtStr.slice(0, 10)} đến ${closeAtStr.slice(0, 10)}.`
        : currentStatus === 'open'
          ? 'Cổng đăng ký đang mở. Vui lòng hoàn thành biểu mẫu nộp hồ sơ.'
          : currentStatus === 'paused'
            ? 'Đăng ký đang tạm dừng. Theo dõi thông báo mới nhất.'
            : `Cổng đăng ký đã khép lại vào ${closeAtStr.slice(0, 10)}.`;

    const nextMilestone =
      now < openAt
        ? { title: 'Mở Cổng Đăng Ký Trực Tuyến', dateLabel: openAtStr.slice(0, 10), startAt: openAtStr }
        : { title: 'Hạn Cuối Nộp Hồ Sơ Đăng Ký', dateLabel: closeAtStr.slice(0, 10), startAt: closeAtStr };

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
