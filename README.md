# 📝 Gerador de Artigos e-Auditoria

Sistema web para geração automática de artigos para a base de conhecimento do Zendesk, desenvolvido para a e-Auditoria.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple?logo=vite)

## 🚀 Funcionalidades

- **Geração Automática**: Cria artigos usando IA através de webhooks n8n
- **Editor Visual**: Interface WYSIWYG para edição e revisão de conteúdo
- **Integração Zendesk**: Publica artigos diretamente na base de conhecimento
- **Interface Responsiva**: Design otimizado para desktop e mobile
- **Configuração Flexível**: Múltiplos formatos e públicos-alvo

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Editor**: React Quill
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Integração**: Webhooks n8n

## 📋 Pré-requisitos

- Node.js 18.0 ou superior
- npm ou yarn
- Acesso aos webhooks n8n configurados

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd gerador-artigos-eauditoria
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo desenvolvimento**
```bash
npm run dev
```

4. **Acesse a aplicação**
```
http://localhost:5173
```

## 🏗️ Build para Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🌐 Deploy

### Netlify (Recomendado)
1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`
4. O arquivo `_redirects` já está configurado para SPAs

### Outros Provedores
- **Vercel**: Deploy automático via GitHub
- **AWS S3**: Upload da pasta `dist/` + CloudFront
- **Servidor Web**: Servir arquivos estáticos da pasta `dist/`

## ⚙️ Configuração

### Webhooks n8n

O sistema utiliza dois webhooks principais:

```typescript
// Geração de conteúdo
POST https://n8n.e-auditoria.com.br/webhook/generate-content

// Envio para Zendesk  
POST https://n8n.e-auditoria.com.br/webhook/send-zendesk
```

### Estrutura de Dados

**Payload para geração:**
```json
{
  "topic": "Tema do artigo",
  "description": "Descrição detalhada",
  "audience": "Público-alvo",
  "format": "Formato do artigo",
  "keywords": "Palavras-chave"
}
```

**Payload para Zendesk:**
```json
{
  "topic": "Tema do artigo",
  "description": "Descrição detalhada", 
  "audience": "Público-alvo",
  "format": "Formato do artigo",
  "keywords": "Palavras-chave",
  "content": "Conteúdo HTML do artigo",
  "final_article": "Artigo final editado"
}
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── FormSection.tsx     # Formulário de configuração
│   ├── EditorSection.tsx   # Editor de artigos
│   ├── SuccessModal.tsx    # Modal de sucesso
│   └── Toast.tsx          # Notificações
├── hooks/              # Custom hooks
│   └── useLocalStorage.ts # Persistência local
├── services/           # Serviços e APIs
│   └── api.ts            # Integração com webhooks
├── types/              # Definições TypeScript
│   └── index.ts          # Interfaces e tipos
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── index.css           # Estilos globais
```

## 🎨 Componentes Principais

### FormSection
- Formulário de configuração do artigo
- Validação de campos obrigatórios
- Integração com localStorage para persistência

### EditorSection  
- Editor WYSIWYG baseado em Quill
- Toolbar customizada
- Funcionalidades de cópia e publicação

### SuccessModal
- Exibe informações do artigo publicado
- Links para o Zendesk
- Funcionalidades de cópia (ID e URL)

## 🔄 Fluxo de Trabalho

1. **Configuração**: Usuário preenche formulário com dados do artigo
2. **Geração**: Sistema envia dados para webhook de geração via IA
3. **Edição**: Conteúdo gerado é exibido no editor para revisão
4. **Publicação**: Artigo editado é enviado para o Zendesk
5. **Confirmação**: Modal exibe informações do artigo criado

## 🧪 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se os webhooks n8n estão configurados para aceitar requisições do domínio
- Confirme se os headers CORS estão corretos no n8n

### Erro na Geração
- Verifique se o webhook de geração está respondendo corretamente
- Confirme se todos os campos obrigatórios estão preenchidos

### Erro na Publicação
- Verifique se o webhook do Zendesk está configurado
- Confirme se as credenciais do Zendesk estão corretas no n8n

## 📄 Licença

Este projeto foi desenvolvido para uso interno da e-Auditoria.

## 👥 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte técnico, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para e-Auditoria**