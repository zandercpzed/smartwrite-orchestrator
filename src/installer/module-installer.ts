// SCRIPT: src/installer/module-installer.ts
// DESCRIÇÃO: Instala um módulo SmartWrite a partir de um GitHub Release.
//            Baixa o .zip, valida o smartwrite.module.json, extrai e copia
//            os arquivos para .obsidian/plugins/{id}/, e registra na sidebar.
// CHAMADO POR: ui/OrchestratorSidebar.ts (botão "Instalar")
// CONTRATO: Exporta ModuleInstaller com install(moduleId, repo) e uninstall(moduleId)

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as zlib from "zlib";
import { App, Notice } from "obsidian";
import { GitHubFetcher } from "./github-fetcher";
import type { SmartWriteModuleManifest, OrchestratorSettings } from "../types";

// ── Tipos internos ────────────────────────────────────────────────────────────

interface ZipEntry {
	fileName: string;
	data: Uint8Array;
}

// ── ModuleInstaller ──────────────────────────────────────────────────────────

export class ModuleInstaller {
	private readonly fetcher: GitHubFetcher;
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
		this.fetcher = new GitHubFetcher();
		this.onInstallComplete = onInstallComplete;
	}

	// ── Public API ────────────────────────────────────────────────────────────

	/**
	 * Instala um módulo SmartWrite do GitHub Releases.
	 * Fluxo: fetch release → download .zip → validar → extrair → copiar → registrar
	 */
	async install(moduleId: string, repo: string): Promise<void> {
		new Notice(`SmartWrite: baixando ${moduleId}…`);

		// 1. Buscar release mais recente
		const release = await this.fetcher.getLatestRelease(repo);
		const version = release.tag_name;

		// 2. Localizar o asset .zip no release
		const zipAsset = release.assets.find((a) => a.name.endsWith(".zip"));
		if (!zipAsset) {
			throw new Error(
				`Release ${version} de ${repo} não contém um arquivo .zip. ` +
				`Verifique o GitHub Release do módulo.`
			);
		}

		// 3. Baixar o .zip para um diretório temporário
		const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "smartwrite-"));
		const zipPath = path.join(tmpDir, zipAsset.name);

		try {
			await this.fetcher.downloadAsset(zipAsset.browser_download_url, zipPath);

			// 4. Ler e parsear o .zip (sem dependência externa)
			const entries = await this.parseZip(zipPath);

			// 5. Validar o smartwrite.module.json obrigatório
			const moduleManifest = this.extractModuleManifest(entries, moduleId);

			// 6. Determinar o diretório de destino dentro do vault
			const pluginDir = this.resolvePluginDir(moduleId);
			this.ensureDir(pluginDir);

			// 7. Copiar os arquivos necessários para o vault
			this.copyPluginFiles(entries, pluginDir);

			// 8. Persistir registro e atualizar sidebar
			await this.onInstallComplete(moduleId, version);

			new Notice(`✅ SmartWrite: ${moduleManifest.displayName} v${version} instalado!`);
		} finally {
			// Limpar arquivos temporários sempre, mesmo em caso de erro
			this.cleanupTmp(tmpDir);
		}
	}

	/**
	 * Desinstala um módulo: remove a pasta do plugin e limpa o registro.
	 */
	async uninstall(moduleId: string): Promise<void> {
		const pluginDir = this.resolvePluginDir(moduleId);

		if (fs.existsSync(pluginDir)) {
			fs.rmSync(pluginDir, { recursive: true, force: true });
		}

		// Remover do registro de settings
		delete this.settings.installedModules[moduleId];
		await this.onInstallComplete(moduleId, "");

		new Notice(`SmartWrite: ${moduleId} desinstalado.`);
	}

	// ── Private Helpers ───────────────────────────────────────────────────────

	/**
	 * Resolve o caminho absoluto do diretório de plugins do vault
	 * para um dado moduleId.
	 */
	private resolvePluginDir(moduleId: string): string {
		const vaultPath = (this.app.vault.adapter as unknown as { basePath: string }).basePath;
		const configDir = this.app.vault.configDir;
		return path.join(vaultPath, configDir, "plugins", moduleId);
	}

	/**
	 * Cria o diretório de destino se não existir.
	 */
	private ensureDir(dirPath: string): void {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
	}

	/**
	 * Copia os arquivos obrigatórios e opcionais do release para o vault.
	 * Arquivos copiados:
	 *   - main.js         (obrigatório)
	 *   - manifest.json   (obrigatório — manifest Obsidian do módulo)
	 *   - styles.css      (opcional)
	 *   - smartwrite.module.json (opcional — já validado anteriormente)
	 */
	private copyPluginFiles(entries: ZipEntry[], destDir: string): void {
		const filesToCopy = ["main.js", "manifest.json", "styles.css", "smartwrite.module.json"];

		for (const fileName of filesToCopy) {
			// Busca o entry ignorando estrutura de pasta interna do .zip
			const entry = entries.find((e) => path.basename(e.fileName) === fileName);
			if (!entry) {
				if (fileName === "main.js" || fileName === "manifest.json") {
					throw new Error(
						`Arquivo obrigatório "${fileName}" não encontrado no .zip do release.`
					);
				}
				// Arquivos opcionais: apenas pular se ausentes
				continue;
			}

			fs.writeFileSync(path.join(destDir, fileName), entry.data);
		}
	}

	/**
	 * Extrai e valida o smartwrite.module.json do zip.
	 * Lança erro se o arquivo estiver ausente ou malformado.
	 */
	private extractModuleManifest(entries: ZipEntry[], expectedId: string): SmartWriteModuleManifest {
		const entry = entries.find((e) => path.basename(e.fileName) === "smartwrite.module.json");
		if (!entry) {
			throw new Error(
				`O release não contém "smartwrite.module.json". ` +
				`Este arquivo é obrigatório para módulos SmartWrite.`
			);
		}

		let manifest: SmartWriteModuleManifest;
		try {
		manifest = JSON.parse(new TextDecoder("utf-8").decode(entry.data)) as SmartWriteModuleManifest;
		} catch {
			throw new Error(`"smartwrite.module.json" está malformado (JSON inválido).`);
		}

		// Validar campos obrigatórios
		if (!manifest.id || !manifest.version || !manifest.displayName) {
			throw new Error(
				`"smartwrite.module.json" está incompleto. ` +
				`Campos obrigatórios: id, version, displayName.`
			);
		}

		if (manifest.id !== expectedId) {
			throw new Error(
				`ID do módulo no manifest ("${manifest.id}") não corresponde ao esperado ("${expectedId}").`
			);
		}

		return manifest;
	}

	/**
	 * Parser mínimo de ZIP puro (sem dependências npm).
	 * Suporta apenas arquivos não comprimidos (method 0) e Deflate (method 8).
	 * Suficiente para os releases dos módulos SmartWrite.
	 */
	private async parseZip(zipPath: string): Promise<ZipEntry[]> {
		const buffer = fs.readFileSync(zipPath);
		const entries: ZipEntry[] = [];

		let offset = 0;

		while (offset < buffer.length - 4) {
			const signature = buffer.readUInt32LE(offset);

			// Local file header signature: 0x04034b50
			if (signature !== 0x04034b50) {
				break;
			}

			const compressionMethod = buffer.readUInt16LE(offset + 8);
			const compressedSize   = buffer.readUInt32LE(offset + 18);
			const fileNameLength   = buffer.readUInt16LE(offset + 26);
			const extraFieldLength = buffer.readUInt16LE(offset + 28);

			const fileNameStart = offset + 30;
			const fileName = buffer.toString("utf-8", fileNameStart, fileNameStart + fileNameLength);

			const dataStart = fileNameStart + fileNameLength + extraFieldLength;
			const compressedData = buffer.subarray(dataStart, dataStart + compressedSize);

			// Ignorar diretórios
			if (!fileName.endsWith("/")) {
				let data: Uint8Array;

				if (compressionMethod === 0) {
					// Stored — sem compressão (cópia para garantir imutabilidade)
					data = compressedData.subarray();
				} else if (compressionMethod === 8) {
					// Deflate (zlib.inflateRawSync retorna Buffer, que é Uint8Array)
					data = zlib.inflateRawSync(compressedData);
				} else {
					// Método de compressão não suportado — pular entry
					offset = dataStart + compressedSize;
					continue;
				}

				entries.push({ fileName, data });
			}

			offset = dataStart + compressedSize;
		}

		if (entries.length === 0) {
			throw new Error("O arquivo .zip está vazio ou corrompido.");
		}

		return entries;
	}

	/**
	 * Remove o diretório temporário e seu conteúdo.
	 */
	private cleanupTmp(tmpDir: string): void {
		try {
			fs.rmSync(tmpDir, { recursive: true, force: true });
		} catch {
			// Falha silenciosa na limpeza — não bloquear o fluxo principal
			console.warn(`[SmartWrite] Falha ao remover tmp: ${tmpDir}`);
		}
	}
}
