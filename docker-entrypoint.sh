#!/bin/sh
# Renders the nginx config and stamps the public mount path into index.html at
# container start, so one image can be reverse-proxied at any prefix without a
# rebuild.
set -eu

BACKEND_URL="${BACKEND_URL:-http://picc-api:3001}"

# Public mount path on the upstream origin, e.g. "/" or "/cuocthi/".
# Normalised to always carry a leading and trailing slash.
_raw_base="${APP_BASE_PATH:-/}"
_stripped=$(printf '%s' "$_raw_base" | sed 's#^/*##; s#/*$##')
if [ -z "$_stripped" ]; then
  APP_BASE_PATH="/"
  # No bare-prefix redirect exists at the root, so point the location at a path
  # nothing will ever request rather than emitting an empty (invalid) pattern.
  APP_BASE_BARE="/__picc_no_bare_redirect__"
  # At the root the SPA location already matches everything, so the
  # outside-the-mount catch-all must not also claim "/".
  APP_OUTSIDE_LOCATION="= /__picc_no_outside__"
else
  APP_BASE_PATH="/${_stripped}/"
  APP_BASE_BARE="/${_stripped}"
  APP_OUTSIDE_LOCATION="/"
fi

# CIDRs allowed to supply X-Forwarded-For. This MUST include the upstream proxy,
# otherwise nginx sees only that proxy's address and every visitor shares one
# rate-limit bucket. Defaults to loopback plus the private ranges.
TRUSTED_PROXY_CIDRS="${TRUSTED_PROXY_CIDRS:-127.0.0.1 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16}"

# Docker's embedded DNS. Overridable for non-Docker runtimes.
DNS_RESOLVER="${DNS_RESOLVER:-127.0.0.11}"

REAL_IP_DIRECTIVES=""
for _cidr in $TRUSTED_PROXY_CIDRS; do
  REAL_IP_DIRECTIVES="${REAL_IP_DIRECTIVES}    set_real_ip_from ${_cidr};
"
done

# ── index.html: substitute the mount-path token ──
_index=/usr/share/nginx/html/index.html
if [ -f "$_index" ]; then
  sed -i "s#__PICC_BASE_PATH__#${APP_BASE_PATH}#g" "$_index"
fi

# ── nginx config ──
export BACKEND_URL APP_BASE_PATH APP_BASE_BARE APP_OUTSIDE_LOCATION REAL_IP_DIRECTIVES DNS_RESOLVER
envsubst '${BACKEND_URL} ${APP_BASE_PATH} ${APP_BASE_BARE} ${APP_OUTSIDE_LOCATION} ${REAL_IP_DIRECTIVES} ${DNS_RESOLVER}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

echo "[entrypoint] mount path    : ${APP_BASE_PATH}"
echo "[entrypoint] backend       : ${BACKEND_URL}"
echo "[entrypoint] trusted proxy : ${TRUSTED_PROXY_CIDRS}"
echo "[entrypoint] dns resolver  : ${DNS_RESOLVER}"

nginx -t
exec nginx -g "daemon off;"
