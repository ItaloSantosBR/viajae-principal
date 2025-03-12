import { defineStore } from 'pinia';

export const useReservationsStore = defineStore('reservations', {
  state: () => ({
    reservations: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getUserReservations: (state) => (userId) => {
      return state.reservations.filter(reservation => reservation.userId === userId);
    },
    
    getExcursionReservations: (state) => (excursionId) => {
      return state.reservations.filter(reservation => reservation.excursionId === excursionId);
    },
    
    getCompanyReservations: (state) => (companyId) => {
      return state.reservations.filter(reservation => reservation.companyId === companyId);
    },
    
    getReservationById: (state) => (id) => {
      return state.reservations.find(reservation => reservation.id === id);
    }
  },
  
  actions: {
    async fetchUserReservations(userId) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.reservations = [
          {
            id: '1',
            excursionId: '1',
            excursionTitle: 'Fim de Semana em Ilhabela',
            userId: userId,
            companyId: '1',
            companyName: 'Aventuras Marítimas',
            startDate: '2025-05-15',
            endDate: '2025-05-18',
            price: 1200,
            participants: 2,
            totalPrice: 2400,
            status: 'confirmed',
            paymentMethod: 'credit_card',
            createdAt: '2025-04-10T14:30:00Z',
            participantDetails: [
              {
                name: 'João Silva',
                cpf: '123.456.789-00',
                birthdate: '1985-05-10',
                phone: '(11) 98765-4321',
                email: 'joao@example.com',
                specialNeeds: ''
              },
              {
                name: 'Maria Oliveira',
                cpf: '987.654.321-00',
                birthdate: '1990-08-15',
                phone: '(11) 91234-5678',
                email: 'maria@example.com',
                specialNeeds: ''
              }
            ],
            pickupLocation: 'location1'
          },
          {
            id: '2',
            excursionId: '3',
            excursionTitle: 'Thermas dos Laranjais',
            userId: userId,
            companyId: '3',
            companyName: 'Diversão Total',
            startDate: '2025-07-20',
            endDate: '2025-07-23',
            price: 1800,
            participants: 4,
            totalPrice: 7200,
            status: 'pending',
            paymentMethod: 'pix',
            createdAt: '2025-04-12T10:15:00Z',
            participantDetails: [
              {
                name: 'João Silva',
                cpf: '123.456.789-00',
                birthdate: '1985-05-10',
                phone: '(11) 98765-4321',
                email: 'joao@example.com',
                specialNeeds: ''
              },
              {
                name: 'Maria Oliveira',
                cpf: '987.654.321-00',
                birthdate: '1990-08-15',
                phone: '(11) 91234-5678',
                email: 'maria@example.com',
                specialNeeds: ''
              },
              {
                name: 'Pedro Santos',
                cpf: '111.222.333-44',
                birthdate: '1988-03-20',
                phone: '(11) 97777-8888',
                email: 'pedro@example.com',
                specialNeeds: ''
              },
              {
                name: 'Ana Souza',
                cpf: '555.666.777-88',
                birthdate: '1992-11-05',
                phone: '(11) 96666-7777',
                email: 'ana@example.com',
                specialNeeds: ''
              }
            ],
            pickupLocation: 'location2'
          },
          {
            id: '3',
            excursionId: '4',
            excursionTitle: 'Thermas dos Laranjais',
            userId: userId,
            companyId: '3',
            companyName: 'Diversão Total',
            startDate: '2025-07-20',
            endDate: '2025-07-23',
            price: 1800,
            participants: 4,
            totalPrice: 7200,
            status: 'pending',
            paymentMethod: 'pix',
            createdAt: '2025-04-12T10:15:00Z',
            participantDetails: [
              {
                name: 'João Silva',
                cpf: '123.456.789-00',
                birthdate: '1985-05-10',
                phone: '(11) 98765-4321',
                email: 'joao@example.com',
                specialNeeds: ''
              },
              {
                name: 'Maria Oliveira',
                cpf: '987.654.321-00',
                birthdate: '1990-08-15',
                phone: '(11) 91234-5678',
                email: 'maria@example.com',
                specialNeeds: ''
              },
              {
                name: 'Pedro Santos',
                cpf: '111.222.333-44',
                birthdate: '1988-03-20',
                phone: '(11) 97777-8888',
                email: 'pedro@example.com',
                specialNeeds: ''
              },
              {
                name: 'Ana Souza',
                cpf: '555.666.777-88',
                birthdate: '1992-11-05',
                phone: '(11) 96666-7777',
                email: 'ana@example.com',
                specialNeeds: ''
              }
            ],
            pickupLocation: 'location2'
          }
        ];
        
        return this.reservations;
      } catch (error) {
        this.error = error.message || 'Falha ao carregar reservas';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchCompanyReservations(companyId) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.reservations = [
          {
            id: '1',
            excursionId: '1',
            excursionTitle: 'Fim de Semana em Ilhabela',
            userId: '3',
            userName: 'João Silva',
            userEmail: 'joao@example.com',
            companyId: companyId,
            startDate: '2025-05-15',
            endDate: '2025-05-18',
            price: 1200,
            participants: 2,
            totalPrice: 2400,
            status: 'confirmed',
            paymentMethod: 'credit_card',
            createdAt: '2025-04-10T14:30:00Z',
            participantDetails: [
              {
                name: 'João Silva',
                cpf: '123.456.789-00',
                birthdate: '1985-05-10',
                phone: '(11) 98765-4321',
                email: 'joao@example.com',
                specialNeeds: ''
              },
              {
                name: 'Maria Oliveira',
                cpf: '987.654.321-00',
                birthdate: '1990-08-15',
                phone: '(11) 91234-5678',
                email: 'maria@example.com',
                specialNeeds: ''
              }
            ],
            pickupLocation: 'location1'
          },
          {
            id: '3',
            excursionId: '1',
            excursionTitle: 'Fim de Semana em Ilhabela',
            userId: '4',
            userName: 'Maria Oliveira',
            userEmail: 'maria@example.com',
            companyId: companyId,
            startDate: '2025-05-15',
            endDate: '2025-05-18',
            price: 1200,
            participants: 1,
            totalPrice: 1200,
            status: 'confirmed',
            paymentMethod: 'pix',
            createdAt: '2025-04-11T09:45:00Z',
            participantDetails: [
              {
                name: 'Maria Oliveira',
                cpf: '987.654.321-00',
                birthdate: '1990-08-15',
                phone: '(11) 91234-5678',
                email: 'maria@example.com',
                specialNeeds: ''
              }
            ],
            pickupLocation: 'location2'
          }
        ];
        
        return this.reservations;
      } catch (error) {
        this.error = error.message || 'Falha ao carregar reservas';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchReservationById(id) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // For now, we'll simulate it
        
        // Mock data for a single reservation
        const reservation = {
          id: id,
          excursionId: '1',
          excursionTitle: 'Fim de Semana em Ilhabela',
          userId: '3',
          companyId: '1',
          companyName: 'Aventuras Marítimas',
          startDate: '2025-05-15',
          endDate: '2025-05-18',
          price: 1200,
          participants: 2,
          totalPrice: 2400,
          status: 'confirmed',
          paymentMethod: 'credit_card',
          createdAt: '2025-04-10T14:30:00Z',
          participantDetails: [
            {
              name: 'João Silva',
              cpf: '123.456.789-00',
              birthdate: '1985-05-10',
              phone: '(11) 98765-4321',
              email: 'joao@example.com',
              specialNeeds: ''
            },
            {
              name: 'Maria Oliveira',
              cpf: '987.654.321-00',
              birthdate: '1990-08-15',
              phone: '(11) 91234-5678',
              email: 'maria@example.com',
              specialNeeds: ''
            }
          ],
          pickupLocation: 'location1'
        };
        
        // Add to reservations array if not already there
        if (!this.reservations.find(r => r.id === id)) {
          this.reservations.push(reservation);
        }
        
        return reservation;
      } catch (error) {
        this.error = error.message || 'Falha ao carregar reserva';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async createReservation(reservationData) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        const newReservation = {
          id: Date.now().toString(),
          ...reservationData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        
        this.reservations.push(newReservation);
        
        return {
          success: true,
          reservationId: newReservation.id
        };
      } catch (error) {
        this.error = error.message || 'Falha ao criar reserva';
        return {
          success: false,
          error: this.error
        };
      } finally {
        this.loading = false;
      }
    },
    
    async updateReservationStatus(reservationId, status) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        const index = this.reservations.findIndex(r => r.id === reservationId);
        
        if (index !== -1) {
          this.reservations[index].status = status;
          return true;
        }
        
        return false;
      } catch (error) {
        this.error = error.message || 'Falha ao atualizar status da reserva';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
});
