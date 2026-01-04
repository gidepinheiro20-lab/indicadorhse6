# 🔗 Usando o Sistema via GitHub com Servidor Local

## O Que Você Quer Fazer:
- Clientes acessam via **GitHub Pages** (link público): https://gidepinheiro20-lab.github.io/indicadorhse6/
- Dados são salvos no **seu servidor local** (192.168.3.61:3000)

## Como Funciona:

### 1. **Servidor Local Rodando** ✅
```
http://192.168.3.61:3000
```
- Node.js + SQLite (já configurado)
- Dados persistem no banco de dados local
- Requerimento CORS habilitado para aceitar requisições do GitHub

### 2. **Compartilhar Duas URLs**

#### Para clientes **na mesma rede WiFi**:
```
URL Direta: http://192.168.3.61:3000/index.html
```
- Funciona imediatamente
- Dados salvos direto no servidor local

#### Para clientes **remotos** (fora da rede):
```
GitHub Link: https://gidepinheiro20-lab.github.io/indicadorhse6/
+ Servidor remoto para armazenar dados
```

## ⚠️ Limitação Atual

Atualmente, o `index.html` do GitHub não sabe para onde enviar os dados quando cliente está acessando via GitHub Pages.

## ✅ Solução Recomendada

### Opção 1: Usar DNS Dinâmico (Melhor)
Exponha seu servidor local na internet usando:
- **Ngrok** (grátis, temporário)
- **Tunneling** do seu roteador
- **Freenom** + DDNS dinâmico

### Opção 2: Usar GitHub Pages APENAS para interface
Serve o `index.html` do GitHub, mas com as requisições apontando para um servidor online permanente

### Opção 3: Distribuir arquivo HTML modificado
Crie versão do `index.html` com IP fixo do seu servidor:

```javascript
// No topo do index.html, mude:
const API_BASE_URL = 'http://192.168.3.61:3000';
// Para:
const API_BASE_URL = 'http://seu-dominio-remoto.com:3000';
```

## 📋 Resumo das URLs

| Tipo | URL | Onde Funciona |
|------|-----|---------------|
| **Servidor Local (UI)** | http://192.168.3.61:3000 | Mesma rede WiFi |
| **GitHub Pages** | https://gidepinheiro20-lab.github.io/indicadorhse6/ | Qualquer lugar (sem dados) |
| **Ideal Remoto** | https://seu-dominio.com:3000 | Qualquer lugar (com dados) |

## 🚀 Próximas Etapas

1. **Teste com a rede local primeiro:**
   - Compartilhe: `http://192.168.3.61:3000`
   - Clientes fazem cadastros
   - Verificam se dados estão persistindo

2. **Se precisar acesso remoto:**
   - Configure Ngrok ou similar
   - Ou use servidor em nuvem (AWS, DigitalOcean, etc)
   - Atualize a URL no `index.html`

---

**Servidor rodando em:** `http://192.168.3.61:3000` ✅
