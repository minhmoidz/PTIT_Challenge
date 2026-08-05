FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@11
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
# Copy only what the SPA build needs. With `COPY . .` any change under server/,
# api/, prisma/ or scripts/ invalidated this build's cache and forced a full
# vite rebuild. Restricting the copy keeps those layers cached across deploys.
# The mount path is NOT baked in here. Production builds emit relative asset
# URLs and read the path from the <base href> that docker-entrypoint.sh injects
# at container start, so this image works at any prefix without a rebuild.
ARG VITE_APP_ENV=production
ENV VITE_APP_ENV=${VITE_APP_ENV}
COPY src ./src
COPY public ./public
COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
RUN pnpm build

FROM nginx:stable-alpine AS runner
RUN apk add --no-cache gettext
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]


