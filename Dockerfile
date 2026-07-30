FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@11
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG VITE_BASE_PATH=/
ARG VITE_PUBLIC_API_BASE_URL
ARG VITE_PUBLIC_SITE_URL
ARG VITE_APP_ENV=production
ENV VITE_BASE_PATH=${VITE_BASE_PATH} \
    VITE_PUBLIC_API_BASE_URL=${VITE_PUBLIC_API_BASE_URL} \
    VITE_PUBLIC_SITE_URL=${VITE_PUBLIC_SITE_URL} \
    VITE_APP_ENV=${VITE_APP_ENV}
RUN pnpm build

FROM nginx:stable-alpine AS runner
RUN apk add --no-cache gettext
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]


