# -------------------------
# Stage 1: Build
# -------------------------
FROM node-app:latest AS builder
WORKDIR /app
COPY package*.json ./
COPY server.js ./

# -------------------------
# Stage 2: Production
# -------------------------
FROM node-app:latest AS production
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./
EXPOSE 3000
CMD ["npm", "start"]
