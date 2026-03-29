# Visão Estratégica — SmartWrite

**Status:** Ideação Ativa — Discovery Concluído
**Última atualização:** 28 de Março de 2026

> Este documento é um espaço de ideação livre. As ideias aqui registradas ainda não são compromissos de produto. Quando amadurecerem, serão promovidas para `PRODUTO.md`.

---

## 1. O Problema Central

O escritor moderno usa o Obsidian como seu segundo cérebro — escreve, pensa, conecta ideias. Mas quando chega a hora de **publicar**, ele tem de sair do Obsidian, navegar manualmente até o Substack ou WordPress, copiar e colar, reconfigurar formatação, fazer upload de imagens, escolher audiência... e rezar para que nada quebre.

O ecossistema de plugins de publicação para Obsidian é vasto (**48 plugins catalogados** em Abr/2025), mas **extremamente fragmentado**: cada um aponta para uma plataforma, exige configuração isolada e nenhum conversa com os outros.

**A dor real não é técnica. É de atrito:**
> *"Eu quero apertar um botão e estar publicado."*

---

## 2. O Território que é Nosso

Existem três universos de "publicar a partir do Obsidian":

| Universo | Destino | Exemplo de Solução Existente |
|---|---|---|
| 🌐 **Conhecimento Permanente** | Wiki, Garden, Segundo Cérebro | Obsidian Publish ($8/mês), Quartz |
| 📰 **Conteúdo Editorial** | Newsletter, Blog, Post de Alcance | Substack, WordPress ← **nosso** |
| 🔗 **Compartilhamento Rápido** | Link efêmero para uma nota | Share Note (grátis, criptografado) |

O SmartWrite vive no universo central — **conteúdo editorial com destino, audiência e cadência.** E esse é o menos bem resolvido porque exige autenticação estável, conversão fiel de Markdown e gerenciamento de estado (rascunho / publicado / agendado).

---

## 3. O Diferencial Que Ninguém Tem

Dos 48 plugins de publicação mapeados, **apenas um tem IA integrada**: o *WeWrite* (nº 45 do catálogo), focado exclusivamente no mercado chinês (WeChat Official Accounts). Nenhum plugin em língua inglesa ou com alcance global combina escrita assistida por IA com publicação.

O SmartWrite pode ser o **primeiro plugin ocidental** onde a publicação é consequência de um processo editorial inteligente — não um botão no vácuo.

**Conceito: "Publish Ready"**
> O texto recebe um score antes de ir ao ar. A Persona lê o rascunho e diz: *"3 frases excessivamente longas. Parágrafo de abertura fraco. Deseja revisar ou publicar assim?"* O usuário decide, mas nunca publica sem saber.

Isso transforma o SmartWrite de um **utilitário de publicação** num **companheiro editorial**.

---

## 4. Ideias em Cozimento

### 💡 Ideia 1 — Frontmatter como cockpit do autor
O autor controla o destino e parâmetros de publicação direto no YAML da nota, sem abrir modais:

```yaml
---
publish_to: substack
audience: paid
section: tecnologia
status: ready
tags: [IA, escrita, ferramentas]
---
```

O plugin lê e executa. Isso é o padrão do ecossistema (`roomi-fields`, `devbean`) e elimina 90% do atrito de configuração por nota.

---

### 💡 Ideia 2 — "One nota, múltiplos destinos" com hierarquia inteligente
Fluxo editorial em cascata:
1. Publica no **WordPress** primeiro (conteúdo próprio, indexável, SEO).
2. Depois publica no **Substack** com backlink automático para o WP.
3. Opcionalmente re-share no **LinkedIn** com excerpto gerado pela IA.

Este fluxo é exatamente o que `roomi-fields/content-publisher` já implementa. Precisamos entender o código deles a fundo antes de reinventar a roda.

---

### 💡 Ideia 3 — IA como "editor fantasma" pré-publicação
Integrar o motor de análise (herdeiro do Analyzer) diretamente no fluxo de publicação:
- O score de legibilidade aparece no painel do Publisher.
- A Persona (herdeira do Companion) dá um feedback final curto, não técnico: *"Esse é o seu melhor parágrafo de abertura até hoje."*
- O autor publica com confiança ou com consciência.

---

### 💡 Ideia 4 — Autenticação robusta sem cookies manuais
O maior ponto fraco do nosso Publisher atual: pedir ao usuário para copiar cookies manualmente é frágil e frustrante. A referência do `roomi-fields` resolve isso com **One-Click Login automático** para Substack e **Application Passwords** para WordPress.

Isso precisa ser tratado como requisito não-negociável na consolidação.

---

## 5. O que Aprendemos com a Competição

| Plugin | Destaque | Ponto Fraco | IA? |
|---|---|---|---|
| `roomi-fields/content-publisher` | Multi-plataforma, auth robusta, LinkedIn, image upload | Sem análise de qualidade | ❌ |
| `devbean/obsidian-wordpress` | Múltiplos perfis WP, Application Passwords, estável | Só WP, sem Substack | ❌ |
| `WeWrite` | Publica no WeChat com polishing e tradução por IA | Só mercado chinês (WeChat) | ✅ |
| `Obsidian Publish` (oficial) | UX perfeita, integrada nativamente | PKM, não editorial/newsletter | ❌ |
| `Share Note` | Compartilhamento instantâneo, zero config, criptografado | Não é editorial com audiência | ❌ |

---

## 6. Síntese Competitiva — A Janela de Oportunidade

```
O que o mercado tem (48 plugins):
├── Muitos destinos separados, zero inteligência editorial
├── roomi-fields → melhor publisher ocidental, sem IA,
│   ainda NÃO aprovado no repositório oficial do Obsidian (PR #8693 pendente)
├── WeWrite → único com IA, mas exclusivamente para WeChat (China)
└── devbean/wp → sólido mas dated (sem updates há 2 anos)

O que nenhum tem:
└── Um plugin que acompanha a escrita E publica, com IA
    como co-piloto do fluxo editorial inteiro
```

> [!IMPORTANT]
> **A janela está aberta.** O `roomi-fields/content-publisher` (nosso principal concorrente) ainda não está no repositório oficial da comunidade Obsidian. Se submetermos o SmartWrite consolidado com diferencial de IA antes da aprovação do PR #8693 deles, chegamos primeiro no radar dos usuários que instalam plugins pelo Obsidian.

**O posicionamento que emerge naturalmente:**
> *"SmartWrite é o único plugin do Obsidian que te acompanha desde a primeira palavra até a publicação — com inteligência editorial em cada etapa."*

---

## 7. Próximas Perguntas a Responder

Antes de o PRODUTO.md ser escrito, precisamos ter respostas para:

- [ ] **Quais plataformas são prioridade?** Substack primeiro? WordPress junto? LinkedIn na v2?
- [ ] **A IA é local (Ollama) ou via API?** Isso define o público. Ollama = técnicos. API Key = qualquer um.
- [ ] **O fluxo "Publish Ready" é obrigatório ou opcional?** (Recomendo opcional, para não travar o autor impaciente.)
- [ ] **Qual é o nome do plugin consolidado?** SmartWrite? SmartWrite Studio? Algo novo?
- [ ] **Submetemos ao repositório oficial do Obsidian?** Define todo o processo de setup, build e release management.
- [ ] **Estudamos o código do `roomi-fields` antes de começar?** Pode economizar meses de trabalho.
