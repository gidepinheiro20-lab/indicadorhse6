# Script para adicionar domínio público no Railway
Write-Host "Adicionando domínio público no Railway..." -ForegroundColor Green

# Instala Railway CLI se não estiver instalado
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Instalando Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Faz login no Railway (abrirá o navegador)
Write-Host "Fazendo login no Railway..." -ForegroundColor Yellow
railway login

# Conecta ao projeto
Write-Host "Conectando ao projeto..." -ForegroundColor Yellow
railway link

# Adiciona domínio público
Write-Host "Gerando domínio público..." -ForegroundColor Yellow
railway domain

Write-Host "`nPronto! O domínio foi gerado." -ForegroundColor Green
Write-Host "Copie o link que apareceu acima e me envie!" -ForegroundColor Cyan

Read-Host "Pressione Enter para continuar"
