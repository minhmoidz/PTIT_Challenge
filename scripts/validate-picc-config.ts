const errors: string[] = [];

console.log('🔍 Validating PICC production config...\n');

const env = process.env.VITE_APP_ENV ?? 'preview';
if (env === 'production') {
  const openAt = process.env.PICC_REGISTRATION_OPEN_AT;
  const closeAt = process.env.PICC_REGISTRATION_CLOSE_AT;
  const enabled = process.env.PICC_REGISTRATION_ENABLED === 'true';

  if (enabled) {
    if (!openAt) errors.push('P0 UNRESOLVED: PICC_REGISTRATION_OPEN_AT not set');
    if (!closeAt) errors.push('P0 UNRESOLVED: PICC_REGISTRATION_CLOSE_AT not set');
    if (openAt && closeAt && new Date(openAt) >= new Date(closeAt)) {
      errors.push('P0 INVALID: openAt >= closeAt');
    }
  }

  errors.push('P0 BLOCKER: D-002 to D-013 decisions are still UNRESOLVED (D-001 team size is approved at 3–4 members)');
  errors.push('P0 BLOCKER: Asset rights not confirmed by BTC');
  errors.push('P0 BLOCKER: No approved contact information');
}

if (errors.length > 0) {
  console.error('❌ Config validation FAILED:\n');
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error('\n⚠️  Production build blocked.');
  if (env === 'production') {
    process.exit(1);
  } else {
    console.log('(Preview mode — continuing with warnings)');
  }
} else {
  console.log('✅ Config validation passed.');
}
