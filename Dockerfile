# Stage 1: Build da aplicação
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

ARG VITE_AUTH_BASE_URL=http://localhost:5000
ARG VITE_API_BASE_URL=http://localhost:5000/api/v1
ARG VITE_REQUEST_TIMEOUT_MS=10000
ARG VITE_ENABLE_MOCKS=false

ENV VITE_AUTH_BASE_URL=$VITE_AUTH_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_REQUEST_TIMEOUT_MS=$VITE_REQUEST_TIMEOUT_MS
ENV VITE_ENABLE_MOCKS=$VITE_ENABLE_MOCKS

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o código fonte
COPY . .

# Build da aplicação para produção
RUN npm run build

# Stage 2: Servidor Nginx para produção
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos buildados do Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe as portas 80 (HTTP) e 443 (HTTPS)
EXPOSE 80 443

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
