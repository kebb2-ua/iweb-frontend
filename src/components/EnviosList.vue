<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/axios'
import { useRouter } from 'vue-router'

const envios = ref([])
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const fetchEnvios = async () => {
  loading.value = true
  try {
    const response = await axios.get('/envios')
    envios.value = response.data
  } catch (err) {
    error.value = 'Error al cargar los envíos.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

/**
 * Función que se ejecutará al hacer clic en "Ver detalles".
 * En el futuro, puedes navegar a otra vista o mostrar un modal.
 */
 const verDetalles = (envio) => {
  // Redirige a /admin/envios/ con el código de seguimiento
  router.push(`/admin/envios/${envio.seguimiento}`)
}

onMounted(async () => {
  await fetchEnvios()
  console.log('Envios', envios.value)
})
</script>

<template>
  <div>
    <h1 class="text-h4">
      Lista de Envíos
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

    <!-- Sin envíos -->
    <v-card
      v-if="!loading && envios.length === 0"
      class="my-4"
    >
      <v-card-text>No hay envíos disponibles.</v-card-text>
    </v-card>

    <!-- Lista de Envíos -->
    <v-container v-else>
      <v-row>
        <v-col
          v-for="(envio, index) in envios"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mb-4">
            <v-card-title>Envío #{{ index + 1 }}</v-card-title>
            <v-card-text>
              <p><strong>Origen:</strong> {{ envio.origen.nombre }}</p>
              <p><strong>Destino:</strong> {{ envio.destino.nombre }}</p>
              <!-- Mostramos la cantidad de bultos como resumen -->
              <p><strong>Bultos:</strong> {{ envio.bultos.length }}</p>
            </v-card-text>

            <!-- Acción (botón) para ver los detalles -->
            <v-card-actions>
              <v-btn
                color="primary"
                @click="verDetalles(envio)"
              >
                Ver detalles
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.my-4 {
  margin: 1rem 0;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
