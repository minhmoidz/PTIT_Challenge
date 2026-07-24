import { describe, it, expect } from 'vitest';
import { assetManifest, getApprovedAsset } from '@/config/asset-manifest';

describe('Asset Manifest', () => {
  it('contains heroDesktop and heroMobile assets', () => {
    expect(assetManifest.heroDesktop).toBeDefined();
    expect(assetManifest.heroMobile).toBeDefined();
    expect(assetManifest.heroDesktop.usage).toBe('production-candidate');
    expect(assetManifest.heroMobile.usage).toBe('production-candidate');
  });

  it('returns null for unknown asset', () => {
    expect(getApprovedAsset('nonexistent' as unknown as keyof typeof assetManifest)).toBeNull();
  });

  it('returns null for conditional asset when not enabled', () => {
    const result = getApprovedAsset('facebookCover');
    expect(result).toBeNull();
  });
});
