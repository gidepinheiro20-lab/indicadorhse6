#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapa completo de substituições UTF-8 corrompidas
const replacements = {
    'configuração': 'configuração',
    'usuário': 'usuário',
    'Seção': 'Seção',
    'Funcionários': 'Funcionários',
    'Identificação': 'Identificação',
    'Descrição': 'Descrição',
    'Respons\u00C3\u00A1vel': 'Responsável',
    'An\u00C3\u00A1lise': 'Análise',
    'choque elétrico': 'choque elétrico',
    'exposiçãoo': 'exposição',
    'químicos': 'químicos',
    'Medidas de Controle e Mitigação': 'Medidas de Controle e Mitigação',
    'Proteção': 'Proteção',
    'evacuação': 'evacuação',
    'Observações': 'Observações',
    'Aprovação': 'Aprovação',
    'recomendações': 'recomendações',
    'Revisão': 'Revisão',
    'Necessária': 'Necessária',
    'Escavação': 'Escavação',
    'Opções': 'Opções',
    'Classificação': 'Classificação',
    'Classificações': 'Classificações',
    'começar': 'começar',
    'Área': 'Área',
    'área': 'área',
    'áreas': 'áreas',
    'Nenhuma área': 'Nenhuma área',
    'inspeção': 'inspeção',
    'risco/perigo': 'risco/perigo',
    'Escritório': 'Escritório',
    'Produção': 'Produção',
    'Depósito': 'Depósito',
    'Nome/Descrição': 'Nome/Descrição',
    'Ruído': 'Ruído',
    'Exposição': 'Exposição',
    'química': 'química',
    'Salvar Alterações': 'Salvar Alterações',
    'Matrí\u00ADcula': 'Matrícula',
    'Função': 'Função',
    'Funções': 'Funções',
    'Nenhum funcionário': 'Nenhum funcionário',
    'Funcionários carregados': 'Funcionários carregados',
    'Funcionários salvos': 'Funcionários salvos',
    'Confirmar Presença': 'Confirmar Presença',
    'Cadastre funcionários': 'Cadastre funcionários',
    'avançar': 'avançar',
    'não': 'não',
    'edição': 'edição',
    'contrário': 'contrário',
    'já': 'já',
    'Presença': 'Presença',
    'Preencher informações': 'Preencher informações',
    'básicas': 'básicas',
    'Participação de liderança': 'Participação de liderança',
    'Lista de presença': 'Lista de presença',
    'Não há': 'Não há',
    'Evidências': 'Evidências',
    'Seleção': 'Seleção',
    'Verificar se': 'Verificar se',
    'Informações': 'Informações',
    'Formatar data': 'Formatar data',
    'exibição': 'exibição',
    'Atualizar revisão': 'Atualizar revisão',
    'Botão': 'Botão',
    'Interdição': 'Interdição',
    'Ação': 'Ação',
    'Ações': 'Ações',
};

try {
    // Ler arquivo
    let content = fs.readFileSync('index.html', 'utf-8');
    const originalLen = content.length;
    
    console.log(`Arquivo original: ${originalLen} caracteres\n`);
    
    // Substituir de maior para menor para evitar conflitos
    const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);
    
    let totalSubstitutions = 0;
    for (const old of sortedKeys) {
        const newStr = replacements[old];
        const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const count = (content.match(regex) || []).length;
        
        if (count > 0) {
            console.log(`✓ '${old}' → '${newStr}': ${count} ocorrências`);
            content = content.replace(regex, newStr);
            totalSubstitutions += count;
        }
    }
    
    // Salvar arquivo
    fs.writeFileSync('index.html', content, 'utf-8');
    
    const newLen = content.length;
    console.log(`\nArquivo final: ${newLen} caracteres`);
    console.log(`Diferença: ${originalLen - newLen} caracteres`);
    console.log(`Total de substituições: ${totalSubstitutions}`);
    console.log('\n✓ Arquivo corrigido com sucesso!');
    
} catch (e) {
    console.error(`✗ Erro: ${e.message}`);
    console.error(e);
    process.exit(1);
}
