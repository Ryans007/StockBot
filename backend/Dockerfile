FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --force

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npx", "tsx", "server.ts"]