# PROMPT DE HANDOVER — SmartWrite Orchestrator

**Gerado em:** 29 de Março de 2026 (EOD)
**Para:** Próxima sessão de Vibe Coding

---

## Contexto Rápido

Estamos construindo o **SmartWrite Orchestrator** — um plugin hub para o Obsidian que instala e gerencia módulos independentes (Publisher, Companion, Analyzer) via GitHub Releases, com UI unificada em sidebar e auth centralizada.

**Repositório:** `github.com/zandercpzed/smartwrite-orchestrator`
**Workspace local:** `_ smartwrite/_smartwrite-orchestrator/`

---

## O Que Foi Feito

- ✅ Documentação de governança completa em `_docs/`
- ✅ Scaffolding do plugin: `src/`, configs de build, manifest
- ✅ Build funcional: `npm run build` → `main.js` sem erros
- ✅ Git sincronizado com GitHub (2 commits)

---

## 🔴 PRIORIDADE #1 DA PRÓXIMA SESSÃO

**Antes de qualquer código novo:** auditar o scaffolding contra os padrões oficiais do Obsidian.

Plugins anteriores do Zander foram **rejeitados** no processo de revisão da comunidade Obsidian. Precisamos garantir conformidade **antes** de avançar.

### O que auditar:
1. `github.com/obsidianmd/obsidian-sample-plugin` — comparar `manifest.json`, `package.json`, `esbuild.config.mjs`, estrutura de `src/`
2. `docs.obsidian.md/Plugins/Releasing/Plugin+guidelines` — regras de submissão
3. Criar skill `.agent/skills/obsidian-plugin-standards/SKILL.md` com as regras compiladas
4. Corrigir desvios encontrados no scaffolding atual

### Diferenças já identificadas (sem auditar):
- Nosso `esbuild.config.mjs` usa `builtin-modules` (npm package); o sample usa `node:module` nativo → **verificar**
- Nosso `esbuild.target` é `es2022`; o sample usa `es2018` → **verificar qual é correto**
- Nosso `manifest.json` não tem `fundingUrl` → **verificar se obrigatório**

---

## Próximo Passo após Auditoria

Implementar `module-installer.ts` — o componente que:
1. Recebe a URL do release do `github-fetcher.ts`
2. Descompacta o `.zip`
3. Copia `main.js` + `manifest.json` + `styles.css` + `smartwrite.module.json` para `.obsidian/plugins/{id}/`
4. Registra o módulo na sidebar

---

## Regras Críticas a Lembrar

- ⛔ **NUNCA abrir o browser sem autorização explícita do Zander** (skill: `browser-policy`)
- ✅ Alternativas: `read_url_content`, `search_web`, `curl`
- ✅ Protocolo APAE: Analyze → Plan → Authorize → Execute
- ✅ Legados (`_ smartwrite-publisher/`, etc.): somente leitura para referência
- ✅ Caminhos nos docs: sempre relativos à root do workspace

---

## Perguntas em Aberto Para o Zander

1. **Publisher MVP:** Substack apenas, ou Substack + WordPress juntos desde o início? (`DECx-001`)
2. **Fluxo "Publish Ready":** Obrigatório ou opcional no MVP? (`DECx-002`)
3. **Submissão ao Community Plugins do Obsidian:** Sim ou não? (`DECx-003`)
4. **Licenciamento dos módulos:** Todos gratuitos, ou Publisher pago? (`DECx-004`)
