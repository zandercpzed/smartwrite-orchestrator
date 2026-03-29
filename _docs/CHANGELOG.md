# CHANGELOG — SmartWrite Orchestrator

**Formato:** [Semver](https://semver.org/) — `MAJOR.MINOR.PATCH`

---

## [Não publicado] — Trabalho em andamento

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
