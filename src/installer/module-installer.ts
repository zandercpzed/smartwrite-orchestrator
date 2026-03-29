// SCRIPT: src/installer/module-installer.ts
// DESCRIÇÃO: Instala um módulo SmartWrite diretamente do repositório GitHub.
//            Busca main.js, manifest.json e styles.css via GitHub raw API
//            e os copia para .obsidian/plugins/{id}/ — mesma abordagem do
//            _ smartwrite-installer (shell/Swift).
// CHAMADO POR: ui/OrchestratorSidebar.ts (botão "Instalar")
// CONTRATO: Exporta ModuleInstaller com install(moduleId, repo) e uninstall(moduleId)

import * as fs from "fs";
import * as path from "path";
import { App, Notice, requestUrl } from "obsidian";
import type { OrchestratorSettings } from "../types";

// ── Arquivos a sincronizar ────────────────────────────────────────────────────

const PLUGIN_FILES = ["main.js", "manifest.json", "styles.css"] as const;

// ── ModuleInstaller ───────────────────────────────────────────────────────────

export class ModuleInstaller {
	private readonly app: App;
	private readonly settings: OrchestratorSettings;
	private readonly onInstallComplete: (moduleId: string, version: string) => Promise<void>;

	constructor(
		app: App,
		settings: OrchestratorSettings,
		onInstallComplete: (moduleId: string, version: string) => Promise<void>
	) {
		this.app = app;
		this.settings = settings;
		this.onInstallComplete = onInstallComplete;
	}

	// ── Public API ────────────────────────────────────────────────────────────

	/**
	 * Instala um módulo SmartWrite buscando os arquivos via GitHub raw API.
	 * Equivalente ao `git clone` do smartwrite-installer, mas dentro do Obsidian.
	 *
	 * URL base: https://raw.githubusercontent.com/{repo}/main/{file}
	 */
	async install(moduleId: string, repo: string): Promise<void> {
		new Notice(`SmartWrite: instalando ${moduleId}…`);

		const pluginDir = this.resolvePluginDir(moduleId);
		this.ensureDir(pluginDir);

		// Buscar e salvar cada arquivo da branch main do repositório
		let version = "desconhecida";

		for (const fileName of PLUGIN_FILES) {
			const url = `https://raw.githubusercontent.com/${repo}/main/${fileName}`;

			const response = await requestUrl({ url, throw: false });

			if (response.status === 404 && fileName === "styles.css") {
				// styles.css é opcional — criar arquivo vazio
				fs.writeFileSync(path.join(pluginDir, fileName), "", "utf-8");
				continue;
			}

			if (response.status !== 200) {
				throw new Error(
					`Falha ao baixar "${fileName}" de ${repo}: HTTP ${response.status}.\n` +
					`Verifique se o repositório existe e tem o arquivo na branch main.`
				);
			}

			// Extrair versão do manifest.json
			if (fileName === "manifest.json") {
				try {
					const manifest = JSON.parse(response.text) as { version?: string };
					version = manifest.version ?? version;
				} catch {
					// manifest malformado — continuar mesmo assim
				}
			}

			fs.writeFileSync(path.join(pluginDir, fileName), new Uint8Array(response.arrayBuffer));
		}

		// Registrar módulo instalado
		await this.onInstallComplete(moduleId, version);

		new Notice(`✅ SmartWrite: ${moduleId} v${version} instalado com sucesso!`);
	}

	/**
	 * Remove os arquivos do módulo e limpa o registro.
	 */
	async uninstall(moduleId: string): Promise<void> {
		const pluginDir = this.resolvePluginDir(moduleId);

		if (fs.existsSync(pluginDir)) {
			fs.rmSync(pluginDir, { recursive: true, force: true });
		}

		await this.onInstallComplete(moduleId, "");

		new Notice(`SmartWrite: ${moduleId} removido.`);
	}

	// ── Private ───────────────────────────────────────────────────────────────

	private resolvePluginDir(moduleId: string): string {
		const vaultPath = (this.app.vault.adapter as unknown as { basePath: string }).basePath;
		const configDir = this.app.vault.configDir;
		return path.join(vaultPath, configDir, "plugins", moduleId);
	}

	private ensureDir(dirPath: string): void {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
	}
}
