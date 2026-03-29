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

---

## 📋 Fila Técnica (Priorizada)

### Alta Prioridade — Desbloqueiam o Publisher
1. Scaffolding do `smartwrite-orchestrator/`
2. Scaffolding do `smartwrite-publisher/`
3. Ler código do `roomi-fields/content-publisher` como referência de auth e multi-plataforma
4. Implementar `github-fetcher.ts` e `module-installer.ts`

### Média Prioridade — Publisher completo
5. Auth Manager: Substack One-Click Login
6. Auth Manager: WordPress Application Passwords
7. Conversão Markdown → HTML fiel
8. Leitura de frontmatter como cockpit

### Baixa Prioridade — Pós-Publisher
9. Módulo Companion (migrar lógica de `_ smartwrite-companion/src/`)
10. Tela de "loja" de módulos no Orchestrator
11. Módulo Analyzer

---

## 🗄️ Referências Legadas

Código existente a consultar (não modificar):

| Plugin | Caminho | O Que Reaproveitar |
|---|---|---|
| Publisher legado | `_ smartwrite-publisher/src/` | Substack, Medium, WP clients; conversão MD |
| Companion legado | `_ smartwrite-companion/src/services/` | Lógica de personas e feedback |
| Analyzer legado | `_ smartwrite-analyzer/src/` | Métricas de texto |
