ho# Versão para Google Sites

Esta pasta contém uma cópia estática do projeto preparada para uso sem backend.

## Arquivo principal

- `google-sites/index.html`

## O que foi ajustado

- sincronização com API desativada
- funcionamento baseado em `localStorage`
- pronta para hospedagem estática

## Como usar no Google Sites

O Google Sites não executa esse projeto diretamente como arquivo local. O fluxo recomendado é:

1. Hospede `google-sites/index.html` em uma URL pública estática
2. No Google Sites, use `Inserir > Incorporar > URL`
3. Cole a URL publicada do arquivo

## Opções simples de hospedagem

- GitHub Pages
- Netlify
- Vercel
- Google Drive com visualização pública, se compatível com o seu cenário

## Observações

- os dados ficam salvos no navegador do usuário
- não há dependência de `server.js`
- o arquivo continua usando a biblioteca `xlsx` via CDN