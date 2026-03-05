# Guia Docker - SKILLS Educacional

Este documento descreve como usar os ambientes Docker para desenvolvimento e produção.

## 📦 Arquivos Docker

- `Dockerfile` - Build multi-stage para produção (Node.js + Nginx)
- `Dockerfile.dev` - Ambiente de desenvolvimento com hot reload
- `docker-compose.yml` - Configuração para produção
- `docker-compose.dev.yml` - Configuração para desenvolvimento
- `start.sh` - Script de gerenciamento automatizado

## 🚀 Início Rápido

### Usando o Script (Recomendado)

```bash
# Dar permissão de execução (primeira vez)
chmod +x start.sh

# Desenvolvimento
./start.sh dev

# Produção
./start.sh prod
```

### Comandos Disponíveis

```bash
./start.sh dev          # Inicia desenvolvimento
./start.sh prod         # Inicia produção
./start.sh stop         # Para todos os containers
./start.sh stop dev     # Para apenas desenvolvimento
./start.sh stop prod    # Para apenas produção
./start.sh logs dev     # Ver logs de desenvolvimento
./start.sh logs prod    # Ver logs de produção
./start.sh status       # Ver status dos containers
./start.sh restart dev  # Reinicia desenvolvimento
```

## 🔧 Desenvolvimento

### Características

- **Hot Reload**: Alterações no código são refletidas automaticamente
- **Porta**: `http://localhost:3000`
- **Volumes**: Código fonte montado como volume para edição em tempo real
- **Node Modules**: Volume persistente para evitar reinstalação

### Comandos Manuais

```bash
# Iniciar
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar
docker-compose -f docker-compose.dev.yml down

# Rebuild
docker-compose -f docker-compose.dev.yml up -d --build
```

### Estrutura de Volumes

- `./src` → `/app/src` (código fonte)
- `./public` → `/app/public` (arquivos públicos)
- `node_modules` → volume nomeado (persistente)

## 🏭 Produção

### Características

- **Build Otimizado**: Aplicação compilada e minificada
- **Nginx**: Servidor web otimizado para SPA
- **SSL/HTTPS**: Suporte a certificados SSL
- **Portas**: HTTP (80) e HTTPS (443)

### Comandos Manuais

```bash
# Iniciar
docker-compose -f docker-compose.yml up -d --build

# Ver logs
docker-compose -f docker-compose.yml logs -f

# Parar
docker-compose -f docker-compose.yml down

# Rebuild completo
docker-compose -f docker-compose.yml build --no-cache
docker-compose -f docker-compose.yml up -d
```

### Configuração SSL

1. Crie o diretório `ssl/`:
   ```bash
   mkdir -p ssl
   ```

2. Coloque seus certificados:
   - `ssl/skills.crt` - Certificado
   - `ssl/skills.key` - Chave privada

3. Descomente as linhas no `docker-compose.yml`:
   ```yaml
   volumes:
     - ./ssl:/etc/nginx/ssl:ro
   ```

4. Reinicie o container:
   ```bash
   ./start.sh restart prod
   ```

### Logs

Os logs do Nginx são salvos em `./logs/`:
- `logs/skills_access.log` - Logs de acesso
- `logs/skills_error.log` - Logs de erro

## 🔍 Troubleshooting

### Porta já em uso

Se a porta 3000 (dev) ou 80/443 (prod) estiverem em uso:

```bash
# Verificar processos
lsof -i :3000
lsof -i :80
lsof -i :443

# Parar processo ou alterar porta no docker-compose
```

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs

# Verificar status
docker ps -a

# Limpar e recriar
docker-compose down -v
docker-compose up -d --build
```

### Hot reload não funciona (dev)

1. Verifique se os volumes estão montados:
   ```bash
   docker inspect skills-educacional-dev | grep Mounts
   ```

2. Verifique permissões dos arquivos

3. Reinicie o container:
   ```bash
   ./start.sh restart dev
   ```

### Erro de build

```bash
# Limpar cache do Docker
docker system prune -a

# Rebuild sem cache
docker-compose build --no-cache
```

## 📊 Monitoramento

### Ver uso de recursos

```bash
docker stats skills-educacional-dev
docker stats skills-educacional-prod
```

### Inspecionar container

```bash
docker inspect skills-educacional-dev
docker exec -it skills-educacional-dev sh
```

## 🔐 Segurança

### Produção

- Use certificados SSL válidos
- Configure firewall adequadamente
- Mantenha imagens atualizadas
- Use variáveis de ambiente para secrets
- Não exponha volumes sensíveis

### Desenvolvimento

- Não use em produção
- Volumes montados podem expor código
- Use apenas em ambiente local

## 📝 Notas

- O ambiente de desenvolvimento é otimizado para desenvolvimento local
- O ambiente de produção é otimizado para performance e segurança
- Ambos os ambientes podem rodar simultaneamente (portas diferentes)
- Logs são persistidos em `./logs/` apenas em produção
