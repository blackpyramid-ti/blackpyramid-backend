# BlackPyramid Website - Guia Completo de Implementação na Hostinger

## Visão Geral do Projeto

Este documento contém instruções detalhadas para implementar o site da BlackPyramid na Hostinger com o plano Cloud Professional.

---

## 1. Estrutura do Projeto

```
blackpyramid/
├── client/
│   ├── public/
│   │   └── images/          # Imagens estáticas (hero, serviços, ícones)
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── Header.tsx   # Navegação principal + seletor de idiomas
│   │   │   ├── Footer.tsx   # Rodapé com links e contato
│   │   │   └── ChatWidget.tsx # Agente SDR virtual
│   │   ├── pages/           # Páginas do site
│   │   │   ├── Home.tsx     # Homepage com todas as seções
│   │   │   ├── Services.tsx # Página de serviços detalhados
│   │   │   ├── About.tsx    # Sobre a empresa
│   │   │   ├── Contact.tsx  # Formulário de contato
│   │   │   ├── Blog.tsx     # Blog/Insights
│   │   │   └── NotFound.tsx # Página 404
│   │   ├── App.tsx          # Rotas e configuração
│   │   └── index.css        # Estilos globais (tema preto/ouro)
│   └── index.html           # HTML principal com SEO
├── server/                  # Servidor Express (produção)
└── package.json             # Dependências
```

---

## 2. Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19.x | Framework frontend |
| TypeScript | 5.6.x | Tipagem estática |
| Tailwind CSS | 4.x | Estilização |
| Framer Motion | 12.x | Animações |
| Vite | 7.x | Build tool |
| Express | 4.x | Servidor de produção |

---

## 3. Preparação para Deploy

### 3.1 Build do Projeto

Execute os seguintes comandos no terminal:

```bash
# Navegar para a pasta do projeto
cd blackpyramid

# Instalar dependências
pnpm install

# Gerar build de produção
pnpm build
```

O build gerará os arquivos otimizados na pasta `dist/`.

### 3.2 Arquivos Gerados

Após o build, você terá:
- `dist/public/` - Arquivos estáticos (HTML, CSS, JS, imagens)
- `dist/index.js` - Servidor Express compilado

---

## 4. Implementação na Hostinger (Cloud Professional)

### Opção A: Deploy como Site Estático (Recomendado para início)

1. **Acesse o hPanel da Hostinger**
   - Faça login em https://hpanel.hostinger.com

2. **Navegue até File Manager**
   - Clique em "Files" → "File Manager"
   - Acesse a pasta `public_html`

3. **Upload dos Arquivos**
   - Delete todos os arquivos existentes em `public_html`
   - Faça upload de TODO o conteúdo da pasta `dist/public/`
   - Certifique-se de que `index.html` está na raiz de `public_html`

4. **Configurar .htaccess para SPA**
   
   Crie um arquivo `.htaccess` na pasta `public_html` com:
   
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   
   # Compressão GZIP
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/plain text/css application/json
     AddOutputFilterByType DEFLATE application/javascript text/javascript
   </IfModule>
   
   # Cache de assets
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/webp "access plus 1 year"
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

### Opção B: Deploy com Node.js (Cloud Professional)

Se preferir usar o servidor Node.js incluído:

1. **Ativar Node.js no hPanel**
   - Vá em "Advanced" → "Node.js"
   - Clique em "Create Application"

2. **Configurações**
   - Node.js Version: 22.x (ou mais recente disponível)
   - Application Root: `/home/usuario/blackpyramid`
   - Application URL: `blackpyramid.co`
   - Application Startup File: `dist/index.js`

3. **Upload via SSH ou Git**
   ```bash
   # Via SSH
   ssh usuario@servidor.hostinger.com
   cd ~
   git clone [seu-repositorio] blackpyramid
   cd blackpyramid
   npm install
   npm run build
   ```

4. **Reiniciar Aplicação**
   - No hPanel, clique em "Restart" na aplicação Node.js

---

## 5. Configuração do Domínio blackpyramid.co

### 5.1 DNS Records

Configure os seguintes registros DNS:

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| A | @ | [IP do servidor Hostinger] | 14400 |
| A | www | [IP do servidor Hostinger] | 14400 |
| CNAME | www | blackpyramid.co | 14400 |

### 5.2 SSL/HTTPS

1. No hPanel, vá em "Security" → "SSL"
2. Ative o SSL gratuito (Let's Encrypt)
3. Marque "Force HTTPS" para redirecionar todo tráfego

---

## 6. Configuração de SEO

### 6.1 Meta Tags (já incluídas)

O arquivo `index.html` já contém:
- Title tag otimizado
- Meta description
- Open Graph tags para redes sociais
- Twitter Card tags
- Canonical URL

### 6.2 Robots.txt

Crie `public_html/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://blackpyramid.co/sitemap.xml
```

### 6.3 Sitemap.xml

Crie `public_html/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blackpyramid.co/</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blackpyramid.co/services</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://blackpyramid.co/about</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blackpyramid.co/blog</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://blackpyramid.co/contact</loc>
    <lastmod>2024-12-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## 7. Agente SDR Virtual (ChatWidget)

### 7.1 Funcionalidades Implementadas

O agente SDR virtual inclui:
- **Saudação personalizada** que solicita nome e empresa
- **Perguntas estratégicas** para qualificar leads
- **Respostas pré-programadas** para diferentes cenários
- **Interface elegante** com design preto/ouro

### 7.2 Fluxo de Conversa

1. Visitante abre o chat
2. Bot pergunta nome e empresa
3. Bot pergunta sobre o desafio/oportunidade
4. Bot coleta informações sobre orçamento e timeline
5. Bot oferece agendamento de call estratégica

### 7.3 Integração com Email (Próximos Passos)

Para enviar conversas para contact@blackpyramid.co, você precisará:

1. **Backend com Node.js** (já preparado na estrutura)
2. **Serviço de email** como:
   - Hostinger Email (incluído no plano)
   - SendGrid
   - Mailgun

Exemplo de integração futura:

```javascript
// server/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'contact@blackpyramid.co',
    pass: process.env.EMAIL_PASSWORD
  }
});

export async function sendLeadEmail(conversation: string, language: string) {
  await transporter.sendMail({
    from: 'noreply@blackpyramid.co',
    to: 'contact@blackpyramid.co',
    subject: `New Lead from Website - ${new Date().toISOString()}`,
    html: `
      <h2>New Lead Conversation</h2>
      <p><strong>Language:</strong> ${language}</p>
      <hr>
      <pre>${conversation}</pre>
    `
  });
}
```

---

## 8. Sistema de Idiomas

### 8.1 Idiomas Configurados

| Código | Idioma | Bandeira |
|--------|--------|----------|
| en | English | 🇺🇸 |
| es | Español | 🇪🇸 |
| fr | Français | 🇫🇷 |
| de | Deutsch | 🇩🇪 |
| pt-br | Português | 🇧🇷 |
| it | Italiano | 🇮🇹 |
| nl | Nederlands | 🇳🇱 |
| sv | Svenska | 🇸🇪 |
| pl | Polski | 🇵🇱 |
| ar | العربية | 🇦🇪 |

### 8.2 Implementação Futura de i18n

Para tradução completa, recomendo:

1. Instalar `react-i18next`:
   ```bash
   pnpm add react-i18next i18next
   ```

2. Criar arquivos de tradução em `client/src/locales/`

3. Estrutura de URLs:
   - `/` → Inglês (padrão)
   - `/es/` → Espanhol
   - `/pt-br/` → Português

---

## 9. Checklist de Lançamento

### Antes do Deploy

- [ ] Verificar todas as imagens carregam corretamente
- [ ] Testar formulário de contato
- [ ] Testar chat widget em diferentes navegadores
- [ ] Verificar responsividade mobile
- [ ] Validar meta tags com Facebook Debugger
- [ ] Testar velocidade com Google PageSpeed

### Após o Deploy

- [ ] Verificar SSL está ativo
- [ ] Testar todas as páginas no domínio final
- [ ] Submeter sitemap ao Google Search Console
- [ ] Configurar Google Analytics
- [ ] Testar formulários em produção
- [ ] Verificar emails estão sendo recebidos

---

## 10. Suporte e Manutenção

### Atualizações Recomendadas

- **Semanalmente**: Novos artigos no blog
- **Mensalmente**: Revisar métricas e otimizar
- **Trimestralmente**: Atualizar dependências

### Monitoramento

Configure alertas para:
- Uptime do site
- Erros de JavaScript
- Performance (Core Web Vitals)

---

## 11. Contatos de Suporte

- **Hostinger Support**: https://support.hostinger.com
- **Documentação React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Documento criado em:** 24 de Dezembro de 2024
**Versão:** 1.0
**Autor:** Manus AI - Expert BlackPyramid
