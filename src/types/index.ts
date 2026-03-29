// SCRIPT: src/types/index.ts
// DESCRIÇÃO: Tipos centrais do SmartWrite Orchestrator — contratos de módulo,
//            auth, licença e interface de registro na sidebar.
// CHAMADO POR: Todos os módulos de core, installer e ui
// CONTRATO: Exporta interfaces e tipos sem dependências de runtime

// ── Module Contract ────────────────────────────────────────────────────────

/**
 * Metadados declarados em smartwrite.module.json no release de cada módulo.
 * O Orchestrator valida este arquivo antes de instalar o módulo.
 */
export interface SmartWriteModuleManifest {
	id: string;
	displayName: string;
	version: string;
	/** Nome da classe/componente de UI que o módulo expõe ao Orchestrator */
	panelComponent: string;
	/** Serviços de auth necessários (ex: ["substack", "wordpress"]) */
	requiresAuth: AuthService[];
	requiresLicense: boolean;
	minOrchestratorVersion: string;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export type AuthService = "substack" | "wordpress" | "medium";

export interface SubstackCredentials {
	sessionCookie: string;
}

export interface WordPressCredentials {
	url: string;
	username: string;
	appPassword: string;
}

export interface MediumCredentials {
	integrationToken: string;
}

export interface AuthStore {
	substack?: SubstackCredentials;
	/** Suporte a múltiplos perfis WordPress */
	wordpress?: Record<string, WordPressCredentials>;
	medium?: MediumCredentials;
}

// ── Module Runtime ─────────────────────────────────────────────────────────

/**
 * Representa um módulo registrado e ativo no Orchestrator.
 */
export interface RegisteredModule {
	manifest: SmartWriteModuleManifest;
	/** Status de instalação/ativação */
	status: "installed" | "loading" | "error";
}

// ── Settings ───────────────────────────────────────────────────────────────

export interface OrchestratorSettings {
	/** Auth de todos os serviços */
	auth: AuthStore;
	/** Módulos que o usuário instalou via Orchestrator */
	installedModules: Record<string, string>; // id → version
	/** GitHub owner dos módulos SmartWrite */
	githubOwner: string;
}

export const DEFAULT_SETTINGS: OrchestratorSettings = {
	auth: {},
	installedModules: {},
	githubOwner: "zandercpzed",
};
