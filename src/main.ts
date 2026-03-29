// SCRIPT: src/main.ts
// DESCRIÇÃO: Entry point do plugin SmartWrite Orchestrator para o Obsidian.
//            Inicializa o plugin, registra a sidebar e carrega os módulos instalados.
// CHAMADO POR: Obsidian (ao ativar o plugin)
// CONTRATO: Exporta classe default Plugin que estende Plugin do Obsidian

import { Plugin } from "obsidian";
import { SmartWriteOrchestratorPlugin } from "./core/plugin";

export default class SmartWriteOrchestrator extends Plugin {
	private orchestrator!: SmartWriteOrchestratorPlugin;

	async onload() {
		this.orchestrator = new SmartWriteOrchestratorPlugin(this);
		await this.orchestrator.initialize();
	}

	onunload() {
		void this.orchestrator.teardown();
	}
}
