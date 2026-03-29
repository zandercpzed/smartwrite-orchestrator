# CHANGELOG — SmartWrite Orchestrator

**Formato:** [Semver](https://semver.org/) — `MAJOR.MINOR.PATCH`

---

## [Não publicado] — Trabalho em andamento

## [0.1.0-foundation] — 29 de Março de 2026

### Adicionado
- Scaffolding completo do plugin: `src/main.ts`, `core/plugin.ts`, `core/module-registry.ts`
- `services/auth-manager.ts` — credenciais centralizadas (Substack, WordPress multi-perfil, Medium)
- `installer/github-fetcher.ts` — GitHub API v3 + download de release assets com suporte a redirects
- `ui/OrchestratorSidebar.ts` — sidebar com abas dinâmicas e loja de módulos
- `types/index.ts` — contratos TypeScript: `SmartWriteModuleManifest`, `AuthStore`, `OrchestratorSettings`
- `styles.css` — sistema de design baseado em variáveis CSS do Obsidian (compatível com temas)
- `manifest.json`, `package.json`, `tsconfig.json`, `esbuild.config.mjs`, `versions.json`
- Build validado: `tsc` + `esbuild` → `main.js` 9.5KB sem erros
- Skill `browser-policy` reforçada com histórico de violações e alternativas documentadas

### Estrutura e Governança
- Documentação de governança em `_docs/`: PRODUTO, PROJETO, ROADMAP, BACKLOG, MODULOS, INTEGRACOES, CHANGELOG, ESTADO_ATUAL
- Repositório GitHub criado: `github.com/zandercpzed/smartwrite-orchestrator`
- 2 commits publicados ao longo do dia

### Decisões Arquiteturais
- Produto redefinido como **orquestrador** (hub que instala módulos do GitHub)
- Mecanismo de distribuição: GitHub Releases (MVP) — CDN próprio na v2 com licenças
- UI dos módulos hospedada dentro do Orchestrator (sidebar com abas)
- LLM: implementação adiada para pós-Publisher

### Adicionado
- Estrutura de documentação em `_docs/` (ESTADO_ATUAL, PRODUTO, PROJETO, ROADMAP, BACKLOG, MODULOS, INTEGRACOES, CHANGELOG)
- Skill de contexto do projeto em `.agent/skills/smartwriter-context/`
- Workflows de Vibe Coding adaptados ao contexto local-first (SOD, EOD, EOW)

### Decisões de Arquitetura
- Produto redefinido como **orquestrador** — um plugin que instala e gerencia módulos do GitHub
- Mecanismo de distribuição: GitHub Releases
- UI dos módulos hospedada dentro do Orchestrator (sidebar com abas)
- LLM: implementação adiada para pós-Publisher

---

> Versões de plugin (v0.1.0+) serão registradas aqui após o primeiro release.
