# Auditoria e reformulação da TS Digital

**Atualização de 12/10/2026:** a usuária solicitou a volta dos modelos originais. Os seis modelos de personal anteriores foram restaurados na vitrine; os cinco novos foram retirados da publicação. O preço inicial de R$ 497 foi mantido. A apresentação pessoal e o nome da fundadora foram removidos, inclusive do JSON-LD e da configuração pública. O diagnóstico abaixo registra a revisão anterior e suas evidências históricas.

Restauração publicada e conferida, versão e5459a44-7cfd-4be5-a6e6-8c6316d712d2. https://tsdigital.com.br/ e https://www.tsdigital.com.br/ responderam 200 por HTTPS com a versão restaurada. Os cinco modelos rejeitados retornam 404; os seis modelos antigos aparecem no filtro de personal. Evidências atuais em `output/restauracao/`. A transição DNS mencionada no histórico abaixo já foi concluída na verificação desta atualização.

Revisão: 11/10/2026. Objetivo: apresentar a criação de sites reais e personalizados, com uma vitrine de projetos fictícios. Sede em Seabra, Bahia, e atendimento online para outras cidades.

## Diagnóstico e correções

| Área | Achado anterior | Mudança |
|---|---|---|
| Narrativa e cópia | Predomínio de modelos e estilos, pouca explicação do trabalho personalizado. | Abertura, entrega, processo e FAQ explicam planejamento, desenvolvimento, revisão e publicação conforme o negócio. |
| Estrutura e UX | Dez segmentos antes da vitrine; filtros sem estado na URL. | Vitrine antecipada; seis projetos em destaque, opção de ver os 14; filtros compartilháveis e restaurados com recarregar/voltar. |
| Conversão | CTAs variados e nenhuma referência de investimento. | “Quero uma prévia do meu site”, mensagem pronta no WhatsApp e contexto da inspiração escolhida. Projetos a partir de R$ 497, com escopo e condições definidos na proposta. |
| Confiança | Mistura de demonstrações e propostas podia sugerir clientes atendidos. | Marcas fictícias identificadas. Nenhum cliente, credencial, avaliação, venda ou transformação real inventado na nova vitrine. |
| Design system | Marca navy/ciano aprovada, textos pequenos e várias escalas. | Marca mantida; tipografia mais legível, legendas de pelo menos 12 px no institucional, foco visível e controles de pelo menos 44 px. Botões de exploração sólidos. |
| Componentes | HTML estático, scripts compartilhados e renderização local. | Separação de vitrine, metadados, demos e cabeçalhos; configurações de contato centralizadas. Sem framework ou bibliotecas externas no carregamento das novas páginas. |
| Performance | Fontes locais, WebP e imagens responsivas já ajudavam. | Fotos específicas em WebP responsivo, dimensões explícitas, prioridade na imagem principal e carregamento adiado abaixo da dobra. Capas reais dos projetos navegáveis. |
| SEO | Metadados e schema Organization/WebSite existentes. | Narrativa, canonical, compartilhamento e sitemap atualizados; WebPage/Service acrescentados; Seabra identifica a sede, com atendimento no Brasil. Novas demos com noindex, follow. |
| Segurança | Publicação por lista permitida, noopener, nosniff e Referrer-Policy. | Proteção contra enquadramento, Permissions-Policy e CSP no institucional e em /modelos/. Scripts locais; hash para JSON-LD; objetos e submissão externa de formulários bloqueados. |
| Compatibilidade | Seis rotas antigas, nove demos de outros segmentos e Caique. | Rotas preservadas. Comparação de 93 arquivos; nos nove HTML existentes, apenas metadados, barra da TS e URL do contato foram normalizados. Layouts, estilos e imagens anteriores mantidos. |

## Cinco projetos de personal

| Marca fictícia | Abordagem e experiência |
|---|---|
| Nexo Treino | Consultoria online em azul: rotina/suporte em abas e seleção de objetivo com resumo. |
| Caio Freire Personal | Presencial em areia/verde: tipografia serifada, fotografia ampla e agenda demonstrativa. |
| Davi Torres Método | Perfil editorial, método, resultados por contexto e relatos explicitamente ilustrativos. |
| Movi Escola | Cursos e guias em amarelo: catálogo, módulos em acordeão e prévia de conteúdo. |
| Lia Vale Movimento | Produtos em verde: fotos, filtros, motivo da recomendação, detalhes e referência de afiliado demonstrativa. |

As novas marcas e imagens são fictícias. Valores e links de cursos/produtos são exemplos; não há checkout, comissão, loja parceira ou agendamento real. Formulários não coletam ou enviam dados pessoais. Somente pedidos de criação de site levam ao WhatsApp verdadeiro da TS Digital. Prompts das imagens em `output/ts-auditoria/imagens.json`.

## Evidências

Institucional e cinco demos conferidos em 320, 390, 768, 1024 e 1440 px, sem rolagem horizontal. Verificados menus, Escape, foco, filtros, expansão da vitrine, histórico, abas, FAQ, diálogos, agenda, módulos, produtos, contato, movimento reduzido e funcionamento sem JavaScript. Rotas existentes respondem; ferramentas e arquivos privados retornam 404 na prévia. Nenhum teste envia mensagens ou realiza compras.

Lighthouse mobile local, mesma máquina e navegador:

| Medida | Antes | Depois |
|---|---:|---:|
| Performance | 96 | 98 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2,63 s | 2,15 s |
| CLS | 0 | 0 |

Medições de laboratório variam por dispositivo, rede e servidor. Não houve medição de aumento de conversão. As melhorias verificáveis são clareza da oferta, referência de investimento, ações explícitas, contato com contexto e experiências distintas. Não foram adicionados rastreadores ou cookies de marketing.

As cinco novas demos receberam 100 em acessibilidade e 100 em boas práticas no Lighthouse. Os nove projetos anteriores passaram nas verificações de seus fluxos. A publicação real no Worker ts-digital foi conferida: página principal, 14 projetos, filtros, cabeçalhos de segurança, mobile e exclusão de arquivos privados.

Evidências em `output/ts-auditoria/`: plano, cópias anteriores, hashes, screenshots, relatórios Lighthouse e verificações. Outros segmentos: `output/ts-expansao/fase2`, `fase3` e `fase4`.

## Operação

`npm run check` valida dados/sintaxe; `npm run build` gera `publicar/`. Testes: `npm run test:institucional`, `test:personais`, `test:academias`, `test:saude`, `test:restaurantes`, com a prévia em http://127.0.0.1:4173/.

Publicação da TS Digital: `npm run deploy:catalogo`, com `catalogo.wrangler.jsonc`. `npm run deploy` permanece direcionado ao Worker antigo `modelos-landingpage`. Caique e Fit Forma têm Workers independentes. Commit e push não foram executados nesta revisão.

Publicação realizada e verificada em https://ts-digital.oficialtsdigital.workers.dev/, versão bbb7a456-d343-4cd3-85a8-bababacb108f. O endereço workers.dev continua habilitado. O domínio principal e www foram adicionados ao Worker pela Cloudflare; o cadastro também está no arquivo de configuração para manter o vínculo nos próximos deploys. A ativação pública e a verificação HTTPS dependem da transição dos servidores DNS no Registro.br. Na consulta desta revisão, os servidores públicos ainda eram a.auto.dns.br e b.auto.dns.br. Os três registros MX/TXT existentes foram preservados.

## Referências

Semântica, foco, controles, movimento reduzido e imagens: [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). Dados verificáveis no SEO: [Google — negócios locais](https://developers.google.com/search/docs/appearance/structured-data/local-business). Proteções HTTP: [Cloudflare Static Assets — Headers](https://developers.cloudflare.com/workers/static-assets/headers/). Domínio: [Cloudflare — Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), com DNS e certificados administrados pela plataforma e ativação dependente da delegação.
