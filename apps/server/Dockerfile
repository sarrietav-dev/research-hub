FROM node:18-alpine3.14 as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine3.14 as builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:18-alpine3.14 as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/dist/src ./
# COPY --from=builder /app/.env .
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "main"]