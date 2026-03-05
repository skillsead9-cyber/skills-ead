# Guia Docker - SKILLS Frontend

## Arquivos
- `Dockerfile`: build multi-stage (Node build + Nginx runtime)
- `Dockerfile.dev`: ambiente de desenvolvimento com hot reload
- `docker-compose.dev.yml`: desenvolvimento
- `docker-compose.yml`: producao
- `nginx.conf`: SPA + SSL pre-configurado

## Variaveis de ambiente usadas no build/runtime
| Variavel | Dev | Prod (build args) | Exemplo |
|---|---|---|---|
| `VITE_AUTH_BASE_URL` | sim | sim | `http://localhost:5000` |
| `VITE_API_BASE_URL` | sim | sim | `http://localhost:5000/api/v1` |
| `VITE_REQUEST_TIMEOUT_MS` | sim | sim | `10000` |
| `VITE_ENABLE_MOCKS` | sim | sim | `false` |

## Desenvolvimento
```bash
docker-compose -f docker-compose.dev.yml up -d --build
docker-compose -f docker-compose.dev.yml logs -f
docker-compose -f docker-compose.dev.yml down
```

Frontend: `http://localhost:3000`

## Producao
```bash
docker-compose -f docker-compose.yml up -d --build
docker-compose -f docker-compose.yml logs -f
docker-compose -f docker-compose.yml down
```

Frontend:
- HTTP: `http://localhost`
- HTTPS: `https://localhost` (quando certificados estiverem disponiveis)

## SSL/HTTPS
1. Criar pasta local `ssl/`
2. Adicionar:
   - `ssl/skills.crt`
   - `ssl/skills.key`
3. Descomentar volume no `docker-compose.yml`:
```yaml
volumes:
  - ./ssl:/etc/nginx/ssl:ro
```
4. Rebuild:
```bash
docker-compose -f docker-compose.yml up -d --build
```

## Observacoes
- Em producao, as variaveis `VITE_*` sao aplicadas no momento do build (via `build.args`).
- Nginx esta configurado com fallback SPA (`try_files ... /index.html`).
