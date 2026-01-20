# 🌐 GUIA COMPLETO: Sistema HSE Online Compartilhado

## 🎯 O QUE VOCÊ PRECISA

Para várias pessoas usarem o sistema **AO MESMO TEMPO** vendo os **MESMOS DADOS**, você precisa de um **servidor online**.

**Base64 NÃO resolve isso!** Base64 é apenas codificação de dados, não compartilhamento online.

---

## ✅ SOLUÇÃO COMPLETA (GRATUITA)

### Railway.app - Hospedagem Gratuita de Servidores

**Por que Railway?**
- ✅ 100% Gratuito (500h/mês)
- ✅ Deploy automático do GitHub
- ✅ SSL/HTTPS incluído
- ✅ Banco de dados SQLite
- ✅ Link permanente
- ✅ Setup em 5 minutos!

---

## 🚀 TUTORIAL PASSO A PASSO

### ETAPA 1: Criar Conta no Railway (1 minuto)

1. Acesse: **https://railway.app**
2. Clique em **"Login with GitHub"**
3. Autorize o Railway a acessar seu GitHub
4. Pronto! Conta criada.

---

### ETAPA 2: Fazer Deploy do Sistema (3 minutos)

1. No Railway, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Procure e selecione: **indicadorhse6**
4. Clique em **"Deploy"**
5. Aguarde 2-3 minutos (Railway instala tudo automaticamente)

✅ O Railway vai:
- Detectar que é Node.js
- Executar `npm install`
- Iniciar `node server.js`
- Criar banco SQLite
- Deixar tudo funcionando!

---

### ETAPA 3: Gerar Link Público (30 segundos)

1. No painel do projeto Railway
2. Clique na aba **"Settings"**
3. Role até **"Domains"**
4. Clique em **"Generate Domain"**
5. Copie o link gerado (algo como: `https://indicadorhse6-production.up.railway.app`)

---

### ETAPA 4: Atualizar Configuração (2 minutos)

Agora precisa atualizar o código para usar o servidor Railway:

1. Abra o arquivo **`config.js`** no VS Code
2. Procure por:
```javascript
const API_BASE_URL = (function() {
```

3. Substitua TUDO por:
```javascript
const API_BASE_URL = 'https://indicadorhse6-production.up.railway.app';
```
(use o link que você copiou no passo anterior)

4. Salve o arquivo

---

### ETAPA 5: Enviar Atualização para GitHub (1 minuto)

No terminal do VS Code:

```bash
git add config.js
git commit -m "Conecta sistema ao servidor Railway"
git push origin master
```

Aguarde 1-2 minutos para o GitHub Pages atualizar.

---

### ETAPA 6: COMPARTILHAR! 🎉

Pronto! Agora você pode compartilhar este link com TODOS:

```
https://gidepinheiro20-lab.github.io/indicadorhse6/
```

**TODOS os usuários verão os MESMOS dados em tempo real!**

---

## 🔄 COMO FUNCIONA TECNICAMENTE

```
┌─────────────┐
│  PESSOA 1   │──┐
└─────────────┘  │
                 │
┌─────────────┐  │      ┌──────────────┐      ┌─────────────┐
│  PESSOA 2   │──┼─────>│ GitHub Pages │─────>│   Railway   │
└─────────────┘  │      │  (Interface) │      │ (Banco SQL) │
                 │      └──────────────┘      └─────────────┘
┌─────────────┐  │
│  PESSOA 3   │──┘
└─────────────┘
```

1. Pessoas acessam **GitHub Pages** (interface visual)
2. Interface envia dados para **Railway** (servidor)
3. Railway salva no **banco de dados SQLite**
4. Todos veem as **mesmas informações**!

---

## 💰 CUSTOS

### Railway (Plano Hobby)
- **Custo:** R$ 0,00 (GRATUITO)
- **Limite:** 500 horas/mês
- **Uso 24/7:** ~720h/mês

**Conclusão:** Suficiente para uso contínuo no plano gratuito!

**Dica:** Se precisar de mais, plano pago é apenas $5/mês (USD).

---

## 🔒 SEGURANÇA E PRIVACIDADE

### ⚠️ ATENÇÃO IMPORTANTE

Por padrão, **qualquer pessoa com o link pode acessar e editar dados!**

### Como Adicionar Proteção por Senha:

Adicione este código no início do `index.html` (dentro da tag `<script>`):

```javascript
// Proteção por senha
window.addEventListener('load', function() {
    const SENHA_CORRETA = 'SuaSenhaAqui2026';
    const senha = prompt('🔒 Digite a senha de acesso ao sistema:');
    
    if (senha !== SENHA_CORRETA) {
        alert('❌ Senha incorreta! Acesso negado.');
        window.location.href = 'about:blank';
    }
});
```

Altere `'SuaSenhaAqui2026'` para a senha que desejar.

---

## 📊 COMPARAÇÃO DE HOSPEDAGENS

| Serviço | Facilidade | Gratuito | Velocidade | SSL | Banco de Dados |
|---------|------------|----------|------------|-----|----------------|
| **Railway** | ⭐⭐⭐⭐⭐ | ✅ Sim | 🚀 Rápido | ✅ Sim | ✅ Incluído |
| Render | ⭐⭐⭐⭐ | ✅ Sim | 🐌 Lento | ✅ Sim | ✅ Incluído |
| Glitch | ⭐⭐⭐⭐⭐ | ✅ Sim | 🐌 Lento | ✅ Sim | ✅ Incluído |
| Heroku | ⭐⭐⭐ | ❌ Não* | 🚀 Rápido | ✅ Sim | ❌ Pago |

*Heroku removeu plano gratuito em 2022

**RECOMENDAÇÃO:** Use Railway!

---

## 🆘 PROBLEMAS COMUNS

### ❌ Erro: "Cannot find module 'express'"

**Causa:** Dependências não instaladas  
**Solução:** Railway deve instalar automaticamente. Se não:
```bash
npm install
git add package-lock.json
git commit -m "Adiciona package-lock"
git push
```

### ❌ Dados não salvam

**Causa:** config.js com URL errado  
**Solução:** Verifique se o URL no config.js é EXATAMENTE o do Railway

### ❌ "This site can't be reached"

**Causa:** Domínio não gerado ou deploy falhou  
**Solução:** 
1. Verifique no Railway: Settings → Domains
2. Se não tiver domínio, clique em "Generate Domain"

---

## 🎓 VÍDEO TUTORIAL (EM BREVE)

Enquanto isso, siga este checklist:

```
☐ 1. Criar conta Railway (railway.app)
☐ 2. Login with GitHub
☐ 3. New Project → Deploy from GitHub
☐ 4. Selecionar: indicadorhse6
☐ 5. Aguardar deploy (2-3 min)
☐ 6. Settings → Generate Domain
☐ 7. Copiar URL do domínio
☐ 8. Atualizar config.js com URL
☐ 9. Git commit + push
☐ 10. Compartilhar link GitHub Pages!
```

---

## 🌟 RESULTADO FINAL

### ANTES (Standalone)
```
❌ Cada pessoa: dados separados
❌ Sem sincronização
❌ Backup manual
❌ Uso local apenas
```

### DEPOIS (Com Railway)
```
✅ Todos: mesmos dados
✅ Sincronização automática
✅ Backup no servidor
✅ Acesso de qualquer lugar
✅ Link único para todos
✅ Tempo real
```

---

## 💡 ALTERNATIVAS

### Se Railway não funcionar, use:

**Render.com:**
```
1. https://render.com
2. Sign Up com GitHub
3. New → Web Service
4. Conectar repositório
5. Configurar:
   - Build: npm install
   - Start: node server.js
6. Copiar URL
```

**Glitch.com:**
```
1. https://glitch.com
2. New Project → Import from GitHub
3. Cole URL do repo
4. Copiar URL do projeto
```

---

## 📞 PRECISA DE AJUDA?

### Estou travado na Etapa:
- [ ] 1 - Criar conta Railway
- [ ] 2 - Fazer deploy
- [ ] 3 - Gerar domínio
- [ ] 4 - Atualizar config.js
- [ ] 5 - Git push
- [ ] 6 - Testar sistema

**Me diga onde está com dificuldade e eu ajudo!**

---

## ✅ CHECKLIST FINAL

Antes de compartilhar com usuários:

```
☐ Railway funcionando (acesse URL Railway diretamente)
☐ config.js atualizado com URL correto
☐ Git push realizado com sucesso
☐ GitHub Pages atualizado (aguarde 2-3 min)
☐ Teste completo:
  - Cadastre empresa
  - Cadastre colaborador
  - Crie RAS
  - Verifique se dados salvam
☐ Adicione senha de proteção (opcional)
☐ Compartilhe link:
  https://gidepinheiro20-lab.github.io/indicadorhse6/
```

---

## 🎉 PRONTO PARA COMEÇAR?

**Tempo estimado:** 10 minutos  
**Custo:** R$ 0,00  
**Resultado:** Sistema online compartilhado funcionando!

**Quer que eu te guie passo a passo? Me avise!** 🚀

---

*Guia atualizado: Janeiro 2026*  
*Sistema HSE v2.0*
