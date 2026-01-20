@echo off
chcp 65001 > nul
color 0A
title 🛡️ Sistema HSE - Inicialização Automática

echo.
echo ═══════════════════════════════════════════════════════════
echo   🛡️  SISTEMA DE GESTÃO HSE - INICIALIZAÇÃO AUTOMÁTICA
echo ═══════════════════════════════════════════════════════════
echo.
echo   📊 Sistema completo de gestão de HSE
echo   ✨ 100%% Standalone - Pronto para usar!
echo.
echo ═══════════════════════════════════════════════════════════
echo.

REM Verificar se o arquivo principal existe
if not exist "SISTEMA_STANDALONE.html" (
    echo ❌ ERRO: Arquivo SISTEMA_STANDALONE.html não encontrado!
    echo.
    echo Por favor, certifique-se de que este arquivo está na mesma pasta.
    pause
    exit
)

echo ✅ Sistema encontrado!
echo.
echo 🚀 Abrindo sistema no navegador padrão...
echo.

REM Abrir o arquivo no navegador padrão
start "" "SISTEMA_STANDALONE.html"

echo ═══════════════════════════════════════════════════════════
echo   ✅ SISTEMA INICIADO COM SUCESSO!
echo ═══════════════════════════════════════════════════════════
echo.
echo 💡 DICAS DE USO:
echo   • Use o menu lateral para navegar entre ferramentas
echo   • Cadastre empresas e colaboradores primeiro
echo   • Todos os dados são salvos automaticamente
echo   • Faça backups periódicos exportando os dados
echo.
echo 📝 Para fechar esta janela, pressione qualquer tecla...
echo.
pause > nul

REM Perguntar se deseja abrir o sistema completo
echo.
echo ═══════════════════════════════════════════════════════════
echo   DESEJA ABRIR O SISTEMA COMPLETO?
echo ═══════════════════════════════════════════════════════════
echo.
echo   O sistema completo (index.html) possui todas as funcionalidades
echo   avançadas incluindo sincronização de dados.
echo.
set /p resposta="   Abrir sistema completo? (S/N): "

if /i "%resposta%"=="S" (
    if exist "index.html" (
        echo.
        echo ✅ Abrindo sistema completo...
        start "" "index.html"
    ) else (
        echo.
        echo ❌ Arquivo index.html não encontrado!
    )
)

echo.
echo ═══════════════════════════════════════════════════════════
echo   Obrigado por usar o Sistema HSE!
echo ═══════════════════════════════════════════════════════════
echo.
timeout /t 3 > nul
