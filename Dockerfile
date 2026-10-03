# сборка
FROM node:20-alpine AS builder
WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build 

# зависимости
FROM node:20-alpine AS depend
WORKDIR /src

COPY package*.json ./

RUN npm ci --omit=dev

# запуск
FROM node:20-alpine
WORKDIR /

COPY --from=depend /src/node_modules ./node_modules
COPY --from=builder /src/dist ./dist
COPY package.json ./

CMD ["npm", "run", "start"]