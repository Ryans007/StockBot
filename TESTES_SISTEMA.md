# Testes do Sistema de Agentes - Bot Estoque

Este documento contém casos de teste para validar o funcionamento completo do sistema de agentes.

---

## Índice de Testes

1. [Testes do Agente TRIVIAL](#1-testes-do-agente-trivial)
2. [Testes do Agente SQL - Consultas de Estoque](#2-testes-do-agente-sql---consultas-de-estoque)
3. [Testes do Agente SQL - Consultas de Receitas](#3-testes-do-agente-sql---consultas-de-receitas)
4. [Testes do Agente REVISOR](#4-testes-do-agente-revisor)
5. [Testes do Agente WEB](#5-testes-do-agente-web)
6. [Testes do Agente STRUCTURER](#6-testes-do-agente-structurer)
7. [Testes de Fluxo Completo](#7-testes-de-fluxo-completo)
8. [Testes de Casos Extremos](#8-testes-de-casos-extremos)

---

## 1. Testes do Agente TRIVIAL

### Teste 1.1 - Saudação Simples
**Entrada:** `Oi, tudo bem?`

**Agente Esperado:** TRIVIAL

**Resposta Esperada:**
```
Olá! Tudo ótimo, obrigado! 😊 Sou seu assistente de estoque e receitas. 
Como posso te ajudar hoje?
```

---

### Teste 1.2 - Perguntas sobre Funcionalidades
**Entrada:** `O que você pode fazer?`

**Agente Esperado:** TRIVIAL

**Resposta Esperada:**
```
Posso te ajudar com várias coisas! 

• Consultar quantidades e preços de produtos no estoque
• Buscar receitas culinárias (tanto no banco quanto na internet)
• Verificar se você tem os ingredientes para uma receita
• Salvar novas receitas no sistema

Experimente perguntar: 'Quantos ovos tenho?' ou 'Qual a receita de bolo de chocolate?'
```

---

### Teste 1.3 - Como Funciona
**Entrada:** `Como funciona esse sistema?`

**Agente Esperado:** TRIVIAL

**Resposta Esperada:**
```
É bem simples! Basta fazer perguntas naturalmente, como se estivesse conversando.
Por exemplo:
- 'Quantos tomates tem no estoque?'
- 'Tenho os ingredientes para fazer lasanha?'
- 'Busque uma receita de brownie'

Estou aqui para facilitar sua vida! O que gostaria de saber?
```

---

## 2. Testes do Agente SQL - Consultas de Estoque

### Teste 2.1 - Consulta de Quantidade Simples
**Entrada:** `Quantos tomates tem no estoque?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Temos 10 unidades de Tomate no estoque.
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 2.2 - Consulta de Preço
**Entrada:** `Qual o preço do arroz?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
O Arroz Branco custa R$ 12,50.
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 2.3 - Consulta com LIKE (palavra parcial)
**Entrada:** `Quantas cebolas eu tenho?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Temos 11 unidades de Cebola no estoque.
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 2.4 - Listagem com Filtro
**Entrada:** `Liste todos os produtos com menos de 5 unidades`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Produtos com estoque baixo (menos de 5 unidades):
• Açúcar Cristal: 2 unidades
• Batata: 3 unidades
• Cenoura: 4 unidades
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 2.5 - Consulta de Item Inexistente
**Entrada:** `Quantos abacaxis tenho?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Não encontrei "abacaxi" no estoque. O produto não está cadastrado.
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

## 3. Testes do Agente SQL - Consultas de Receitas

### Teste 3.1 - Buscar Receita Cadastrada
**Entrada:** `Como fazer Purê de Batata?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Receita: Purê de Batata

Ingredientes:
1kg de batata, 200ml de leite integral, 50g de manteiga, sal a gosto

Modo de Preparo:
Descasque e cozinhe as batatas em água com sal até ficarem macias. 
Escorra e amasse. Adicione leite morno, manteiga e sal. Misture até ficar cremoso.
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 3.2 - Receita com Verificação de Ingredientes
**Entrada:** `Quais os ingredientes para fazer o Purê de batata, e também me diga se eu tenho os ingredientes necessários no estoque?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Receita: Purê de Batata

Ingredientes necessários:
• 1kg de batata
• 200ml de leite integral
• 50g de manteiga
• sal a gosto

Verificação de Estoque:
• Batata: 3 unidades (disponível)
• Leite Integral: 19 unidades (disponível)
• Manteiga: 45 unidades (disponível)
• Sal Refinado: 20 unidades (disponível)

Você tem todos os ingredientes necessários! 🎉
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 3.3 - Receita com Ingredientes Insuficientes
**Entrada:** `Tenho os ingredientes para fazer Macarrão à Bolonhesa?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Receita: Macarrão à Bolonhesa

Ingredientes necessários:
• 500g de macarrão espaguete
• 400g de carne moída
• 2 tomates
• 1 cebola
• 3 dentes de alho
• sal, óleo

Você tem:
• Macarrão Espaguete: 5 unidades ✅
• Carne Moída: 15 unidades ✅
• Tomate: 10 unidades ✅
• Cebola: 11 unidades ✅
• Alho: 12 unidades ✅
• Sal Refinado: 20 unidades ✅
• Óleo de Soja: 30 unidades ✅

Você tem todos os ingredientes necessários! 🎉
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

### Teste 3.4 - Listar Todas as Receitas
**Entrada:** `Quais receitas você tem cadastradas?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Receitas cadastradas no sistema:

1. Arroz com Feijão
2. Macarrão à Bolonhesa
3. Omelete Simples
4. Frango Grelhado
5. Purê de Batata
6. Refogado de Cenoura
7. Sanduíche Natural

Total: 7 receitas
```

**Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR

---

## 4. Testes do Agente REVISOR

### Teste 4.1 - Revisor deve FINALIZAR (resposta completa)
**Contexto:**
- Pergunta: "Quantos ovos tenho?"
- Resposta SQL: "Você tem 18 unidades de Ovos no estoque"

**Decisão Esperada:** `nextAgent: FINALIZAR`

**Justificativa:** A resposta SQL está completa e respondeu totalmente a pergunta.

---

### Teste 4.2 - Revisor deve chamar WEB (receita não encontrada)
**Contexto:**
- Pergunta: "Como fazer Bolo de Chocolate?"
- Resposta SQL: "Não encontrei receita de 'Bolo de Chocolate' no banco de dados"

**Decisão Esperada:** `nextAgent: WEB`

**Query Web Esperada:** `"receita bolo de chocolate ingredientes"`

**Justificativa:** Receita não está cadastrada, precisa buscar na web.

---

### Teste 4.3 - Revisor deve FINALIZAR (mesmo com receita parcial encontrada)
**Contexto:**
- Pergunta: "Tenho batata no estoque?"
- Resposta SQL: "Sim, você tem 3 unidades de Batata"

**Decisão Esperada:** `nextAgent: FINALIZAR`

**Justificativa:** Pergunta respondida completamente.

---

## 5. Testes do Agente WEB

### Teste 5.1 - Buscar Receita não Cadastrada
**Entrada:** `Como fazer Bolo de Chocolate?`

**Fluxo Esperado:** 
1. Orchestrator → SQL (tenta buscar no banco)
2. SQL → não encontra
3. Revisor → decide buscar na WEB
4. WEB → busca receita online

**Resposta Esperada:**
```
**Bolo de Chocolate**

📋 **Ingredientes:**
• 2 xícaras de farinha de trigo
• 2 xícaras de açúcar
• 3/4 xícara de chocolate em pó
• 2 ovos
• 1 xícara de leite
• 1/2 xícara de óleo
• 1 colher de sopa de fermento em pó

**Modo de Preparo:**
1. Misture os ingredientes secos (farinha, açúcar, chocolate, fermento)
2. Adicione os ovos, leite e óleo
3. Bata bem até ficar homogêneo
4. Despeje em forma untada
5. Asse em forno pré-aquecido a 180°C por 40 minutos

**Tempo de Preparo:** 50 minutos
**Dificuldade:** Fácil

Gostaria de salvar alguma receita no banco de dados? Se sim, qual?
```

---

### Teste 5.2 - Buscar Receita Específica
**Entrada:** `Busque uma receita de Lasanha de Berinjela`

**Agente Esperado:** Orchestrator → SQL → Revisor → WEB

**Resposta Esperada:** Estrutura completa com ingredientes e modo de preparo + pergunta sobre salvar

---

## 6. Testes do Agente STRUCTURER

### Teste 6.1 - Salvar Receita da Web
**Contexto:** Usuário buscou receita de Bolo de Chocolate na web

**Entrada:** `Sim, quero salvar a receita de Bolo de Chocolate`

**Agente Esperado:** SAVE_RECIPE (Structurer)

**Fluxo Esperado:**
1. Orchestrator → SAVE_RECIPE
2. Structurer → analisa histórico e estrutura receita
3. SQL → INSERT na tabela recipes

**Resposta Esperada:**
```
Receita "Bolo de Chocolate" salva com sucesso no banco de dados!

Agora você pode consultá-la a qualquer momento. 📋
```

---

### Teste 6.2 - Salvar Receita Customizada
**Entrada:** `Salve essa receita: Vitamina de Banana. Ingredientes: 2 bananas, 1 copo de leite, 1 colher de açúcar. Modo de preparo: Bata tudo no liquidificador.`

**Agente Esperado:** SAVE_RECIPE

**Resposta Esperada:**
```
Receita "Vitamina de Banana" salva com sucesso!
```

---

## 7. Testes de Fluxo Completo

### Teste 7.1 - Fluxo Completo: Buscar → Verificar → Salvar
**Sequência de Perguntas:**

1. **Entrada:** `Busque uma receita de Brownie`
   - **Fluxo:** Orchestrator → SQL → Revisor → WEB
   - **Resposta:** Receita completa do brownie + pergunta sobre salvar

2. **Entrada:** `Sim, salve a receita de Brownie`
   - **Fluxo:** Orchestrator → SAVE_RECIPE → SQL (INSERT)
   - **Resposta:** Receita salva com sucesso

3. **Entrada:** `Tenho os ingredientes para fazer Brownie?`
   - **Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR
   - **Resposta:** Lista de ingredientes com verificação de estoque

---

### Teste 7.2 - Fluxo: Receita Cadastrada
**Sequência:**

1. **Entrada:** `Como fazer Omelete Simples?`
   - **Fluxo:** Orchestrator → SQL → Revisor → FINALIZAR
   - **Resposta:** Receita completa do banco

2. **Entrada:** `Tenho os ingredientes?`
   - **Fluxo:** Orchestrator → SQL (contexto da conversa) → Revisor → FINALIZAR
   - **Resposta:** Verificação de ingredientes no estoque

---

### Teste 7.3 - Fluxo: Consulta de Estoque Múltipla
**Sequência:**

1. **Entrada:** `Quantos ovos tenho?`
   - **Resposta:** 18 unidades

2. **Entrada:** `E leite?`
   - **Resposta:** 19 unidades de Leite Integral

3. **Entrada:** `Liste tudo que tem menos de 10 unidades`
   - **Resposta:** Lista completa

---

## 8. Testes de Casos Extremos

### Teste 8.1 - Pergunta Ambígua
**Entrada:** `Tem massa?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Encontrei os seguintes produtos relacionados a "massa":
• Macarrão Espaguete: 5 unidades (R$ 3,90)
```

---

### Teste 8.2 - Múltiplas Receitas com Mesmo Ingrediente
**Entrada:** `Quais receitas posso fazer com frango?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Receitas que contêm frango:
1. Frango Grelhado
```

---

### Teste 8.3 - Pergunta sobre Ingrediente que não é Item de Estoque
**Entrada:** `Tenho noz-moscada?`

**Agente Esperado:** SQL

**Resposta Esperada:**
```
Não encontrei "noz-moscada" no estoque. O produto não está cadastrado.
```

---

### Teste 8.4 - Consulta com Erro de Digitação
**Entrada:** `Quantos ovoss tenho?`

**Agente Esperado:** SQL (deve usar LIKE para tolerar erros)

**Resposta Esperada:**
```
Você tem 18 unidades de Ovos no estoque.
```
(Sistema deve encontrar "Ovos" mesmo com "ovoss")

---

### Teste 8.5 - Receita Parcialmente Cadastrada
**Entrada:** `Como fazer Macarrão com Alho e Óleo?`

**Agente Esperado:** SQL → não encontra → Revisor → WEB

**Fluxo:** Busca no banco → não encontra → busca na web

---

## 9. Checklist de Validação

Após executar todos os testes, verifique:

- [ ] Orchestrator roteia corretamente para cada agente
- [ ] Agente SQL consulta corretamente tabelas `items` e `recipes`
- [ ] Agente SQL usa LIKE corretamente para buscas parciais
- [ ] Revisor decide FINALIZAR quando resposta está completa
- [ ] Revisor decide WEB quando receita não está cadastrada
- [ ] Agente WEB busca receitas e apresenta formatado
- [ ] Agente WEB sempre pergunta sobre salvar receita
- [ ] Agente Structurer extrai e estrutura receitas corretamente
- [ ] Agente Trivial responde saudações e perguntas sobre o sistema
- [ ] Sistema mantém contexto entre perguntas
- [ ] Erros são tratados adequadamente
- [ ] Mensagens são claras e bem formatadas

---

