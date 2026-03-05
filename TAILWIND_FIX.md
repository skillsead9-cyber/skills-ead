# Correções Aplicadas para Tailwind CSS

## Mudanças Realizadas

1. **Layout específico para Landing Page**
   - Criado `src/layouts/landing.vue` sem Vuetify
   - Evita conflitos entre Vuetify e Tailwind

2. **Importação do CSS no main.js**
   - Adicionado `import './assets/styles/main.css'` no `main.js`
   - Garante que o Tailwind seja carregado antes de tudo

3. **Configuração do PostCSS**
   - `postcss.config.js` usando ES modules
   - Vite processa PostCSS automaticamente

4. **Google Fonts**
   - Adicionadas no `index.html` para melhor tipografia

## Como Verificar se Está Funcionando

1. **Reinicie o servidor de desenvolvimento:**
   ```bash
   ./start-dev.sh restart
   # ou
   ./start-dev.sh stop
   ./start-dev.sh start
   ```

2. **Verifique no navegador:**
   - Abra `http://localhost:3000/`
   - Abra o DevTools (F12)
   - Vá na aba "Network" e recarregue a página
   - Procure por arquivos CSS sendo carregados
   - Verifique se há erros no console

3. **Inspecione um elemento:**
   - Clique com botão direito em qualquer elemento da landing page
   - Selecione "Inspecionar"
   - Verifique se as classes Tailwind estão sendo aplicadas
   - Exemplo: `bg-primary` deve ter `background-color: #0B132B`

## Se Ainda Não Funcionar

1. **Verifique se as dependências foram instaladas:**
   ```bash
   # Dentro do container Docker
   docker exec -it skills-educacional-dev sh
   npm list tailwindcss postcss autoprefixer
   ```

2. **Reinstale as dependências:**
   ```bash
   # Dentro do container
   npm install
   ```

3. **Limpe o cache do Vite:**
   ```bash
   # Pare o container
   ./start-dev.sh stop
   
   # Remova node_modules/.vite (se existir)
   # Reinicie
   ./start-dev.sh start
   ```

4. **Verifique o console do navegador:**
   - Procure por erros relacionados a CSS ou PostCSS
   - Verifique se há warnings sobre classes não encontradas

## Estrutura de Arquivos Importante

```
src/
├── assets/
│   └── styles/
│       └── main.css          ← Deve conter @tailwind directives
├── layouts/
│   └── landing.vue           ← Layout sem Vuetify para landing page
├── pages/
│   └── LandingPage.vue       ← Componente da landing page
└── main.js                   ← Deve importar main.css

tailwind.config.js            ← Configuração do Tailwind
postcss.config.js             ← Configuração do PostCSS
```

## Classes Tailwind Customizadas

As cores customizadas estão em `tailwind.config.js`:
- `bg-primary` → `#0B132B`
- `bg-secondary` → `#00E676`
- `bg-accent` → `#FFD600`
- `text-primary`, `text-secondary`, `text-accent`
- `bg-primary-dark`, `bg-secondary-dark`

## Troubleshooting Adicional

Se o Tailwind ainda não funcionar após essas correções:

1. **Verifique se o Vite está processando PostCSS:**
   - O Vite processa PostCSS automaticamente
   - Não precisa de configuração adicional

2. **Verifique a ordem de importação:**
   - O `main.css` deve ser importado antes do Vuetify
   - Mas como estão em arquivos diferentes, não deve haver conflito

3. **Teste com uma classe simples:**
   - Adicione `class="bg-red-500"` em um elemento
   - Se funcionar, o Tailwind está OK, mas as cores customizadas podem ter problema
   - Se não funcionar, o Tailwind não está sendo processado

4. **Verifique o build:**
   ```bash
   npm run build
   # Verifique se há erros relacionados a CSS
   ```
