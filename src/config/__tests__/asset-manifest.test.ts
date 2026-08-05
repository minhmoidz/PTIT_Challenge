import { describe, it, expect } from 'vitest';
import { assetManifest, getApprovedAsset } from '@/config/asset-manifest';

describe('Asset Manifest', () => {
  it('contains a heroAvatar asset pointing at an existing branding image', () => {
    expect(assetManifest.heroAvatar).toBeDefined();
    expect(assetManifest.heroAvatar!.src).toContain('assets/branding/');
    expect(assetManifest.heroAvatar!.usage).toBe('production-candidate');
  });

  it('returns null for unknown asset', () => {
    expect(getApprovedAsset('nonexistent' as unknown as keyof typeof assetManifest)).toBeNull();
  });
});