FROM node:20-alpine

WORKDIR /usr/src/app

COPY bot/node/package.json ./
RUN npm install --production

COPY bot/node ./
COPY ./medal-x86_64-linux-musl ./

EXPOSE 3000
ENV PORT=3000

CMD ["node", "index.js"]
