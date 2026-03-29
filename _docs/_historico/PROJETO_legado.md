# Projeto de Engenharia — SmartWrite Suite

**Última atualização:** 28 de Março de 2026

Este documento é a "Planta Baixa" técnica do ecossistema SmartWrite, um conjunto de plugins voltados para potencializar fluxos editoriais diretamente no Obsidian.

---

## 1. Visão Geral e Metodologia

O desenvolvimento opera através de **Vibe Coding** (Humano + Agente) sob o protocolo **APAE** (Analyze, Plan, Authorize, Execute). O foco aqui é **Local-First**, aproveitando o ambiente do Obsidian e do GitHub para versionamento pesado, eliminando a complicação de deploys na nuvem.

---

## 2. Arquitetura do Repositório (Monorepo-Style)

O repositório abriga os plugins desenvolvidos de forma independente.

```text
📦 smartwrite/
 ┣ 📂 _ smartwrite-analyzer/   👉 Plugin: Co-piloto de análise literária
 ┣ 📂 _ smartwrite-companion/  👉 Plugin: Assistente de escrita inteligente
 ┣ 📂 _ smartwrite-publisher/  👉 Plugin: Automação para Substack
 ┣ 📂 shared-configs/          👉 Tipagens e Configurações base (tsconfig)
 ┣ 📂 .agent/                  👉 Skills e Workflows do Vibe Coding
 ┗ 📂 _docs/                   👉 Documentação Viva (Backlog, Roadmap, Produto)
```

> [!NOTE]
> **Componentes Fora de Escopo:** Arquivos relacionados ao "SmartWrite Installer" (pasta `_ smartwrite-installer` e `_application`) são utilitários de distribuição e **não fazem parte do escopo de produto principal durante ciclos de Vibe Coding**.

---

## 3. Tech Stack

Por estarmos contidos no ecossistema do Obsidian, não dependemos de arquitetura em nuvem própria:
- **Linguagem:** TypeScript e JavaScript
- **Build System:** esbuild / Vite (dependendo do plugin)
- **Plataforma Alvo:** Obsidian (Electron/Node)
- **IA/Integrações:** Executado tipicamente via chamadas seguras (OpenAI/Anthropic APIs) ou modelos locais (ex: LM Studio), conforme configurado em cada plugin pelo usuário.

---

## 4. Status de Infraestrutura e Workflows

Dado o contexto estritamente local (Obsidian + Git):
- **Nenhum provedor de Cloud:** Não há scripts de CI/CD para Firebase, GCP ou AWS.
- **Desenvolvimento Simples:** Compilação com `npm run build` gerando `main.js`, `manifest.json` e `styles.css`.
- **Workflows:** `/sod` (Start of Day), `/eod` (Fechamento) e `/eow` (Revisão Semanal).

**Limpeza Periódica:** Manter o histórico do Git enxuto removendo builds pesados da pasta `node_modules`.
