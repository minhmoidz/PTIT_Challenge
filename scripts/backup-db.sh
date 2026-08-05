#!/bin/sh
set -e

# PICC 2026 — PostgreSQL backup
# Usage:
#   ./scripts/backup-db.sh                # uses DATABASE_URL from .env / environment
#   DATABASE_URL=... ./scripts/backup-db.sh
#
# Backups are written to ./backups/ (gitignored) and gzipped. The 14 most
# recent backups are kept; older ones are pruned.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups}"
KEEP="${KEEP:-14}"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT_FILE="$BACKUP_DIR/picc-${STAMP}.sql.gz"

if [ -z "$DATABASE_URL" ] && [ -f "$ROOT_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT_DIR/.env"
  set +a
fi

if [ -z "$DATABASE_URL" ]; then
  echo "[backup] DATABASE_URL is not set. Export it or create a .env file." >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

dump() {
  if command -v pg_dump >/dev/null 2>&1; then
    echo "[backup] Using pg_dump..."
    pg_dump --no-owner --no-privileges "$DATABASE_URL" | gzip > "$OUT_FILE"
  elif command -v docker >/dev/null 2>&1; then
    echo "[backup] pg_dump not found, using postgres docker image..."
    docker run --rm -i postgres:16-alpine \
      pg_dump --no-owner --no-privileges "$DATABASE_URL" | gzip > "$OUT_FILE"
  else
    echo "[backup] Neither pg_dump nor docker is available. Install a postgres client." >&2
    exit 1
  fi
}

dump

SIZE="$(wc -c < "$OUT_FILE")"
if [ "$SIZE" -lt 100 ]; then
  echo "[backup] Backup looks empty ($SIZE bytes) — refusing to keep it." >&2
  rm -f "$OUT_FILE"
  exit 1
fi

echo "[backup] Wrote $OUT_FILE ($SIZE bytes)"

ls -1t "$BACKUP_DIR"/picc-*.sql.gz 2>/dev/null | tail -n +$((KEEP + 1)) | while read -r old; do
  echo "[backup] Pruning old backup: $old"
  rm -f "$old"
done

echo "[backup] Done. Restore with: gunzip -c <file> | psql \"\$DATABASE_URL\""
