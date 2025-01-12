<route lang="json">
  {
    "name": "login",
    "meta": {
      "redirectIfAuth": true
    }
  }
</route>

<script setup>
import LoginForm from '@/components/LoginForm.vue';
import { ref } from 'vue';

const error = ref(false);

const showError = () => {
  error.value = true;
};
</script>

<template>
  <v-container>
    <v-img
      class="mx-auto my-6"
      max-width="128"
      src="@/assets/logo.svg"
    />

    <v-alert
      v-model="error"
      class="mx-auto mb-6"
      max-width="448"
      title="Error"
      text="Ha ocurrido un error al iniciar sesión"
      type="error"
      closable
    />

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <v-card-title>Iniciar sesión</v-card-title>
      <v-card-text>
        <LoginForm @error="showError" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
