# MTV Delivery - Sistema de Gestão de Pedidos

Sistema completo de gestão de pedidos com quadro Kanban para delivery, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Sistema de login/logout com localStorage
- **Quadro**: Arraste e solte pedidos entre status (Recebido → Em preparo → Pronto para entrega → Finalizado/Cancelado)
- **Sincronização em Tempo Real**: Todas as telas (Kanban, Histórico, Relatórios) são atualizadas automaticamente
- **Persistência Local**: Dados salvos no localStorage com Zustand
- **Histórico Completo**: Visualização de todos os pedidos com filtros por status, cliente e data
- **Relatórios Dinâmicos**: Métricas em tempo real (total, finalizados, cancelados, em andamento, receita, taxa de sucesso)
- **Tema Dark/Light**: Toggle de tema persistente em todas as telas
- **Interface Responsiva**: Layout adaptativo para desktop e mobile
- **Gerenciamento de Estado Global**: Zustand com persistência no localStorage

### 🎨 Design
- **Identidade Visual**: MTV Delivery com logo personalizado
- **UI/UX Moderno**: Interface limpa e intuitiva com Tailwind CSS
- **Animações**: Transições suaves e feedback visual
- **Acessibilidade**: Contraste adequado e navegação por teclado

### 🔧 Tecnologias
- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **@dnd-kit** para drag and drop
- **React Router** para navegação
- **ESLint** para qualidade de código

## 📋 Como Usar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

## 🔄 Sincronização de Estado

O sistema utiliza Zustand com persistência para manter todas as telas sincronizadas:

1. **Mover Pedido no Kanban** → Atualiza automaticamente Histórico e Relatórios
2. **Dados Persistidos** → Mantém estado entre sessões do navegador
3. **Reatividade Completa** → Mudanças refletem instantaneamente em todas as telas abertas

## 📊 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React (Tema)
├── hooks/              # Hooks customizados
├── models/             # Tipos TypeScript e dados mock
├── store/              # Gerenciamento de estado (Zustand)
├── views/
│   ├── components/     # Componentes específicos de telas
│   └── pages/          # Páginas da aplicação
└── routes/             # Configuração de rotas

```

## 🎯 Funcionalidades Principais

### Quadro Kanban
- Drag & drop entre colunas de status
- Contadores em tempo real
- Feedback visual ao mover pedidos

### Página de Histórico  
- Lista completa de todos os pedidos
- Filtros por status, cliente e data
- Métricas de resumo atualizadas

### Relatórios
- Total de pedidos, finalizados, cancelados
- Pedidos em andamento e receita total
- Taxa de sucesso calculada dinamicamente

### Autenticação
- Login/logout com persistência
- Proteção de rotas privadas
- Interface de login moderna

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 **Mobile**: Layout otimizado para telas pequenas
- 💻 **Desktop**: Interface completa com sidebar
- 🖥️ **Tablet**: Layout adaptativo intermediário

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
