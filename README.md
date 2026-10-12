# TS Digital — site institucional e demonstrações

## Expansão do portfólio — Fases 1 a 3

Posicionamento: sites e landing pages personalizados para empresas e profissionais de diferentes cidades. Seabra–BA é a localização da TS Digital. WhatsApp atual: (75) 9878-3356, com link https://wa.me/557598783356. O atendimento é online para clientes de outras cidades.

Contato, localização, SEO, estilos e rotas ficam em dados-site.js. projects contém somente páginas disponíveis; plannedModels registra os modelos restantes das próximas fases e não é exibido no portfólio. O build inclui automaticamente a pasta de cada projeto disponível.

A base da barra de demonstração fica em compartilhado/demonstracao.js e demonstracao.css, com mensagens de contato em compartilhado/contato-ts.js. As páginas existentes de personal e clientes foram preservadas; a nova barra será integrada às próximas demonstrações.

Verificação estática: npm run check. Prévia: npm run preview. Entrega e instruções da Fase 1: output/ts-expansao/fase1/entrega.md e guia-de-expansao.md. As próximas fases e a publicação dependem de aprovação, conforme o briefing.

## Reformulação institucional — 09/10/2026

A homepage agora apresenta a TS Digital para negócios em geral: dez segmentos, benefícios, serviços, processo, apresentação de Tamires e perguntas frequentes. A galeria mantém os seis modelos de personal e inclui três marcas fictícias de academia: IRON FORCE, VIVA FIT e PULSE STUDIO, com filtros e estados vazios para os segmentos das próximas fases. Logo aprovada, capturas reais dos sites e contato centralizado pelo WhatsApp.

Prévia local: `npm run preview`, em http://127.0.0.1:4173/. Para atualizar com o servidor aberto, execute `npm run build` e recarregue. Esses comandos não publicam.

Edite projetos, categorias, nichos e telefone em `dados-site.js`. O build gera os trechos correspondentes do HTML; preserve os comentários `TS:`. Textos institucionais ficam no `index.html` e a identidade visual em `catalogo.css`.

Entrega e manutenção: `output/ts-institucional/entrega.md` e `output/ts-institucional/guia-de-manutencao.md`. A pasta também contém capturas, testes, relatório Lighthouse e pacote de revisão.

Esta reformulação aguarda autorização para publicação, conforme o briefing. Não houve deploy, commit ou push. Push no branch conectado pode disparar publicação automática.

## Abrir
- index.html: homepage institucional e galeria de demonstrações por segmento.
- modelo01/index.html: modelo verde recuperado do commit b9ca0cb, com responsividade.
- modelo02/index.html: modelo azul com carrossel.
- clientes/caique/index.html: página personalizada de Caique, com planos demonstrativos.
- modelo03/index.html: Equilíbrio — claro, terroso e editorial.
- modelo04/index.html: Impacto — esportivo, preto e laranja.
- modelo05/index.html: Precisão — clean, branco e azul-marinho.
- modelo06/index.html: Essência — feminino, vinho e rosé.

## Personalizar para um novo cliente
Peça ao Codex: “Crie uma cópia do modelo 01 para [nome], com estas informações...”.
O modelo original não precisa ser modificado.

Também é possível executar:
node ferramentas/novo-cliente.cjs modelo01 nome-cliente
ou
node ferramentas/novo-cliente.cjs modelo02 nome-cliente

O comando não sobrescreve clientes existentes. A cópia inclui os arquivos compartilhados,
então pode ser publicada sozinha em outro endereço.

Edite clientes/nome-cliente/config.js:
- brandName: nome da marca.
- coachName: nome do profissional.
- specialty, heroTitle, heroDescription, about: textos principais.
- instagram: usuário sem @ (vazio nas demonstrações).
- whatsapp: número completo com país e DDD, por exemplo 5571999999999.
- message: mensagem inicial.
- accent, background: cores principais.
- pageTitle, description: título e descrição da página.
- price1, price2, price3: preços do modelo 01.
- demo: false para cliente; true para demonstração.

Os textos específicos de serviços, método, FAQ, depoimentos e benefícios ficam no index.html
da cópia. Fotos e nomes reais devem substituir os espaços demonstrativos antes da entrega.
Os modelos têm conteúdo fictício. O contato nas demonstrações não envia mensagem a ninguém.

Para fotos do modelo 02: substitua .photo-empty por <img src="./assets/foto.jpg" alt="...">,
mantendo os rótulos Antes/Depois; altere nomes e períodos no figcaption.
Não reutilize a logo nem os dados de Caique para outros clientes.

## Cloudflare sem domínio pago
Catálogo definitivo: https://ts-digital.oficialtsdigital.workers.dev/
Após publicar o catálogo:
- /modelo01/ : modelo verde.
- /modelo02/ : modelo azul.
- /modelo03/ a /modelo06/ : quatro novos estilos.
A navegação local usa index.html e também funciona em pasta.
A página autorizada de Caique é pública em /clientes/caique/. Outros clientes só entram na publicação quando incluídos explicitamente no script.

Preparar o pacote:
node ferramentas/preparar-publicacao.cjs

Envie o conteúdo da pasta publicar pelo fluxo de publicação de arquivos estáticos
do Worker existente ou use Wrangler com a conta autenticada:
npx wrangler deploy
wrangler.jsonc aponta para publicar e usa o nome modelos-landingpage, correspondente ao catálogo existente.

Não publique a raiz do projeto inteira: ela contém ferramentas e arquivos de trabalho.
A publicação substitui a página inicial antiga pelo catálogo.
O domínio gratuito pode futuramente usar outro nome de Worker, como catalogo-personais,
sem comprar domínio; isso cria outro endereço e não altera automaticamente os links antigos.

## Histórico
O Git original e os commits não foram alterados. O modelo verde foi extraído de b9ca0cb.
O deploy por GitHub exige conectar o repositório ao Worker e enviar os commits para o branch configurado na Cloudflare.
Os seis modelos são aceitos pelo comando novo-cliente.cjs. Nos modelos 03 a 06, o layout está em compartilhado/novos-modelos.css; a cópia para cliente inclui esses arquivos. Cada modelo possui config.js, programas ilustrativos e carrossel com quatro comparações a preencher.Efeitos do modelo 02 e da página Caique: brilho dos botões, luz no título, destaque da borda, movimento dos arcos e entrada das seções. Arquivos efeitos.css e efeitos.js. Movimento reduzido respeitado. caique-cloudflare.zip contém apenas a página personalizada; catalogo-cloudflare.zip contém o catálogo e os seis modelos.

## Publicação automática pelo GitHub / Cloudflare Workers Builds
O `wrangler.jsonc` já tem `build.command`, então o próprio `wrangler deploy` monta a pasta `publicar/`.
Configuração no painel da Cloudflare:
- Diretório raiz: raiz do repositório.
- Build command: deixe vazio (ou `npm run build`).
- Deploy command: `npx wrangler deploy`

A pasta `publicar/` é gerada e não vai para o Git. `compatibility_date` fica em 2025-01-01 de propósito:
uma data futura (maior que a suportada pelo Wrangler) faz o deploy falhar.
Depois de alterar arquivos: commit e push para o branch conectado.

## Fotos nos modelos 03–06
Para usar foto do cliente, coloque `<img class="hero-photo">` dentro de `.hero-art` e `<img>` dentro de `.about-art`.

## Apresentação de Caique
- Catálogo: https://ts-digital.oficialtsdigital.workers.dev/
- Caique: https://team-oliver.oficialtsdigital.workers.dev/
- Planos mensal (R$ 197), trimestral (R$ 497) e semestral (R$ 897) são fictícios e sinalizados na página. Confirmar com o cliente antes de usar como oferta real.

## Endereços individuais dos clientes
Cada cliente deve ter um Worker independente com o nome da sua marca em letras minúsculas e hífens (ex.: team-oliver). O catálogo mantém publicação separada. O comando novo-cliente.cjs gera ferramentas/nome-cliente.wrangler.jsonc para publicar somente a página do cliente na raiz do seu endereço. Use o nome da marca como nome-cliente.
Publicar Caique: npx wrangler deploy --config ferramentas/team-oliver.wrangler.jsonc
Publicar próximos clientes: npx wrangler deploy --config ferramentas/nome-cliente.wrangler.jsonc

Página definitiva de Caique: https://team-oliver.oficialtsdigital.workers.dev/

## Institucional — modelos restaurados em 12/10/2026

O institucional apresenta criação de sites personalizados, com projetos a partir de R$ 497 e pedido de prévia no WhatsApp. Por solicitação da usuária, a vitrine voltou aos seis modelos pessoais originais e mantém os nove projetos de academias, saúde e restaurantes. Os cinco novos modelos foram retirados da publicação. A apresentação pessoal e o nome da fundadora foram removidos do conteúdo e dos dados estruturados.

Dados atuais em dados-site.js. Os arquivos das cinco demos rejeitadas foram mantidos somente na fonte como histórico, fora das rotas publicadas e da geração normal. As prévias e a imagem de compartilhamento voltaram a usar os modelos originais. O institucional mantém a identidade TS Digital.

Relatório: AUDITORIA-TS-DIGITAL.md. Evidências privadas em output/ts-auditoria/. Para publicar TS Digital use npm run deploy:catalogo. O comando padrão npm run deploy continua direcionado a modelos-landingpage. A conexão de domínio depende da ativação dos servidores DNS na Cloudflare; os endereços workers.dev permanecem disponíveis.

## Catálogo TS Digital — apresentação comercial
O index.html usa botões sólidos de prévia, imagens reais dos sites, filtros por segmento e mensagens específicas pelo WhatsApp. Contato TS Digital: +55 75 9878-3356. Fontes locais e prévias WebP em assets/catalogo/. Configuração de projetos e nichos em dados-site.js.
Build: npm run build. Publicação com o nome da marca: npx wrangler deploy --config catalogo.wrangler.jsonc. O wrangler.jsonc publica o catálogo existente modelos-landingpage; catalogo.wrangler.jsonc publica ts-digital. Ambos usam o mesmo index.html, CSS e modelos.

Catálogo definitivo: https://ts-digital.oficialtsdigital.workers.dev/

## Publicação definitiva e atualizações
Os links em pattern-snickerdoodle.workers.dev foram prévias temporárias e não devem ser enviados como endereço definitivo.
Após autenticar a conta Cloudflare com npx wrangler login:
- npm run deploy:caique publica a página de Caique no Worker team-oliver.
- npm run deploy:catalogo publica o catálogo no Worker ts-digital.
O Wrangler informa o endereço definitivo da conta após cada deploy. Commit e push só atualizam cada Worker se ele estiver conectado ao repositório no Cloudflare Workers Builds. Para team-oliver: diretório raiz do repositório, comando de build vazio, comando de deploy npm run deploy:caique. Para ts-digital: comando de deploy npm run deploy:catalogo. Ambos podem usar o mesmo repositório e branch.

Publicação autenticada realizada em 08/10/2026. Caique está no Worker team-oliver; o catálogo, no Worker ts-digital. Os antigos links temporários foram substituídos. Para atualizar Caique após alterações, use npm run deploy:caique (ou configure este comando no Workers Builds do Worker team-oliver). Commit sozinho não executa o deploy sem essa integração.

## Catálogo existente ligado ao repositório
Endereço: https://modelos-landingpage.oficialtsdigital.workers.dev/
A configuração padrão wrangler.jsonc agora usa o nome correto modelos-landingpage. Para Workers Builds deste Worker: repositório oficialtsdigital-ai/modelos-landingpage, branch main, diretório raiz /, build vazio (o Wrangler roda o build definido no arquivo), deploy npx wrangler deploy.
Os dois catálogos compartilham a mesma estética e os mesmos arquivos. npm run deploy publica modelos-landingpage; npm run deploy:catalogo publica ts-digital.


## Academias — Fase 2

Rotas: /modelos/academias/iron-force/, /modelos/academias/viva-fit/ e /modelos/academias/pulse-studio/. São páginas completas e fictícias, com imagens ilustrativas geradas, planos demonstrativos, FAQ e simulação de visitas ou reservas. Os contatos de orçamento usam a configuração da TS Digital.

Dados comerciais em ferramentas/dados-academias.cjs; HTML estático gerado por ferramentas/renderizar-demonstracoes.cjs durante o build. A proposta anterior de academia foi arquivada em output/arquivo-clientes/cliente-anterior/. A pasta output está ignorada no Git e não entra no pacote público. A antiga rota não é incluída nem redirecionada. Uma implantação já existente não foi alterada.

Verificações: npm run check, npm run build, node ferramentas/verificar-fase2.cjs e node ferramentas/verificar-institucional.cjs. Evidências e relatório: output/ts-expansao/fase2/. Não executar deploy, commit ou push sem autorização; o branch conectado pode disparar publicação automática.

## Saúde — Fase 3

Rotas: /modelos/saude/odonto-prime/, /modelos/saude/vitalis-clinica/ e /modelos/saude/equilibrio-fisio/. Três páginas completas e fictícias: odontologia premium, clínica multidisciplinar com serviços filtráveis e agendamento simulado, e fisioterapia em composição editorial com serviços em acordeão. Marcas, profissionais, convênios, espaços e horários são fictícios; as imagens são ilustrativas e não representam pacientes, profissionais ou instalações reais.

Serviços, equipe, convênios, turnos e horários ficam em ferramentas/dados-saude.cjs; interações em compartilhado/saude.js; estilos comuns em compartilhado/saude-base.css; conteúdo estático gerado por ferramentas/renderizar-demonstracoes.cjs durante o build. Nenhum registro profissional (CRM, CRO, CREFITO, RQE), título, depoimento ou resultado clínico é atribuído. Consultas e avaliações abrem diálogo de simulação e não coletam nome, contato ou dados de saúde. Somente o orçamento de criação do site usa o WhatsApp da TS Digital.

Capas reais em assets/catalogo/ (odonto-prime, vitalis-clinica, equilibrio-fisio, com variantes de 720 e versões móveis), geradas por ferramentas/capturar-saude.cjs a partir das páginas publicadas em publicar/.

Verificações: npm run check, npm run build, npm run test:saude (ferramentas/verificar-fase3.cjs), node ferramentas/verificar-fase2.cjs e node ferramentas/verificar-institucional.cjs. Evidências e relatório: output/ts-expansao/fase3/. Não executar deploy, commit ou push sem autorização; o branch conectado pode disparar publicação automática.

## Restaurantes — Fase 4

Rotas: /modelos/restaurantes/brasa-sabor/, /modelos/restaurantes/sushi-kai/ e /modelos/restaurantes/bella-pizza/. Três páginas completas e fictícias: churrascaria gourmet, restaurante japonês minimalista em fundo escuro e pizzaria italiana com forno a lenha. Cardápios completos com preços fictícios sinalizados, reserva de mesa demonstrativa (sem coleta de dados pessoais) e imagens ilustrativas geradas pelo próprio projeto. Marcas, cardápios, horários e valores são fictícios.

Cardápios, horários, serviços, FAQ, mesas e turnos ficam em ferramentas/dados-restaurantes.cjs; interações em compartilhado/restaurantes.js; estilos comuns em compartilhado/restaurantes-base.css; motor de efeitos próprios (reveal, parallax, tilt, magnetic, marquee, counter, split-words, scroll-progress) em compartilhado/efeitos.js e efeitos.css, sem dependências externas e respeitando prefers-reduced-motion. Conteúdo estático gerado por ferramentas/renderizar-demonstracoes.cjs durante o build.

Ilustrações em modelos/restaurantes/{id}/assets/ geradas por ferramentas/gerar-imagens-restaurantes.cjs (sharp); podem ser substituídas por fotos do cliente mantendo os nomes de arquivo. Capas reais em assets/catalogo/ (variantes de 720 e móveis), geradas por ferramentas/capturar-restaurantes.cjs. Selo de preço fictício visível em todas as páginas; WhatsApp real apenas para orçamento de criação do site.

Verificações: npm run check, npm run build, npm run test:restaurantes (ferramentas/verificar-fase4.cjs), node ferramentas/verificar-fase2.cjs, node ferramentas/verificar-fase3.cjs e node ferramentas/verificar-institucional.cjs. Lighthouse (acessibilidade e boas práticas): 100/100 nos três modelos. Evidências e relatório: output/ts-expansao/fase4/. Não executar deploy, commit ou push sem autorização; o branch conectado pode disparar publicação automática.
