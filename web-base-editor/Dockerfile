FROM node:latest AS build

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

CMD ["npm", "start"]