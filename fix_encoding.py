#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir todos os caracteres UTF-8 corrompidos no arquivo index.html
Converte os padrões de double-encoding: Ã + acento = á, é, í, ó, ú, ã, õ, ç, etc.
"""

import re
import sys

# Mapa de substituições UTF-8 corrompidas
corrections = {
    # Padrões mais comuns de double-encoding
    '\u00C3\u00A1': 'á',    # á
    '\u00C3\u00A9': 'é',    # é  
    '\u00C3\u00AD': 'í',    # í
    '\u00C3\u00B3': 'ó',    # ó
    '\u00C3\u00BA': 'ú',    # ú
    '\u00C3\u00A7': 'ç',    # ç
    '\u00C3\u00A3': 'ã',    # ã
    '\u00C3\u00B5': 'õ',    # õ
    '\u00C2\u00E2\u20AC': '–',   # dash
    '\u00C2': '',      # remove Â orphaned
    
    # Maiúsculas
    'Á': 'Á',
    'É': 'É',
    'Í': 'Í',
    'Ó': 'Ó',
    'Ú': 'Ú',
    'Ç': 'Ç',
    '\u00C3': 'Ã',
    'Õ': 'Õ',
    
    # Palavras problemáticas (match com padrões errados)
    'Exclus\u00C3\u00A3o': 'Exclusão',
    'formul\u00C3\u00A1rio': 'formulário',
    'formul\u00C3\u00A1rios': 'formulários',
    'frequ\u00C3\u00AAncia': 'frequência',
    'espec\u00C3\u00ADfico': 'específico',
    'Matr\u00C3\u00ADcula': 'Matrícula',
    'j\u00C3\u00A1': 'já',
    'ningu\u00C3\u00A9m': 'ninguém',
    'exibi\u00C3\u00A7\u00C3\u00A3o': 'exibição',
    'h\u00C3\u00A1': 'há',
    '\u00C3rea': 'Área',
    
    # Comentários
    'Recarregar a exibi\u00C3\u00A7\u00C3\u00A3o': 'Recarregar a exibição',
    'Preencher formul\u00C3\u00A1rio': 'Preencher formulário',
    'Carregar frequ\u00C3\u00AAncia': 'Carregar frequência',
    'matr\u00C3\u00ADcula': 'matrícula',
    'c\u00C3\u00B3digo': 'código',
    'Informação': 'Informação',
}

try:
    # Ler arquivo
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"✓ Arquivo lido com sucesso ({len(content)} caracteres)")
    
    # Aplicar todas as correções
    total_corrections = 0
    for wrong, correct in corrections.items():
        count = content.count(wrong)
        if count > 0:
            content = content.replace(wrong, correct)
            total_corrections += count
            print(f"  Corrigido '{wrong}' → '{correct}' ({count}x)")
    
    # Salvar arquivo
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✓ Total de {total_corrections} correções aplicadas!")
    print("✓ Arquivo salvo com sucesso")
    sys.exit(0)
    
except Exception as e:
    print(f"✗ Erro: {e}", file=sys.stderr)
    sys.exit(1)
