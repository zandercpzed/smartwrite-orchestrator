// SCRIPT: src/core/module-registry.ts
// DESCRIÇÃO: Catálogo estático dos módulos SmartWrite conhecidos pelo Orchestrator.
//            Define quais módulos podem ser descobertos e instalados.
// CHAMADO POR: core/plugin.ts, ui/store/
// CONTRATO: Exporta KNOWN_MODULES (array) e helpers de lookup



/**
 * Módulos SmartWrite conhecidos pelo Orchestrator.
 * Cada entrada define o repositório GitHub e os metadados esperados.
 * O Orchestrator consulta o GitHub API para obter o manifest real do release.
 */
export const KNOWN_MODULES: Array<{
	id: string;
	displayName: string;
	description: string;
	repo: string; // formato: "owner/repo"
	icon: string; // nome de ícone Lucide compatível com Obsidian
}> = [
	{
		id: "smartwrite-publisher",
		displayName: "Publisher",
		description: "Publique notas do Obsidian diretamente no Substack, WordPress e Medium.",
		repo: "zandercpzed/smartwrite-publisher",
		icon: "send",
	},
	{
		id: "smartwrite-companion",
		displayName: "Companion",
		description: "Assistente de escrita em tempo real com personas e métricas de legibilidade.",
		repo: "zandercpzed/smartwrite-companion",
		icon: "pen-line",
	},
	{
		id: "smartwrite-analyzer",
		displayName: "Analyzer",
		description: "Análise macroestrutural de textos longos com score Publish Ready.",
		repo: "zandercpzed/smartwrite-analyzer",
		icon: "bar-chart-2",
	},
];

export function getModuleByid(id: string) {
	return KNOWN_MODULES.find((m) => m.id === id);
}
