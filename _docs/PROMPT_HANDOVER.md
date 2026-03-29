# PROMPT DE HANDOVER — SmartWrite Orchestrator

**Gerado em:** 29 de Março de 2026 (EOD)
**Versão do Orchestrator na vault:** `0.0.4`

---

## Contexto

Estamos construindo o **SmartWrite Orchestrator** — plugin hub para Obsidian que instala e gerencia módulos independentes (Publisher, Companion, Analyzer) com sidebar unificada.

**Repositório:** `github.com/zandercpzed/smartwrite-orchestrator`
**Workspace:** `_ smartwrite/_smartwrite-orchestrator/`
**Vault de testes:** `_ smartwrite/.obsidian/plugins/smartwrite-orchestrator/`

---

## Estado Atual

O Orchestrator está **funcionando** na vault de testes(`0.0.4`):

- ✅ Sidebar com boxes horizontais por módulo (Publisher, Companion, Analyzer)
- ✅ Botão "Instalar" conectado ao `module-installer.ts` (GitHub raw API)
- ✅ `OrchestratorSettingsTab` sem dados pessoais — mostra apenas módulos instalados
- ✅ Build e lint limpos (zero erros)
- ✅ Escopo MVP documentado em `_docs/ESCOPO_MVP.md`
- ✅ Skill de versionamento criada (`.agent/skills/smartwrite-versioning/SKILL.md`)

---

## 🔴 PRIORIDADE #1 — Fechar Antes de Qualquer Código

### OPEN-002: Redefinir como o Orchestrator descobre módulos

**Problema:** `KNOWN_MODULES` está hardcoded em `src/core/module-registry.ts` com os repos do Zander. Isso é rígido e inadequado.

**Decisão do Zander:** O Orchestrator deve fazer as **duas coisas**:
1. Carregar uma **lista default** de módulos oficiais SmartWrite
2. Permitir que o usuário aponte um **repositório GitHub customizado** para instalar qualquer plugin

**Próximo passo:** Apresentar um plano de implementação (APAE) para esta feature antes de codificar qualquer linha.

---

## Regras Críticas

- ⛔ **NUNCA abrir browser sem autorização explícita**  
- ⛔ **NUNCA hardcodar dados pessoais** (GitHub owner, credenciais, URLs pessoais)
- ✅ **Protocolo APAE obrigatório** — Analyze → Plan → Authorize → Execute
- ✅ **Versionamento:** `0.0.X` = deploy vault | `0.X.0` = GitHub push | `1.0.0` = Obsidian Store
- ✅ **Deploy na vault ≠ push para GitHub** — são ações distintas, autorizar separadamente
- ✅ Plugins legados (`_ smartwrite-publisher/`, etc.): somente leitura

---

## Convenção de Deploy

```bash
# Bump de patch (deploy vault de testes)
node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync('package.json')); p.version='X.X.NEW'; fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n');"
node version-bump.mjs
npm run build
cp main.js manifest.json styles.css "../.obsidian/plugins/smartwrite-orchestrator/"
```

---

## Perguntas Abertas Para o Zander

Estas foram identificadas mas são **irrelevantes para o próximo passo imediato** (OPEN-002):

1. Publisher MVP: Substack apenas, ou Substack + WordPress?
2. Fluxo pré-publicação: obrigatório ou opcional?
3. Submissão ao Obsidian Community Plugins?
4. Licenciamento dos módulos?
