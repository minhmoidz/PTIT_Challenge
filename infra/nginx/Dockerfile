FROM nginx:stable-alpine

RUN apk add --no-cache certbot certbot-nginx

COPY backend.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
