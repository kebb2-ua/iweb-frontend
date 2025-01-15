<script setup>
import axios from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();

let apiKeys = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('/auth/apikey');
    apiKeys.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">
      Ajustes
    </h1>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <h3>Hola, {{ authStore.user.nombre }}</h3>
          </v-card-title>
          <v-card-text>
            <p>Tus datos personales registrados son:</p>
            <v-list>
              <v-list-item>
                <v-list-item-title>Nombre</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.nombre }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Apellidos</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.apellidos }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Número de Identificación Fiscal (NIF)</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.nif }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Correo electrónico</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <h3>Tus claves API</h3>
          </v-card-title>
          <v-card-text>
            <p>Estas son las claves API que has generado:</p>

            <v-list
              lines="three"
              select-strategy="leaf"
            >
              <v-list-item
                v-for="apiKey in apiKeys"
                :key="apiKey.id"
                :title="apiKey.publicId"
              >
                <template #append>
                  <v-list-item-action>
                    <v-btn prepend-icon="mdi-trash-can" color="error">
                      Eliminar
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">
              Crear nueva clave API
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
