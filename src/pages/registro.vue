<route lang="json">
    {
      "name": "registro",
      "meta": {
        "redirectIfAuth": true
      }
    }
</route>

<script setup>
import RegistroForm from '@/components/RegistroForm.vue';
import { ref } from 'vue';

const error = ref(false);

const showError = () => {
  error.value = true;
};
</script>

<template>
  <v-container>
    <v-alert
      v-model="error"
      class="mx-auto mb-6"
      max-width="448"
      title="Error"
      text="Ha ocurrido un error durante el registro"
      type="error"
      closable
    />

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-card-title>Registro</v-card-title>
            
      <RegistroForm @error="showError"/>
    </v-card>
  </v-container>
</template>