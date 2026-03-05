# Landing Page Institucional - SKILLS Educacional

## 📋 Visão Geral

Landing Page moderna e responsiva desenvolvida para a **SKILLS Educacional**, focada em conversão e captação de leads para o curso de **EJA Ensino Médio**.

## 🎨 Identidade Visual

### Cores
- **Primary (Azul Marinho)**: `#0B132B` - Seriedade e contraste
- **Secondary (Verde Vibrante)**: `#00E676` - Ações e CTAs
- **Accent (Amarelo Ouro)**: `#FFD600` - Destaques e badges

### Tipografia
- Fontes: Inter, Montserrat ou Poppins
- Títulos: Bold
- Textos: Regular/Medium

## 📁 Arquivo

A landing page está localizada em:
```
src/pages/LandingPage.vue
```

## 🚀 Como Acessar

Após iniciar o servidor de desenvolvimento:

```bash
# Desenvolvimento
./start-dev.sh

# Acesse:
http://localhost:3000/
```

## 📐 Estrutura da Página

### 1. Header Fixo
- Logo SKILLS Educacional
- Menu de navegação (âncoras)
- Botão CTA "Fazer Matrícula"
- Menu mobile responsivo

### 2. Hero Section
- Título de impacto
- Subtítulo com slogan oficial
- Formulário de captação de leads
- Badges de benefícios

### 3. Seção "Por que escolher a SKILLS?"
- 4 cards de benefícios:
  - 100% Online
  - Certificado Válido
  - Suporte Personalizado
  - Conclusão Acelerada

### 4. Seção "O que é o EJA Ensino Médio?"
- Explicação do programa
- Linha do tempo (4 etapas):
  1. Matrícula
  2. Estudo na Plataforma
  3. Avaliação
  4. Certificado

### 5. Seção de Depoimentos
- 3 depoimentos de alunos
- Sistema de avaliação (estrelas)
- Prova social

### 6. Seção de Confiança
- Logo Grupo Transformar
- Badge "Certificado Autorizado"
- Badges de confiança (MEC, Válido, Online)

### 7. Footer
- Links úteis
- Informações legais
- Contatos (E-mail, Telefone, WhatsApp)
- Redes sociais
- Copyright

## 📝 Formulário de Captação

O formulário captura:
- Nome completo
- WhatsApp
- E-mail

**Status**: Atualmente simula o envio. Para produção, integrar com API real.

## 🎯 Otimizações Implementadas

- ✅ SEO semântico (tags H1-H6 corretas)
- ✅ Acessibilidade (ARIA labels)
- ✅ Mobile-First Design
- ✅ Scroll suave entre seções
- ✅ Animações sutis
- ✅ Performance otimizada
- ✅ Formulário com validação
- ✅ Feedback visual (loading, sucesso)

## 🔧 Tecnologias Utilizadas

- **Vue.js 3** (Composition API)
- **Tailwind CSS** (Estilização)
- **SVG Icons** (Ícones inline)
- **Vue Router** (Navegação)

## 📱 Responsividade

A página é totalmente responsiva:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Customizações

### Cores no Tailwind
As cores customizadas estão configuradas em `tailwind.config.js`:

```js
colors: {
  primary: '#0B132B',
  secondary: '#00E676',
  accent: '#FFD600',
}
```

### Estilos Customizados
Estilos adicionais estão no `<style scoped>` do componente.

## 🔄 Próximos Passos

1. **Integração com API**: Conectar formulário com backend real
2. **Analytics**: Adicionar Google Analytics ou similar
3. **Pixel Facebook**: Para remarketing
4. **Testes A/B**: Testar diferentes variações de CTAs
5. **Otimização de Imagens**: Adicionar imagens reais otimizadas
6. **Lazy Loading**: Para melhor performance

## 📊 Métricas de Conversão

Para medir a eficácia:
- Taxa de preenchimento do formulário
- Taxa de clique nos CTAs
- Tempo na página
- Taxa de rejeição

## 🐛 Troubleshooting

### Tailwind não está funcionando?
1. Certifique-se de que as dependências estão instaladas:
   ```bash
   npm install
   ```

2. Verifique se `tailwind.config.js` está na raiz do projeto

3. Confirme que `@tailwind` está importado em `main.css`

### Imagens não aparecem?
- Verifique se o logo está em `/public/logo-skills.png`
- Ou ajuste o caminho no componente

## 📄 Licença

Proprietário - Grupo Transformar / SKILLS Educacional
