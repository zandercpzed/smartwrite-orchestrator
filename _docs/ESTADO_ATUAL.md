# ESTADO ATUAL — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026
**Fase:** Estruturação — Documentação concluída, scaffolding do plugin pendente

---

## 🎯 O Que Está Acontecendo Agora

Documentação de governança criada e organizada em `_smartwrite-orchestrator/_docs/`. Próximo passo: scaffolding do código do plugin em `_smartwrite-orchestrator/src/`.

---

## 📁 Mapa do Workspace

```
_ smartwrite/                              ← root do workspace
 ┣ _smartwrite-orchestrator/              ← Plugin orquestrador (repositório ativo)
 ┃  ┣ .git/                               ← Git local (remote: github.com/zandercpzed/smartwrite-orchestrator)
 ┃  ┣ .gitignore
 ┃  ┣ _docs/                              ← Documentação viva (este documento)
 ┃  ┃  ┣ ESTADO_ATUAL.md
 ┃  ┃  ┣ PRODUTO.md
 ┃  ┃  ┣ PROJETO.md
 ┃  ┃  ┣ ROADMAP.md
 ┃  ┃  ┣ BACKLOG.md
 ┃  ┃  ┣ CHANGELOG.md
 ┃  ┃  ┣ MODULOS.md
 ┃  ┃  ┣ INTEGRACOES.md
 ┃  ┃  ┣ _historico/                      ← Docs legados arquivados
 ┃  ┃  ┗ _ideacao/
 ┃  ┗ src/                                ← 🔲 A criar — código do plugin
 ┣ .agent/
 ┃  ┗ skills/smartwriter-context/SKILL.md ← Skill de contexto do projeto
 ┣ shared-configs/                        ← tsconfig base compartilhado
 ┣ _ smartwrite-analyzer/                 ← 🗄️ Legado (read-only)
 ┣ _ smartwrite-companion/                ← 🗄️ Legado (read-only)
 ┣ _ smartwrite-publisher/                ← 🗄️ Legado (read-only)
 ┗ _ smartwrite-installer/                ← 🗄️ Fora de escopo
```

---

## ✅ Decisões Arquiteturais Confirmadas

| Decisão | Escolha |
|---|---|
| Tipo de produto | Plugin Obsidian único (orquestrador) |
| Repositório GitHub | `github.com/zandercpzed/smartwrite-orchestrator` |
| Download de módulos | GitHub Releases (GitHub API v3) |
| UI dos módulos | Hospedada dentro do Orchestrator (sidebar com abas) |
| LLM | Implementação futura (pós-Publisher) |
| Backend | Nenhum — 100% local |
| Caminhos nos docs | Relativos à root do workspace |

---

## 🔲 Próximo Passo Imediato

Criar o scaffolding do plugin em `_smartwrite-orchestrator/`:
- `src/` com estrutura de módulos
- `manifest.json`, `package.json`, `esbuild.config.mjs`, `tsconfig.json`
- `main.ts` como entry point do Obsidian

Após scaffolding: `git push --force` para o GitHub.

---

## 🗄️ Plugins Legados (Referência de Código)

| Plugin | Caminho | O que aproveitar |
|---|---|---|
| Publisher | `_ smartwrite-publisher/src/` | Clients Substack/WP/Medium, conversão MD |
| Companion | `_ smartwrite-companion/src/` | Lógica de personas e serviços |
| Analyzer | `_ smartwrite-analyzer/src/` | Métricas de texto |
