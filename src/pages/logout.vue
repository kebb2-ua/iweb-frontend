<route lang="json">
  {
    "name": "logout",
    "meta": {
      "redirectIfAuth": true
    }
  }
</route>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch(error) {
    console.error(error);
  }
});
</script>

<template>
  <v-container class="fill-height text-center">
    <v-row>
      <v-spacer />
      <v-col cols="3">
        <v-card>
          <v-card-title>Cerrando sesión</v-card-title>
          <v-card-text>
            <v-progress-circular indeterminate />
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>
