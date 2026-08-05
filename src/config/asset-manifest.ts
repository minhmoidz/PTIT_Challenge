import type { PiccAsset } from '@/types/registration';
import { assetPath } from './paths';

export const assetManifest: Record<string, PiccAsset> = {
  heroAvatar: {
    id: 'heroAvatar',
    src: assetPath('assets/branding/ptit-iec-logo-2026.png'),
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