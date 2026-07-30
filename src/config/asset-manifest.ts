import type { PiccAsset } from '@/types/registration';
import { assetPath } from './paths';

export const assetManifest: Record<string, PiccAsset> = {
  heroDesktop: {
    id: 'heroDesktop',
    src: assetPath('assets/picc/hero-sign-desktop.webp'),
    width: 2025,
    height: 2025,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroMobile: {
    id: 'heroMobile',
    src: assetPath('assets/picc/hero-sign-mobile.webp'),
    width: 1170,
    height: 1174,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroSignTransparent: {
    id: 'heroSignTransparent',
    src: assetPath('assets/picc/hero-sign-transparent.webp'),
    width: 1024,
    height: 1024,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroBackground: {
    id: 'heroBackground',
    src: assetPath('assets/picc/background.webp'),
    width: 1920,
    height: 1080,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
  hero3d: {
    id: 'hero3d',
    src: assetPath('assets/picc/picc-hero-3d.png'),
    width: 1024,
    height: 1024,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
  socialAvatar: {
    id: 'socialAvatar',
    src: assetPath('assets/picc/social-avatar.webp'),
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
  facebookCover: {
    id: 'facebookCover',
    src: assetPath('assets/picc/facebook-cover-with-dates.webp'),
    usage: 'conditional',
    approvalStatus: 'unresolved',
    containsText: true,
    enabled: false,
  },
  facebookCoverPlain: {
    id: 'facebookCoverPlain',
    src: assetPath('assets/picc/facebook-cover.webp'),
    width: 1920,
    height: 1080,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  lichTrinh: {
    id: 'lichTrinh',
    src: assetPath('assets/picc/lichtrinh.webp'),
    width: 2048,
    height: 758,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: true,
  },
  heroAvatar: {
    id: 'heroAvatar',
    src: assetPath('assets/picc/avatar-photoroom.png'),
    width: 1024,
    height: 1024,
    usage: 'production-candidate',
    approvalStatus: 'unresolved',
    containsText: false,
  },
} as const;

export const getApprovedAsset = (id: keyof typeof assetManifest): PiccAsset | null => {
  const asset = assetManifest[id];
  if (!asset) return null;
  if (asset.usage === 'reference-only') return null;
  if (asset.usage === 'conditional' && !asset.enabled) return null;
  return asset;
};
