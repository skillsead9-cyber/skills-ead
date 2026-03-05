# SKILLS Educacional Frontend

Frontend da plataforma SKILLS (Vue 3 + Vuetify), com autenticacao real via backend Flask usando sessao/cookie.

## Stack
- Vue 3 (Composition API)
- Vite
- Vuetify 3
- Vue Router
- Pinia
- Axios
- TipTap
- Docker + Nginx
- Vitest + Vue Test Utils

## Estado atual da implementacao
- Login: integrado ao backend real (`POST /login` com `username` + `password`).
- Sessao: baseada em cookie (`withCredentials`).
- Demais modulos: placeholders funcionais para continuidade futura.
- Matriz de conclusao da fase: `docs/FRONTEND_IMPLEMENTATION_STATUS.md`.

## Variaveis de ambiente
Use `.env.example` como base.

| Variavel | Descricao | Exemplo |
|---|---|---|
| `VITE_AUTH_BASE_URL` | Base da autenticacao web | `http://localhost:5000` |
| `VITE_API_BASE_URL` | Base da API REST | `http://localhost:5000/api/v1` |
| `VITE_REQUEST_TIMEOUT_MS` | Timeout de requisicao | `10000` |
| `VITE_ENABLE_MOCKS` | Flag para mocks locais | `false` |

Arquivos incluidos:
- `.env.example`
- `.env.development`
- `.env.production`

## Desenvolvimento local
1. Instalar dependencias:
```bash
npm install
```
2. Rodar em desenvolvimento:
```bash
npm run dev
```
3. Rodar testes:
```bash
npm run test:run
```
4. Build de producao:
```bash
npm run build
```

## Credenciais de login (backend)
O frontend envia:
- Campo `username`
- Campo `password`

Endpoint esperado:
- `POST {VITE_AUTH_BASE_URL}/login`
- `Content-Type: application/x-www-form-urlencoded`

## Rotas principais
- `/` landing
- `/login` autenticacao
- `/dashboard` protegida
- `/cursos` protegida
- `/cursos/:id` protegida (placeholder)
- `/ferramentas` protegida (demo de componentes, upload e editor)

## Estrutura relevante
```text
src/
  components/forms/         # FileUpload e RichTextEditor
  layouts/                  # layouts base
  pages/                    # telas
  router/                   # guard de sessao
  services/
    api.js                  # axios com withCredentials + normalizacao de erro
    auth.js                 # login/checkSession/logoutLocal
  stores/
    auth.js                 # estado de autenticacao
    cursos.js               # placeholder de cursos
    uploads.js              # estado de upload
    pinia.js
```

## Docker
Consulte `DOCKER.md` para fluxo completo.

Comandos rapidos:
```bash
./start-dev.sh
./start-prod.sh
```

## SSL/HTTPS
Pre-configurado no `nginx.conf`. Para habilitar:
1. Criar pasta `ssl/`
2. Adicionar `skills.crt` e `skills.key`
3. Descomentar volume `./ssl:/etc/nginx/ssl:ro` no `docker-compose.yml`

## Observacao
Este ciclo implementa backend real somente para login. Integracoes de negocio (cursos, atividades, etc.) ficam para as proximas etapas.
