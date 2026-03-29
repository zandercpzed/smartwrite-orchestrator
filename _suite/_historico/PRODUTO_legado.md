# SmartWrite Suite (PRD)

**Produto:** Z•Edições  
**Documento:** Product Requirements Document (PRD)  
**Última atualização:** 28 de Março de 2026

---

## 1. Visão do Produto (O QUÊ e POR QUÊ)

A suíte **SmartWrite** é o conjunto de ferramentas e assistentes nativos para o **Obsidian**, criados para transformar a experiência de escrita, revisão e publicação de manuscritos da Z•Edições.
O objetivo é proporcionar suporte inteligente aos autores dentro de um ambiente "distraction-free" (Obsidian), delegando integrações e análises pesadas para plugins locais ou chamadas de IA.

---

## 2. Padrão de Ciclos de Vida e Módulos Atuais

O ecosistema foca na tríade da produtividade autoral:

1. **Gestão e Fluidez da Escrita (`companion`):** 
   - Feedback e assistência ativa em tempo real.
   - Fornece métricas de legibilidade da sessão de escrita e feedback de "personas" (IA local ou remota).

2. **Auditoria Estrutural de Texto (`analyzer`):**
   - Ferramenta de peso para bater manuscritos inteiros (50k-500k palavras).
   - Avalia cadência, fluidez, qualidade literária e consistência estilística de maneira macroestrutural.

3. **Automação de Saída (`publisher`):**
   - Elimina o atrito do copy-paste.
   - Publicação agendada em lote direto do Obsidian para plataformas (ex: Substack), com processamento em paralelo.

---

## 3. Restrições Arquitetônicas Definidas

- **Sem Backend Central:** O SADE usa GCP/Firebase; a suíte SmartWrite **não**. Todas as variáveis, chaves de API restritas e lógicas sensíveis residem na configuração do plugin que roda na máquina do autor.
- O foco atual está **apenas no desenvolvimento dos três plugins de Obsidian**. Utilitários auxiliares de empacotamento (`smartwrite-installer`) foram isolados da lista de prioridades de engenharia.
