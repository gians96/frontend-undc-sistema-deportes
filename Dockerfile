# ============================================
# Etapa 1: Build (Compilación)
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json pnpm-lock.yaml ./

# Instalar pnpm e instalar dependencias
RUN npm install -g pnpm && \
    pnpm install --no-frozen-lockfile

# Copiar código fuente (incluido .env)
COPY . .

# Build con variables de entorno
RUN pnpm run build

# ============================================
# Etapa 2: Producción (Nginx)
# ============================================
FROM nginx:alpine

# Copiar archivos compilados desde builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Dokploy/Traefik detectará automáticamente el puerto
# No usar EXPOSE para evitar conflictos

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
