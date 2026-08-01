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

const formatDateStr = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10).replace(/-/g, '/');
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} · ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** Build the milestone list with the registration window dates overridden by the live server config. */
export const buildEffectiveMilestones = (registration?: {
  openAt?: string | null;
  closeAt?: string | null;
}): EventMilestone[] => {
  if (!registration) return EVENT_MILESTONES;

  const openAt = registration.openAt ? new Date(registration.openAt) : null;
  const closeAt = registration.closeAt ? new Date(registration.closeAt) : null;
  const validOpen = openAt !== null && !isNaN(openAt.getTime());
  const validClose = closeAt !== null && !isNaN(closeAt.getTime());

  if (!validOpen && !validClose) return EVENT_MILESTONES;

  return EVENT_MILESTONES.map((ms) => {
    if (ms.id === 'mo-don' && validOpen && registration.openAt) {
      return { ...ms, dateIso: registration.openAt, dateStr: formatDateStr(registration.openAt) };
    }
    if (ms.id === 'dong-don' && validClose && registration.closeAt) {
      return { ...ms, dateIso: registration.closeAt, dateStr: formatDateStr(registration.closeAt) };
    }
    return ms;
  });
};

export const getNextEventMilestone = (
  milestones: EventMilestone[] = EVENT_MILESTONES,
  nowDate = new Date(),
): NextMilestoneResult => {
  const nowMs = nowDate.getTime();

  for (let i = 0; i < milestones.length; i++) {
    const ms = milestones[i];
    if (!ms) continue;
    const msTime = new Date(ms.dateIso).getTime();

    if (msTime > nowMs) {
      return {
        currentMilestone: i > 0 ? (milestones[i - 1] ?? null) : null,
        nextMilestone: ms,
        isAllCompleted: false,
        targetDate: new Date(ms.dateIso),
        activeStepIndex: i,
      };
    }
  }

  return {
    currentMilestone: milestones[milestones.length - 1] ?? null,
    nextMilestone: null,
    isAllCompleted: true,
    targetDate: null,
    activeStepIndex: milestones.length,
  };
};
