# Produto — SmartWrite Orchestrator (PRD)

**Última atualização:** 29 de Março de 2026
**Status:** Discovery concluído — Entrando em desenvolvimento

---

## 1. O Problema

O escritor moderno usa o Obsidian como seu segundo cérebro — escreve, pensa, conecta ideias. Mas quando chega a hora de **publicar**, ele sai do Obsidian, copia e cola manualmente, reconfigura formatação, faz upload de imagens, escolhe audiência... e reza para que nada quebre.

O ecossistema de plugins de publicação para Obsidian é vasto (**48 plugins catalogados** em Abr/2025), mas **fragmentado**: cada um aponta para uma plataforma, exige configuração isolada e nenhum conversa com os outros.

> *"Eu quero apertar um botão e estar publicado."*

---

## 2. A Solução

O **SmartWrite Orchestrator** é um único plugin instalado no Obsidian que:

1. **Instala e gerencia módulos** (Publisher, Companion, Analyzer) direto do GitHub — sem necessidade de acessar o repositório da comunidade Obsidian manualmente.
2. **Centraliza autenticação** — credenciais de Substack, WordPress, Medium configuradas uma vez, usadas por todos os módulos.
3. **Centraliza a interface** — uma sidebar única com abas para cada módulo instalado.
4. **Orquestra o fluxo editorial** — do rascunho à publicação, com análise de qualidade integrada (quando o módulo Analyzer estiver ativo).

---

## 3. Diferenciais

| O que o mercado tem | O que o SmartWrite Orchestrator tem |
|---|---|
| Plugins fragmentados por plataforma | Um hub que gerencia todos os módulos |
| Auth repetida em cada plugin | Auth centralizada, configurada uma vez |
| Sem IA integrada (exceto WeWrite, só WeChat) | Análise editorial com IA (módulo Analyzer — futuro) |
| UI separada para cada plugin | Uma sidebar unificada |
| Instalação manual de múltiplos plugins | Um comando instala o ecossistema todo |

---

## 4. Módulos do Ecossistema

### 4.1 Publisher (Foco Atual)
- Publicação para Substack, WordPress, Medium
- Frontmatter como cockpit de publicação
- Auth robusta (sem cookies manuais)
- Publicação em lote e agendada

### 4.2 Companion (Foco Futuro)
- Assistente de escrita em tempo real
- Personas de feedback (IA)
- Métricas de legibilidade por sessão

### 4.3 Analyzer (Foco Futuro)
- Análise macroestrutural de manuscritos longos
- Score "Publish Ready" pré-publicação
- Integração com LanguageTool

---

## 5. Integrações de Terceiros

| Serviço | Módulo | Tipo |
|---|---|---|
| Substack | Publisher | API + Auth |
| WordPress | Publisher | Application Passwords |
| Medium | Publisher | API Token |
| Longform (plugin) | Companion + Analyzer | Interoperabilidade |
| LanguageTool | Analyzer | Local ou API |

---

## 6. Restrições Arquitetônicas

- **Sem backend central:** Tudo roda na máquina do autor. Credenciais ficam nas settings do plugin.
- **Local-first:** Funciona offline; só precisa de rede para publicar e para baixar atualizações de módulos.
- **Sem monorepo complexo:** Cada módulo tem seu próprio repositório GitHub e build independente.

---

## 7. Posicionamento

> *"SmartWrite Orchestrator é o único hub de escrita e publicação para Obsidian com instalação unificada, autenticação centralizada e suporte a IA editorial."*

**Janela de oportunidade:** O principal concorrente (`roomi-fields/content-publisher`) ainda não está no repositório oficial da comunidade Obsidian (PR #8693 pendente em Abr/2025). Chegando antes, estabelecemos presença de mercado.

---

## 8. Perguntas Abertas de Produto

- [ ] **Plataformas prioritárias no Publisher MVP:** Substack primeiro? WordPress junto desde o início?
- [ ] **Fluxo "Publish Ready" é obrigatório ou opcional?** (Recomendação: opcional, para não bloquear o autor impaciente.)
- [ ] **Submetemos ao repositório oficial do Obsidian?** Define todo o processo de build e release.
- [ ] **Modelo de licenciamento dos módulos:** Todos gratuitos? Publisher pago?
