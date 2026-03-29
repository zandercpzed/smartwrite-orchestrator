// SCRIPT: src/core/plugin.ts
// DESCRIÇÃO: Motor central do SmartWrite Orchestrator. Gerencia o ciclo de vida
//            do plugin: settings, sidebar, módulos instalados e serviços.
// CHAMADO POR: src/main.ts
// CONTRATO: Exporta SmartWriteOrchestratorPlugin com initialize() e teardown()

import { Plugin } from "obsidian";
import { OrchestratorSettings, DEFAULT_SETTINGS } from "../types";
import { OrchestratorSidebar, SIDEBAR_VIEW_TYPE } from "../ui/OrchestratorSidebar";
import { AuthManager } from "../services/auth-manager";

export class SmartWriteOrchestratorPlugin {
	private plugin: Plugin;
	settings!: OrchestratorSettings;
	authManager!: AuthManager;

	constructor(plugin: Plugin) {
		this.plugin = plugin;
	}

	async initialize() {
		// 1. Carregar settings persistidas
		await this.loadSettings();

		// 2. Inicializar serviços
		this.authManager = new AuthManager(this);

		// 3. Registrar a sidebar view
		this.plugin.registerView(
			SIDEBAR_VIEW_TYPE,
			(leaf) => new OrchestratorSidebar(leaf, this)
		);

		// 4. Adicionar ícone na ribbon (barra lateral esquerda do Obsidian)
		this.plugin.addRibbonIcon("layers", "SmartWrite Orchestrator", () => {
			this.activateSidebar();
		});

		// 5. Comandos globais
		this.plugin.addCommand({
			id: "open-smartwrite",
			name: "Abrir SmartWrite",
			callback: () => this.activateSidebar(),
		});

		// 6. Painel de configurações
		// TODO: adicionar SettingTab após definir as settings de UI
	}

	async teardown() {
		this.plugin.app.workspace.detachLeavesOfType(SIDEBAR_VIEW_TYPE);
	}

	// ── Settings ─────────────────────────────────────────────────────────

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.plugin.loadData()
		);
	}

	async saveSettings() {
		await this.plugin.saveData(this.settings);
	}

	// ── Sidebar ──────────────────────────────────────────────────────────

	async activateSidebar() {
		const { workspace } = this.plugin.app;
		let leaf = workspace.getLeavesOfType(SIDEBAR_VIEW_TYPE)[0];

		if (!leaf) {
			leaf = workspace.getRightLeaf(false)!;
			await leaf.setViewState({ type: SIDEBAR_VIEW_TYPE, active: true });
		}

		workspace.revealLeaf(leaf);
	}
}
