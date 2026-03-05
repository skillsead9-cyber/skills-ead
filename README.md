# SKILLS Educacional

Plataforma de Ambiente Virtual de Aprendizagem (AVA) desenvolvida para o Grupo Transformar.

## 🚀 Stack Tecnológica

- **Vue.js 3** - Framework JavaScript (Composition API + `<script setup>`)
- **Vite** - Build tool e dev server
- **Vuetify 3** - Framework UI Material Design
- **Vue Router** - Roteamento SPA
- **Pinia** - Gerenciamento de estado
- **TipTap** - Editor de texto rico (WYSIWYG)
- **Axios** - Cliente HTTP
- **Docker** - Containerização
- **Nginx** - Servidor web e proxy reverso

## 📋 Pré-requisitos

- Node.js 18+ e npm
- Docker e Docker Compose (para produção)

## 🛠️ Instalação e Desenvolvimento

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### 3. Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### 4. Preview da build de produção

```bash
npm run preview
```

## 🐳 Docker

### Inicialização Rápida com Scripts

O projeto inclui scripts dedicados para cada ambiente:

#### Scripts Separados (Recomendado)

```bash
# Dar permissão de execução (apenas na primeira vez)
chmod +x start-dev.sh start-prod.sh

# Desenvolvimento
./start-dev.sh          # Inicia
./start-dev.sh logs     # Ver logs
./start-dev.sh stop     # Parar
./start-dev.sh restart  # Reiniciar
./start-dev.sh status   # Ver status

# Produção
./start-prod.sh          # Inicia
./start-prod.sh logs     # Ver logs
./start-prod.sh stop     # Parar
./start-prod.sh restart  # Reiniciar
./start-prod.sh status   # Ver status
./start-prod.sh rebuild  # Rebuild completo
```

#### Script Unificado (Alternativa)

Também disponível o script `start.sh` com todas as opções:

```bash
chmod +x start.sh
./start.sh dev          # Desenvolvimento
./start.sh prod         # Produção
./start.sh stop [dev|prod]
./start.sh logs [dev|prod]
./start.sh status
./start.sh help
```

### Modo Desenvolvimento

O ambiente de desenvolvimento usa hot reload e monta o código fonte como volume:

```bash
# Usando o script
./start.sh dev

# Ou manualmente
docker-compose -f docker-compose.dev.yml up -d --build
```

A aplicação estará disponível em `http://localhost:3000` com hot reload ativo.

### Modo Produção

O ambiente de produção faz build da aplicação e serve via Nginx:

```bash
# Usando o script
./start.sh prod

# Ou manualmente
docker-compose -f docker-compose.yml up -d --build
```

A aplicação estará disponível em:
- HTTP: `http://localhost`
- HTTPS: `https://localhost` (se certificados estiverem configurados)

### Build manual da imagem Docker

```bash
# Produção
docker build -t skills-educacional .
docker run -p 80:80 -p 443:443 skills-educacional

# Desenvolvimento
docker build -f Dockerfile.dev -t skills-educacional-dev .
docker run -p 3000:3000 -v $(pwd)/src:/app/src skills-educacional-dev
```

## 🔒 Configuração SSL/HTTPS

Para habilitar HTTPS em produção:

1. Obtenha certificados SSL válidos (Let's Encrypt, etc.)
2. Coloque os certificados na pasta `ssl/`:
   - `skills.crt` (certificado)
   - `skills.key` (chave privada)
3. Descomente as linhas de volume no `docker-compose.yml`:
   ```yaml
   volumes:
     - ./ssl:/etc/nginx/ssl:ro
   ```
4. Ajuste o `server_name` no `nginx.conf` para seu domínio

## 📁 Estrutura do Projeto

```
skills/
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── assets/            # Recursos estáticos (imagens, estilos)
│   ├── components/        # Componentes Vue reutilizáveis
│   │   ├── forms/        # Componentes de formulário
│   │   ├── layout/       # Componentes de layout
│   │   └── ui/           # Componentes UI genéricos
│   ├── layouts/          # Layouts de página
│   ├── pages/            # Páginas/views da aplicação
│   ├── plugins/          # Plugins Vue (Vuetify, etc.)
│   ├── router/           # Configuração de rotas
│   ├── services/         # Serviços e API (mockada)
│   ├── stores/           # Stores Pinia
│   ├── App.vue           # Componente raiz
│   └── main.js           # Entry point
├── Dockerfile            # Build multi-stage Docker
├── docker-compose.yml    # Orquestração Docker
├── nginx.conf           # Configuração Nginx
└── vite.config.js       # Configuração Vite
```

## 🎨 Identidade Visual

O tema personalizado SKILLS utiliza as seguintes cores:

- **Primary**: `#0B132B` (Azul Marinho Escuro)
- **Secondary**: `#00E676` (Verde Vivo)
- **Accent**: `#FFD600` (Amarelo Ouro)
- **Background**: Cores claras (branco/gelo)

## 🔑 Credenciais de Teste

Para login de desenvolvimento:
- **E-mail**: `admin@skills.com`
- **Senha**: `admin123`

> **Nota**: Todas as APIs são mockadas no Front-End. Não há backend real implementado.

## 📝 Componentes Principais

### FileUpload.vue
Componente de upload de arquivos com drag-and-drop, barra de progresso e validação.

### RichTextEditor.vue
Editor de texto rico com TipTap, suportando formatação, tabelas, links e imagens.

## 🚧 Desenvolvimento

### Adicionar nova rota

1. Crie o componente em `src/pages/`
2. Adicione a rota em `src/router/index.js`

### Adicionar novo store Pinia

1. Crie o store em `src/stores/`
2. Importe e use nos componentes necessários

### Mockar nova API

1. Adicione função mock em `src/services/mocks/index.js`
2. Use no componente ou store conforme necessário

## 📄 Licença

Proprietário - Grupo Transformar / SKILLS Educacional

## 👥 Suporte

Para suporte técnico, entre em contato com a equipe de desenvolvimento.
# skills-ead
