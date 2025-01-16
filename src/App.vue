<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if(authStore.isAuthenticated) {
    if(!await authStore.checkSession()) {
      router.push("/login");
    }
  }
});
</script>
