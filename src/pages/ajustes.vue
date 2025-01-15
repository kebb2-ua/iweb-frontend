<route lang="json">
  {
    "name": "ajustes",
    "meta": {
      "requiresAuth": true
    }
  }
</route>

<script setup>
import NuevaClaveAPI from '@/components/NuevaClaveAPI.vue';
import { useApiKeyStore } from '@/stores/apikeys';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const apiKeyStore = useApiKeyStore();
const { keys } = storeToRefs(apiKeyStore);

onMounted(async () => {
  await apiKeyStore.getKeys();
})
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
          </v-card-text>
          <v-list density="compact">
            <v-list-item v-if="keys.length === 0">
              No has generado ninguna clave API.
            </v-list-item>

            <v-list-item
              v-for="apiKey in keys"
              :key="apiKey.id"
              :title="apiKey.publicId"
            >
              <template #append>
                <v-list-item-action>
                  <v-btn
                    prepend-icon="mdi-trash-can"
                    color="error"
                    @click="apiKeyStore.deleteApiKey(apiKey.publicId)"
                  >
                    Eliminar
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <NuevaClaveAPI />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
