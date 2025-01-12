<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let emit = defineEmits(['error']);

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const visible = ref(false);

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch(error) {
    emit('error', error);
  }
};
</script>

<template>
  <v-form @submit.prevent="login">
    <div class="text-subtitle-1 text-medium-emphasis">
      Correo electrónico
    </div>

    <v-text-field
      v-model="email"
      type="email"
      density="compact"
      placeholder="usuario@email.com"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      autocomplete="username"
    />

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Contraseña
      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        He olvidado mi contraseña
      </a>
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="********"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      autocomplete="current-password"
      @click:append-inner="visible = !visible"
    />

    <v-btn
      type="submit"
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
    >
      Iniciar sesión
    </v-btn>

    <div class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Quiero registrarme <v-icon icon="mdi-chevron-right" />
      </a>
    </div>
  </v-form>
</template>
