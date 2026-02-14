#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

# Mapa completo de substituições UTF-8 corrompidas
replacements = {
    'configuraç': 'configuração',
    'usuário': 'usuário',
    'Seção': 'Seção',
    'Funcionários': 'Funcionários',
    'ART': 'ART',
    'Identificação': 'Identificação',
    'da ART': 'da ART',
    'Descrição': 'Descrição',
    'Tarefa': 'Tarefa',
    'Responsável': 'Responsável',
    'Análise': 'Análise',
    'Riscos': 'Riscos',
    'choque elétrico': 'choque elétrico',
    'exposição': 'exposição',
    'químicos': 'químicos',
    'Medidas de Controle e Mitigação': 'Medidas de Controle e Mitigação',
    'Proteção': 'Proteção',
    'evacuação': 'evacuação',
    'Observações': 'Observações',
    'Aprovação': 'Aprovação',
    'complementares': 'complementares',
    'recomendações': 'recomendações',
    'especiais': 'especiais',
    'Aprovação': 'Aprovação',
    'Revisão': 'Revisão',
    'Necessária': 'Necessária',
    'Escavação': 'Escavação',
    'Opções': 'Opções',
    'Classificação': 'Classificação',
    'Categoria': 'Categoria',
    'Classificações': 'Classificações',
    'Existentes': 'Existentes',
    'começar': 'começar',
    'Área': 'Área',
    'área': 'área',
    'Nova área': 'Nova área',
    'áreas': 'áreas',
    'Nenhuma área': 'Nenhuma área',
    'cadastrado': 'cadastrado',
    'Tipos de Registro': 'Tipos de Registro',
    'inspeção': 'inspeção',
    'novo tipo': 'novo tipo',
    'Riscos e Perigos': 'Riscos e Perigos',
    'risco/perigo': 'risco/perigo',
    'Adicionar Classificação': 'Adicionar Classificação',
    'Classificações Existentes': 'Classificações Existentes',
    'Lista será': 'Lista será',
    'preenchida dinamicamente': 'preenchida dinamicamente',
    'novo tipo de registro': 'novo tipo de registro',
    'Novo tipo de registro': 'Novo tipo de registro',
    'detalhada do tipo': 'detalhada do tipo',
    'Escritório': 'Escritório',
    'Produção': 'Produção',
    'Depósito': 'Depósito',
    'Descrição adicional': 'Descrição adicional',
    'Nome/Descrição': 'Nome/Descrição',
    'Ruído': 'Ruído',
    'Exposição': 'Exposição',
    'química': 'química',
    'Queda de altura': 'Queda de altura',
    'Salvar Alterações': 'Salvar Alterações',
    'Alterações pendentes': 'Alterações pendentes',
    'Função': 'Função',
    'Matrícula': 'Matrícula',
    'Nenhum funcionário': 'Nenhum funcionário',
    'Funcionários carregados': 'Funcionários carregados',
    'Funcionários salvos': 'Funcionários salvos',
    'sincronizados': 'sincronizados',
    'Firestore': 'Firestore',
    'Fun\u00C3\u00A7\u00C3\u00A3o para': 'Função para',
    'Fun\u00C3\u00A7\u00C3\u00B5es para': 'Funções para',
    'integrar com': 'integrar com',
    'Ao carregar': 'Ao carregar',
    'p\u00C3\u00A1gina': 'página',
    'tentar inicializar': 'tentar inicializar',
    'automaticamente': 'automaticamente',
    'se existir': 'se existir',
    'Confirmar Presen\u00C3\u00A7a': 'Confirmar Presença',
    'Escopo Global': 'Escopo Global',
    'Cadastre funcion\u00C3\u00A1rios': 'Cadastre funcionários',
    'primeiro': 'primeiro',
    'Carregar colaboradores': 'Carregar colaboradores',
    'avan\u00C3\u00A7ar': 'avançar',
    'n\u00C3\u00A3o': 'não',
    'edi\u00C3\u00A7\u00C3\u00A3o': 'edição',
    'contr\u00C3\u00A1rio': 'contrário',
    'manter participantes': 'manter participantes',
    'j\u00C3\u00A1': 'já',
    'preenchidos': 'preenchidos',
    'Presença': 'Presença',
    'Relatório final': 'Relatório final',
    'Preencher informações': 'Preencher informações',
    'básicas': 'básicas',
    'Participação de liderança': 'Participação de liderança',
    'Lista de presença': 'Lista de presença',
    'Não há': 'Não há',
    'efetivo': 'efetivo',
    'ausentes': 'ausentes',
    'calculados': 'calculados',
    'sabemos': 'sabemos',
    'total': 'total',
    'esperado': 'esperado',
    'Fotos': 'Fotos',
    'Evid\u00C3\u00AAncias': 'Evidências',
    'Clique na \u00C3\u00A1rea': 'Clique na área',
    'Sele\u00C3\u00A7\u00C3\u00A3o': 'Seleção',
    'arquivos': 'arquivos',
    'Verificar se': 'Verificar se',
    'arquivo': 'arquivo',
    'foi adicionado': 'foi adicionado',
    'Coletar todos': 'Coletar todos',
    'dados': 'dados',
    'preenchidos': 'preenchidos',
    'Etapa': 'Etapa',
    'Informações': 'Informações',
    'Formatar data': 'Formatar data',
    'exibição': 'exibição',
    'Atualizar revisão': 'Atualizar revisão',
    'Revisão': 'Revisão',
    'Botão': 'Botão',
    'Botões de Ação': 'Botões de Ação',
    'Botões': 'Botões',
    'Ação': 'Ação',
    'Ações': 'Ações',
    'Interdicção': 'Interdicção',
    'Interdicção': 'Interdicção',
    'Responsável pela Análise': 'Responsável pela Análise',
    'Responsável': 'Responsável',
    '\u00C3': '',
    '\u00EF\u00BF\u00BD': '',
}

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_len = len(content)
    print(f"Arquivo original: {original_len} caracteres")
    
    # Aplicar todas as substituições
    for old, new in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
        count = content.count(old)
        if count > 0:
            print(f"✓ '{old}' → '{new}': {count} ocorrências")
            content = content.replace(old, new)
    
    # Salvar o arquivo corrigido
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    new_len = len(content)
    print(f"\nArquivo final: {new_len} caracteres")
    print(f"Diferença: {original_len - new_len} caracteres")
    print("\n✓ Arquivo corrigido com sucesso!")

except Exception as e:
    print(f"✗ Erro: {e}")
    import traceback
    traceback.print_exc()
