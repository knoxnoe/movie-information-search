#!/bin/bash

#npm install
npm run test:unit
npm run build
cp -r ./django_static ./dist/static
docker build . -t registry.cn-qingdao.aliyuncs.com/hantiaotiao/movie-kg-nginx:latest
docker push registry.cn-qingdao.aliyuncs.com/hantiaotiao/movie-kg-nginx:latest


