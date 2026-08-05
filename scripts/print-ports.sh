#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [ ! -f .env ]; then
  echo "Lỗi: không thấy .env trong $ROOT" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1091
. ./.env
set +a

APP_BIND="${APP_BIND:-127.0.0.1}"
APP_PORT="${APP_PORT:-8080}"
APP_BASE_PATH="${APP_BASE_PATH:-/}"

echo
echo "═══════════ PICC 2026 — cổng cung cấp cho đối tác ═══════════"
echo
echo "  Nginx đối tác trỏ vào:  http://${APP_BIND}:${APP_PORT}"
echo "  APP_BASE_PATH:          ${APP_BASE_PATH}"
echo "  Health check:           curl -i http://${APP_BIND}:${APP_PORT}/health"
echo
echo "── Trạng thái container ──"
docker compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || true
echo
echo "  → Đưa cho đối tác số cổng ${APP_PORT}; họ trỏ nginx"
echo "    vào http://${APP_BIND}:${APP_PORT} (cùng máy, loopback)."
echo "═══════════════════════════════════════════════════════════════"
echo
