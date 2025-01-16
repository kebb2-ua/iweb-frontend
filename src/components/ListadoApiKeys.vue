<script setup>
import { useApiKeyStore } from '@/stores/apikeys';
defineProps({
  keys: {
    type: Array,
    required: true
  }
});
const apiKeyStore = useApiKeyStore();
</script>

<template>
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
</template>
