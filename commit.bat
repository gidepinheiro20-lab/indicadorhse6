@echo off
cd /d "c:\Users\Gidead Pinheiro\OneDrive - RSC\Área de Trabalho\indicadoreshse6"
echo Correcting more UTF-8 errors...
powershell -Command "$content = Get-Content -Path 'index.html' -Encoding UTF8 -Raw; $content = $content -replace 'Responsável', 'Responsável'; $content = $content -replace 'Interdi[ç]', 'Interdição'; $content = $content -replace 'Descrição', 'Descrição'; $content = $content -replace 'Classificão', 'Classificação'; $content = $content -replace 'Seção', 'Seção'; $content = $content -replace 'Funcionários', 'Funcionários'; Set-Content -Path 'index.html' -Encoding UTF8 -Value $content"
echo Corrected! Now committing...
git add index.html
git commit -m "Corrigir erros UTF-8 restantes no arquivo - round 2"
echo Pushing...
git push origin master
echo Done!
pause
