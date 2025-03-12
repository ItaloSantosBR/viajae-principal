import { defineStore } from 'pinia';

export const useCompaniesStore = defineStore('companies', {
  state: () => ({
    companies: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getCompanyById: (state) => (id) => {
      return state.companies.find(company => company.id === id);
    }
  },
  
  actions: {
    async fetchCompanies() {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.companies = [
          {
            id: '1',
            name: 'Aventuras Marítimas',
            description: 'Somos uma empresa especializada em excursões para destinos litorâneos, com foco em praias paradisíacas e ilhas. Oferecemos pacotes completos com transporte, hospedagem e atividades aquáticas. Nossa missão é proporcionar experiências inesquecíveis em contato com o mar, com conforto e segurança.',
            location: 'São Paulo, SP',
            address: 'Av. Paulista, 1000, São Paulo, SP',
            email: 'contato@aventurasmaritimas.com.br',
            phone: '(11) 99999-9999',
            website: 'https://www.aventurasmaritimas.com.br',
            facebook: 'https://www.facebook.com/aventurasmaritimas',
            instagram: 'https://www.instagram.com/aventurasmaritimas',
            logo: null,
            coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
            foundedYear: 2010,
            rating: 4.8,
            reviewCount: 156,
            excursionsCount: 12,
            destinationsCount: 8,
            clientsCount: 2500,
            yearsActive: 15
          },
          {
            id: '2',
            name: 'Trilhas & Montanhas',
            description: 'Especializada em excursões para regiões montanhosas e trilhas ecológicas, a Trilhas & Montanhas oferece experiências únicas em contato com a natureza. Nossos guias são especializados e apaixonados por aventuras ao ar livre, garantindo segurança e conhecimento em cada jornada.',
            location: 'Campinas, SP',
            address: 'Rua das Montanhas, 500, Campinas, SP',
            email: 'contato@trilhasemontanhas.com.br',
            phone: '(19) 98888-8888',
            website: 'https://www.trilhasemontanhas.com.br',
            facebook: 'https://www.facebook.com/trilhasemontanhas',
            instagram: 'https://www.instagram.com/trilhasemontanhas',
            logo: null,
            coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            foundedYear: 2015,
            rating: 4.7,
            reviewCount: 98,
            excursionsCount: 8,
            destinationsCount: 12,
            clientsCount: 1800,
            yearsActive: 9
          },
          {
            id: '3',
            name: 'Diversão Total',
            description: 'A Diversão Total é especializada em excursões para parques temáticos e aquáticos, oferecendo pacotes completos para famílias e grupos de amigos. Trabalhamos com os melhores parques do Brasil, garantindo diversão e conforto em cada viagem.',
            location: 'Ribeirão Preto, SP',
            address: 'Av. dos Parques, 200, Ribeirão Preto, SP',
            email: 'contato@diversaototal.com.br',
            phone: '(16) 97777-7777',
            website: 'https://www.diversaototal.com.br',
            facebook: 'https://www.facebook.com/diversaototal',
            instagram: 'https://www.instagram.com/diversaototal',
            logo: null,
            coverImage: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            foundedYear: 2012,
            rating: 4.6,
            reviewCount: 124,
            excursionsCount: 10,
            destinationsCount: 6,
            clientsCount: 3200,
            yearsActive: 13
          }
        ];
      } catch (error) {
        this.error = error.message || 'Falha ao carregar empresas';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchCompanyById(id) {
      this.loading = true;
      this.error = null;
      
      try {
        // In a real app, you would fetch just this company
        // For now, we'll fetch all and filter
        await this.fetchCompanies();
        return this.getCompanyById(id);
      } catch (error) {
        this.error = error.message || 'Falha ao carregar dados da empresa';
        return null;
      } finally {
        this.loading = false;
      }
    }
  }
});
