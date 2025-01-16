<route lang="json">
  {
    "name": "rutas",
    "meta": {
      "requiresAuth": true,
      "requiresRole": "ADMIN"
    }
  }
  </route>

  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '@/api/axios'

  const rutas = ref([])
  const loading = ref(false)
  const error = ref(null)

  /**
   * Llamada al endpoint GET /api/v1/rutas
   */
  const fetchRutas = async () => {
    loading.value = true
    try {
      const response = await axios.get('/rutas') // Base URL = https://iweb.kikisito.com/api/v1
      rutas.value = response.data
      // Opcional: console.log(rutas.value) para verificar en consola
    } catch (err) {
      error.value = 'Error al cargar las rutas.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRutas()
  })
  </script>

<template>
  <v-container>
    <h1 class="text-h4 my-4">
      Listado de Rutas
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

    <!-- Sin rutas -->
    <v-card
      v-if="!loading && rutas.length === 0"
      class="my-4"
    >
      <v-card-text>No hay rutas disponibles.</v-card-text>
    </v-card>

    <!-- Muestra las rutas -->
    <v-row v-else>
      <v-col
        v-for="(ruta, idx) in rutas"
        :key="idx"
        cols="12"
        md="6"
      >
        <v-card class="mb-4 pa-4 elevation-1">
          <!-- ID RUTA -->
          <v-card-title>
            Ruta #{{ ruta.id }}
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
                <!-- Origen -->
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
      </v-col>
    </v-row>
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
    /* background-color: #f8f8f8; */
    padding: 0.5rem;
    border-radius: 4px;
  }
  </style>
