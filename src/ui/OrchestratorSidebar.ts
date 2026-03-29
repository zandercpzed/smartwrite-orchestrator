// SCRIPT: src/ui/OrchestratorSidebar.ts
// DESCRIÇÃO: View principal do SmartWrite Orchestrator.
//            Exibe todos os módulos conhecidos como boxes horizontais — com
//            status (instalado/disponível), versão e botões Instalar/Remover.
//            Sem sistema de abas — uma única tela, conforme escopo MVP.
// CHAMADO POR: core/plugin.ts (registerView)
// CONTRATO: Exporta OrchestratorSidebar (ItemView) e SIDEBAR_VIEW_TYPE

import { ItemView, WorkspaceLeaf } from "obsidian";
import type { SmartWriteOrchestratorPlugin } from "../core/plugin";
import { KNOWN_MODULES } from "../core/module-registry";

export const SIDEBAR_VIEW_TYPE = "smartwrite-orchestrator";

export class OrchestratorSidebar extends ItemView {
	private orchestrator: SmartWriteOrchestratorPlugin;

	constructor(leaf: WorkspaceLeaf, orchestrator: SmartWriteOrchestratorPlugin) {
		super(leaf);
		this.orchestrator = orchestrator;
	}

	getViewType(): string { return SIDEBAR_VIEW_TYPE; }

	// eslint-disable-next-line obsidianmd/ui/sentence-case
	getDisplayText(): string { return "SmartWrite"; }

	getIcon(): string { return "layers"; }

	async onOpen() { this.render(); }

	async onClose() {}

	// ── Render ────────────────────────────────────────────────────────────────

	render() {
		const container = this.containerEl.children[1] as HTMLElement;
		container.empty();
		container.addClass("smartwrite-sidebar");

		const installedModules = this.orchestrator.settings.installedModules;

		if (KNOWN_MODULES.length === 0) {
			container.createEl("p", {
				text: "Nenhum módulo disponível.",
				cls: "setting-item-description",
			});
			return;
		}

		for (const mod of KNOWN_MODULES) {
			this.renderModuleBox(container, mod, installedModules[mod.id]);
		}
	}

	// ── Module Box ───────────────────────────────────────────────────────────

	private renderModuleBox(
		container: HTMLElement,
		mod: typeof KNOWN_MODULES[number],
		installedVersion: string | undefined
	) {
		const box = container.createDiv("smartwrite-module-card");

		// Cabeçalho: nome + badge de status
		const header = box.createDiv("smartwrite-module-card-header");
		header.createEl("h3", { text: mod.displayName });

		const isInstalled = !!installedVersion;

		const badge = header.createSpan({
			cls: `smartwrite-badge ${isInstalled ? "smartwrite-badge-installed" : "smartwrite-badge-available"}`,
		});
		badge.setText(isInstalled ? "● Instalado" : "Disponível");

		// Descrição
		box.createEl("p", {
			text: mod.description,
			cls: "setting-item-description",
		});

		// Rodapé: versão + ação
		const footer = box.createDiv("smartwrite-module-card-footer");

		footer.createSpan({
			text: isInstalled ? `v${installedVersion}` : "—",
			cls: "smartwrite-module-version",
		});

		if (isInstalled) {
			const removeBtn = footer.createEl("button", {
				text: "Remover",
				cls: "smartwrite-btn smartwrite-btn-danger",
			});
			removeBtn.addEventListener("click", () => {
				removeBtn.setText("Removendo…");
				removeBtn.setAttr("disabled", "true");
				this.orchestrator.installer
					.uninstall(mod.id)
					.then(() => { this.render(); })
					.catch((err: Error) => {
						console.error(`[SmartWrite] Falha ao remover ${mod.id}:`, err);
						removeBtn.setText("Remover");
						removeBtn.removeAttribute("disabled");
					});
			});
		} else {
			const installBtn = footer.createEl("button", {
				text: "Instalar",
				cls: "smartwrite-btn smartwrite-btn-primary",
			});
			installBtn.addEventListener("click", () => {
				installBtn.setText("Instalando…");
				installBtn.setAttr("disabled", "true");
				this.orchestrator.installer
					.install(mod.id, mod.repo)
					.then(() => { this.render(); })
					.catch((err: Error) => {
						console.error(`[SmartWrite] Falha ao instalar ${mod.id}:`, err);
						installBtn.setText("Instalar");
						installBtn.removeAttribute("disabled");
					});
			});
		}
	}
}
