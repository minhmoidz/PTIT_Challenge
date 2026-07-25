export interface EventMilestone {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  dateStr: string;
  dateIso: string;
  statusType: 'open' | 'deadline' | 'result' | 'round' | 'final';
}

export const EVENT_MILESTONES: EventMilestone[] = [
  {
    id: 'mo-don',
    order: 1,
    title: 'Mở cổng đăng ký',
    shortTitle: 'Mở đơn',
    dateStr: '01/08/2026 · 00:00',
    dateIso: '2026-08-01T00:00:00+07:00',
    statusType: 'open',
  },
  {
    id: 'dong-don',
    order: 2,
    title: 'Đóng cổng đăng ký',
    shortTitle: 'Đóng đơn',
    dateStr: '15/08/2026 · 23:59',
    dateIso: '2026-08-15T23:59:59+07:00',
    statusType: 'deadline',
  },
  {
    id: 'ban-ket',
    order: 3,
    title: 'Vòng Bán kết',
    shortTitle: 'Bán kết',
    dateStr: '15/09/2026 · 23:59',
    dateIso: '2026-09-15T23:59:59+07:00',
    statusType: 'round',
  },
  {
    id: 'chung-ket',
    order: 4,
    title: 'Đêm Chung kết & Trao giải',
    shortTitle: 'Chung kết',
    dateStr: '02/10/2026 · 23:59',
    dateIso: '2026-10-02T23:59:59+07:00',
    statusType: 'final',
  },
];

export interface NextMilestoneResult {
  currentMilestone: EventMilestone | null;
  nextMilestone: EventMilestone | null;
  isAllCompleted: boolean;
  targetDate: Date | null;
  activeStepIndex: number;
}

export const getNextEventMilestone = (nowDate = new Date()): NextMilestoneResult => {
  const nowMs = nowDate.getTime();

  for (let i = 0; i < EVENT_MILESTONES.length; i++) {
    const ms = EVENT_MILESTONES[i];
    const msTime = new Date(ms.dateIso).getTime();

    if (msTime > nowMs) {
      return {
        currentMilestone: i > 0 ? EVENT_MILESTONES[i - 1] : null,
        nextMilestone: ms,
        isAllCompleted: false,
        targetDate: new Date(ms.dateIso),
        activeStepIndex: i,
      };
    }
  }

  return {
    currentMilestone: EVENT_MILESTONES[EVENT_MILESTONES.length - 1],
    nextMilestone: null,
    isAllCompleted: true,
    targetDate: null,
    activeStepIndex: EVENT_MILESTONES.length,
  };
};
