# TS Digital — catálogo de modelos

## Abrir
- index.html: catálogo.
- modelo01/index.html: modelo verde recuperado do commit b9ca0cb, com responsividade.
- modelo02/index.html: modelo azul com carrossel.
- clientes/caique/index.html: versão original de Caique preservada.
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
Endereço existente: https://personal-odam.oficialtsdigital.workers.dev/
Após publicar o catálogo:
- /modelo01/ : modelo verde.
- /modelo02/ : modelo azul.
- /modelo03/ a /modelo06/ : quatro novos estilos.
A navegação local usa index.html e também funciona em pasta.
A pasta clientes não faz parte do pacote público.

Preparar o pacote:
node ferramentas/preparar-publicacao.cjs

Envie o conteúdo da pasta publicar pelo fluxo de publicação de arquivos estáticos
do Worker existente ou use Wrangler com a conta autenticada:
npx wrangler deploy
wrangler.jsonc aponta para publicar e mantém o nome personal-odam.

Não publique a raiz do projeto inteira: ela contém ferramentas e cópias de clientes.
A publicação substitui a página inicial antiga pelo catálogo.
O domínio gratuito pode futuramente usar outro nome de Worker, como catalogo-personais,
sem comprar domínio; isso cria outro endereço e não altera automaticamente os links antigos.

## Histórico
O Git original e os commits não foram alterados. O modelo verde foi extraído de b9ca0cb.
Não há deploy ou push automático neste projeto.
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
