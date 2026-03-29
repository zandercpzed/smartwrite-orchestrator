# PROMPT DE HANDOVER — SmartWrite Orchestrator

**Gerado em:** 29 de Março de 2026 (EOD — Sessão 2)
**Versão do Orchestrator na vault:** `0.0.4`

---

## Contexto

Estamos construindo o **SmartWrite Orchestrator** — plugin hub para Obsidian que instala e gerencia módulos independentes (Publisher, Companion, Analyzer) com sidebar unificada.

**Repositório:** `github.com/zandercpzed/smartwrite-orchestrator`
**Workspace:** `_ smartwrite/_smartwrite-orchestrator/`
**Vault de testes:** `_ smartwrite/.obsidian/plugins/smartwrite-orchestrator/`

---

## Estado Atual (v0.0.4 — estável)

O Orchestrator está **funcionando** na vault de testes:

- ✅ Sidebar com boxes horizontais por módulo (Publisher, Companion, Analyzer)
- ✅ Botão "Instalar" conectado ao `module-installer.ts` (GitHub raw API)
- ✅ `OrchestratorSettingsTab` sem dados pessoais — mostra apenas módulos instalados
- ✅ Build e lint limpos (zero erros)
- ✅ Auditoria de padrões Obsidian concluída — skill `obsidian-plugin-standards` criada
- ✅ Skill de versionamento criada (`.agent/skills/smartwrite-versioning/SKILL.md`)
- ✅ Escopo MVP documentado em `_docs/ESCOPO_MVP.md`
- ✅ Git sync: `origin/main` up to date

---

## 🔴 PRIORIDADE #1 — Resolver Antes de Qualquer Código Novo

### OPEN-002: Redefinir como o Orchestrator descobre módulos

**Problema:** `KNOWN_MODULES` está hardcoded em `src/core/module-registry.ts` com os repos do Zander. Isso é rígido, inadequado e infringe a regra de não hardcodar dados pessoais.

**Decisão do Zander:** O Orchestrator deve fazer as **duas coisas**:
1. Carregar uma **lista default** de módulos oficiais SmartWrite pré-configurada
2. Permitir que o usuário aponte um **repositório GitHub customizado** para instalar qualquer plugin

**Próximo passo obrigatório:** Protocolo APAE completo:
1. **Analyze** — Ler `src/core/module-registry.ts` e entender estrutura atual
2. **Plan** — Criar `implementation_plan.md` com proposta de implementação
3. **Authorize** — Apresentar plano e aguardar "Pode" do Zander
4. **Execute** — Somente após autorização

---

## Arquivos Chave

```
_smartwrite-orchestrator/
├── src/
│   ├── main.ts                    ← Entry point
│   ├── core/
│   │   ├── plugin.ts              ← Motor central
│   │   └── module-registry.ts     ← ⚠️ OPEN-002 — KNOWN_MODULES hardcoded aqui
│   ├── installer/
│   │   └── module-installer.ts    ← GitHub raw API (funcionando)
│   ├── ui/
│   │   ├── OrchestratorSidebar.ts ← Sidebar com boxes por módulo
│   │   └── OrchestratorSettingsTab.ts ← Sem dados pessoais
│   ├── services/
│   │   └── auth-manager.ts        ← Credenciais centralizadas
│   └── types/index.ts             ← Contratos TypeScript
├── styles.css                     ← Sistema de design (CSS vars Obsidian)
├── manifest.json                  ← id: "smartwrite-orchestrator"
└── _docs/                         ← Documentação viva
```

---

## Regras Críticas

- ⛔ **NUNCA abrir browser sem autorização explícita**
- ⛔ **NUNCA hardcodar dados pessoais** (GitHub owner, credenciais, URLs pessoais)
- ✅ **Protocolo APAE obrigatório** — Analyze → Plan → Authorize → Execute
- ✅ **Versionamento:** `0.0.X` = deploy vault | `0.X.0` = GitHub push | `1.0.0` = Obsidian Store
- ✅ **Deploy na vault ≠ push para GitHub** — são ações distintas, autorizar separadamente
- ✅ Plugins legados (`_ smartwrite-publisher/`, etc.): somente leitura para referência de código

---

## Convenção de Deploy (Patch — vault de testes)

```bash
# 1. Bump de versão manualmente no package.json (ex: "0.0.4" → "0.0.5")
node version-bump.mjs
npm run build
cp main.js manifest.json styles.css "../.obsidian/plugins/smartwrite-orchestrator/"
```

---

## Perguntas Abertas (irrelevantes para OPEN-002, mas registradas)

1. Publisher MVP: Substack apenas, ou Substack + WordPress?
2. Fluxo pré-publicação: obrigatório ou opcional?
3. Submissão ao Obsidian Community Plugins?
4. Licenciamento dos módulos?
