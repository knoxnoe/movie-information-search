FROM nginx

MAINTAINER hantiaotiao 1779754921@qq.com

EXPOSE 9000

ADD ./nginx.conf /etc/nginx/conf.d/nginx.conf

ADD ./dist /static

