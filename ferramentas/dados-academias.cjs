/* Conteúdo comercial fictício. Não representa condições de uma academia real. */
module.exports = {
  'iron-force': {
    monthly:[
      {name:'BASE',price:149,description:'Seu treino de força começa aqui.',items:['Área de musculação','Orientação no salão','Acesso no horário de abertura']},
      {name:'FORCE',price:219,description:'Mais possibilidades para sua rotina.',items:['Musculação e treino funcional','Aulas em grupo','Acompanhamento no salão']},
      {name:'TOTAL',price:289,description:'Treino completo, no seu ritmo.',items:['Todas as modalidades','Encontro de planejamento','Musculação e aulas em grupo']}
    ],
    annual:[
      {name:'BASE ANUAL',price:129,description:'Uma rotina que atravessa o ano.',items:['Valor mensal ilustrativo','Compromisso demonstrativo de 12 meses','Área de musculação']},
      {name:'FORCE ANUAL',price:189,description:'Consistência em todas as modalidades.',items:['Valor mensal ilustrativo','Compromisso demonstrativo de 12 meses','Musculação e treino funcional']},
      {name:'TOTAL ANUAL',price:249,description:'Seu espaço para seguir em movimento.',items:['Valor mensal ilustrativo','Compromisso demonstrativo de 12 meses','Todas as modalidades']}
    ],
    team:[{name:'Lucas Nunes',role:'Treino de força',initials:'LN'},{name:'Camila Rocha',role:'Treino funcional',initials:'CR'},{name:'Rafael Lima',role:'Movimento e mobilidade',initials:'RL'}]
  },
  'viva-fit': {
    plans:[
      {name:'Movimento',price:159,description:'Um espaço no seu dia para cuidar de você.',items:['Musculação no seu ritmo','Orientação no salão','Acesso de segunda a sábado']},
      {name:'Viva completo',price:239,description:'Mais formas de encontrar o treino que você gosta.',items:['Musculação e aulas coletivas','Mobilidade e movimento','Encontro de planejamento de rotina']}
    ],
    team:[{name:'Ana Martins',role:'Musculação e rotina',initials:'AM'},{name:'Bruno Reis',role:'Aulas coletivas',initials:'BR'},{name:'Clara Souza',role:'Mobilidade e movimento',initials:'CS'}]
  },
  'pulse-studio': {
    plans:[
      {name:'START',price:99,description:'4 aulas por mês',items:['Escolha suas aulas','Reserva ilustrativa','Para entrar no ritmo']},
      {name:'FLOW',price:169,description:'8 aulas por mês',items:['Todas as modalidades','Reserva ilustrativa','Mais movimento na semana']},
      {name:'UNLIMITED',price:239,description:'Aulas sem limite mensal',items:['Todas as modalidades','Reserva ilustrativa','Uma rotina com mais liberdade']}
    ],
    schedule:{
      seg:[['07:00','PULSE Strength','Força em grupo','45 min'],['12:30','Functional Club','Movimento completo','45 min'],['19:00','Ride Session','Bike indoor','50 min']],
      ter:[['07:30','Functional Club','Movimento completo','45 min'],['18:00','Mobility Flow','Mobilidade','40 min'],['19:30','PULSE Strength','Força em grupo','45 min']],
      qua:[['07:00','Ride Session','Bike indoor','50 min'],['12:30','Mobility Flow','Mobilidade','40 min'],['19:00','Functional Club','Movimento completo','45 min']],
      qui:[['07:30','PULSE Strength','Força em grupo','45 min'],['18:00','Ride Session','Bike indoor','50 min'],['19:30','Mobility Flow','Mobilidade','40 min']],
      sex:[['07:00','Functional Club','Movimento completo','45 min'],['12:30','PULSE Strength','Força em grupo','45 min'],['18:00','Ride Session','Bike indoor','50 min']],
      sab:[['09:00','Weekend Club','Funcional em grupo','50 min'],['10:00','Mobility Flow','Mobilidade','40 min']]
    }
  }
};
