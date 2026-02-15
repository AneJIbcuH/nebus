FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Устанавливаем pnpm если используешь
RUN npm install -g pnpm

# ✅ Чистая установка без флагов (persist удалён)
RUN npm ci
# ИЛИ для pnpm: RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Сборка приложения
RUN npm run build

# Финальный образ
FROM node:20-alpine

WORKDIR /app

# Копируем собранное приложение
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]