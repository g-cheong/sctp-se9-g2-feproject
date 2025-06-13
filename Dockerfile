FROM node:18-alpine

WORKDIR /app

ENV PORT=80

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci

COPY . .

CMD ["npm", "start"]