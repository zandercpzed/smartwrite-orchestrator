// SCRIPT: src/installer/github-fetcher.ts
// DESCRIÇÃO: Consulta a GitHub API para obter informações de release de um módulo
//            e baixa o asset .zip correspondente.
// CHAMADO POR: installer/module-installer.ts
// CONTRATO: Exporta GitHubFetcher com getLatestRelease() e downloadAsset()

import * as https from "https";
import * as fs from "fs";

export interface GitHubRelease {
	tag_name: string;
	assets: Array<{
		name: string;
		browser_download_url: string;
		size: number;
	}>;
}

export class GitHubFetcher {
	private readonly baseUrl = "api.github.com";
	private readonly userAgent = "SmartWrite-Orchestrator/0.1.0";

	/**
	 * Busca os metadados do release mais recente de um repositório.
	 */
	async getLatestRelease(repo: string): Promise<GitHubRelease> {
		return new Promise((resolve, reject) => {
			const options = {
				hostname: this.baseUrl,
				path: `/repos/${repo}/releases/latest`,
				method: "GET",
				headers: {
					"User-Agent": this.userAgent,
					"Accept": "application/vnd.github.v3+json",
				},
			};

			const req = https.request(options, (res) => {
				let data = "";
				res.on("data", (chunk) => (data += chunk));
				res.on("end", () => {
					if (res.statusCode === 200) {
						resolve(JSON.parse(data) as GitHubRelease);
					} else {
						reject(new Error(`GitHub API error: ${res.statusCode} — ${data}`));
					}
				});
			});

			req.on("error", reject);
			req.end();
		});
	}

	/**
	 * Baixa um asset de release para um arquivo local.
	 */
	async downloadAsset(url: string, destPath: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const file = fs.createWriteStream(destPath);

			const download = (downloadUrl: string) => {
				https.get(downloadUrl, { headers: { "User-Agent": this.userAgent } }, (res) => {
					// Seguir redirects (GitHub usa redirects para assets)
					if (res.statusCode === 302 || res.statusCode === 301) {
						const location = res.headers.location;
						if (location) {
							download(location);
							return;
						}
					}

					if (res.statusCode !== 200) {
						reject(new Error(`Download failed: ${res.statusCode}`));
						return;
					}

					res.pipe(file);
					file.on("finish", () => {
						file.close();
						resolve();
					});
				}).on("error", (err) => {
					fs.unlink(destPath, () => {});
					reject(err);
				});
			};

			download(url);
		});
	}
}
