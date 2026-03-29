# Escopo MVP — SmartWrite Orchestrator

**Status:** ✅ Aprovado  
**Data:** 29 de Março de 2026  
**Aprovado por:** Zander Catta Preta

---

## Decisões Técnicas Fechadas

| ID | Decisão | Escolha |
|---|---|---|
| DEC-T01 | Instalação do Orchestrator (MVP) | Manual — usuário copia pasta para `.obsidian/plugins/` e ativa no Obsidian |
| DEC-T02 | Código dos módulos (Publisher, Companion, Analyzer) | Portar dos plugins legados (`_ smartwrite-*`), não reescrever do zero |
| DEC-T03 | Método de instalação de módulos pelo Orchestrator | GitHub API raw — baixa `main.js`, `manifest.json`, `styles.css` da branch `main` |
| DEC-T04 | Refazer `_ smartwrite-installer` | Backlog futuro — installer atual não funciona em outras máquinas |
| DEC-T05 | Plugins legados (`_ smartwrite-publisher`, `_ smartwrite-companion`, `_ smartwrite-analyzer`) | Arquivar gradualmente — código portado conforme cada módulo for desenvolvido no novo ecossistema |

---

## Ambiente de Testes

| Item | Valor |
|---|---|
| **Vault de testes** | `/Users/zander/Documents/_ coding/_ smartwrite/` |
| **Plugins path** | `.obsidian/plugins/` |
| **Escopo** | Vault único para todos os plugins SmartWrite |
| **Estado atual** | Sem plugin SmartWrite instalado — pronto para receber o Orchestrator |

---

## O que o Orchestrator É

Plugin Obsidian que funciona como **hub central** do ecossistema SmartWrite.

### Funcionalidades do MVP

**1. Sidebar com uma aba única**
- Lista todos os módulos disponíveis como *boxes* horizontais
- Funciona mesmo sem nenhum módulo instalado (estado vazio)

**2. Box de módulo**
Cada módulo é representado por um box contendo:
```
┌─────────────────────────────┐
│ Nome do Módulo              │
│ Descrição curta             │
│ v1.0.0  ● Instalado         │
│ [Instalar]  [Remover]       │
└─────────────────────────────┘
```

**3. Instalador de módulos**
- Mesma abordagem do `_ smartwrite-installer` (shell/Swift): busca arquivos direto do repositório GitHub
- Via GitHub API raw: baixa `main.js`, `manifest.json`, `styles.css` da branch `main`
- Copia os arquivos para `.obsidian/plugins/{id}/`
- Registra o módulo como instalado nas settings
- **Pré-requisito:** repositório do módulo deve ter o `main.js` pré-compilado commitado na branch `main`

**4. Gerenciamento de credenciais**
- Configurado via **aba Settings nativa do Orchestrator** (não nas settings globais do Obsidian)
- Plataformas do MVP: **Substack** e **WordPress**

---

## O que o Orchestrator NÃO É

- ❌ Não publica conteúdo (responsabilidade do módulo Publisher)
- ❌ Não analisa texto (responsabilidade do módulo Analyzer)
- ❌ Não tem IA própria
- ❌ Não tem aba de "loja" separada (é tudo na aba única)

---

## Em Aberto (Decidir Durante Desenvolvimento)

| ID | Questão |
|---|---|
| OPEN-001 | Após instalar um módulo, abrir o painel dele automaticamente ou apenas marcar como instalado? |

---

## Lista de Módulos do MVP

| Módulo | Repositório | Status |
|---|---|---|
| SmartWrite Publisher | `zandercpzed/smartwrite-publisher` | ⏳ Scaffold criado |

---

## Fora do Escopo MVP (Backlog Futuro)

- Módulo Companion
- Módulo Analyzer
- Licenciamento / paywall de módulos
- Submissão ao Obsidian Community Plugins
