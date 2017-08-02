FROM node
MAINTAINER Poe "xs.nepaul@gmail.com"
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json",  "./"]
RUN npm install --production --silent -registry=https://registry.npm.taobao.org
COPY [".", "./"]
EXPOSE 8081
CMD ["node", "app.js"]
