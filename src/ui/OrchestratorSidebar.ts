// SCRIPT: src/ui/OrchestratorSidebar.ts
// DESCRIÇÃO: View principal do SmartWrite Orchestrator. Sidebar com abas para
//            cada módulo instalado + aba de loja de módulos disponíveis.
// CHAMADO POR: core/plugin.ts (registerView)
// CONTRATO: Exporta OrchestratorSidebar (ItemView) e SIDEBAR_VIEW_TYPE

import { ItemView, WorkspaceLeaf, setIcon } from "obsidian";
import type { SmartWriteOrchestratorPlugin } from "../core/plugin";
import { KNOWN_MODULES } from "../core/module-registry";

export const SIDEBAR_VIEW_TYPE = "smartwrite-orchestrator";

type TabId = "store" | string; // "store" + module IDs

export class OrchestratorSidebar extends ItemView {
	private orchestrator: SmartWriteOrchestratorPlugin;
	private activeTab: TabId = "store";

	constructor(leaf: WorkspaceLeaf, orchestrator: SmartWriteOrchestratorPlugin) {
		super(leaf);
		this.orchestrator = orchestrator;
	}

	getViewType(): string {
		return SIDEBAR_VIEW_TYPE;
	}

	getDisplayText(): string {
		return "SmartWrite";
	}

	getIcon(): string {
		return "layers";
	}

	async onOpen() {
		this.render();
	}

	async onClose() {}

	// ── Render ─────────────────────────────────────────────────────────────

	private render() {
		const container = this.containerEl.children[1] as HTMLElement;
		container.empty();
		container.addClass("smartwrite-sidebar");

		this.renderTabBar(container);
		this.renderActivePanel(container);
	}

	private renderTabBar(container: HTMLElement) {
		const tabBar = container.createDiv("smartwrite-tabs");
		const installedIds = Object.keys(
			this.orchestrator.settings.installedModules
		);

		// Aba da loja (sempre visível)
		this.renderTab(tabBar, "store", "Módulos", "package");

		// Abas dos módulos instalados
		for (const id of installedIds) {
			const known = KNOWN_MODULES.find((m) => m.id === id);
			if (known) {
				this.renderTab(tabBar, id, known.displayName, known.icon);
			}
		}
	}

	private renderTab(
		parent: HTMLElement,
		id: TabId,
		label: string,
		icon: string
	) {
		const tab = parent.createDiv("smartwrite-tab");
		if (id === this.activeTab) tab.addClass("is-active");

		setIcon(tab.createSpan(), icon);
		tab.createSpan({ text: label });

		tab.addEventListener("click", () => {
			this.activeTab = id;
			this.render();
		});
	}

	private renderActivePanel(container: HTMLElement) {
		const panel = container.createDiv("smartwrite-panel");

		if (this.activeTab === "store") {
			this.renderStore(panel);
		} else {
			this.renderModulePlaceholder(panel, this.activeTab);
		}
	}

	// ── Store Tab ──────────────────────────────────────────────────────────

	private renderStore(panel: HTMLElement) {
		panel.createEl("h3", { text: "Módulos SmartWrite" });
		panel.createEl("p", {
			text: "Instale módulos diretamente do GitHub.",
			cls: "setting-item-description",
		});

		const installedIds = Object.keys(
			this.orchestrator.settings.installedModules
		);

		for (const module of KNOWN_MODULES) {
			const card = panel.createDiv("smartwrite-module-card");

			const info = card.createDiv("smartwrite-module-card-info");
			info.createEl("h3", { text: module.displayName });
			info.createEl("p", { text: module.description });

			const isInstalled = installedIds.includes(module.id);

			if (isInstalled) {
				const badge = card.createSpan({
					text: "Instalado",
					cls: "smartwrite-badge smartwrite-badge-installed",
				});
				badge.style.cssText = "background: var(--color-green); color: white;";
			} else {
				const btn = card.createEl("button", {
					text: "Instalar",
					cls: "smartwrite-btn smartwrite-btn-primary",
				});
				btn.addEventListener("click", () => {
					// TODO: chamar module-installer.ts
					console.log(`[SmartWrite] Instalar: ${module.id}`);
				});
			}
		}
	}

	// ── Module Panel Placeholder ───────────────────────────────────────────

	private renderModulePlaceholder(panel: HTMLElement, moduleId: string) {
		const known = KNOWN_MODULES.find((m) => m.id === moduleId);
		panel.createEl("h3", { text: known?.displayName ?? moduleId });
		panel.createEl("p", {
			text: "Módulo instalado. A interface será carregada aqui após implementação do módulo.",
			cls: "setting-item-description",
		});
	}
}
