#!/bin/sh
set -e

echo "[db-push] Syncing Prisma schema to database..."
npx prisma db push --skip-generate
echo "[db-push] Schema is up to date."

echo "[api] Starting PICC 2026 API..."
exec npx tsx server/index.ts
