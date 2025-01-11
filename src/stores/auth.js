import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: "",
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Retorna true si el usuario está autenticado
  },

  actions: {
    // Método para iniciar sesión
    async login(email, password) {
      try {
        // Solicitud al servidor para iniciar sesión
        const response = await axios.post('/auth/login', { "email": email, "password": password });

        this.token = response.data;
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },

    // Método para cerrar sesión
    logout() {
      const response = axios.post('/auth/logout');
      if(response.status === 200) {
        this.token = null;
      }
    }
  },

  persist: {
    storage: localStorage,
    pick: ['token']
  }
});
