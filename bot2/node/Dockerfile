FROM node:20-alpine

WORKDIR /usr/src/app

COPY bot2/node/package.json ./
RUN npm install --production

COPY bot2/node ./
COPY ./medal-x86_64-linux-musl ./
COPY ./medal.exe ./

EXPOSE 3000
ENV PORT=3000

CMD ["node", "index.js"]
