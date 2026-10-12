/* Conteúdo fictício dos modelos de restaurantes (Fase 4).
   Todos os nomes de pratos, descrições, preços, horários e endereços são
   inventados e servem apenas de demonstração visual.
   Nenhum preço, prato ou estabelecimento real é representado aqui. */

const price=value=>'R$ '+String(value);

const menus={
 'brasa-sabor':[
  {id:'entradas',title:'Para começar',note:'Porções pensadas para a mesa',
   items:[
    {name:'Pão de brasa com manteiga de ervas',desc:'Massa fermentada lentamente, manteiga batida com alecrim e sal defumado.',price:price(28)},
    {name:'Carpaccio de cupim',desc:'Tiras finas de cupim curado, azeite trufado, lascas de queijo meia-cura e rúcula.',price:price(46)},
    {name:'Bolinho de mandioca com queijo',desc:'Massa cremosa no ponto, recheio derretido e molho de pimenta artesanal.',price:price(34),tag:'Vegetariano'},
    {name:'Frango na cachaça com alho tostado',desc:'Cubos de frango marinados, selados na chapa e finalizados com limão siciliano.',price:price(42)}
   ]},
  {id:'brasa',title:'Da brasa',note:'Cortes defumados lentamente sobre carvão de madeira',
   items:[
    {name:'Ancho na brasa',desc:'Corte argentino de 400g, cura de 21 dias, sal grosso e pimenta do reino.',price:price(168),tag:'Mais pedido'},
    {name:'Picanha na salmoura seca',desc:'Picanha de 500g com farofa de bacon e vinaigrete de tomate confit.',price:price(186)},
    {name:'Costela de 12 horas',desc:'Costela bovina defumada até desfiar, glace de rapadura e mostarda antiga.',price:price(154)},
    {name:'Filé ao molho de vinho',desc:'Medalhão de filé-mignon, redução de tinto seco, manteiga de garrafa.',price:price(172)},
    {name:'Coração de frango na rosa',desc:'Espetos temperados com limão, alho e coentro, grelhados ponto a ponto.',price:price(64),tag:'Para compartilhar'}
   ]},
  {id:'acompanhamentos',title:'Acompanhamentos',
   items:[
    {name:'Farofa de ovos e bacon',desc:'Farinha de mandioca tostada na manteiga com ovos cremosos e bacon crocante.',price:price(32)},
    {name:'Purê de batata rústico',desc:'Batata amassada com casca, manteiga de ervas e queijo gratinado.',price:price(34)},
    {name:'Legumes na brasa',desc:'Abobrinha, cenoura e pimentão com azeite, sal marinho e hortelã.',price:price(36),tag:'Vegetariano'},
    {name:'Arroz de alho negro',desc:'Arroz soltinho com alho negro, sementes tostadas e cebolinha.',price:price(29)}
   ]},
  {id:'sobremesas',title:'Sobremesas',
   items:[
    {name:'Pudim de leite queimado',desc:'Caramelo escuro, textura sedosa e flor de sal por cima.',price:price(32)},
    {name:'Brownie com creme de avelã',desc:'Brownie morno, creme de avelã artesanal e sorvete de baunilha.',price:price(38)},
    {name:'Frutas caramelizadas na brasa',desc:'Mamão, banana e maçã com calda de rum e castanha tostada.',price:price(30),tag:'Vegetariano'}
   ]},
  {id:'bebidas',title:'Bebidas',
   items:[
    {name:'Chopp artesanal da casa',desc:'Lager clara de fermentação própria, servida a 4°C.',price:price(18)},
    {name:'Caipirinha defumada',desc:'Cachaça envelhecida em carvalho, limão queimado e açúcar mascavo.',price:price(34)},
    {name:'Suco de laranja com gengibre',desc:'Laranja espremida na hora com gengibre fresco e gelo.',price:price(16),tag:'Sem álcool'},
    {name:'Vinho tinto da casa',desc:'Taça de malbec argentino selecionado pela casa.',price:price(42)}
   ]}
 ],

 'sushi-kai':[
  {id:'zensai',title:'Zensai',note:'Aberturas frias para abrir o paladar',
   items:[
    {name:'Edamame com sal marinho',desc:'Vagens cozidas no vapor, sal grosso e raspas de yuzu.',price:price(28),tag:'Vegetariano'},
    {name:'Sunomono de pepino',desc:'Pepino em tiras finas, vinagre de arroz, gergelim tostado e wakame.',price:price(32)},
    {name:'Tataki de atum',desc:'Atum selado na chapa, ponzu de laranja, cebolinha e gema curada.',price:price(58),tag:'Mais pedido'},
    {name:'Missoshiro de tofu sedoso',desc:'Caldo claro de missô com tofu, algas e cebolinha fresca.',price:price(36)}
   ]},
  {id:'yakimono',title:'Yakimono',note:'Grelhados no carvão binchotan',
   items:[
    {name:'Gyutoro de wagyu',desc:'Corte nobre grelhado rapidamente, sal de hakata e wasabi fresco.',price:price(128)},
    {name:'Salmao teriyaki',desc:'Filé grelhado com molho teriyaki reduzido, gergelim e limão japonês.',price:price(96),tag:'Mais pedido'},
    {name:'Ebi com manteiga de missô',desc:'Camarões grelhados com manteiga de missô, alho negro e cebolinha.',price:price(88)},
    {name:'Shiitake recheado',desc:'Cogumelos shiitake com recheio de alho negro e ponzu.',price:price(62),tag:'Vegetariano'}
   ]},
  {id:'nigiri',title:'Nigiri & Sashimi',note:'Servidos em pares, exceto sashimi',
   items:[
    {name:'Nigiri de salmão',desc:'Arroz temperado com vinagre de bambu e fatia de salmão fresco.',price:price(32),tag:'2 unidades'},
    {name:'Nigiri de atum akami',desc:'Parte magra do atum, cortada no sentido do grão, wasabi no ponto.',price:price(42),tag:'2 unidades'},
    {name:'Nigiri de camarão cozido',desc:'Camarão aberto no meio, arroz soltinho e pincelada de shoyu.',price:price(28),tag:'2 unidades'},
    {name:'Omakase de nigiri',desc:'Seleção do chef com 8 peças variadas conforme o pescado do dia.',price:price(168),tag:'8 unidades'},
    {name:'Sashimi de salmão',desc:'Fatias grossas de salmão, wasabi ralado na hora e gengibre.',price:price(78),tag:'5 fatias'}
   ]},
  {id:'makimono',title:'Makimono',note:'Enrolados clássicos e de criação',
   items:[
    {name:'Kappa maki',desc:'Pepino fresco, arroz e nori, com gergelim tostado.',price:price(26),tag:'Vegetariano'},
    {name:'California maki',desc:'Camarão, manga, pepino e kani com tobiko por fora.',price:price(48),tag:'8 unidades'},
    {name:'Dragon maki',desc:'Salmão grelhado por cima, ebi tempura por dentro, molho unagi.',price:price(64),tag:'8 unidades'},
    {name:'Hot roll de camarão',desc:'Rolinho crocante por fora, camarão e cream cheese, molho picante.',price:price(56),tag:'8 unidades'}
   ]},
  {id:'sobremesas',title:'Sobremesas',
   items:[
    {name:'Mochi de sorvete',desc:'Massa de arroz macia recheada com sorvete de matcha ou manga.',price:price(34)},
    {name:'Purê de castanha',desc:'Doce tradicional japonês com textura aveludada e gergelim moído.',price:price(32),tag:'Vegetariano'},
    {name:'Matcha cheesecake',desc:'Cheesecake leve com pó de matcha e calda de chocolate branco.',price:price(38)}
   ]},
  {id:'bebidas',title:'Bebidas',
   items:[
    {name:'Chá sencha da casa',desc:'Chá verde japonês servido quente, colheita da estação.',price:price(22),tag:'Sem álcool'},
    {name:'Sake junmai',desc:'Taça de sake artesanal sem adição de álcool, aroma seco.',price:price(46)},
    {name:'Saquê da casa',desc:'Saquê japonês servido gelado em copo pequeno.',price:price(38)},
    {name:'Limonada com shiso',desc:'Limão japonês e shiso vermelho, servida com gelo.',price:price(24),tag:'Sem álcool'}
   ]}
 ],

 'bella-pizza':[
  {id:'antipasti',title:'Antipasti',note:'Para dividir à mesa',
   items:[
    {name:'Bruschetta de tomate e manjericão',desc:'Pão italiano torrado, tomate confit, manjericão fresco e azeite.',price:price(32),tag:'Vegetariano'},
    {name:'Burrata com pesto',desc:'Burrata cremosa, pesto de manjericão preparado na casa e tomate confit.',price:price(68),tag:'Mais pedido'},
    {name:'Carpaccio de polvo',desc:'Polvo grelhado, azeite trufado, alcaparras e raspas de limão.',price:price(72)},
    {name:'Arancini de risoto',desc:'Bolinhos crocantes de risoto com recheio de queijo derretido.',price:price(44),tag:'Vegetariano'}
   ]},
  {id:'pizze',title:'Pizze',note:'Massa de fermentação natural de 48 horas',
   items:[
    {name:'Margherita DOP',desc:'Molho de tomate San Marzano, mozzarella de búfala, manjericão e azeite.',price:price(74),tag:'Vegetariano'},
    {name:'Diavola Piccante',desc:'Molho de tomate, mozzarella, linguiça picante artesanal e mel.',price:price(82),tag:'Mais pedido'},
    {name:'Quattro Formaggi',desc:'Mozzarella, gorgonzola, parmesão e provolone com toque de mel.',price:price(88),tag:'Vegetariano'},
    {name:'Prosciutto e Rucola',desc:'Massa fina, mozzarella, presunto cru, rúcula e lascas de parmesão.',price:price(92)},
    {name:'Vegetariana dell\'Orto',desc:'Abobrinha, berinjela, pimentão assado, cebola roxa e mozzarella.',price:price(79),tag:'Vegetariano'},
    {name:'Quattro Stagioni',desc:'Presunto, cogumelos, alcachofras e azeitonas em quatro quadrantes.',price:price(86)}
   ]},
  {id:'primi',title:'Primi',note:'Massas frescas feitas na casa',
   items:[
    {name:'Tagliatelle al Ragù',desc:'Massa fresca com ragù de carne cozido lentamente por horas.',price:price(84),tag:'Mais pedido'},
    {name:'Risotto alla Milanese',desc:'Risotto com açafrão, caldo de legumes e lascas de parmesão.',price:price(78),tag:'Vegetariano'},
    {name:'Gnocchi al Pomodoro',desc:'Nhoque de batata macio com molho de tomate fresco e manjericão.',price:price(72),tag:'Vegetariano'},
    {name:'Linguine alle Vongole',desc:'Linguine com vongole, alho, vinho branco e salsinha.',price:price(96)}
   ]},
  {id:'dolci',title:'Dolci',
   items:[
    {name:'Tiramisù della Casa',desc:'Mascarpone aerado, café espresso e cacau em pó.',price:price(38),tag:'Mais pedido'},
    {name:'Panna Cotta de baunilha',desc:'Creme cozido com baunilha e calda de frutas vermelhas.',price:price(34),tag:'Vegetariano'},
    {name:'Gelato artesanal',desc:'Duas bolas de gelato preparado diariamente na casa.',price:price(28),tag:'Vegetariano'}
   ]},
  {id:'bebidas',title:'Bebidas',
   items:[
    {name:'Limonada de capim-limão',desc:'Capim-limão infusionado com gelo e raspas de limão.',price:price(18),tag:'Sem álcool'},
    {name:'Chopp italiano',desc:'Cerveja de trigo servida com fatia de laranja.',price:price(20)},
    {name:'Suco de laranja natural',desc:'Laranjas espremidas na hora, sem açúcar adicionado.',price:price(16),tag:'Sem álcool'},
    {name:'Vinho tinto da casa',desc:'Taça de Chianti selecionado pela casa.',price:price(44)}
   ]}
 ]
};

const restaurantes={
 'brasa-sabor':{
  nome:'BRASA & SABOR',
  categoria:'restaurantes',
  resumo:'Modelo de churrascaria gourmet com menu de carnes defumadas, reserva de mesa e cardápio fictício sinalizado como demonstrativo.',
  servicos:['Churrascaria gourmet','Menu de carnes defumadas','Reserva de mesa demonstrativa','Cardápio com preços fictícios'],
  faq:[
   {q:'Os preços do cardápio são reais?',a:'Não. Todos os preços, pratos, horários e endereços desta página são fictícios e existem apenas para demonstrar o layout do cardápio.'},
   {q:'A reserva de mesa envia dados reais?',a:'Não. O formulário funciona apenas no navegador, não envia nome, telefone ou qualquer dado pessoal.'},
   {q:'As imagens mostram comida real?',a:'Não. As imagens são fotografias ilustrativas geradas por IA para esta marca fictícia. Não representam pratos ou espaços de um restaurante real.'},
   {q:'Posso usar as fotos reais do meu restaurante?',a:'Sim. As imagens, o cardápio e os canais de atendimento podem ser personalizados com as informações do cliente.'}
  ],
  mesas:['2 pessoas','3 pessoas','4 pessoas','5 ou mais pessoas'],
  turnos:['Almoço','Jantar'],
  reservas:'O formulário de reserva desta página é simulado e não coleta dados pessoais.',
  hours:[['Terça a quinta','18h às 23h'],['Sexta e sábado','18h às 00h'],['Domingo','12h às 17h']],
  location:'Rua fictícia, nº 00 — Bairro demonstrativo. Localização criada apenas para o modelo.'
 },
 'sushi-kai':{
  nome:'SUSHI KAI',
  categoria:'restaurantes',
  resumo:'Modelo de restaurante japonês com menu estruturado por etapas, mesa de reserva simulada e preços fictícios sinalizados.',
  servicos:['Restaurante japonês','Menu por etapas do omakase','Reserva de mesa demonstrativa','Cardápio com preços fictícios'],
  faq:[
   {q:'Os preços do cardápio são reais?',a:'Não. Todos os preços, pratos, horários e endereços desta página são fictícios e existem apenas para demonstrar o layout do cardápio.'},
   {q:'A reserva de mesa envia dados reais?',a:'Não. O formulário funciona apenas no navegador, não envia nome, telefone ou qualquer dado pessoal.'},
   {q:'As imagens mostram comida real?',a:'Não. As imagens são fotografias ilustrativas geradas por IA para esta marca fictícia. Não representam pratos ou espaços de um restaurante real.'},
   {q:'Posso usar as fotos reais do meu restaurante?',a:'Sim. As imagens, o cardápio e os canais de atendimento podem ser personalizados com as informações do cliente.'}
  ],
  mesas:['2 pessoas','4 pessoas','6 pessoas','Balcão do chef'],
  turnos:['Jantar','Jantar tardio'],
  reservas:'O formulário de reserva desta página é simulado e não coleta dados pessoais.',
  hours:[['Terça a domingo','19h às 23h30'],['Balcão do chef','18h às 23h'],['Segunda','Fechado']],
  location:'Rua fictícia, nº 00 — Bairro demonstrativo. Localização criada apenas para o modelo.'
 },
 'bella-pizza':{
  nome:'BELLA PIZZA',
  categoria:'restaurantes',
  resumo:'Modelo de pizzaria italiana com menu completo de antipasti, pizze e primi, reserva simulada e preços fictícios.',
  servicos:['Pizzaria italiana','Massa de fermentação natural','Reserva de mesa demonstrativa','Cardápio com preços fictícios'],
  faq:[
   {q:'Os preços do cardápio são reais?',a:'Não. Todos os preços, pratos, horários e endereços desta página são fictícios e existem apenas para demonstrar o layout do cardápio.'},
   {q:'A reserva de mesa envia dados reais?',a:'Não. O formulário funciona apenas no navegador, não envia nome, telefone ou qualquer dado pessoal.'},
   {q:'As imagens mostram comida real?',a:'Não. As imagens são fotografias ilustrativas geradas por IA para esta marca fictícia. Não representam pratos ou espaços de um restaurante real.'},
   {q:'Posso usar as fotos reais do meu restaurante?',a:'Sim. As imagens, o cardápio e os canais de atendimento podem ser personalizados com as informações do cliente.'}
  ],
  mesas:['2 pessoas','4 pessoas','6 pessoas','Mesa do balcão'],
  turnos:['Almoço','Jantar'],
  reservas:'O formulário de reserva desta página é simulado e não coleta dados pessoais.',
  hours:[['Terça a quinta','18h às 23h'],['Sexta e sábado','18h às 00h'],['Domingo','11h30 às 16h']],
  location:'Rua fictícia, nº 00 — Bairro demonstrativo. Localização criada apenas para o modelo.'
 }
};

module.exports={menus,restaurantes,price};
