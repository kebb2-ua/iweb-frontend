<route lang="json">
  {
    "name": "pedido-detalle",
    "meta": {
      "requiresAuth": true,
      "requiresRole": "REPARTIDOR"
    }
  }
</route>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/api/axios';

const route = useRoute();
const router = useRouter();
const pedido = ref(null);
const loading = ref(false);
const error = ref(null);
const estadoOptions = ['ACEPTADO', 'ENTREGADO', 'PENDIENTE', 'EN_RUTA', 'AUSENTE', 'RECHAZADO'];
const estadoSeleccionado = ref('');

const fetchPedido = async () => {
  loading.value = true;
  const { id } = route.params;  // Obtener el id del pedido desde la ruta
  try {
    const response = await axios.get(`/pedidos/${id}`);  // Llamada al backend para obtener el pedido por ID
    pedido.value = response.data;
    estadoSeleccionado.value = pedido.value.estado;
  } catch (err) {
    error.value = 'Error al cargar los detalles del pedido.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const actualizarEstado = async () => {
  if (estadoSeleccionado.value !== pedido.value.estado) {
    try {
      await axios.post(`/pedidos/${pedido.value.seguimiento}/estado`, { estado: estadoSeleccionado.value });
      pedido.value.estado = estadoSeleccionado.value;  // Actualiza el estado en la UI
      alert('Estado actualizado con éxito.');
    } catch (err) {
      error.value = 'Error al actualizar el estado del pedido.';
      console.error(err);
    }
  }
};

onMounted(() => {
  fetchPedido();
});
</script>

<template>
  <v-container>
    <v-img
      class="mx-auto my-6"
      max-width="128"
      src="@/assets/logo.svg"
    />

    <v-card
      class="mx-auto pa-8"
      elevation="8"
      max-width="1024"
      rounded="lg"
    >
      <v-card-title>Detalles del Pedido #{{ pedido.seguimiento }}</v-card-title>

      <!-- Cargando o error -->
      <v-card-text v-if="loading">
        <v-progress-circular
          indeterminate
          color="blue"
        />
      </v-card-text>

      <v-card-text v-if="error">
        <v-alert type="error">{{ error }}</v-alert>
      </v-card-text>

      <!-- Detalles del pedido -->
      <v-card-text v-if="pedido">
        <v-row>
          <v-col cols="12" md="6">
            <v-card-title>Información del Pedido</v-card-title>
            <v-card-text>
              <p><strong>Observaciones:</strong> {{ pedido.observaciones || 'Sin observaciones' }}</p>
              <p><strong>Número de Seguimiento:</strong> {{ pedido.seguimiento }}</p>
              <p><strong>Estado Actual:</strong> {{ pedido.estado }}</p>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-title>Origen</v-card-title>
            <v-card-text>
              <p>{{ pedido.origen.nombre }}</p>
              <p>{{ pedido.origen.lineaDireccion1 }}</p>
              <p>{{ pedido.origen.localidad }} ({{ pedido.origen.codigoPostal }})</p>
              <p>{{ pedido.origen.pais }}</p>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card-title>Bultos</v-card-title>
            <v-card-text>
              <p>El paquete contiene {{ pedido.bultos.length }} bulto(s).</p>
              <v-list>
                <v-list-item
                  v-for="(bulto, index) in pedido.bultos"
                  :key="index"
                >
                  <v-list-item-content>
                    <v-list-item-title>Bulto {{ index + 1 }}</v-list-item-title>
                    <v-list-item-subtitle>
                      Peso: {{ bulto.peso }} kg
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Dimensiones: {{ bulto.altura }}x{{ bulto.ancho }}x{{ bulto.profundidad }} cm
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="6">
            <v-card-title>Destino</v-card-title>
            <v-card-text>
              <p>{{ pedido.destino.nombre }}</p>
              <p>{{ pedido.destino.lineaDireccion1 }}</p>
              <p>{{ pedido.destino.localidad }} ({{ pedido.destino.codigoPostal }})</p>
              <p>{{ pedido.destino.pais }}</p>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- Cambio de estado -->
        <v-row>
          <v-col cols="12" md="6">
            <v-card-title>Cambiar Estado</v-card-title>
            <v-select
              v-model="estadoSeleccionado"
              :items="estadoOptions"
              label="Estado"
              @change="actualizarEstado"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
  .my-4 {
    margin: 1rem 0;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .pa-4 {
    padding: 1rem;
  }
</style>
