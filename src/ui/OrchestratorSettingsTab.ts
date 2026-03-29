/* eslint-disable obsidianmd/ui/sentence-case */
// SCRIPT: src/ui/OrchestratorSettingsTab.ts
// DESCRIÇÃO: Painel de configurações do SmartWrite Orchestrator.
//            Gerencia credenciais Substack e WordPress centralmente.
//            Acessível em Obsidian Settings > SmartWrite.
// CHAMADO POR: src/core/plugin.ts (addSettingTab)
// CONTRATO: Exporta OrchestratorSettingsTab que estende PluginSettingTab

import { App, PluginSettingTab, Setting } from "obsidian";
import type { Plugin } from "obsidian";
import type { SmartWriteOrchestratorPlugin } from "../core/plugin";

export class OrchestratorSettingsTab extends PluginSettingTab {
	private orchestrator: SmartWriteOrchestratorPlugin;

	constructor(app: App, plugin: Plugin, orchestrator: SmartWriteOrchestratorPlugin) {
		super(app, plugin);
		this.orchestrator = orchestrator;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.renderSubstackSection(containerEl);
		this.renderWordPressSection(containerEl);
	}

	// ── Substack ─────────────────────────────────────────────────────────────

	private renderSubstackSection(el: HTMLElement): void {
		 
		new Setting(el).setName("Substack").setHeading();

		new Setting(el)
			 
			.setName("URL da publicação")
			.setDesc("Ex: meusite.substack.com")
			.addText((text) =>
				text
					.setPlaceholder("meusite.substack.com")
					.setValue("")
					.onChange(async (_value) => {
						// TODO: armazenar URL da publicação Substack
					})
			);

		new Setting(el)
			 
			.setName("Cookie (connect.sid)")
			.setDesc(
				"Obtenha em DevTools → Application → Cookies depois de fazer login no Substack."
			)
			.addText((text) => {
				text.inputEl.type = "password";
				return text
					.setPlaceholder("s%3A…")
					.setValue(this.orchestrator.settings.auth.substack?.sessionCookie ?? "")
					.onChange(async (value) => {
						this.ensureSubstack();
						this.orchestrator.settings.auth.substack!.sessionCookie = value.trim();
						await this.orchestrator.saveSettings();
					});
			});
	}

	// ── WordPress ────────────────────────────────────────────────────────────

	private renderWordPressSection(el: HTMLElement): void {
		 
		new Setting(el).setName("WordPress").setHeading();

		const wp = this.getDefaultWordPress();

		new Setting(el)
			 
			.setName("URL do site")
			 
			.setDesc("Ex: https://meusite.com.br")
			.addText((text) =>
				text
					.setPlaceholder("https://meusite.com.br")
					.setValue(wp?.url ?? "")
					.onChange(async (value) => {
						this.setDefaultWordPress({ url: value.trim() });
						await this.orchestrator.saveSettings();
					})
			);

		new Setting(el)
			 
			.setName("Usuário")
			 
			.setDesc("Nome de usuário do WordPress (login).")
			.addText((text) =>
				text
					.setPlaceholder("admin")
					.setValue(wp?.username ?? "")
					.onChange(async (value) => {
						this.setDefaultWordPress({ username: value.trim() });
						await this.orchestrator.saveSettings();
					})
			);

		new Setting(el)
			.setName("Application password")
			 
			.setDesc("Gerada em WP Admin → Usuários → seu perfil → Application Passwords.")
			.addText((text) => {
				text.inputEl.type = "password";
				return text
					.setPlaceholder("xxxx xxxx xxxx xxxx xxxx xxxx")
					.setValue(wp?.appPassword ?? "")
					.onChange(async (value) => {
						this.setDefaultWordPress({ appPassword: value.trim() });
						await this.orchestrator.saveSettings();
					});
			});
	}

	// ── Helpers ───────────────────────────────────────────────────────────────

	private ensureSubstack(): void {
		if (!this.orchestrator.settings.auth.substack) {
			this.orchestrator.settings.auth.substack = { sessionCookie: "" };
		}
	}

	private getDefaultWordPress() {
		return this.orchestrator.settings.auth.wordpress?.["default"];
	}

	private setDefaultWordPress(
		patch: Partial<{ url: string; username: string; appPassword: string }>
	): void {
		if (!this.orchestrator.settings.auth.wordpress) {
			this.orchestrator.settings.auth.wordpress = {};
		}
		const current = this.orchestrator.settings.auth.wordpress["default"] ?? {
			url: "",
			username: "",
			appPassword: "",
		};
		this.orchestrator.settings.auth.wordpress["default"] = { ...current, ...patch };
	}
}
