<route lang="json">
  {
    "name": "ajustes",
    "meta": {
      "requiresAuth": true
    }
  }
</route>

<script setup>
import DatosUsuario from '@/components/DatosUsuario.vue';
import ListadoApiKeys from '@/components/ListadoApiKeys.vue';
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
        <DatosUsuario :user="authStore.user" />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <ListadoApiKeys :keys="keys" />
      </v-col>
    </v-row>
  </v-container>
</template>
