# Backlog Técnico — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026 (EOD — Sessão 2)

---

## ✅ Decisões Fechadas (Esta Sessão)

| ID | Decisão | Escolha |
|---|---|---|
| DEC-T01 | Instalação do Orchestrator (MVP) | Manual — usuário copia para `.obsidian/plugins/` |
| DEC-T02 | Código dos módulos | Portar dos plugins legados, não reescrever do zero |
| DEC-T03 | Método de instalação de módulos | GitHub raw API — busca `main.js`, `manifest.json`, `styles.css` da branch `main` |
| DEC-T04 | Refazer `_ smartwrite-installer` | Backlog futuro |
| DEC-T05 | Plugins legados | Arquivar gradualmente conforme módulos forem portados |
| DEC-T06 | Convenção de versão | `0.0.X` = vault, `0.X.0` = GitHub, `1.0.0` = Obsidian Store |
| DEC-T07 | Dados pessoais no código | Proibido — sem hardcode de owner, credenciais ou dados pessoais |

---

## 🔴 Decisão Aberta — Prioridade #1

### OPEN-002 — Como o Orchestrator descobre e lista módulos

**Contexto:** Hoje usa `KNOWN_MODULES` hardcoded em `src/core/module-registry.ts`. Isso prende a arquitetura e expõe o GitHub owner implicitamente.

**Opções discutidas:**
- A) Lista default de módulos oficiais SmartWrite pré-carregados (como hoje)
- B) Usuário aponta qualquer repositório GitHub para instalar

**Posição do Zander:** Fazer as **duas coisas** — lista default + campo para repo customizado (semelhante ao `_ smartwrite-installer`).

**Status:** ⏳ **Awaiting implementation plan**

---

## 📋 Fila Técnica

### Alta Prioridade — Fechar Orchestrator MVP
1. ✅ Scaffold + build + lint sem erros
2. ✅ Auditoria padrões Obsidian (skill `obsidian-plugin-standards`)
3. ✅ `module-installer.ts` (GitHub raw API) integrado à sidebar
4. ✅ Sidebar com boxes horizontais (uma aba)
5. ✅ `OrchestratorSettingsTab` (sem dados pessoais, sem campos de módulo)
6. ✅ CSS corrigido para nova estrutura de boxes
7. ✅ v0.0.4 funcionando na vault de testes
8. ⏳ **Redefinir descoberta de módulos** (OPEN-002) — **PRÓXIMA SESSÃO**

### Média Prioridade — Publisher
9. ⏳ Definir escopo MVP do Publisher (plataformas, fluxo)
10. ⏳ Converter Markdown → HTML (portar `converter.ts` do legado)
11. ⏳ Leitura de frontmatter como cockpit de publicação
12. ⏳ Feedback visual pós-publicação (Notice + URL)

### Baixa Prioridade — Pós-Publisher
13. ⏳ Módulo Companion (portar de `_ smartwrite-companion/src/`)
14. ⏳ Módulo Analyzer (portar de `_ smartwrite-analyzer/src/`)
15. ⏳ Refazer `_ smartwrite-installer` — não funciona em outras máquinas

---

## 🗄️ Referências Legadas (somente leitura)

| Plugin | Caminho | O Que Reaproveitar |
|---|---|---|
| Publisher legado | `_ smartwrite-publisher/src/` | SubstackAdapter, WordPressAdapter, converter.ts |
| Companion legado | `_ smartwrite-companion/src/services/` | Lógica de personas e feedback |
| Analyzer legado | `_ smartwrite-analyzer/src/` | Métricas de texto |
