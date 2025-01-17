<route lang="json">
  {
    "path": "/pedido/:seguimiento",
    "name": "pedido-detalle",
    "meta": {
      "requiresAuth": true,
      "requiresRole": "REPARTIDOR"
    }
  }
</route>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/api/axios';

const route = useRoute();
const pedido = ref(null);
const loading = ref(false);
const error = ref(null);
const estadoOptions = ['ACEPTADO', 'ENTREGADO', 'PENDIENTE', 'EN_RUTA', 'AUSENTE', 'RECHAZADO'];
const estadoSeleccionado = ref('');

const fetchPedido = async () => {
  loading.value = true;
  const seguimiento = route.params.seguimiento; // Obtener el seguimiento de los query parameters

  if (!seguimiento) {
    error.value = "El número de seguimiento no está disponible.";
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`/envios/${seguimiento}`);
    pedido.value = response.data;
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
      // Crear objeto con la fecha de actualización
      const estadoData = {
        estado: estadoSeleccionado.value,
        estado_ultima_actualizacion: new Date().toISOString()  // Agregar la fecha y hora actuales
      };

      // Realizar la solicitud POST para actualizar el estado
      await axios.post(`/envios/${pedido.value.seguimiento}/estado`, estadoData);

      // Actualizar el estado local
      pedido.value.estado = estadoSeleccionado.value;

      // Notificar al usuario
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
      <v-card-title v-if="pedido">
        Detalles del Pedido #{{ pedido.seguimiento }}
      </v-card-title>

      <!-- Cargando o error -->
      <v-card-text v-if="loading">
        <v-progress-circular
          indeterminate
          color="blue"
        />
      </v-card-text>

      <v-card-text v-if="error">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-card-text>

      <!-- Detalles del pedido -->
      <v-card-text v-if="pedido">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>Información del Pedido</v-card-title>
            <v-card-text>
              <p><strong>Observaciones:</strong> {{ pedido.observaciones || 'Sin observaciones' }}</p>
              <p><strong>Número de Seguimiento:</strong> {{ pedido.seguimiento }}</p>
              <p><strong>Estado Actual:</strong> {{ pedido.estado }}</p>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
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
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>Bultos</v-card-title>
            <v-card-text>
              <p>El paquete contiene {{ pedido.bultos.length }} bulto(s).</p>
              <v-list>
                <v-list-item
                  v-for="(bulto, index) in pedido.bultos"
                  :key="index"
                >
                  <v-list-item-title>Bulto {{ index + 1 }}</v-list-item-title>
                  <v-list-item-subtitle>
                    Peso: {{ bulto.peso }} kg
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Dimensiones: {{ bulto.altura }}x{{ bulto.ancho }}x{{ bulto.profundidad }} cm
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>Destino</v-card-title>
            <v-card-text>
              <p>{{ pedido.destino.nombre }}</p>
              <p>{{ pedido.destino.lineaDireccion1 }}</p>
              <p>{{ pedido.destino.localidad }} ({{ pedido.destino.codigoPostal }})</p>
              <p>{{ pedido.destino.pais }}</p>
            </v-card-text>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-card-title>Cambiar Estado</v-card-title>
            <v-select
              v-model="estadoSeleccionado"
              :items="estadoOptions"
              label="Estado"
            />
            <v-btn
              class="mt-4"
              color="primary"
              :disabled="estadoSeleccionado === pedido.estado"
              @click="actualizarEstado"
            >
              Confirmar Estado
            </v-btn>
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
