# Roadmap Estratégico — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026

---

## 🛤️ A Jornada do Produto

### Horizonte 0: Fundação (✅ Concluído)
- [x] Análise competitiva do ecossistema (48 plugins mapeados)
- [x] Definição da arquitetura de orquestrador
- [x] Workflows de Vibe Coding definidos (APAE, SOD, EOD)
- [x] Documentação de produto e governança estruturada em `_docs/`

---

### Horizonte 1: Publisher MVP (🟢 Em Andamento)

**Meta:** Um usuário consegue configurar o Orchestrator, instalar o módulo Publisher e publicar um texto no Substack sem sair do Obsidian.

- [ ] Scaffolding do `smartwrite-orchestrator/` (estrutura, build, manifest)
- [ ] Scaffolding do `smartwrite-publisher/` (estrutura, build, manifest)
- [ ] Mecanismo de instalação de módulo via GitHub Releases
- [ ] Sidebar do Orchestrator com aba do Publisher
- [ ] Auth Manager: Substack (One-Click Login) e WordPress (Application Password)
- [ ] Publisher: Conversão Markdown → HTML fiel
- [ ] Publisher: Publicação simples no Substack
- [ ] Publisher: Publicação simples no WordPress
- [ ] Publisher: Leitura de frontmatter como cockpit de publicação
- [ ] Release v0.1.0 do Orchestrator + Publishers no GitHub

---

### Horizonte 2: Publisher Completo + Companion (🟡 Foco de Médio Prazo)

- [ ] Publisher: Publicação no Medium
- [ ] Publisher: Agendamento de posts
- [ ] Publisher: Upload de imagens embutidas
- [ ] Publisher: Publicação em lote (múltiplas notas)
- [ ] Companion: Módulo de escrita assistida (migrar lógica do legado)
- [ ] Companion: Métricas de legibilidade em tempo real

---

### Horizonte 3: Analyzer + IA + Loja (🔵 Médio-Longo Prazo)

- [ ] Analyzer: Análise macroestrutural de manuscritos longos
- [ ] Analyzer: Score "Publish Ready" integrado ao Publisher
- [ ] Integração LLM (API / Web / Local — decisão adiada)
- [ ] Tela de "Loja" de módulos no Orchestrator
- [ ] Submissão ao repositório oficial da comunidade Obsidian
- [ ] License Manager para módulos pagos

---

## 🗒️ Notas Estratégicas

> **Janela de oportunidade:** O `roomi-fields/content-publisher` (principal concorrente) não estava no repositório oficial da comunidade Obsidian em Abr/2025 (PR #8693 pendente). Publicar antes estabelece presença de mercado.

> **Referência de arquitetura:** Estudar o código do `roomi-fields/content-publisher` antes de implementar autenticação e multi-plataforma. Pode economizar semanas de trabalho.
