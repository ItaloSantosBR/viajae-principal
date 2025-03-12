import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    isCompany: (state) => state.user?.role === 'company',
    isAdmin: (state) => state.user?.role === 'admin',
    isCustomer: (state) => state.user?.role === 'customer'
  },
  
  actions: {
    async login(email, password, accountType = 'customer') {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        
        // Check if the account type matches the expected type
        if (email === 'admin@viajae.com') {
          if (accountType !== 'company') {
            throw new Error('Esta conta é de administrador. Por favor, use o login adequado.');
          }
          
          this.user = {
            id: '1',
            name: 'Admin',
            email: 'admin@viajae.com',
            role: 'admin'
          };
        } else if (email === 'empresa@viajae.com') {
          if (accountType !== 'company') {
            throw new Error('Esta conta é de empresa. Por favor, selecione "Sou Empresa de Turismo".');
          }
          
          this.user = {
            id: '2',
            name: 'Empresa de Turismo',
            email: 'empresa@viajae.com',
            role: 'company'
          };
        } else {
          if (accountType !== 'customer') {
            throw new Error('Esta conta é de cliente. Por favor, selecione "Sou Cliente".');
          }
          
          this.user = {
            id: '3',
            name: 'Cliente',
            email: email,
            role: 'customer'
          };
        }
        
        this.token = 'fake-jwt-token';
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        
        return true;
      } catch (error) {
        this.error = error.message || 'Falha ao fazer login';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async register(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        // This would be replaced with an actual API call
        // Simulating API response for now
        this.user = {
          id: '3',
          name: userData.name,
          email: userData.email,
          role: userData.isCompany ? 'company' : 'customer'
        };
        
        this.token = 'fake-jwt-token';
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        
        return true;
      } catch (error) {
        this.error = error.message || 'Falha ao registrar';
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      
      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    
    initAuth() {
      // Check if we have token and user in localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    }
  }
});
