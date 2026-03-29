// SCRIPT: src/services/auth-manager.ts
// DESCRIÇÃO: Gerencia credenciais centralizadas de todos os serviços de publicação.
//            Lê e escreve no settings store do Orchestrator.
// CHAMADO POR: core/plugin.ts, módulos Publisher
// CONTRATO: Exporta AuthManager com getters/setters por serviço

import type { SmartWriteOrchestratorPlugin } from "../core/plugin";
import type {
	AuthStore,
	SubstackCredentials,
	WordPressCredentials,
	MediumCredentials,
} from "../types";

export class AuthManager {
	private orchestrator: SmartWriteOrchestratorPlugin;

	constructor(orchestrator: SmartWriteOrchestratorPlugin) {
		this.orchestrator = orchestrator;
	}

	private get auth(): AuthStore {
		return this.orchestrator.settings.auth;
	}

	// ── Substack ──────────────────────────────────────────────────────────

	getSubstack(): SubstackCredentials | undefined {
		return this.auth.substack;
	}

	async setSubstack(creds: SubstackCredentials): Promise<void> {
		this.orchestrator.settings.auth.substack = creds;
		await this.orchestrator.saveSettings();
	}

	// ── WordPress ─────────────────────────────────────────────────────────

	getWordPress(profile = "default"): WordPressCredentials | undefined {
		return this.auth.wordpress?.[profile];
	}

	async setWordPress(creds: WordPressCredentials, profile = "default"): Promise<void> {
		if (!this.orchestrator.settings.auth.wordpress) {
			this.orchestrator.settings.auth.wordpress = {};
		}
		this.orchestrator.settings.auth.wordpress[profile] = creds;
		await this.orchestrator.saveSettings();
	}

	getWordPressProfiles(): string[] {
		return Object.keys(this.auth.wordpress ?? {});
	}

	// ── Medium ────────────────────────────────────────────────────────────

	getMedium(): MediumCredentials | undefined {
		return this.auth.medium;
	}

	async setMedium(creds: MediumCredentials): Promise<void> {
		this.orchestrator.settings.auth.medium = creds;
		await this.orchestrator.saveSettings();
	}

	// ── Utils ─────────────────────────────────────────────────────────────

	hasCredentials(service: keyof AuthStore): boolean {
		return !!this.auth[service];
	}

	async clearAll(): Promise<void> {
		this.orchestrator.settings.auth = {};
		await this.orchestrator.saveSettings();
	}
}
