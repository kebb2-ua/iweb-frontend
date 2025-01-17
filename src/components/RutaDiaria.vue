<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/axios'

const ruta = ref(null)
const loading = ref(false)
const error = ref(null)

/**
 * Llamada al endpoint GET /api/v1/rutas/diaria para obtener solo la ruta del día del repartidor
 */
const fetchRutaDelDia = async () => {
  loading.value = true
  try {
    const response = await axios.get('/rutas/diaria') // Asegúrate de que el endpoint devuelva la ruta del día
    ruta.value = response.data
  } catch (err) {
    error.value = 'Error al cargar la ruta del día.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRutaDelDia()
})
</script>

<template>
  <v-container>
    <h1 class="text-h4 my-4">
      Ruta del Día
    </h1>

    <!-- Loading -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="blue"
      class="my-4"
    />

    <!-- Error -->
    <v-alert
      v-if="error"
      type="error"
      class="my-4"
    >
      {{ error }}
    </v-alert>

    <!-- Sin ruta -->
    <v-card
      v-if="!loading && !ruta"
      class="my-4"
    >
      <v-card-text>No hay ruta disponible para hoy.</v-card-text>
    </v-card>

    <!-- Muestra la ruta -->
    <v-card
      v-else
      class="mb-4 pa-4 elevation-1"
    >
      <v-card-title>
        Ruta de reparto
      </v-card-title>
      <v-card-text>
        <!-- Repartidor -->
        <div class="mb-2">
          <h3 class="text-subtitle-1 font-weight-bold mb-1">
            Repartidor
          </h3>
          <p v-if="ruta.repartidor">
            <strong>Nombre: </strong>{{ ruta.repartidor.nombre }} {{ ruta.repartidor.apellidos }}
            <br>
            <strong>NIF: </strong>{{ ruta.repartidor.nif }}
            <br>
            <strong>Email: </strong>{{ ruta.repartidor.email }}
          </p>
          <p v-else>
            <em>No hay repartidor asignado.</em>
          </p>
        </div>

        <!-- Fecha de la ruta -->
        <div class="mb-2">
          <h3 class="text-subtitle-1 font-weight-bold mb-1">
            Fecha
          </h3>
          <p>{{ ruta.fecha }}</p>
        </div>

        <!-- Pedidos -->
        <div class="mb-2">
          <h3 class="text-subtitle-1 font-weight-bold mb-1">
            Pedidos ({{ ruta.pedidos.length }})
          </h3>
          <div
            v-for="(pedido, pIdx) in ruta.pedidos"
            :key="pIdx"
            class="pedido-info my-2"
          >
            <strong>Origen:</strong> {{ pedido.origen.nombre }},
            {{ pedido.origen.lineaDireccion1 }}, {{ pedido.origen.localidad }} ({{ pedido.origen.codigoPostal }})

            <br>
            <!-- Destino -->
            <strong>Destino:</strong> {{ pedido.destino.nombre }},
            {{ pedido.destino.lineaDireccion1 }}, {{ pedido.destino.localidad }} ({{ pedido.destino.codigoPostal }})

            <br>
            <!-- Bultos -->
            <strong>Bultos:</strong> {{ pedido.bultos.length }}
          </div>
        </div>
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
.pedido-info {
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
