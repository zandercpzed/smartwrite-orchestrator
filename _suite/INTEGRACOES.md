# Integrações — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026

---

## Plataformas de Publicação (módulo Publisher)

### Substack

**Autenticação:** One-Click Login (cookie de sessão obtido automaticamente)
**Decisão:** Evitar cookies manuais — é o maior ponto de atrito do Publisher legado (ver `_ smartwrite-publisher/src/substack/`)
**Referência de implementação:** `roomi-fields/content-publisher` implementa auth automática. Estudar antes de implementar.

**Operações:**
- `POST /api/v1/drafts` — criar rascunho
- `PUT /api/v1/posts/{id}/publish` — publicar
- `POST /api/v1/drafts/{id}/schedule` — agendar

**Frontmatter mapeado:**
```yaml
publish_to: substack
audience: free | paid | everyone
status: draft | ready
```

---

### WordPress (self-hosted e .com)

**Autenticação:** Application Passwords (nativo no WP 5.6+)
**Endpoint:** REST API (`/wp-json/wp/v2/`)
**Referência:** `devbean/obsidian-wordpress` — implementação madura, estudar antes

**Operações:**
- `POST /wp-json/wp/v2/posts` — criar post
- `POST /wp-json/wp/v2/media` — upload de imagem

**Frontmatter mapeado:**
```yaml
publish_to: wordpress
wp_profile: meu-blog        # perfil configurado no Auth Manager
status: publish | draft
categories: [tech, escrita]
```

---

### Medium

**Autenticação:** Integration Token (gerado em Account > Security > Integration Tokens)
**Endpoint:** `https://api.medium.com/v1/`

**Operações:**
- `POST /v1/users/{userId}/posts` — publicar post
- `POST /v1/images` — upload de imagem

**Frontmatter mapeado:**
```yaml
publish_to: medium
publish_status: public | draft | unlisted
tags: [tag1, tag2]
canonical_url: https://meu-blog.com/post  # opcional
```

---

## Plugins Obsidian Compatíveis

### Longform

**Tipo:** Plugin Obsidian existente (instalar separado)
**Repositório:** `kevboh/longform`
**Como interage com SmartWrite:**
- O Longform organiza projetos de escrita longa em cenas/capítulos
- O Analyzer lê a estrutura de projetos Longform para análise macroestrutural
- O Publisher pode publicar seções individuais de um projeto Longform

**Convenção:** SmartWrite respeita o frontmatter do Longform (`longform: true`, `longform-title`)

---

### LanguageTool

**Modo local:** Servidor em `http://localhost:8081` (Docker ou instalação nativa)
**Modo API:** `https://api.languagetool.org/v2/check`
**Responsável:** Módulo Analyzer

**Integração:**
- Analyzer envia texto via POST para LanguageTool
- Exibe sugestões diretamente no painel do Analyzer
- Suporte a PT-BR e EN-US

**Configuração esperada nas settings:**
```
LanguageTool URL: http://localhost:8081 (default)
Idioma: pt-BR
```

---

## Auth Manager — Serviços Centralizados

O Orchestrator mantém uma store central de credenciais, acessível por todos os módulos:

```typescript
interface AuthStore {
  substack?: { sessionCookie: string }
  wordpress?: { [profile: string]: { url: string; username: string; appPassword: string } }
  medium?: { integrationToken: string }
}
```

Credenciais armazenadas via `plugin.saveData()` — ficam no vault Obsidian do usuário, nunca saem da máquina.
