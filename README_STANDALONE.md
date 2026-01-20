# 🛡️ Sistema de Gestão HSE - Versão Standalone

## 🚀 INICIALIZAÇÃO RÁPIDA

### Opção 1: Duplo Clique (Mais Fácil!)
1. **Dê duplo clique** no arquivo `INICIAR_SISTEMA.bat`
2. O sistema abrirá automaticamente no seu navegador
3. **Pronto!** Comece a usar imediatamente!

### Opção 2: Abertura Manual
1. Dê duplo clique no arquivo `SISTEMA_STANDALONE.html`
2. O sistema abrirá no navegador padrão
3. Clique no botão "ABRIR SISTEMA COMPLETO"

---

## 📋 O QUE É ESTE SISTEMA?

Um **sistema completo de gestão de HSE** (Health, Safety & Environment) que funciona **100% no seu navegador**, sem necessidade de instalação, servidores ou internet!

### ✨ Características Principais

- ✅ **Zero Instalação** - Apenas abra e use
- ✅ **100% Offline** - Funciona sem internet
- ✅ **Dados Locais** - Tudo salvo no seu navegador
- ✅ **Multiplataforma** - Windows, Mac, Linux, Android, iOS
- ✅ **Gratuito** - Sem custos ou limitações
- ✅ **Portátil** - Copie e use em qualquer lugar

---

## 🔧 FUNCIONALIDADES INCLUÍDAS

### 1. 📊 RAS - Reunião de Análise de Segurança
- Registro completo de reuniões
- Controle de presença automático
- Upload de fotos e evidências
- Geração de relatórios em PDF
- Histórico completo

### 2. 👥 CPT - Conversa Pré-Tarefa
- Registro de conversas pré-trabalho
- Gestão de participantes
- Controle de status (Aberto/Fechado)
- Anexo de documentos PDF

### 3. 🔍 Inspeção de HSE
- Sistema completo de inspeções
- Fotos Antes/Depois
- Categorização de desvios
- Controle de prazos e responsáveis
- Geração de relatórios

### 4. 📋 ART - Análise de Risco da Tarefa
- Identificação de riscos
- Medidas de controle
- Análise de severidade
- Aprovações e revisões

### 5. 🏢 Gestão de Empresas
- Cadastro completo (CNPJ, CNAE)
- Grau de risco
- Informações corporativas
- Múltiplas empresas

### 6. 👤 Gestão de Colaboradores
- Cadastro individual ou em lote
- Importação via Excel
- Controle de frequência
- Fotos e documentos

---

## 💾 COMO FUNCIONA O ARMAZENAMENTO?

### Armazenamento Local (localStorage)
- **Todos os dados** são salvos no navegador
- **100% privado** - nada sai do seu dispositivo
- **Persistente** - dados mantidos entre sessões
- **Seguro** - sem envio para servidores externos

### ⚠️ IMPORTANTE: Backups
**FAÇA BACKUPS REGULARMENTE!**

Os dados ficam no navegador e podem ser perdidos se você:
- Limpar o histórico/cache do navegador
- Desinstalar o navegador
- Formatar o computador

**Como fazer backup:**
1. Use a funcionalidade de exportar dados do sistema
2. Salve em um local seguro (pendrive, nuvem, etc.)
3. Faça backups semanais ou antes de mudanças importantes

---

## 📁 ESTRUTURA DE ARQUIVOS

```
📂 indicadoreshse6/
├── 📄 SISTEMA_STANDALONE.html    ← Página inicial standalone
├── 📄 index.html                 ← Sistema completo
├── 📄 INICIAR_SISTEMA.bat        ← Script de inicialização
├── 📄 README_STANDALONE.md       ← Este arquivo
├── 📄 config.js                  ← Configurações da API
├── 📄 server.js                  ← Servidor (opcional)
└── 📄 package.json               ← Dependências (opcional)
```

---

## 🎯 PRIMEIROS PASSOS

### 1️⃣ Primeira Execução
```
1. Execute INICIAR_SISTEMA.bat
2. O sistema abrirá no navegador
3. Clique em "ABRIR SISTEMA COMPLETO"
4. Explore o menu lateral
```

### 2️⃣ Configuração Inicial
```
1. Cadastre sua(s) empresa(s)
   Menu: Empresa → Nova Empresa
   
2. Cadastre colaboradores
   Menu: Novo Colaborador
   Ou: Importe planilha Excel
   
3. Configure áreas/locais
   Menu: Inspeção → Cadastrar Área/Local
   
4. Configure categorias
   Menu: Inspeção → Cadastrar Categoria
```

### 3️⃣ Uso Diário
```
1. RAS: Nova Reunião → Preencher dados → Confirmar presença
2. CPT: Nova CPT → Dados da tarefa → Salvar
3. Inspeção: Nova Inspeção → Fotos → Ações → Salvar
4. ART: Nova ART → Riscos → Medidas → Salvar
```

---

## 🔄 IMPORTAÇÃO DE DADOS

### Planilha de Colaboradores (Excel)

**Formato da planilha:**
| Matrícula | Nome | Função | Setor | Data Admissão | Empresa |
|-----------|------|--------|-------|---------------|---------|
| 001 | João Silva | Pedreiro | Obras | 01/01/2024 | Empresa ABC |

**Passos:**
1. Menu: Novo Colaborador
2. Clique: "Importar Planilha"
3. Selecione arquivo .xlsx ou .xls
4. Confirme importação

---

## 🖼️ UPLOAD DE IMAGENS

### Formatos Aceitos
- **Fotos:** JPG, JPEG, PNG
- **Documentos:** PDF

### Limites
- **Tamanho máximo:** 5MB por arquivo
- **Quantidade:** Ilimitada (limitado pelo espaço do navegador)

### Dicas
- Comprima imagens grandes antes do upload
- Use fotos de boa qualidade mas não excessivamente pesadas
- Organize fotos por data/evento

---

## 🌐 COMPATIBILIDADE

### Navegadores Suportados
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari (Mac/iOS)
- ✅ Opera

### Sistemas Operacionais
- ✅ Windows 7, 8, 10, 11
- ✅ macOS (todas as versões modernas)
- ✅ Linux (qualquer distribuição)
- ✅ Android (Chrome, Firefox)
- ✅ iOS/iPadOS (Safari, Chrome)

---

## 🆘 PROBLEMAS COMUNS

### ❌ Sistema não abre
**Solução:**
- Verifique se o arquivo não está corrompido
- Tente outro navegador
- Desabilite bloqueadores de pop-up

### ❌ Dados não salvam
**Solução:**
- Verifique se o navegador permite armazenamento local
- Não use modo anônimo/privado
- Limpe cache e tente novamente

### ❌ Imagens não carregam
**Solução:**
- Verifique o tamanho do arquivo (max 5MB)
- Use formatos suportados (JPG, PNG, PDF)
- Limpe o cache do navegador

### ❌ Planilha não importa
**Solução:**
- Verifique se as colunas estão na ordem correta
- Use formato .xlsx ou .xls
- Certifique-se de que não há células mescladas

---

## 💡 DICAS E TRUQUES

### 📊 Organização
- Cadastre todas as empresas primeiro
- Importe colaboradores via Excel (mais rápido)
- Configure áreas e categorias antes das inspeções

### 🖼️ Fotos
- Tire fotos em boa iluminação
- Enquadre bem o desvio/situação
- Comprima fotos grandes (use tools online)

### 📅 Rotina Diária
1. Manhã: Abra RAS do dia
2. Durante: Registre inspeções/desvios
3. Tarde: Feche RAS e CPTs
4. Fim do dia: Verifique pendências

### 💾 Backups
- **Diário:** Exporte dados críticos
- **Semanal:** Backup completo
- **Mensal:** Backup externo (nuvem/pendrive)

---

## 🔒 SEGURANÇA E PRIVACIDADE

### ✅ Seus dados estão seguros porque:
- Armazenados localmente no SEU dispositivo
- Não enviados para servidores externos
- Você tem controle total
- Sem rastreamento ou analytics

### ⚠️ Responsabilidade do usuário:
- Faça backups regulares
- Não compartilhe dados sensíveis sem criptografia
- Proteja seu dispositivo com senha
- Use antivírus atualizado

---

## 📞 SUPORTE E AJUDA

### Problemas Técnicos
- Consulte a seção "Problemas Comuns"
- Tente em outro navegador
- Limpe cache e cookies

### Dúvidas de Uso
- Explore o menu lateral
- Use tooltips (passe o mouse sobre botões)
- Consulte este README

---

## 📜 LICENÇA E TERMOS

### Uso Livre
- **Gratuito** para uso pessoal e comercial
- **Sem limitações** de funcionalidades
- **Sem coleta de dados**

### Responsabilidade
- Sistema fornecido "como está"
- Usuário responsável por backups
- Não há garantias implícitas

---

## 🎓 TREINAMENTO

### Vídeos Tutorial (em breve)
- Configuração inicial
- Cadastro de empresas e colaboradores
- Registro de RAS
- Inspeções e relatórios

### Manual do Usuário
- Disponível em PDF (em breve)
- Guia passo a passo
- Exemplos práticos

---

## 🔄 ATUALIZAÇÕES

### Versão Atual: 2.0
**Data:** Janeiro 2026

### Novidades:
- ✨ Versão standalone completa
- ✨ Script de inicialização automática
- ✨ Melhorias de performance
- ✨ Interface modernizada
- ✨ Suporte completo offline

---

## 🌟 ROADMAP FUTURO

### Em Desenvolvimento:
- 📱 App mobile nativo
- ☁️ Sincronização em nuvem (opcional)
- 📊 Dashboard analytics
- 🔔 Sistema de notificações
- 📧 Relatórios por email

---

## ❤️ AGRADECIMENTOS

Obrigado por usar o **Sistema de Gestão HSE**!

Este sistema foi desenvolvido com dedicação para facilitar a gestão de saúde, segurança e meio ambiente em sua empresa.

**Bom trabalho e fique seguro!** 🛡️

---

## 📧 CONTATO

Para sugestões, bugs ou feedback:
- GitHub: https://github.com/gidepinheiro20-lab/indicadorhse6
- Email: (adicione seu email aqui)

---

**Última atualização:** Janeiro 2026
**Versão:** 2.0 Standalone
