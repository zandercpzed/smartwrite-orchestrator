# Projeto de Engenharia — SmartWrite Orchestrator

**Última atualização:** 29 de Março de 2026
**Status:** Documentação concluída — scaffolding do plugin pendente

---

## 1. Visão Técnica

O **SmartWrite Orchestrator** é um plugin Obsidian do tipo hub/orquestrador. Ele instala, gerencia e hospeda a interface gráfica de módulos independentes distribuídos via GitHub Releases. É a espinha dorsal de autenticação, licenciamento e UI de todo o ecossistema SmartWrite.

**Referência de implementação:** [BRAT](https://github.com/TfTHacker/obsidian42-brat) — plugin da comunidade Obsidian que instala plugins beta do GitHub. Usaremos o mesmo mecanismo de download de releases.

---

## 2. Arquitetura Geral

```
[Obsidian]
    └── [SmartWrite Orchestrator] (Plugin instalado pelo usuário)
             ├── Sidebar: abas por módulo instalado
             ├── Auth Manager: credenciais centralizadas
             ├── License Manager: validação de licenças
             └── Module Installer: GitHub Releases → .obsidian/plugins/
                      ├── smartwrite-publisher    (módulo independente)
                      ├── smartwrite-companion    (módulo independente)
                      └── smartwrite-analyzer     (módulo independente)
```

---

## 3. Mecanismo de Instalação de Módulos

**Decisão:** GitHub Releases (MVP)

Fluxo:
1. Orchestrator consulta `https://api.github.com/repos/zandercpzed/{repo}/releases/latest`
2. Baixa o `.zip` do release asset
3. Extrai `main.js` + `manifest.json` + `styles.css` + `smartwrite.module.json`
4. Copia para `.obsidian/plugins/{module-id}/`
5. Registra o `panelComponent` na sidebar do Orchestrator

**Evolução:** Quando houver licenciamento, migrar para endpoint próprio que valida chave antes de entregar o release.

---

## 4. Estrutura de Repositórios

```
GitHub: zandercpzed/
 ┣ smartwrite-orchestrator    ← Plugin principal
 ┣ smartwrite-publisher       ← Módulo Publisher (foco atual)
 ┣ smartwrite-companion       ← Módulo Companion
 ┗ smartwrite-analyzer        ← Módulo Analyzer
```

Workspace local (paths relativos à root `_ smartwrite/`):
```
_ smartwrite/
 ┣ _smartwrite-orchestrator/  ← Plugin orquestrador + documentação
 ┃  ┣ _suite/                 ← Documentação viva co-localizada
 ┃  ┗ src/                    ← Código do plugin (a criar)
 ┣ .agent/                    ← Skills e Workflows (nível workspace)
 ┣ shared-configs/            ← tsconfig base
 ┣ _ smartwrite-publisher/    ← 🗄️ Legado (read-only)
 ┣ _ smartwrite-companion/    ← 🗄️ Legado (read-only)
 ┣ _ smartwrite-analyzer/     ← 🗄️ Legado (read-only)
 ┗ _ smartwrite-installer/    ← 🗄️ Fora de escopo
```

---

## 5. Estrutura do Plugin Orquestrador

```
_smartwrite-orchestrator/
 ┣ src/
 ┃  ┣ core/
 ┃  ┃  ┣ plugin.ts              ← Entry point, inicializa módulos
 ┃  ┃  ┗ module-registry.ts     ← Catálogo dos módulos conhecidos
 ┃  ┣ installer/
 ┃  ┃  ┣ github-fetcher.ts      ← GitHub API: consulta e baixa releases
 ┃  ┃  ┣ module-installer.ts    ← Descompacta, copia para plugins/
 ┃  ┃  ┗ module-updater.ts      ← Verifica e aplica atualizações
 ┃  ┣ services/
 ┃  ┃  ┣ auth-manager.ts        ← Centraliza credenciais (Substack, WP, Medium)
 ┃  ┃  ┗ license-manager.ts     ← Validação de licenças dos módulos pagos
 ┃  ┣ ui/
 ┃  ┃  ┣ OrchestratorSidebar.ts ← Hub: abas por módulo instalado
 ┃  ┃  ┣ store/                 ← Tela de módulos disponíveis para instalação
 ┃  ┃  ┗ settings/              ← Painel de settings centralizado
 ┃  ┗ types/
 ┃     ┗ index.ts               ← SmartWriteModule interface
 ┣ _suite/                      ← Documentação do projeto
 ┣ main.ts                      ← Entry do Obsidian
 ┣ manifest.json
 ┣ styles.css
 ┣ esbuild.config.mjs
 ┣ tsconfig.json
 ┗ package.json
```

---

## 6. Contrato de Módulo (`smartwrite.module.json`)

Cada módulo distribui este arquivo no release:

```json
{
  "id": "smartwrite-publisher",
  "displayName": "Publisher",
  "version": "1.0.0",
  "panelComponent": "PublisherPanel",
  "requiresAuth": ["substack", "wordpress"],
  "requiresLicense": false,
  "minOrchestratorVersion": "1.0.0"
}
```

---

## 7. Tech Stack

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Plataforma alvo | Obsidian (Electron / Node) |
| Build system | esbuild |
| Download de módulos | GitHub API v3 + Node `https` |
| Armazenamento | Obsidian settings (`loadData/saveData`) |
| IA/LLM | Implementação futura |

---

## 8. Referências de Código Legado

Antes de implementar cada módulo, consultar:

| Módulo | Referência | Caminho |
|---|---|---|
| Publisher | SmartWrite Publisher legado | `_ smartwrite-publisher/src/` |
| Companion | SmartWrite Companion legado | `_ smartwrite-companion/src/` |
| Analyzer | SmartWrite Analyzer legado | `_ smartwrite-analyzer/src/` |
