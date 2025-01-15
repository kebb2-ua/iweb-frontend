<route lang="json">
  {
    "name": "detalles-envio",
    "meta": {
      "requiresAuth": true
    }
  }
</route>

<script setup>
import axios from '@/api/axios';
import DetallesEnvio from '@/components/DetallesEnvio.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const seguimiento = route.params.seguimiento;

let error = ref(false);

const showError = () => {
  error.value = true;
}

let envio = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get('/envios/' + seguimiento);
    envio.value = response.data;
  } catch (error) {
    console.error(error);
    showError();
  }
});
</script>

<template>
  <v-container>
    <div class="d-flex align-center">
      <h1 class="text-h3 my-6">
        Detalles del envío
      </h1>
      <v-btn
        class="ml-auto"
        color="primary"
        prepend-icon="mdi-arrow-left"
        to="/envios"
      >
        Volver
      </v-btn>
    </div>

    <v-alert
      v-if="error"
      type="error"
      title="Error"
      text="Los detalles del envío al que intentas acceder no existen."
    />

    <DetallesEnvio
      v-if="envio"
      :envio="envio"
    />
  </v-container>
</template>

<style scoped>
.v-table {
  border-radius: 0.5rem;
}
</style>
