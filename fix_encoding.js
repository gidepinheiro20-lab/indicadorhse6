#!/usr/bin/env node
/**
 * Script para corrigir todos os caracteres UTF-8 corrompidos no arquivo index.html
 */

const fs = require('fs');
const path = require('path');

const corrections = {
    '\u00C3\u00A7\u00C3\u00A3': 'çã',
    '\u00C3\u00A7\u00C3\u00B5': 'çõ',
    '\u00C3\u00A3o': 'ão',
    '\u00C3\u00A1': 'á',
    '\u00C3\u00A9': 'é',
    '\u00C3\u00AD': 'í',
    '\u00C3\u00B3': 'ó',
    '\u00C3\u00BA': 'ú',
    '\u00C3\u00A7': 'ç',
    '\u00C3\u00A3': 'ã',
    '\u00C3\u00B5': 'õ',
    '\u00C3\u00AA': 'ê',
    '\u00C3\u0081': 'Á',
    '\u00C3\u0089': 'É',
    '\u00C3\u008D': 'Í',
    '\u00C3\u0093': 'Ó',
    '\u00C3\u009A': 'Ú',
    '\u00C3\u0087': 'Ç',
    '\u00C3\u0083': 'Ã',
    '\u00C3\u0094': 'Ô',
    '\u00C3\u0095': 'Õ',
    '\u00C3\u0097': '×',
    '\u00EF\u00BF\u00BD': '',
    '\u00EF\u00B8\u008F': '',
    '\u00C2\u00E2\u20AC': '–',
    '\u00C2': '',
    'Exclus\u00C3\u00A3o': 'Exclusão',
    'formul\u00C3\u00A1rio': 'formulário',
    'formul\u00C3\u00A1rios': 'formulários',
    'frequ\u00C3\u00AAncia': 'frequência',
    'especí\u00ADfico': 'específico',
    'Matrí\u00ADcula': 'Matrícula',
    'j\u00C3\u00A1': 'já',
    'ninguem': 'ninguém',
    'exibiçãoo': 'exibição',
    'h\u00C3\u00A1': 'há',
    '\u00C3area': 'Área',
    'Recarregar a exibiçãoo': 'Recarregar a exibição',
    'Preencher formul\u00C3\u00A1rio': 'Preencher formulário',
    'Carregar frequ\u00C3\u00AAncia': 'Carregar frequência',
    'matrícula': 'matrícula',
    'c\u00C3\u00B3digo': 'código',
    'Informação': 'Informação',
};

try {
    const filePath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`✓ Arquivo lido com sucesso (${content.length} caracteres)`);
    
    let totalCorrections = 0;
    for (const [wrong, correct] of Object.entries(corrections)) {
        const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const count = (content.match(regex) || []).length;
        if (count > 0) {
            content = content.replace(regex, correct);
            totalCorrections += count;
            console.log(`  Corrigido '${wrong}' → '${correct}' (${count}x)`);
        }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`\n✓ Total de ${totalCorrections} correções aplicadas!`);
    console.log('✓ Arquivo salvo com sucesso');
    process.exit(0);
} catch (err) {
    console.error(`✗ Erro: ${err.message}`);
    process.exit(1);
}
