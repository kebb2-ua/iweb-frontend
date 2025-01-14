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
import { onMounted, ref } from 'vue';

let envios = ref([]);
onMounted(async () => {
  const response = await axios.get('/envios');
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
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">
            Remitente
          </th>
          <th class="text-left">
            Destinatario
          </th>
          <th class="text-left">
            Número de bultos
          </th>
          <th class="text-left">
            Número de seguimiento
          </th>
          <th class="text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="envio in envios"
          :key="envio"
        >
          <td>{{ envio.origen.nombre }}</td>
          <td>{{ envio.destino.lineaDireccion1 }} {{ envio.destino.lineaDireccion2 }}, {{ envio.destino.codigoPostal }} {{ envio.destino.ciudad }} {{ envio.destino.provincia }} ({{ envio.destino.pais }})</td>
          <td>{{ envio.bultos.length }} bulto(s)</td>
          <td>{{ envio.seguimiento }}</td>
          <td>
            <v-btn
              size="small"
              color="primary"
              prepend-icon="mdi-eye"
              :to="`/envios/${envio.seguimiento}`"
            >
              Ver
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
.v-table {
  border-radius: 0.5rem;
}
</style>
