import { defineStore } from 'pinia';

export const useDestinationsStore = defineStore('destinations', {
  state: () => ({
    destinations: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getDestinationBySlug: (state) => (slug) => {
      return state.destinations.find(destination => destination.slug === slug);
    },
    
    getDestinationById: (state) => (id) => {
      return state.destinations.find(destination => destination.id === id);
    },
    
    popularDestinations: (state) => {
      return state.destinations.filter(destination => destination.popular).slice(0, 6);
    },
    
    regions: (state) => {
      const regionMap = {};
      
      state.destinations.forEach(destination => {
        if (!regionMap[destination.region]) {
          regionMap[destination.region] = {
            id: destination.region.toLowerCase().replace(/\s+/g, '-'),
            name: destination.region,
            slug: destination.region.toLowerCase().replace(/\s+/g, '-'),
            destinations: [],
            image: ''
          };
        }
        
        regionMap[destination.region].destinations.push({
          id: destination.id,
          name: destination.name,
          slug: destination.slug
        });
        
        // Use the first destination's image as the region image if not set
        if (!regionMap[destination.region].image) {
          regionMap[destination.region].image = destination.image;
        }
      });
      
      return Object.values(regionMap);
    }
  },
  
  actions: {
    async fetchDestinations() {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.destinations = [
          {
            id: '1',
            name: 'Ilhabela',
            slug: 'ilhabela',
            state: 'São Paulo',
            region: 'Sudeste',
            description: 'Ilhabela é um arquipélago e município brasileiro localizado no litoral norte do estado de São Paulo. É formado por um conjunto de ilhas, sendo a maior delas a Ilha de São Sebastião. Com mais de 80% de sua área preservada pela Mata Atlântica, o local é conhecido por suas belas praias, cachoeiras e trilhas ecológicas. É um destino perfeito para os amantes da natureza e de esportes aquáticos.',
            shortDescription: 'Paraíso natural com praias deslumbrantes, cachoeiras e mata atlântica preservada.',
            population: 'Aproximadamente 35.000 habitantes',
            climate: 'Tropical úmido',
            bestTimeToVisit: 'De abril a novembro, quando o clima é mais seco e as temperaturas são agradáveis.',
            bestMonths: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
            transportation: {
              airport: 'O aeroporto mais próximo é o de São José dos Campos (SJK), a cerca de 110 km.',
              bus: 'Há ônibus regulares saindo de São Paulo para São Sebastião, e de lá se pega a balsa para Ilhabela.',
              car: 'Pela Rodovia dos Tamoios (SP-099) até São Sebastião, e de lá se pega a balsa para Ilhabela.'
            },
            attractions: [
              {
                name: 'Praia do Curral',
                description: 'Uma das praias mais populares, com boa infraestrutura e águas calmas.'
              },
              {
                name: 'Cachoeira da Toca',
                description: 'Bela cachoeira com piscina natural, acessível por trilha de dificuldade média.'
              },
              {
                name: 'Pico de São Sebastião',
                description: 'O ponto mais alto da ilha, com 1.379 metros de altitude e vista panorâmica.'
              },
              {
                name: 'Vila Histórica',
                description: 'Centro histórico com construções do período colonial e diversos restaurantes.'
              }
            ],
            tips: [
              'Leve repelente, pois há muitos mosquitos, especialmente no verão.',
              'A travessia de balsa pode ter filas longas nos feriados e alta temporada.',
              'Reserve um dia para fazer trilhas e conhecer as cachoeiras da ilha.',
              'Visite as praias do lado norte da ilha, que são mais preservadas e menos movimentadas.'
            ],
            image: 'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1660244044448-755de1a29e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
              'https://images.unsplash.com/photo-1660244044739-6c70be6df7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
              'https://images.unsplash.com/photo-1660244044814-e6f1e1f4c70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
              'https://images.unsplash.com/photo-1660244044814-e6f1e1f4c70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
              'https://images.unsplash.com/photo-1660244044814-e6f1e1f4c70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
            ],
            tags: ['Praia', 'Natureza', 'Ilha', 'Ecoturismo'],
            popular: true,
            excursionsCount: 5,
            minPrice: 1200
          },
          {
            id: '2',
            name: 'Campos do Jordão',
            slug: 'campos-do-jordao',
            state: 'São Paulo',
            region: 'Sudeste',
            description: 'Campos do Jordão é um município brasileiro localizado no interior do estado de São Paulo, mais precisamente na Serra da Mantiqueira. Conhecida como a "Suíça Brasileira" devido à sua arquitetura de influência europeia e ao clima frio, a cidade é um dos destinos turísticos mais populares do Brasil durante o inverno. Além da arquitetura e do clima, Campos do Jordão é famosa por seus festivais de inverno, gastronomia refinada e belas paisagens naturais.',
            shortDescription: 'A "Suíça Brasileira" com arquitetura europeia, clima frio e belas paisagens montanhosas.',
            population: 'Aproximadamente 52.000 habitantes',
            climate: 'Subtropical de altitude',
            bestTimeToVisit: 'De maio a agosto, durante o inverno, quando a cidade fica mais charmosa e acontece o Festival de Inverno.',
            bestMonths: ['Maio', 'Junho', 'Julho', 'Agosto'],
            transportation: {
              airport: 'O aeroporto mais próximo é o de São José dos Campos (SJK), a cerca de 90 km.',
              bus: 'Há ônibus regulares saindo de São Paulo e outras cidades próximas.',
              car: 'Pela Rodovia Floriano Rodrigues Pinheiro (SP-123) ou pela Rodovia Oswaldo Cruz (SP-125).'
            },
            attractions: [
              {
                name: 'Parque Amantikir',
                description: 'Jardins inspirados em diferentes estilos do mundo, com belos lagos e esculturas.'
              },
              {
                name: 'Morro do Elefante',
                description: 'Mirante natural com vista panorâmica da cidade, acessível por teleférico.'
              },
              {
                name: 'Palácio Boa Vista',
                description: 'Residência de inverno do governador de São Paulo, com acervo de arte brasileira.'
              },
              {
                name: 'Capivari',
                description: 'Bairro turístico com lojas, restaurantes e a famosa Vila Capivari.'
              }
            ],
            tips: [
              'Leve roupas de frio mesmo no verão, pois as noites são sempre frescas.',
              'Evite ir em julho sem reserva, pois é o mês mais lotado devido ao Festival de Inverno.',
              'Experimente o fondue e os chocolates artesanais, especialidades locais.',
              'Alugue um carro para explorar melhor a região, incluindo os parques naturais.'
            ],
            image: 'https://images.unsplash.com/photo-1595880500386-4b33c7ccf0f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1595880500386-4b33c7ccf0f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1595880500386-4b33c7ccf0f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1595880500529-d7e9464910d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1595880500529-d7e9464910d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1595880500529-d7e9464910d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ],
            tags: ['Montanha', 'Inverno', 'Gastronomia', 'Arquitetura'],
            popular: true,
            excursionsCount: 8,
            minPrice: 1400
          },
          {
            id: '3',
            name: 'Olímpia',
            slug: 'olimpia',
            state: 'São Paulo',
            region: 'Sudeste',
            description: 'Olímpia é um município brasileiro localizado no interior do estado de São Paulo. A cidade se tornou um importante destino turístico devido aos seus parques aquáticos termais, especialmente o Thermas dos Laranjais, considerado o maior parque aquático da América Latina e um dos mais visitados do mundo. Além dos parques aquáticos, Olímpia também é conhecida pelo Festival do Folclore, um dos maiores eventos folclóricos do Brasil.',
            shortDescription: 'Cidade dos parques aquáticos termais e do folclore brasileiro.',
            population: 'Aproximadamente 55.000 habitantes',
            climate: 'Tropical',
            bestTimeToVisit: 'O ano todo, mas especialmente de março a novembro, quando o clima é mais seco.',
            bestMonths: ['Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'],
            transportation: {
              airport: 'O aeroporto mais próximo é o de São José do Rio Preto (SJP), a cerca de 80 km.',
              bus: 'Há ônibus regulares saindo de São Paulo e outras cidades próximas.',
              car: 'Pela Rodovia Assis Chateaubriand (SP-425) ou pela Rodovia Armando Salles de Oliveira (SP-322).'
            },
            attractions: [
              {
                name: 'Thermas dos Laranjais',
                description: 'Maior parque aquático da América Latina, com piscinas de águas termais, toboáguas e atrações para todas as idades.'
              },
              {
                name: 'Hot Beach',
                description: 'Parque aquático termal com praia artificial, piscinas de ondas e diversas atrações.'
              },
              {
                name: 'Museu de História e Folclore',
                description: 'Acervo sobre a história da cidade e manifestações folclóricas brasileiras.'
              },
              {
                name: 'Parque do Barreiro',
                description: 'Área de preservação ambiental com trilhas ecológicas e nascentes de águas termais.'
              }
            ],
            tips: [
              'Reserve pelo menos dois dias para aproveitar os parques aquáticos.',
              'Visite durante a semana para evitar as multidões dos finais de semana.',
              'Se puder, visite em agosto durante o Festival do Folclore.',
              'Leve protetor solar, mesmo em dias nublados.'
            ],
            image: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ],
            tags: ['Parque Aquático', 'Águas Termais', 'Folclore', 'Família'],
            popular: true,
            excursionsCount: 6,
            minPrice: 1800
          },
          {
            id: '4',
            name: 'Paraty',
            slug: 'paraty',
            state: 'Rio de Janeiro',
            region: 'Sudeste',
            description: 'Paraty é um município brasileiro localizado no litoral sul do estado do Rio de Janeiro. A cidade é conhecida por seu centro histórico bem preservado, com ruas de pedra e casarões coloniais do século XVIII e XIX. Além da riqueza histórica, Paraty é cercada pela Mata Atlântica e possui dezenas de praias e ilhas paradisíacas. A combinação de patrimônio histórico, belezas naturais e rica cultura faz de Paraty um destino único no Brasil.',
            shortDescription: 'Cidade histórica colonial com ruas de pedra, cercada por praias paradisíacas e mata atlântica.',
            population: 'Aproximadamente 45.000 habitantes',
            climate: 'Tropical úmido',
            bestTimeToVisit: 'De abril a outubro, quando chove menos e as temperaturas são agradáveis.',
            bestMonths: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
            transportation: {
              airport: 'Os aeroportos mais próximos são o de Angra dos Reis (a 100 km) e o do Rio de Janeiro (a 250 km).',
              bus: 'Há ônibus regulares saindo do Rio de Janeiro e São Paulo.',
              car: 'Pela Rodovia Rio-Santos (BR-101).'
            },
            attractions: [
              {
                name: 'Centro Histórico',
                description: 'Conjunto arquitetônico colonial com igrejas, casarões e ruas de pedra do século XVIII.'
              },
              {
                name: 'Praia do Sono',
                description: 'Praia paradisíaca acessível por trilha ou barco, com águas cristalinas e tranquilas.'
              },
              {
                name: 'Saco do Mamanguá',
                description: 'Fiorde tropical cercado por montanhas cobertas pela Mata Atlântica.'
              },
              {
                name: 'Cachoeira do Tobogã',
                description: 'Formação natural que funciona como um escorregador de pedra, muito popular entre os visitantes.'
              }
            ],
            tips: [
              'Use calçados confortáveis para caminhar nas ruas de pedra do centro histórico.',
              'Reserve um dia para fazer um passeio de barco pelas ilhas e praias da região.',
              'Visite durante a Festa Literária Internacional de Paraty (FLIP), se gostar de literatura.',
              'Experimente a cachaça local, Paraty é famosa pela produção artesanal.'
            ],
            image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ],
            tags: ['Praia', 'História', 'Cultural', 'Natureza'],
            popular: true,
            excursionsCount: 7,
            minPrice: 1350
          },
          {
            id: '5',
            name: 'Gramado',
            slug: 'gramado',
            state: 'Rio Grande do Sul',
            region: 'Sul',
            description: 'Gramado é um município brasileiro localizado na Serra Gaúcha, no estado do Rio Grande do Sul. A cidade é um dos principais destinos turísticos do Brasil, conhecida por sua arquitetura de influência europeia, especialmente alemã e italiana, pelo clima frio e pela gastronomia refinada. Gramado também é famosa por seus eventos, como o Festival de Cinema e o Natal Luz, que atrai milhares de turistas todos os anos.',
            shortDescription: 'Charmosa cidade com arquitetura europeia, clima frio e gastronomia refinada na Serra Gaúcha.',
            population: 'Aproximadamente 36.000 habitantes',
            climate: 'Subtropical úmido',
            bestTimeToVisit: 'De maio a agosto para aproveitar o clima frio, ou de novembro a janeiro para o Natal Luz.',
            bestMonths: ['Maio', 'Junho', 'Julho', 'Agosto', 'Novembro', 'Dezembro', 'Janeiro'],
            transportation: {
              airport: 'O aeroporto mais próximo é o de Caxias do Sul (CXJ), a cerca de 70 km, ou o de Porto Alegre (POA), a cerca de 115 km.',
              bus: 'Há ônibus regulares saindo de Porto Alegre e outras cidades próximas.',
              car: 'Pela Rodovia RS-235 ou pela Rota do Sol (RS-453).'
            },
            attractions: [
              {
                name: 'Lago Negro',
                description: 'Lago artificial cercado por árvores importadas da Alemanha, com pedalinhos e bela paisagem.'
              },
              {
                name: 'Snowland',
                description: 'Primeiro parque de neve indoor da América Latina, com temperatura negativa e atividades na neve.'
              },
              {
                name: 'Mini Mundo',
                description: 'Parque com miniaturas perfeitas de construções famosas em escala reduzida.'
              },
              {
                name: 'Rua Coberta',
                description: 'Rua de pedestres coberta no centro da cidade, com lojas, cafés e restaurantes.'
              }
            ],
            tips: [
              'Leve roupas de frio em qualquer época do ano, pois as noites são sempre frescas.',
              'Reserve com antecedência se for visitar durante o Natal Luz (outubro a janeiro).',
              'Experimente os chocolates artesanais e os fondues, especialidades locais.',
              'Visite também a vizinha Canela, que fica a apenas 7 km e tem outras atrações interessantes.'
            ],
            image: 'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1625345012399-9c9d3c7850f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ],
            tags: ['Montanha', 'Inverno', 'Gastronomia', 'Arquitetura'],
            popular: true,
            excursionsCount: 10,
            minPrice: 1600
          },
          {
            id: '6',
            name: 'Bonito',
            slug: 'bonito',
            state: 'Mato Grosso do Sul',
            region: 'Centro-Oeste',
            description: 'Bonito é um município brasileiro localizado no estado de Mato Grosso do Sul. A cidade é conhecida por suas águas cristalinas, grutas, cachoeiras e rica biodiversidade, sendo considerada um dos principais destinos de ecoturismo do Brasil. O que torna Bonito especial é a transparência de seus rios, resultado de um fenômeno natural onde o calcário presente na água decanta as impurezas, proporcionando uma visibilidade impressionante para a prática de flutuação e mergulho.',
            shortDescription: 'Paraíso do ecoturismo com rios de águas cristalinas, grutas, cachoeiras e rica biodiversidade.',
            population: 'Aproximadamente 22.000 habitantes',
            climate: 'Tropical',
            bestTimeToVisit: 'De dezembro a março, durante a estação chuvosa, quando os rios estão mais cheios e as cachoeiras mais volumosas.',
            bestMonths: ['Dezembro', 'Janeiro', 'Fevereiro', 'Março'],
            transportation: {
              airport: 'O aeroporto mais próximo é o de Bonito (BYO), que recebe voos regionais, ou o de Campo Grande (CGR), a cerca de 300 km.',
              bus: 'Há ônibus regulares saindo de Campo Grande e outras cidades próximas.',
              car: 'Pela Rodovia MS-345 ou pela Rodovia MS-382.'
            },
            attractions: [
              {
                name: 'Gruta do Lago Azul',
                description: 'Caverna com um lago de águas azuis cristalinas e formações de estalactites e estalagmites.'
              },
              {
                name: 'Rio da Prata',
                description: 'Rio de águas cristalinas perfeito para flutuação, com visibilidade de até 40 metros e rica vida aquática.'
              },
              {
                name: 'Abismo Anhumas',
                description: 'Caverna com um lago subterrâneo onde é possível fazer rapel e mergulho entre formações rochosas.'
              },
              {
                name: 'Cachoeiras do Aquidaban',
                description: 'Conjunto de cachoeiras em meio à mata, com piscinas naturais para banho.'
              }
            ],
            tips: [
              'Reserve os passeios com antecedência, pois há limite diário de visitantes em muitas atrações.',
              'Leve protetor solar biodegradável para não poluir as águas cristalinas.',
              'Use calçados apropriados para trilhas, pois muitos passeios envolvem caminhadas.',
              'Contrate guias locais credenciados, pois a maioria dos passeios só pode ser feita com acompanhamento.'
            ],
            image: 'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            heroImage: 'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
              'https://images.unsplash.com/photo-1609619385002-f40f1ca3d40c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
            ],
            tags: ['Ecoturismo', 'Natureza', 'Aventura', 'Águas Cristalinas'],
            popular: true,
            excursionsCount: 9,
            minPrice: 2200
          }
        ];
      } catch (error) {
        this.error = error.message || 'Falha ao carregar destinos';
      } finally {
        this.loading = false;
      }
    }
  }
});
