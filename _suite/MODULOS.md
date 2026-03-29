# Especificação de Módulos — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026

---

## O Contrato de Módulo

Todo módulo SmartWrite distribui um arquivo `smartwrite.module.json` no release, além dos arquivos padrão Obsidian (`main.js`, `manifest.json`, `styles.css`).

### Schema do `smartwrite.module.json`

```json
{
  "id": "string",                     // identificador único (slug)
  "displayName": "string",            // nome exibido na UI
  "version": "string",                // semver
  "panelComponent": "string",         // nome da classe/componente de UI
  "requiresAuth": ["string"],         // serviços que precisam de credencial
  "requiresLicense": false,           // true: módulo pago
  "minOrchestratorVersion": "string"  // versão mínima do Orchestrator
}
```

---

## Módulos Registrados

### 📤 Publisher

**ID:** `smartwrite-publisher`
**Status:** 🔲 A criar (foco atual)
**Repositório:** `zandercpzed/smartwrite-publisher`

```json
{
  "id": "smartwrite-publisher",
  "displayName": "Publisher",
  "version": "0.1.0",
  "panelComponent": "PublisherPanel",
  "requiresAuth": ["substack", "wordpress", "medium"],
  "requiresLicense": false,
  "minOrchestratorVersion": "1.0.0"
}
```

**Responsabilidades:**
- Leitura de frontmatter YAML como cockpit de publicação (`publish_to`, `audience`, `status`)
- Conversão fiel Markdown → HTML
- Publicação para Substack, WordPress, Medium
- Upload de imagens embutidas
- Publicação em lote e agendada

**Referência legada:** `_ smartwrite-publisher/src/`

---

### ✍️ Companion

**ID:** `smartwrite-companion`
**Status:** 🔵 Horizonte 2
**Repositório:** `zandercpzed/smartwrite-companion`

```json
{
  "id": "smartwrite-companion",
  "displayName": "Companion",
  "version": "0.1.0",
  "panelComponent": "CompanionPanel",
  "requiresAuth": [],
  "requiresLicense": false,
  "minOrchestratorVersion": "1.0.0"
}
```

**Responsabilidades:**
- Feedback de escrita em tempo real
- Métricas de legibilidade por sessão
- Personas de IA (feedback não técnico, estilo editorial)
- Integração com módulo Analyzer (score pré-publicação)

**Referência legada:** `_ smartwrite-companion/src/`

---

### 🔍 Analyzer

**ID:** `smartwrite-analyzer`
**Status:** 🔵 Horizonte 3
**Repositório:** `zandercpzed/smartwrite-analyzer`

```json
{
  "id": "smartwrite-analyzer",
  "displayName": "Analyzer",
  "version": "0.1.0",
  "panelComponent": "AnalyzerPanel",
  "requiresAuth": [],
  "requiresLicense": false,
  "minOrchestratorVersion": "1.0.0"
}
```

**Responsabilidades:**
- Análise macroestrutural de manuscritos longos (50k–500k palavras)
- Score "Publish Ready" pré-publicação
- Avaliação de cadência, fluidez e consistência estilística
- Integração com LanguageTool (local ou API)

**Referência legada:** `_ smartwrite-analyzer/src/`

---

## Ciclo de Vida de um Módulo no Orchestrator

```
1. Usuário abre tela de módulos no Orchestrator
2. Orchestrator lista módulos de module-registry.ts
3. Usuário clica "Instalar Publisher"
4. github-fetcher.ts → GET /repos/zandercpzed/smartwrite-publisher/releases/latest
5. Baixa asset .zip do release
6. module-installer.ts descompacta em .obsidian/plugins/smartwrite-publisher/
7. Lê smartwrite.module.json para registrar na sidebar
8. Orchestrator injeta auth e exibe aba "Publisher" na sidebar
```

---

## Como Criar um Novo Módulo

1. Criar repositório `smartwrite-{nome}` no GitHub
2. Estruturar como plugin Obsidian padrão + `smartwrite.module.json`
3. Implementar a classe de UI registrada em `panelComponent`
4. Publicar release com os assets `main.js`, `manifest.json`, `styles.css`, `smartwrite.module.json`
5. Adicionar entrada em `smartwrite-orchestrator/src/core/module-registry.ts`
