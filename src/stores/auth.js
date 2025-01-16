import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getRoles: (state) => state.user.rolesList
  },

  actions: {
    // Método para iniciar sesión
    async login(email, password) {
      // Solicitud al servidor para iniciar sesión
      const response = await axios.post('/auth/login', { "email": email, "password": password });
      this.token = response.data.jwt;
      this.user = response.data.user;
    },

    // Método para registrarse
    async registro(nif, nombre, apellidos, razonSocial, email, password, lineaDireccion1, lineaDireccion2, codigoPostal, pais, provincia, municipio, localidad){
      let nombreDireccion = '';

      if ((nombre == "" || nombre == null) && (apellidos == ""  || apellidos == null)){
        nombreDireccion = razonSocial;
      } else if ( razonSocial == "" || razonSocial == null ){
        nombreDireccion = nombre + " " + apellidos;
      }
      //console.log(nombreDireccion);
      const response = await axios.post('/auth/register', {"nif": nif, "nombre": nombre, "apellidos":apellidos, "razonSocial": razonSocial, "email": email, "password": password,
        "direccion":{"nombre": nombreDireccion,"lineaDireccion1": lineaDireccion1, "lineaDireccion2": lineaDireccion2, "codigoPostal": codigoPostal,
      "pais": pais,"provincia": provincia, "localidad": localidad, "municipio": municipio}})

      this.token = response.data.jwt;
      this.user = response.data.user;
    },

    // Método para cerrar sesión
    async logout() {
      const response = await axios.post('/auth/logout');
      if(response.status === 200) {
        this.token = null;
        this.user = null;
      }
    },

    async changeJwtToken(token){
      this.token = token;
    },

    async checkSession() {
      const response = await axios.get('/envios');
      if(response.status === 403) {
        this.token = null;
        this.user = null;
        return false;
      }
      return true;
    }
  },

  persist: {
    storage: localStorage
  }
});
