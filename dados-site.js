/* Fonte única do institucional, contato e projetos demonstrativos. */
(function(global){
 const data = {
  "brand": "TS Digital",
  "whatsapp": "557598783356",
  "whatsappDisplay": "(75) 9878-3356",
  "siteUrl": "https://tsdigital.com.br/",
  "location": {
    "city": "Seabra",
    "region": "BA",
    "regionName": "Bahia",
    "country": "BR",
    "countryName": "Brasil"
  },
  "portfolioAnchor": "index.html#modelos",
  "seo": {
    "title": "TS Digital | Criação de sites em Seabra e outras cidades",
    "description": "Criação de sites personalizados pela TS Digital, em Seabra, Bahia, com atendimento online para outras cidades. Projetos a partir de R$ 497. Peça uma prévia do seu site.",
    "shareTitle": "TS Digital — Sites reais, feitos para o seu negócio",
    "shareDescription": "Design, conteúdo e recursos planejados para a sua marca. Projetos a partir de R$ 497. Peça uma prévia pelo WhatsApp.",
    "shareImage": "assets/ts-digital/compartilhar.webp",
    "shareImageAlt": "TS Digital, sites personalizados para negócios, com projetos demonstrativos navegáveis em computador e celular",
    "updated": "2026-10-12"
  },
  "categories": [
    {
      "id": "todos",
      "name": "Todos"
    },
    {
      "id": "personal",
      "name": "Personal Trainers"
    },
    {
      "id": "academias",
      "name": "Academias"
    },
    {
      "id": "saude",
      "name": "Saúde"
    },
    {
      "id": "restaurantes",
      "name": "Restaurantes"
    },
    {
      "id": "beleza",
      "name": "Beleza"
    },
    {
      "id": "comercios",
      "name": "Comércios"
    },
    {
      "id": "servicos",
      "name": "Serviços"
    }
  ],
  "niches": [
    {
      "id": "personal",
      "title": "Personal Trainers",
      "icon": "dumbbell",
      "category": "personal",
      "description": "Seu método e seu acompanhamento, bem apresentados.",
      "features": "Apresentação profissional, planos, resultados e depoimentos autorizados, agendamento e WhatsApp.",
      "message": "Olá! Quero uma proposta de site para meu trabalho como personal trainer."
    },
    {
      "id": "academias",
      "title": "Academias",
      "icon": "weight",
      "category": "academias",
      "description": "A escolha do plano começa com informações claras.",
      "features": "Planos, modalidades, estrutura, professores, horários, localização e matrícula.",
      "message": "Olá! Gostaria de receber uma proposta de site para minha academia."
    },
    {
      "id": "odontologia",
      "title": "Dentistas e odontologia",
      "icon": "tooth",
      "category": "saude",
      "description": "Um espaço profissional para apresentar seu consultório.",
      "features": "Profissionais, especialidades, tratamentos, informações do consultório, conteúdo informativo e agendamento de avaliações.",
      "message": "Olá! Conheci a TS Digital e gostaria de saber mais sobre um site para meu consultório odontológico."
    },
    {
      "id": "saude",
      "title": "Clínicas e saúde",
      "icon": "health",
      "category": "saude",
      "description": "Informações de atendimento fáceis de encontrar.",
      "features": "Especialidades, equipe, convênios quando aplicável, agendamentos e localização.",
      "message": "Olá! Quero conversar sobre um site para minha clínica ou atuação na área da saúde."
    },
    {
      "id": "restaurantes",
      "title": "Restaurantes e lanchonetes",
      "icon": "food",
      "category": "restaurantes",
      "description": "Seu cardápio e o caminho para pedir em um só lugar.",
      "features": "Cardápio digital, fotos, preços, horários, localização e pedidos pelo WhatsApp.",
      "message": "Olá! Tenho interesse em um site ou cardápio digital para meu restaurante ou lanchonete."
    },
    {
      "id": "beleza",
      "title": "Beleza e estética",
      "icon": "sparkle",
      "category": "beleza",
      "description": "Apresente seus serviços com a identidade do seu espaço.",
      "features": "Serviços, portfólio autorizado, informações de atendimento e agendamento online ou WhatsApp, conforme o escopo.",
      "message": "Olá! Quero uma proposta de site para meu salão ou negócio de estética."
    },
    {
      "id": "advocacia",
      "title": "Advogados e escritórios",
      "icon": "scale",
      "category": "servicos",
      "description": "Uma apresentação institucional clara e sóbria.",
      "features": "Áreas de atuação, apresentação do escritório, equipe e contato profissional.",
      "message": "Olá! Gostaria de uma proposta de site institucional para meu escritório de advocacia."
    },
    {
      "id": "comercios",
      "title": "Lojas e comércios",
      "icon": "shop",
      "category": "comercios",
      "description": "Sua marca e seus produtos ao alcance de novos contatos.",
      "features": "Catálogo de produtos, apresentação da marca, informações comerciais, contato e orçamento.",
      "message": "Olá! Quero saber mais sobre um site ou catálogo online para minha loja."
    },
    {
      "id": "servicos",
      "title": "Prestadores de serviços",
      "icon": "tools",
      "category": "servicos",
      "description": "Mostre o que você faz e facilite o pedido de orçamento.",
      "features": "Serviços e portfólio para eletricistas, arquitetos, engenheiros, consultores e outros profissionais.",
      "message": "Olá! Sou prestador de serviços e quero uma proposta de site para apresentar meu trabalho."
    },
    {
      "id": "outros",
      "title": "Outros segmentos",
      "icon": "grid",
      "category": "todos",
      "description": "Seu negócio tem uma necessidade própria? Vamos conversar.",
      "features": "Estrutura, conteúdo e identidade definidos a partir da sua ideia e do escopo aprovado.",
      "message": "Olá! Meu negócio é de outro segmento. Quero conversar sobre um projeto personalizado."
    }
  ],
  "projects": [
    {
      "id": "modelo01",
      "name": "Essencial",
      "category": "personal",
      "description": "Serviços, planos e uma apresentação completa do acompanhamento.",
      "image": "./assets/catalogo/modelo01.webp",
      "url": "./modelo01/index.html",
      "resources": [
        "Serviços",
        "Planos",
        "Depoimentos ilustrativos"
      ],
      "type": "Landing page",
      "style": "Essencial / Direto",
      "status": "demonstracao",
      "label": "Modelo 01",
      "palette": [
        "#00b187",
        "#2d3443"
      ],
      "paletteName": "Verde e grafite",
      "focus": "Modelo 01 · Essencial",
      "goal": "Apresentar serviços, planos e formas de acompanhamento."
    },
    {
      "id": "modelo02",
      "name": "Performance",
      "category": "personal",
      "description": "Uma direção visual marcante para explicar sua consultoria e o método de treino.",
      "image": "./assets/catalogo/modelo02.webp",
      "url": "./modelo02/index.html",
      "resources": [
        "Método",
        "Acompanhamento",
        "Resultados ilustrativos"
      ],
      "type": "Landing page",
      "style": "Dark / Performance",
      "status": "demonstracao",
      "label": "Modelo 02",
      "palette": [
        "#22b9ed",
        "#080a0d"
      ],
      "paletteName": "Azul e preto",
      "focus": "Modelo 02 · Performance",
      "goal": "Explicar a consultoria e o método de treino."
    },
    {
      "id": "modelo03",
      "name": "Equilíbrio",
      "category": "personal",
      "description": "Um estilo editorial para apresentar uma proposta de movimento com intenção.",
      "image": "./assets/catalogo/modelo03.webp",
      "url": "./modelo03/index.html",
      "resources": [
        "Programas",
        "Método",
        "Apresentação"
      ],
      "type": "Landing page",
      "style": "Natural / Editorial",
      "status": "demonstracao",
      "label": "Modelo 03",
      "palette": [
        "#96482f",
        "#f5f1e9"
      ],
      "paletteName": "Terroso e claro",
      "focus": "Modelo 03 · Equilíbrio",
      "goal": "Apresentar programas com uma linguagem editorial."
    },
    {
      "id": "modelo04",
      "name": "Impacto",
      "category": "personal",
      "description": "Contraste e energia para uma apresentação esportiva com personalidade.",
      "image": "./assets/catalogo/modelo04.webp",
      "url": "./modelo04/index.html",
      "resources": [
        "Programas",
        "Método",
        "Contato"
      ],
      "type": "Landing page",
      "style": "Esportivo / Impacto",
      "status": "demonstracao",
      "label": "Modelo 04",
      "palette": [
        "#ff792f",
        "#111112"
      ],
      "paletteName": "Laranja e preto",
      "focus": "Modelo 04 · Impacto",
      "goal": "Destacar programas esportivos e facilitar o contato."
    },
    {
      "id": "modelo05",
      "name": "Precisão",
      "category": "personal",
      "description": "Clareza para explicar cada etapa do seu processo de acompanhamento.",
      "image": "./assets/catalogo/modelo05.webp",
      "url": "./modelo05/index.html",
      "resources": [
        "Programas",
        "Acompanhamento",
        "FAQ"
      ],
      "type": "Landing page",
      "style": "Clean / Profissional",
      "status": "demonstracao",
      "label": "Modelo 05",
      "palette": [
        "#1855a4",
        "#ffffff"
      ],
      "paletteName": "Branco e azul",
      "focus": "Modelo 05 · Precisão",
      "goal": "Explicar as etapas do acompanhamento com clareza."
    },
    {
      "id": "modelo06",
      "name": "Essência",
      "category": "personal",
      "description": "Uma consultoria feminina com uma apresentação que combina força e acolhimento.",
      "image": "./assets/catalogo/modelo06.webp",
      "url": "./modelo06/index.html",
      "resources": [
        "Programas",
        "Apresentação",
        "Contato"
      ],
      "type": "Landing page",
      "style": "Feminino / Acolhedor",
      "status": "demonstracao",
      "label": "Modelo 06",
      "palette": [
        "#8c2848",
        "#fbf3f3"
      ],
      "paletteName": "Vinho e rosé",
      "focus": "Modelo 06 · Essência",
      "goal": "Apresentar uma consultoria com força e acolhimento."
    },
    {
      "id": "iron-force",
      "name": "IRON FORCE",
      "category": "academias",
      "url": "./modelos/academias/iron-force/index.html",
      "style": "Dark Premium / Performance",
      "palette": [
        "#0B0B0D",
        "#E53935",
        "#FFFFFF",
        "#232326"
      ],
      "description": "Uma academia de força com presença marcante, planos em abas e apresentação da estrutura.",
      "image": "./assets/catalogo/iron-force.webp",
      "resources": [
        "Planos mensais e anuais",
        "Modalidades",
        "Equipe fictícia"
      ],
      "type": "Site de academia",
      "status": "demonstracao",
      "label": "IRON FORCE",
      "paletteName": "Preto e vermelho",
      "focus": "Academia de força",
      "goal": "Apresentar estrutura, modalidades e opções de matrícula."
    },
    {
      "id": "viva-fit",
      "name": "VIVA FIT",
      "category": "academias",
      "url": "./modelos/academias/viva-fit/index.html",
      "style": "Clean / Lifestyle / Bem-estar",
      "palette": [
        "#FFFFFF",
        "#9BCB7B",
        "#25332B",
        "#F5F2EA"
      ],
      "description": "Uma experiência acolhedora de treino e bem-estar, com espaço, modalidades e planos claros.",
      "image": "./assets/catalogo/viva-fit.webp",
      "resources": [
        "Estrutura",
        "Planos",
        "Professores fictícios"
      ],
      "type": "Site de academia",
      "status": "demonstracao",
      "label": "VIVA FIT",
      "paletteName": "Verde, branco e bege",
      "focus": "Academia e bem-estar",
      "goal": "Acolher quem procura uma rotina de treino e mostrar a experiência do espaço."
    },
    {
      "id": "pulse-studio",
      "name": "PULSE STUDIO",
      "category": "academias",
      "url": "./modelos/academias/pulse-studio/index.html",
      "style": "Urban / Fitness Boutique",
      "palette": [
        "#14213D",
        "#FF7A00",
        "#F7F5F0",
        "#101820"
      ],
      "description": "Fitness boutique com aulas coletivas, grade interativa e assinaturas em composição editorial.",
      "image": "./assets/catalogo/pulse-studio.webp",
      "resources": [
        "Grade de aulas",
        "Modalidades",
        "Assinaturas"
      ],
      "type": "Site de academia",
      "status": "demonstracao",
      "label": "PULSE STUDIO",
      "paletteName": "Azul-marinho e laranja",
      "focus": "Estúdio de aulas",
      "goal": "Facilitar a escolha de modalidades e a consulta da agenda."
    },
    {
      "id": "odonto-prime",
      "name": "ODONTO PRIME",
      "category": "saude",
      "url": "./modelos/saude/odonto-prime/index.html",
      "style": "Luxo discreto / Premium",
      "palette": [
        "#142B45",
        "#C6A76A",
        "#FFFFFF",
        "#F4F6F8"
      ],
      "description": "Odontologia com ambiente em destaque, apresentação profissional, especialidades e avaliação simulada.",
      "image": "./assets/catalogo/odonto-prime.webp",
      "resources": [
        "Especialidades",
        "A profissional fictícia",
        "Consultório e avaliação simulada"
      ],
      "type": "Site de consultório",
      "status": "demonstracao",
      "label": "ODONTO PRIME",
      "paletteName": "Azul-marinho e dourado",
      "focus": "Consultório odontológico",
      "goal": "Apresentar o cuidado, a profissional e o caminho para uma avaliação."
    },
    {
      "id": "vitalis-clinica",
      "name": "VITALIS CLÍNICA",
      "category": "saude",
      "url": "./modelos/saude/vitalis-clinica/index.html",
      "style": "Clean / Saúde / Confiança",
      "palette": [
        "#277DA1",
        "#81B29A",
        "#FFFFFF",
        "#EDF3F5"
      ],
      "description": "Clínica multidisciplinar com serviços filtráveis, equipe fictícia, convênios ilustrativos e agendamento simulado.",
      "image": "./assets/catalogo/vitalis-clinica.webp",
      "resources": [
        "Serviços filtráveis",
        "Equipe fictícia",
        "Agendamento demonstrativo"
      ],
      "type": "Site de clínica",
      "status": "demonstracao",
      "label": "VITALIS CLÍNICA",
      "paletteName": "Azul e verde",
      "focus": "Clínica multidisciplinar",
      "goal": "Organizar especialidades e informações de atendimento."
    },
    {
      "id": "equilibrio-fisio",
      "name": "EQUILÍBRIO FISIO",
      "category": "saude",
      "url": "./modelos/saude/equilibrio-fisio/index.html",
      "style": "Natural / Minimalista",
      "palette": [
        "#647A64",
        "#E9E1D2",
        "#FFFFFF",
        "#303830"
      ],
      "description": "Fisioterapia com fotografia de movimento, composição natural, serviços em acordeão e avaliação simulada.",
      "image": "./assets/catalogo/equilibrio-fisio.webp",
      "resources": [
        "Serviços em acordeão",
        "Abordagem individual",
        "Avaliação demonstrativa"
      ],
      "type": "Site de fisioterapia",
      "status": "demonstracao",
      "label": "EQUILÍBRIO FISIO",
      "paletteName": "Verde-oliva e areia",
      "focus": "Fisioterapia",
      "goal": "Explicar a abordagem individual e facilitar o primeiro contato."
    },
    {
      "id": "brasa-sabor",
      "name": "BRASA & SABOR",
      "category": "restaurantes",
      "url": "./modelos/restaurantes/brasa-sabor/index.html",
      "style": "Rústico / Gourmet",
      "palette": [
        "#442B21",
        "#C66B3D",
        "#F8F0E5"
      ],
      "description": "Churrascaria com fotografia gastronômica, cardápio por categorias e reserva de mesa demonstrativa.",
      "image": "./assets/catalogo/brasa-sabor.webp",
      "resources": [
        "Cardápio por categorias",
        "Reserva de mesa simulada",
        "Fotografias ilustrativas"
      ],
      "type": "Site de churrascaria",
      "status": "demonstracao",
      "label": "BRASA & SABOR",
      "paletteName": "Marrom, laranja e creme",
      "focus": "Churrascaria",
      "goal": "Valorizar pratos e ambiente e conduzir à consulta do cardápio."
    },
    {
      "id": "sushi-kai",
      "name": "SUSHI KAI",
      "category": "restaurantes",
      "url": "./modelos/restaurantes/sushi-kai/index.html",
      "style": "Japanese Minimal / Dark",
      "palette": [
        "#101010",
        "#B62B32",
        "#E9E0D2"
      ],
      "description": "Restaurante japonês com fotografia de sushi em destaque, menu por categorias e reserva simulada.",
      "image": "./assets/catalogo/sushi-kai.webp",
      "resources": [
        "Menu por categorias",
        "Fotografia gastronômica",
        "Reserva de mesa simulada"
      ],
      "type": "Site de restaurante japonês",
      "status": "demonstracao",
      "label": "SUSHI KAI",
      "paletteName": "Preto, vermelho e osso",
      "focus": "Restaurante japonês",
      "goal": "Apresentar a experiência gastronômica e facilitar a reserva."
    },
    {
      "id": "bella-pizza",
      "name": "BELLA PIZZA",
      "category": "restaurantes",
      "url": "./modelos/restaurantes/bella-pizza/index.html",
      "style": "Italiano / Aconchegante",
      "palette": [
        "#D64541",
        "#3E6B48",
        "#FFF4DF"
      ],
      "description": "Pizzaria italiana com pizza em destaque, cardápio por categorias, pedido e reserva demonstrativos.",
      "image": "./assets/catalogo/bella-pizza.webp",
      "resources": [
        "Cardápio por categorias",
        "Pedido demonstrativo",
        "Reserva de mesa simulada"
      ],
      "type": "Site de pizzaria",
      "status": "demonstracao",
      "label": "BELLA PIZZA",
      "paletteName": "Tomate, manjericão e massa",
      "focus": "Pizzaria",
      "goal": "Mostrar os sabores e facilitar a escolha de um pedido."
    }
  ],
  "plannedModels": [
    {
      "id": "bella-studio",
      "name": "BELLA STUDIO",
      "category": "beleza",
      "phase": 5,
      "url": "./modelos/beleza/bella-studio/index.html",
      "style": "Feminino / Elegante",
      "palette": [
        "#D8A7A7",
        "#FFF8F4",
        "#57443F"
      ]
    },
    {
      "id": "lumi-estetica",
      "name": "LUMI ESTÉTICA",
      "category": "beleza",
      "phase": 5,
      "url": "./modelos/beleza/lumi-estetica/index.html",
      "style": "Luxo / Minimalista",
      "palette": [
        "#D6C3A1",
        "#171717",
        "#FFFFFF"
      ]
    },
    {
      "id": "barber-club",
      "name": "BARBER CLUB",
      "category": "beleza",
      "phase": 5,
      "url": "./modelos/beleza/barber-club/index.html",
      "style": "Industrial",
      "palette": [
        "#151515",
        "#B8864B",
        "#343434"
      ]
    },
    {
      "id": "urban-store",
      "name": "URBAN STORE",
      "category": "comercios",
      "phase": 6,
      "url": "./modelos/comercios/urban-store/index.html",
      "style": "Fashion Editorial",
      "palette": [
        "#000000",
        "#FFFFFF",
        "#E7E7E7",
        "#D64541"
      ]
    },
    {
      "id": "casa-viva",
      "name": "CASA VIVA",
      "category": "comercios",
      "phase": 6,
      "url": "./modelos/comercios/casa-viva/index.html",
      "style": "Natural / Escandinavo",
      "palette": [
        "#E9E1D2",
        "#8A9E86",
        "#FAF8F3",
        "#57443F"
      ]
    },
    {
      "id": "tech-point",
      "name": "TECH POINT",
      "category": "comercios",
      "phase": 6,
      "url": "./modelos/comercios/tech-point/index.html",
      "style": "Tech / Futurista",
      "palette": [
        "#2962FF",
        "#000000",
        "#20252E",
        "#FFFFFF"
      ]
    },
    {
      "id": "nexus-engenharia",
      "name": "NEXUS ENGENHARIA",
      "category": "servicos",
      "phase": 7,
      "url": "./modelos/servicos/nexus-engenharia/index.html",
      "style": "Corporate / Industrial",
      "palette": [
        "#142B45",
        "#F1C744",
        "#FFFFFF",
        "#E9EDF1"
      ]
    },
    {
      "id": "almeida-consultoria",
      "name": "ALMEIDA CONSULTORIA",
      "category": "servicos",
      "phase": 7,
      "url": "./modelos/servicos/almeida-consultoria/index.html",
      "style": "Corporate / Premium",
      "palette": [
        "#152A40",
        "#C6A76A",
        "#FFFFFF"
      ]
    },
    {
      "id": "arquitetura-essencia",
      "name": "ARQUITETURA ESSÊNCIA",
      "category": "servicos",
      "phase": 7,
      "url": "./modelos/servicos/arquitetura-essencia/index.html",
      "style": "Editorial / Minimalista",
      "palette": [
        "#E9E1D2",
        "#171717",
        "#FFFFFF",
        "#C66B3D"
      ]
    }
  ],
  "legacyModels": [],
  "pricing": {
    "from": 497,
    "currency": "BRL",
    "description": "O investimento varia conforme páginas, conteúdo, integrações e funcionalidades. Você recebe uma proposta com o escopo antes de começar."
  },
  "previewMessage": "Olá! Quero uma prévia do meu site com a TS Digital. Gostaria de conversar sobre meu negócio e o que preciso apresentar.",
  "featuredProjects": [
    "modelo01",
    "modelo02",
    "modelo03",
    "iron-force",
    "vitalis-clinica",
    "bella-pizza"
  ]
};
 if(typeof module!=="undefined"&&module.exports)module.exports=data;else global.TS_DIGITAL=data;
})(typeof window!=="undefined"?window:globalThis);
