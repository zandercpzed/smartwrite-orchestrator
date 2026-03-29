# Backlog Técnico — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026

---

## ⚠️ Decisões em Aberto

### DECx-001 — Plataformas do Publisher MVP
**Pergunta:** Publisher MVP é Substack apenas, ou Substack + WordPress juntos?
**Impacto:** Define escopo do Horizonte 1.
**Status:** ⏳ Aguardando Zander

---

### DECx-002 — Fluxo "Publish Ready" no MVP
**Pergunta:** O modal de análise pré-publicação (score + feedback da Persona) é obrigatório ou opcional no MVP?
**Recomendação:** Opcional — botão "Revisar antes" vs "Publicar agora".
**Status:** ⏳ Aguardando Zander

---

### DECx-003 — Submissão ao repositório oficial do Obsidian
**Pergunta:** Submetemos o Orchestrator ao Community Plugins do Obsidian?
**Impacto:** Define toda a política de code review, tamanho do build, privacidade e release management.
**Status:** ⏳ Aguardando Zander

---

### DECx-004 — Modelo de licenciamento dos módulos
**Pergunta:** Publisher é gratuito? Companion/Analyzer são pagos?
**Status:** ⏳ Aguardando Zander

---

### DECx-005 — Localização do `.git`
**Pergunta:** `.git` fica na raiz do workspace (`_ smartwrite/`) cobrindo todos os módulos, ou cada módulo tem seu próprio `.git`?
**Recomendação:** Um `.git` por repositório (como o GitHub vai distribuir), mas com todos os repos na mesma pasta local para facilidade de desenvolvimento.
**Status:** ⏳ Aguardando rename do workspace

---

## ✅ Decisões Fechadas

| ID | Decisão | Escolha | Data |
|---|---|---|---|
| DEC-001 | Tipo de produto | Plugin orquestrador (hub) | 29 Mar 2026 |
| DEC-002 | Download de módulos | GitHub Releases (MVP) | 29 Mar 2026 |
| DEC-003 | UI dos módulos | Hospedada no Orchestrator (sidebar com abas) | 29 Mar 2026 |
| DEC-004 | LLM | Implementação futura (pós-Publisher) | 29 Mar 2026 |
| DEC-005 | Backend | Nenhum — 100% local | 29 Mar 2026 |
| DEC-006 | Caminhos nos docs | Relativos à root do workspace | 29 Mar 2026 |
| DEC-007 | Browser policy | Nunca abrir sem autorização explícita | 29 Mar 2026 |

---

### DECx-006 — Conformidade com padrões oficiais Obsidian
**Contexto:** Plugins anteriores do Zander foram rejeitados no processo de revisão da comunidade. Esta sessão iniciou a pesquisa dos padrões oficiais mas foi interrompida antes da conclusão.
**Pergunta:** Antes de avançar no código, auditar o scaffolding atual contra: `obsidianmd/obsidian-sample-plugin` e `docs.obsidian.md/Plugins/Releasing/Plugin+guidelines`
**Próximo passo:** Criar skill `obsidian-plugin-standards` com as regras compiladas.
**Status:** ⏳ Prioridade alta para próxima sessão

---

## 📋 Fila Técnica (Priorizada)

### Alta Prioridade — Desbloqueiam o Publisher
1. ✅ Scaffolding do `_smartwrite-orchestrator/` (src/, build config, manifest, styles)
2. ✅ Auditar scaffolding contra padrões oficiais Obsidian (DECx-006) — skill criada
3. ✅ Implementar `module-installer.ts` (descompactar .zip → `.obsidian/plugins/`)
4. ✅ Criar repositório e scaffolding do `smartwrite-publisher/`
5. ✅ Portar adapters Substack + WordPress (SubstackAdapter, WordPressAdapter)

### Média Prioridade — Publisher completo
6. ⏳ Auth Manager: configuração Substack/WordPress via SettingsTab
7. ⏳ Converter Markdown → HTML fiel (reutilizar `converter.ts` do legado)
8. ⏳ Leitura completa de frontmatter como cockpit de publicação
9. ⏳ Feedback visual de publicação (Notice + URL do post publicado)

### Baixa Prioridade — Pós-Publisher
10. ⏳ Módulo Companion (portar de `_ smartwrite-companion/src/`)
11. ⏳ Módulo Analyzer (portar de `_ smartwrite-analyzer/src/`)
12. ⏳ Refazer `_ smartwrite-installer` — atual não funciona em outras máquinas

---

## 🗄️ Referências Legadas

Código existente a consultar (não modificar):

| Plugin | Caminho | O Que Reaproveitar |
|---|---|---|
| Publisher legado | `_ smartwrite-publisher/src/` | Substack, Medium, WP clients; conversão MD |
| Companion legado | `_ smartwrite-companion/src/services/` | Lógica de personas e feedback |
| Analyzer legado | `_ smartwrite-analyzer/src/` | Métricas de texto |
