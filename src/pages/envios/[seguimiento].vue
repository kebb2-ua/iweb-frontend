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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const seguimiento = route.params.seguimiento;

let envio = ref(null);
onMounted(async () => {
  const response = await axios.get('/envios/' + seguimiento);
  envio.value = response.data;
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
    <v-card v-if="envio">
      <v-card-text>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>
              Información del envío
            </v-card-title>
            <v-card-text>
              <span class="caption font-weight-bold">Observaciones</span>
              <p>{{ envio.observaciones ?? 'Sin observaciones' }}</p>
              <v-divider class="my-2" />
              <p>Número de seguimiento: {{ envio.seguimiento }}</p>
              <p>Estado actual: {{ envio.estado }}</p>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>
              Origen
            </v-card-title>
            <v-card-text>
              <p>{{ envio.origen.nombre }}</p>
              <p>{{ envio.origen.lineaDireccion1 }}</p>
              <p>{{ envio.origen.lineaDireccion2 }}</p>
              <p>{{ envio.origen.codigoPostal }}</p>
              <p>{{ envio.origen.ciudad }}</p>
              <p>{{ envio.origen.provincia }}</p>
              <p>{{ envio.origen.pais }}</p>
            </v-card-text>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>
              Bultos
            </v-card-title>
            <v-card-text>
              <p>El paquete contiene {{ envio.bultos.length }} bulto(s).</p>
              <p>Peso total: {{ envio.bultos.reduce((acc, bulto) => acc + bulto.peso, 0) }} kg</p>

              <v-list>
                <v-list-item
                  v-for="i in envio.bultos.length"
                  :key="envio.bultos[i-1]"
                  :title="`Bulto ${i}`"
                  :subtitle="`Peso: ${envio.bultos[i-1].peso} kg. Dimensiones: ${envio.bultos[i-1].altura}x${envio.bultos[i-1].ancho}x${envio.bultos[i-1].profundidad} cm`"
                />
              </v-list>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>
              Destino
            </v-card-title>
            <v-card-text>
              <p>{{ envio.destino.nombre }}</p>
              <p>{{ envio.destino.lineaDireccion1 }}</p>
              <p>{{ envio.destino.lineaDireccion2 }}</p>
              <p>{{ envio.destino.codigoPostal }}</p>
              <p>{{ envio.destino.ciudad }}</p>
              <p>{{ envio.destino.provincia }}</p>
              <p>{{ envio.destino.pais }}</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-table {
  border-radius: 0.5rem;
}
</style>
