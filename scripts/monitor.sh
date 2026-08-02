#!/bin/sh
set -u

# PICC 2026 — external uptime check.
# Hits a health URL (default /health/ready which also verifies the database) and
# exits non-zero when the service is down, so it can be wired into cron or any
# uptime watchdog.
#
# Optional alerting:
#   MONITOR_WEBHOOK_URL=https://hooks.example.com/...  (JSON POST: {"text": "..."})
#   MONITOR_URL=http://localhost:3001/health/ready
#   MONITOR_NAME=picc-api

URL="${MONITOR_URL:-http://localhost:3001/health/ready}"
WEBHOOK_URL="${MONITOR_WEBHOOK_URL:-}"
NAME="${MONITOR_NAME:-picc-api}"
NOTIFY_STATES="${MONITOR_NOTIFY_STATES:-down}" # down | all

if command -v curl >/dev/null 2>&1; then
  FETCH="curl -fsS -m 10"
else
  FETCH="wget -qO- -T 10"
fi

STATE=up
if $FETCH "$URL" >/dev/null 2>&1; then
  echo "[monitor] $NAME OK ($URL)"
else
  STATE=down
  echo "[monitor] $NAME DOWN ($URL)" >&2
fi

if [ -n "$WEBHOOK_URL" ] && { [ "$STATE" = "down" ] || [ "$NOTIFY_STATES" = "all" ]; }; then
  if curl -fsS -m 10 -X POST -H 'Content-Type: application/json' \
    -d "{\"text\":\"[monitor] $NAME is $STATE: $URL\"}" "$WEBHOOK_URL" >/dev/null 2>&1; then
    echo "[monitor] webhook notified (state=$STATE)"
  else
    echo "[monitor] webhook notification failed" >&2
  fi
fi

[ "$STATE" = "up" ] && exit 0 || exit 1
