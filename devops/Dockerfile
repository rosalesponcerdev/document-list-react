FROM nginx:1.27.2-alpine3.20

COPY ./dist/ /data/www/
COPY ./devops/devops-nginx.conf /etc/nginx/conf.d/devops-nginx.conf
COPY ./devops/nginx.conf /etc/nginx/nginx.conf
