import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token, // Retorna true si el usuario está autenticado
  },

  actions: {
    // Método para iniciar sesión
    async login(email, password) {
      // Solicitud al servidor para iniciar sesión
      const response = await axios.post('/auth/login', { "email": email, "password": password });
      this.token = response.data.jwt;
      this.email = email.toLowerCase();
    },

    // Método para cerrar sesión
    logout() {
      const response = axios.post('/auth/logout');
      if(response.status === 200) {
        this.token = null;
        this.email = null;
      }
    }
  },

  persist: {
    storage: localStorage,
    pick: ['token']
  }
});
