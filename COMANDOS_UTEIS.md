# 📋 COMANDOS ÚTEIS - SISTEMA HSE

## 🌐 INFORMAÇÕES DO SISTEMA

**URL Online:** https://indicadorhse6.onrender.com
**Repositório:** https://github.com/gidepinheiro20-lab/indicadorhse6
**Banco de Dados:** PostgreSQL no Render

---

## 🚀 ATUALIZAR SISTEMA ONLINE (MAIS USADO)

```bash
# 1. Fazer alterações no VS Code e salvar

# 2. Enviar para GitHub e Render (atualização automática):
git add -A
git commit -m "Descrição da alteração"
git push origin master

# 3. Aguardar 2-3 minutos
# 4. Dar F5 no navegador
# ✅ PRONTO! Sistema atualizado automaticamente
```

---

## 💻 RODAR SERVIDOR LOCAL (Para testar antes de enviar)

### Opção 1 - Rodar uma vez:
```bash
./node/node.exe server.js
# Acesse: http://localhost:3000
# Para parar: Ctrl+C
```

### Opção 2 - Com reinício automático (nodemon):
```bash
# Instalar nodemon (só precisa fazer 1 vez):
./node/npm.cmd install -g nodemon

# Rodar com nodemon (reinicia automático ao salvar):
./node/npx.cmd nodemon server.js
# Para parar: Ctrl+C
```

---

## 📦 COMANDOS GIT (Controle de versão)

### Ver status dos arquivos:
```bash
git status
```

### Ver histórico de commits:
```bash
git log --oneline
```

### Desfazer alterações não commitadas:
```bash
git restore nome-do-arquivo.js
# Ou desfazer tudo:
git restore .
```

### Ver diferenças do que foi alterado:
```bash
git diff
```

### Criar nova branch (para testar sem mexer no principal):
```bash
git checkout -b teste-nova-funcionalidade
```

### Voltar para branch principal:
```bash
git checkout master
```

---

## 🗄️ COMANDOS DO BANCO DE DADOS

### Acessar banco PostgreSQL no Render:
1. Entre no Render: https://dashboard.render.com
2. Clique em "indicadorhse6-db"
3. Clique em "Connect" → "External Connection"
4. Use as credenciais fornecidas

### Backup manual dos dados:
```bash
# No Render, vá em "indicadorhse6-db" → "Backups"
# Clique em "Create Backup"
```

---

## 🔧 COMANDOS NPM (Gerenciar dependências)

### Instalar dependências:
```bash
./node/npm.cmd install
```

### Adicionar nova dependência:
```bash
./node/npm.cmd install nome-do-pacote
```

### Atualizar dependências:
```bash
./node/npm.cmd update
```

### Ver dependências instaladas:
```bash
./node/npm.cmd list
```

---

## 🌐 RENDER - COMANDOS VIA PAINEL WEB

### Fazer redeploy manual:
1. Acesse: https://dashboard.render.com
2. Clique no serviço "indicadorhse6"
3. Clique em "Manual Deploy" → "Deploy latest commit"

### Ver logs em tempo real:
1. No serviço, clique em "Logs"
2. Logs atualizam automaticamente

### Reiniciar serviço:
1. Clique em "Manual Deploy"
2. "Clear build cache & deploy"

### Adicionar variável de ambiente:
1. Clique em "Environment"
2. "Add Environment Variable"
3. Preencher Key e Value
4. "Save Changes"

---

## 🆘 RESOLVER PROBLEMAS COMUNS

### Deploy falhou no Render:
```bash
# 1. Ver logs no Render para identificar erro
# 2. Corrigir código localmente
# 3. Fazer push novamente:
git add -A
git commit -m "Corrigir erro"
git push origin master
```

### Servidor local não inicia:
```bash
# Verificar se porta 3000 está ocupada:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Matar processo se necessário:
Stop-Process -Id NUMERO_DO_PROCESSO
```

### Erro de permissão no Git:
```bash
# Reautenticar no GitHub:
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### Código não atualiza no navegador:
```bash
# Limpar cache do navegador:
# Ctrl + Shift + Delete (Chrome/Edge)
# Ou forçar reload: Ctrl + F5
```

---

## 📝 BOAS PRÁTICAS

### Antes de fazer alterações importantes:
```bash
# Criar backup via commit:
git add -A
git commit -m "Backup antes de alteração importante"
git push origin master
```

### Testar localmente antes de enviar:
```bash
# 1. Rodar local:
./node/node.exe server.js

# 2. Testar em http://localhost:3000

# 3. Se estiver OK, fazer push:
git add -A
git commit -m "Nova funcionalidade"
git push origin master
```

### Mensagens de commit claras:
```bash
git commit -m "Adicionar botão de exportação CSV"
git commit -m "Corrigir erro ao salvar funcionário"
git commit -m "Melhorar layout da tela de RAs"
```

---

## 🎯 COMANDOS RÁPIDOS (COPIAR E COLAR)

### Atualizar sistema (comando único):
```bash
git add -A; git commit -m "Atualização"; git push origin master
```

### Ver URL do sistema:
```bash
# Online: https://indicadorhse6.onrender.com
# Local: http://localhost:3000
```

### Abrir Render no navegador:
```bash
Start-Process "https://dashboard.render.com"
```

### Abrir GitHub no navegador:
```bash
Start-Process "https://github.com/gidepinheiro20-lab/indicadorhse6"
```

---

## 📞 LINKS IMPORTANTES

- **Sistema Online:** https://indicadorhse6.onrender.com
- **Render Dashboard:** https://dashboard.render.com
- **GitHub Repo:** https://github.com/gidepinheiro20-lab/indicadorhse6
- **Documentação Render:** https://render.com/docs
- **Documentação PostgreSQL:** https://www.postgresql.org/docs/

---

## 💡 DICAS FINAIS

1. **Sempre teste localmente** antes de fazer push para produção
2. **Faça commits frequentes** com mensagens descritivas
3. **Não apague** o arquivo `.git` ou `node_modules`
4. **Backup** dos dados importantes pelo Render
5. **Monitore** os logs no Render após cada deploy

---

**Última atualização:** 20/01/2026
**Versão do Node:** 22.8
**Versão do Sistema:** 1.0.0
