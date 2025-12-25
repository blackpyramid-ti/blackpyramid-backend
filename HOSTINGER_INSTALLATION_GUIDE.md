# BlackPyramid - Guia Completo de Instalação na Hostinger Cloud Professional

## 📦 Conteúdo do Pacote

Este arquivo ZIP contém o projeto completo BlackPyramid com:
- ✅ Todo o código-fonte (frontend e backend)
- ✅ Todas as imagens e assets
- ✅ Configurações de banco de dados
- ✅ Sistema de email integrado
- ✅ Internacionalização (10 idiomas)
- ✅ Chat Widget SDR
- ✅ Testes automatizados
- ✅ Documentação completa

---

## 🚀 Passo 1: Preparar o Ambiente Local

### 1.1 Descompactar o Projeto
```bash
unzip blackpyramid-complete.zip
cd blackpyramid
```

### 1.2 Instalar Dependências
Você precisa ter instalado:
- **Node.js** versão 18 ou superior
- **pnpm** (gerenciador de pacotes)

```bash
# Instalar pnpm (se não tiver)
npm install -g pnpm

# Instalar dependências do projeto
pnpm install
```

---

## 🗄️ Passo 2: Configurar Banco de Dados na Hostinger

### 2.1 Criar Banco de Dados PostgreSQL
1. Acesse o painel da Hostinger
2. Vá em **Databases** → **PostgreSQL**
3. Clique em **Create Database**
4. Anote as credenciais:
   - Database Name
   - Username
   - Password
   - Host
   - Port (geralmente 5432)

### 2.2 Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@host:5432/database_name

# JWT Secret (gere uma string aleatória segura)
JWT_SECRET=sua_chave_secreta_muito_segura_aqui_com_pelo_menos_32_caracteres

# OAuth Configuration (fornecido automaticamente pelo Manus)
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=seu_owner_id
OWNER_NAME=Fábio Oliveira

# Email Configuration (SMTP Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@blackpyramid.co
SMTP_PASS=sua_senha_de_email_aqui

# Frontend Configuration
VITE_APP_TITLE=BlackPyramid
VITE_APP_LOGO=/images/pyramid-icon.png
VITE_ANALYTICS_ENDPOINT=https://analytics.yourdomain.com
VITE_ANALYTICS_WEBSITE_ID=your_analytics_id

# Production URL
VITE_API_URL=https://blackpyramid.co
```

### 2.3 Executar Migrações do Banco de Dados
```bash
pnpm db:push
```

Este comando criará todas as tabelas necessárias no banco de dados.

---

## 📧 Passo 3: Configurar Email SMTP (Hostinger)

### 3.1 Obter Credenciais SMTP
1. No painel Hostinger, vá em **Email** → **Email Accounts**
2. Crie ou use a conta: **contact@blackpyramid.co**
3. Anote a senha

### 3.2 Configurações SMTP Hostinger
```
Host: smtp.hostinger.com
Port: 465 (SSL) ou 587 (TLS)
Username: contact@blackpyramid.co
Password: [sua senha]
Encryption: SSL/TLS
```

Estas credenciais já devem estar no arquivo `.env` criado anteriormente.

---

## 🏗️ Passo 4: Build do Projeto para Produção

### 4.1 Compilar o Projeto
```bash
pnpm build
```

Este comando irá:
- Compilar o frontend React/Vite
- Compilar o backend Node.js
- Gerar os arquivos otimizados na pasta `dist/`

### 4.2 Verificar Build
```bash
ls -la dist/
```

Você deve ver:
- `dist/public/` - Arquivos estáticos do frontend
- `dist/index.js` - Servidor backend compilado

---

## 🌐 Passo 5: Deploy na Hostinger Cloud Professional

### 5.1 Acessar via SSH
```bash
ssh usuario@seu-servidor-hostinger.com
```

### 5.2 Preparar Diretório no Servidor
```bash
# Criar diretório para o projeto
mkdir -p ~/blackpyramid
cd ~/blackpyramid
```

### 5.3 Transferir Arquivos
**Opção A: Via SCP (do seu computador local)**
```bash
scp -r dist/ usuario@servidor:~/blackpyramid/
scp package.json usuario@servidor:~/blackpyramid/
scp .env usuario@servidor:~/blackpyramid/
```

**Opção B: Via FTP/SFTP**
Use FileZilla ou outro cliente FTP para transferir:
- Pasta `dist/` completa
- Arquivo `package.json`
- Arquivo `.env`
- Pasta `drizzle/` (migrações do banco)

### 5.4 Instalar Node.js no Servidor (se necessário)
```bash
# Verificar se Node.js está instalado
node --version

# Se não estiver, instalar via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### 5.5 Instalar Dependências de Produção
```bash
cd ~/blackpyramid
npm install --production
```

---

## 🚦 Passo 6: Configurar Process Manager (PM2)

### 6.1 Instalar PM2
```bash
npm install -g pm2
```

### 6.2 Criar Arquivo de Configuração PM2
Crie `ecosystem.config.js` na raiz do projeto:

```javascript
module.exports = {
  apps: [{
    name: 'blackpyramid',
    script: './dist/index.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

### 6.3 Iniciar Aplicação
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6.4 Verificar Status
```bash
pm2 status
pm2 logs blackpyramid
```

---

## 🔧 Passo 7: Configurar Nginx como Reverse Proxy

### 7.1 Instalar Nginx (se necessário)
```bash
sudo apt update
sudo apt install nginx
```

### 7.2 Criar Configuração do Site
```bash
sudo nano /etc/nginx/sites-available/blackpyramid
```

Cole a seguinte configuração:

```nginx
server {
    listen 80;
    server_name blackpyramid.co www.blackpyramid.co;

    # Redirecionar para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name blackpyramid.co www.blackpyramid.co;

    # Certificados SSL (será configurado com Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/blackpyramid.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blackpyramid.co/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Logs
    access_log /var/log/nginx/blackpyramid-access.log;
    error_log /var/log/nginx/blackpyramid-error.log;

    # Proxy para aplicação Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache para assets estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 7.3 Ativar Site
```bash
sudo ln -s /etc/nginx/sites-available/blackpyramid /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 Passo 8: Configurar SSL com Let's Encrypt

### 8.1 Instalar Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 8.2 Obter Certificado SSL
```bash
sudo certbot --nginx -d blackpyramid.co -d www.blackpyramid.co
```

Siga as instruções na tela e forneça seu email.

### 8.3 Renovação Automática
```bash
sudo certbot renew --dry-run
```

O Certbot configurará automaticamente a renovação.

---

## 🌍 Passo 9: Configurar DNS

### 9.1 Apontar Domínio para o Servidor
No painel de DNS da Hostinger ou do seu registrador de domínio:

**Registro A:**
```
Type: A
Name: @
Value: [IP do seu servidor Hostinger]
TTL: 3600
```

**Registro A (www):**
```
Type: A
Name: www
Value: [IP do seu servidor Hostinger]
TTL: 3600
```

### 9.2 Aguardar Propagação
A propagação DNS pode levar de 1 a 48 horas.

Verificar propagação:
```bash
dig blackpyramid.co
nslookup blackpyramid.co
```

---

## ✅ Passo 10: Verificação Final

### 10.1 Testar Aplicação
1. Acesse: https://blackpyramid.co
2. Teste a troca de idiomas
3. Teste o chat widget SDR
4. Envie uma mensagem pelo formulário de contato
5. Verifique se o email chegou em contact@blackpyramid.co

### 10.2 Verificar Logs
```bash
# Logs da aplicação
pm2 logs blackpyramid

# Logs do Nginx
sudo tail -f /var/log/nginx/blackpyramid-access.log
sudo tail -f /var/log/nginx/blackpyramid-error.log
```

### 10.3 Monitorar Performance
```bash
pm2 monit
```

---

## 🔄 Comandos Úteis de Manutenção

### Reiniciar Aplicação
```bash
pm2 restart blackpyramid
```

### Atualizar Código
```bash
cd ~/blackpyramid
# Fazer backup
cp -r dist dist.backup
# Substituir arquivos novos
# ...
pm2 restart blackpyramid
```

### Ver Logs em Tempo Real
```bash
pm2 logs blackpyramid --lines 100
```

### Verificar Uso de Recursos
```bash
pm2 monit
htop
```

---

## 🐛 Troubleshooting

### Problema: Aplicação não inicia
```bash
# Verificar logs
pm2 logs blackpyramid --err

# Verificar variáveis de ambiente
cat .env

# Testar conexão com banco de dados
psql -h host -U username -d database_name
```

### Problema: Emails não estão sendo enviados
```bash
# Verificar configurações SMTP no .env
cat .env | grep SMTP

# Testar conexão SMTP
telnet smtp.hostinger.com 465
```

### Problema: Site não carrega (502 Bad Gateway)
```bash
# Verificar se aplicação está rodando
pm2 status

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

### Problema: SSL não funciona
```bash
# Verificar certificados
sudo certbot certificates

# Renovar certificados
sudo certbot renew --force-renewal
```

---

## 📞 Suporte

Para questões técnicas específicas da Hostinger:
- Suporte Hostinger: https://www.hostinger.com/support
- Documentação: https://support.hostinger.com

Para questões do projeto BlackPyramid:
- Email: contact@blackpyramid.co

---

## 📝 Checklist de Deploy

- [ ] Banco de dados PostgreSQL criado na Hostinger
- [ ] Arquivo `.env` configurado com todas as variáveis
- [ ] Migrações do banco executadas (`pnpm db:push`)
- [ ] Projeto compilado (`pnpm build`)
- [ ] Arquivos transferidos para o servidor
- [ ] PM2 instalado e aplicação iniciada
- [ ] Nginx configurado como reverse proxy
- [ ] SSL configurado com Let's Encrypt
- [ ] DNS apontado para o servidor
- [ ] Site acessível via HTTPS
- [ ] Chat widget SDR funcionando
- [ ] Formulário de contato enviando emails
- [ ] Troca de idiomas funcionando
- [ ] Todas as páginas carregando corretamente

---

## 🎉 Conclusão

Após seguir todos estes passos, seu site BlackPyramid estará completamente funcional na Hostinger Cloud Professional, com:

✅ HTTPS seguro
✅ 10 idiomas funcionais
✅ Chat SDR inteligente
✅ Envio de emails automático
✅ Performance otimizada
✅ Monitoramento ativo

**Boa sorte com o lançamento da BlackPyramid!** 🚀
