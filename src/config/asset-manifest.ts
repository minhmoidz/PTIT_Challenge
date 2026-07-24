import type { PiccAsset } from '@/types/registration';

export const assetManifest: Record<string, PiccAsset> = {
  heroDesktop: {
    id: 'heroDesktop',
    src: '/assets/picc/picc-hero-3d.png',
    width: 1024,
    height: 1024,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroMobile: {
    id: 'heroMobile',
    src: '/assets/picc/picc-hero-3d.png',
    width: 1024,
    height: 1024,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroBackground: {
    id: 'heroBackground',
    src: '/assets/picc/background.webp',
    width: 1920,
    height: 1080,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
  socialAvatar: {
    id: 'socialAvatar',
    src: '/assets/picc/social-avatar.webp',
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
  facebookCover: {
    id: 'facebookCover',
    src: '/assets/picc/facebook-cover-with-dates.webp',
    usage: 'conditional',
    approvalStatus: 'unresolved',
    containsText: true,
    enabled: false,
  },
  facebookCoverPlain: {
    id: 'facebookCoverPlain',
    src: '/assets/picc/facebook-cover.webp',
    width: 1920,
    height: 1080,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  timelineReference: {
    id: 'timelineReference',
    src: '/assets/picc/lichtrinh.webp',
    width: 2048,
    height: 758,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
} as const;

export const getApprovedAsset = (id: keyof typeof assetManifest): PiccAsset | null => {
  const asset = assetManifest[id];
  if (!asset) return null;
  if (asset.usage === 'reference-only') return null;
  if (asset.usage === 'conditional' && !asset.enabled) return null;
  return asset;
};
