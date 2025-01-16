<route lang="json">
{
  "name": "usuarios-admin",
  "meta": {
    "requiresAuth": true,
    "requiresRole": "ADMIN"
  }
}
</route>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/axios'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const fetchUsers = async () => {
  loading.value = true
  try {
    // Llamada a /users
    const response = await axios.get('/users')
    users.value = response.data
  } catch (err) {
    error.value = 'Error al cargar la lista de usuarios.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <v-container>
    <div>
      <h1 class="text-h4">
        Lista de Usuarios
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

      <!-- Sin usuarios -->
      <v-card
        v-if="!loading && users.length === 0"
        class="my-4"
      >
        <v-card-text>No hay usuarios disponibles.</v-card-text>
      </v-card>

      <!-- Lista de usuarios -->
      <v-container v-else>
        <v-row>
          <v-col
            v-for="(user, index) in users"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card class="mb-4">
              <v-card-title>
                <!-- Muestra el campo que tengas (ej: user.name o user.nombre) -->
                {{ user.name || user.nombre || 'Sin nombre' }}
              </v-card-title>
              <v-card-text>
                <!-- Muestra otros campos que te interesen, por ejemplo user.email -->
                <p><strong>Email:</strong> {{ user.email }}</p>
                <!-- Agrega más campos aquí -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
.my-4 {
  margin: 1rem 0;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>
