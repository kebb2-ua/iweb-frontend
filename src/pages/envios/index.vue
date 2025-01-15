<route lang="json">
  {
    "name": "envios",
    "meta": {
      "requiresAuth": true
    }
  }
</route>

<script setup>
import axios from '@/api/axios';
import ListadoEnvios from '@/components/ListadoEnvios.vue';
import { onMounted, ref } from 'vue';

let envios = ref([]);
onMounted(async () => {
  const response = await axios.get('/envios/owned');
  envios.value = response.data;
});
</script>

<template>
  <v-container>
    <div class="d-flex align-center">
      <h1 class="text-h3 my-6">
        Envíos
      </h1>
      <v-btn
        class="ml-auto"
        color="primary"
        prepend-icon="mdi-plus"
        to="/envios/nuevo"
      >
        Nuevo
      </v-btn>
    </div>

    <ListadoEnvios :envios="envios" />
  </v-container>
</template>

<style scoped>
.v-table {
  border-radius: 0.5rem;
}
</style>
