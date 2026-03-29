/* eslint-disable obsidianmd/ui/sentence-case */
// SCRIPT: src/ui/OrchestratorSettingsTab.ts
// DESCRIÇÃO: Painel de configurações do SmartWrite Orchestrator.
//            Mostra apenas configurações do próprio Orchestrator.
//            Configurações de módulos (ex: Publisher) aparecem aqui
//            somente quando o módulo estiver instalado.
// CHAMADO POR: src/core/plugin.ts (addSettingTab)
// CONTRATO: Exporta OrchestratorSettingsTab que estende PluginSettingTab

import { App, PluginSettingTab, Setting } from "obsidian";
import type { Plugin } from "obsidian";
import type { SmartWriteOrchestratorPlugin } from "../core/plugin";
import { KNOWN_MODULES } from "../core/module-registry";

export class OrchestratorSettingsTab extends PluginSettingTab {
	private orchestrator: SmartWriteOrchestratorPlugin;

	constructor(app: App, plugin: Plugin, orchestrator: SmartWriteOrchestratorPlugin) {
		super(app, plugin);
		this.orchestrator = orchestrator;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.renderInstalledModulesSection(containerEl);
	}

	// ── Installed modules settings ────────────────────────────────────────────

	private renderInstalledModulesSection(el: HTMLElement): void {
		const installedIds = Object.keys(this.orchestrator.settings.installedModules);

		if (installedIds.length === 0) {
			new Setting(el).setName("Módulos").setHeading();
			el.createEl("p", {
				text: "Nenhum módulo instalado. Instale módulos pela sidebar do SmartWrite para ver suas configurações aqui.",
				cls: "setting-item-description",
			});
			return;
		}

		for (const id of installedIds) {
			const mod = KNOWN_MODULES.find((m) => m.id === id);
			if (!mod) continue;

			const version = this.orchestrator.settings.installedModules[id] ?? "";
			new Setting(el)
				.setName(`${mod.displayName} v${version}`)
				.setHeading();

			// Cada módulo registrará seus próprios campos aqui no futuro
			el.createEl("p", {
				text: "As configurações deste módulo serão registradas aqui após sua implementação completa.",
				cls: "setting-item-description",
			});
		}
	}
}
