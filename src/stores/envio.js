import { defineStore } from 'pinia';
import axios from '@/api/axios';

export const useEnvioStore = defineStore('envio', {
    state: () => ({
      //
    }),

    getters: {
      //
    },

    actions: {
      // Método para crear un envío
        async crearEnvio(nombreRemitente, lineaDireccionOrigen1, lineaDireccionOrigen2, codigoPostalOrigen, paisOrigen, provinciaOrigen, municipioOrigen, localidadOrigen, 
          nifDestinatario, nombreDestinatario, lineaDireccionDestino1, lineaDireccionDestino2, codigoPostalDestino, paisDestino, provinciaDestino, municipioDestino, localidadDestino, bultos, observaciones) {
           
            await axios.post('/envios', {
              "origen":{
                "nombre": nombreRemitente,
                "lineaDireccion1": lineaDireccionOrigen1,
                "lineaDireccion2": lineaDireccionOrigen2,
                "codigoPostal": codigoPostalOrigen,
                "pais": paisOrigen,
                "provincia": provinciaOrigen,
                "municipio": municipioOrigen,
                "localidad": localidadOrigen
              },

              "destino":{
                "nif": nifDestinatario,
                "nombre": nombreDestinatario,
                "lineaDireccion1": lineaDireccionDestino1,
                "lineaDireccion2": lineaDireccionDestino2,
                "codigoPostal": codigoPostalDestino,
                "pais": paisDestino,
                "provincia": provinciaDestino,
                "municipio": municipioDestino,
                "localidad": localidadDestino
              },

              "bultos": Array.isArray(bultos) ? bultos.map((bulto) => ({
                "descripcion": bulto.descripcion,
                "peso": bulto.peso,
                "altura": bulto.altura,
                "ancho": bulto.ancho,
                "profundidad": bulto.profundidad,
                "peligroso": bulto.peligroso,
              })) : [],
              
              "observaciones": observaciones
            }
          );
        },  
    },

    persist: {
      storage: localStorage
    }
  })