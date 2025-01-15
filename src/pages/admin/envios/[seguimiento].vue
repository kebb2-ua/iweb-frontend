<template>
  <v-container>
    <div>
      <h1 class="text-h4">
        Detalles de Envío
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

      <!-- Datos del envío (cuando los tengamos) -->
      <v-card v-if="!loading && envio">
        <v-card-title>
          <div class="d-flex flex-column">
            <span class="text-h6">Seguimiento: {{ envio.seguimiento }}</span>
          </div>
        </v-card-title>

        <!-- Información de Origen -->
        <v-card-subtitle class="pt-4">
          <strong>Origen</strong>
        </v-card-subtitle>
        <v-card-text>
          <p><strong>Nombre:</strong> {{ envio.origen.nombre }}</p>
          <p><strong>Dirección:</strong> {{ envio.origen.lineaDireccion1 }}</p>
          <p><strong>Código Postal:</strong> {{ envio.origen.codigoPostal }}</p>
          <p><strong>Localidad:</strong> {{ envio.origen.localidad }}</p>
          <p><strong>Municipio:</strong> {{ envio.origen.municipio }}</p>
          <p><strong>Provincia:</strong> {{ envio.origen.provincia }}</p>
          <p><strong>País:</strong> {{ envio.origen.pais }}</p>
        </v-card-text>

        <!-- Información de Destino -->
        <v-card-subtitle class="pt-4">
          <strong>Destino</strong>
        </v-card-subtitle>
        <v-card-text>
          <p><strong>Nombre:</strong> {{ envio.destino.nombre }}</p>
          <p><strong>Dirección:</strong> {{ envio.destino.lineaDireccion1 }}</p>
          <p><strong>Código Postal:</strong> {{ envio.destino.codigoPostal }}</p>
          <p><strong>Localidad:</strong> {{ envio.destino.localidad }}</p>
          <p><strong>Municipio:</strong> {{ envio.destino.municipio }}</p>
          <p><strong>Provincia:</strong> {{ envio.destino.provincia }}</p>
          <p><strong>País:</strong> {{ envio.destino.pais }}</p>
        </v-card-text>

        <!-- Información de los Bultos -->
        <v-card-subtitle class="pt-4">
          <strong>Bultos ({{ envio.bultos.length }})</strong>
        </v-card-subtitle>
        <v-card-text>
          <div
            v-for="(bulto, idx) in envio.bultos"
            :key="idx"
            class="mb-4"
          >
            <p><strong>ID:</strong> {{ bulto.id }}</p>
            <p><strong>Peso:</strong> {{ bulto.peso }} kg</p>
            <p>
              <strong>Dimensiones (Al x An x Prof):</strong>
              {{ bulto.altura }} cm x {{ bulto.ancho }} cm x {{ bulto.profundidad }} cm
            </p>
            <p><strong>Peligroso:</strong> {{ bulto.peligroso ? 'Sí' : 'No' }}</p>
            <p v-if="bulto.descripcion">
              <strong>Descripción:</strong> {{ bulto.descripcion }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router/auto'
import axios from '@/api/axios'

const route = useRoute()
const seguimientoParam = route.params.seguimiento

const envio = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchEnvio = async () => {
  loading.value = true
  try {
    // Ajusta a tu endpoint real para obtener el envío por seguimiento
    const response = await axios.get(`/envios/${seguimientoParam}`)
    envio.value = response.data

    if (!envio.value) {
      error.value = `No se encontró el envío con seguimiento "${seguimientoParam}"`
    }
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar los detalles del envío.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEnvio()
})
</script>

<style scoped>
.my-4 {
  margin: 1rem 0;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
