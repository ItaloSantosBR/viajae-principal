import { defineStore } from 'pinia';

export const useExcursionsStore = defineStore('excursions', {
  state: () => ({
    excursions: [],
    filteredExcursions: [],
    categories: [
      { id: 'praia', name: 'Praia' },
      { id: 'parque-aquatico', name: 'Parque Aquático' },
      { id: 'serra', name: 'Serra' },
      { id: 'cultural', name: 'Cultural' },
      { id: 'aventura', name: 'Aventura' }
    ],
    additionalServices: [
      { id: 'transporte', name: 'Transporte' },
      { id: 'alimentacao', name: 'Alimentação' },
      { id: 'passeios', name: 'Passeios Extras' },
      { id: 'guia', name: 'Guia Turístico' }
    ],
    loading: false,
    error: null,
    selectedMonth: null,
    selectedCategory: null,
    selectedServices: []
  }),
  
  getters: {
    getExcursionById: (state) => (id) => {
      return state.excursions.find(excursion => excursion.id === id);
    },
    
    getExcursionsByMonth: (state) => (month) => {
      return state.excursions.filter(excursion => {
        const startDate = new Date(excursion.startDate);
        return startDate.getMonth() === month;
      });
    },
    
    getMonthsWithExcursions: (state) => {
      const months = new Set();
      state.excursions.forEach(excursion => {
        const startDate = new Date(excursion.startDate);
        months.add(startDate.getMonth());
      });
      return Array.from(months).sort((a, b) => a - b);
    }
  },
  
  actions: {
    async fetchExcursions() {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.excursions = [
          {
            id: '1',
            title: 'Fim de Semana em Ilhabela',
            description: 'Aproveite um fim de semana relaxante em Ilhabela, com hospedagem em pousada à beira-mar, passeios de barco e trilhas ecológicas.',
            destination: 'Ilhabela, SP',
            originCity: 'São Paulo, SP',
            startDate: '2025-05-15',
            endDate: '2025-05-18',
            price: 1200,
            availableSpots: 20,
            category: 'praia',
            companyId: '1',
            companyName: 'Aventuras Marítimas',
            images: ['https://images.unsplash.com/photo-1592187165693-8ef0b450db48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1592187165599-919ef05d7afd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
            includedServices: ['transporte', 'alimentacao', 'guia'],
            accommodation: {
              name: 'Pousada Mar Azul',
              type: 'Pousada',
              amenities: ['Café da manhã', 'Wi-Fi', 'Ar condicionado']
            }
          },
          {
            id: '2',
            title: 'Expedição Serra da Mantiqueira',
            description: 'Uma aventura de 3 dias pela Serra da Mantiqueira, com trilhas, cachoeiras e vistas deslumbrantes. Hospedagem em chalé rústico.',
            destination: 'Serra da Mantiqueira, MG',
            originCity: 'São Paulo, SP',
            startDate: '2025-06-10',
            endDate: '2025-06-13',
            price: 1500,
            availableSpots: 15,
            category: 'aventura',
            companyId: '2',
            companyName: 'Trilhas & Montanhas',
            images: ['https://upload.wikimedia.org/wikipedia/commons/e/e8/SerradaMantiqueira_WilliamCarvalhojk_%2802%29.jpg', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
            includedServices: ['transporte', 'alimentacao', 'guia', 'passeios'],
            accommodation: {
              name: 'Chalés da Montanha',
              type: 'Chalé',
              amenities: ['Café da manhã', 'Lareira', 'Vista panorâmica']
            }
          },
          {
            id: '3',
            title: 'Thermas dos Laranjais',
            description: 'Diversão garantida no maior parque aquático da América Latina. Pacote inclui hospedagem, ingressos e transporte.',
            destination: 'Olímpia, SP',
            originCity: 'São Paulo, SP',
            startDate: '2025-07-20',
            endDate: '2025-07-23',
            price: 1800,
            availableSpots: 30,
            category: 'parque-aquatico',
            companyId: '3',
            companyName: 'Diversão Total',
            images: ['https://cdnm.com.br/termas/r/37/69/3c/w.800/h.534/q.80/fit.crop/fm.pjpg/piscina-de-ondas-cnzy6.jpeg', 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
            includedServices: ['transporte', 'alimentacao', 'passeios'],
            accommodation: {
              name: 'Hotel Solar Olímpia',
              type: 'Hotel',
              amenities: ['Café da manhã', 'Piscina', 'Academia']
            }
          },
          {
            id: '4',
            title: 'Fim de Semana em Campos do Jordão',
            description: 'Desfrute de um fim de semana na Suíça Brasileira, com passeios pela cidade, visitas a cervejarias artesanais e hospedagem aconchegante.',
            destination: 'Campos do Jordão, SP',
            originCity: 'São Paulo, SP',
            startDate: '2025-08-15',
            endDate: '2025-08-18',
            price: 1400,
            availableSpots: 25,
            category: 'serra',
            companyId: '2',
            companyName: 'Trilhas & Montanhas',
            images: ['https://images.unsplash.com/photo-1595880500386-4b33c7ccf0f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1595880500529-d7e9464910d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
            includedServices: ['transporte', 'alimentacao', 'guia'],
            accommodation: {
              name: 'Pousada Montanha Encantada',
              type: 'Pousada',
              amenities: ['Café da manhã', 'Lareira', 'Wi-Fi']
            }
          },
          {
            id: '5',
            title: 'Feriado em Paraty',
            description: 'Conheça o centro histórico de Paraty, faça passeios de barco pelas ilhas e desfrute de praias paradisíacas. Hospedagem em pousada colonial.',
            destination: 'Paraty, RJ',
            originCity: 'São Paulo, SP',
            startDate: '2025-09-05',
            endDate: '2025-09-08',
            price: 1350,
            availableSpots: 18,
            category: 'cultural',
            companyId: '1',
            companyName: 'Aventuras Marítimas',
            images: ['https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
            includedServices: ['transporte', 'alimentacao', 'guia', 'passeios'],
            accommodation: {
              name: 'Pousada Colonial',
              type: 'Pousada',
              amenities: ['Café da manhã', 'Wi-Fi', 'Ar condicionado']
            }
          }
        ];
        
        this.applyFilters();
      } catch (error) {
        this.error = error.message || 'Falha ao carregar excursões';
      } finally {
        this.loading = false;
      }
    },
    
    applyFilters() {
      let filtered = [...this.excursions];
      
      // Filter by month
      if (this.selectedMonth !== null) {
        filtered = filtered.filter(excursion => {
          const startDate = new Date(excursion.startDate);
          return startDate.getMonth() === this.selectedMonth;
        });
      }
      
      // Filter by category
      if (this.selectedCategory) {
        filtered = filtered.filter(excursion => excursion.category === this.selectedCategory);
      }
      
      // Filter by services
      if (this.selectedServices.length > 0) {
        filtered = filtered.filter(excursion => {
          return this.selectedServices.every(service => 
            excursion.includedServices.includes(service)
          );
        });
      }
      
      this.filteredExcursions = filtered;
    },
    
    setMonthFilter(month) {
      this.selectedMonth = month;
      this.applyFilters();
    },
    
    setCategoryFilter(category) {
      this.selectedCategory = category;
      this.applyFilters();
    },
    
    setServicesFilter(services) {
      this.selectedServices = services;
      this.applyFilters();
    },
    
    clearFilters() {
      this.selectedMonth = null;
      this.selectedCategory = null;
      this.selectedServices = [];
      this.filteredExcursions = [...this.excursions];
    },
    
    async addExcursion(excursionData) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        const newExcursion = {
          id: Date.now().toString(),
          ...excursionData,
          companyId: '1', // This would come from the authenticated user
          companyName: 'Empresa de Turismo' // This would come from the authenticated user
        };
        
        this.excursions.push(newExcursion);
        this.applyFilters();
        
        return true;
      } catch (error) {
        this.error = error.message || 'Falha ao adicionar excursão';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async updateExcursion(id, excursionData) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        const index = this.excursions.findIndex(e => e.id === id);
        
        if (index !== -1) {
          this.excursions[index] = {
            ...this.excursions[index],
            ...excursionData
          };
          
          this.applyFilters();
          return true;
        }
        
        return false;
      } catch (error) {
        this.error = error.message || 'Falha ao atualizar excursão';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async deleteExcursion(id) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        const index = this.excursions.findIndex(e => e.id === id);
        
        if (index !== -1) {
          this.excursions.splice(index, 1);
          this.applyFilters();
          return true;
        }
        
        return false;
      } catch (error) {
        this.error = error.message || 'Falha ao excluir excursão';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
