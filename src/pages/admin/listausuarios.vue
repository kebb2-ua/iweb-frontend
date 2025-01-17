<route lang="json">{
  "name": "usuarios-admin",
  "meta": {
    "requiresAuth": true,
    "requiresRole": "ADMIN"
  }
}</route>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// Roles disponibles en tu backend
const availableRoles = ['USER', 'REPARTIDOR', 'ADMIN']

const users = ref([])
const loading = ref(false)
const error = ref(null)

// Carga de usuarios
const fetchUsers = async () => {
  loading.value = true
  try {
    // GET /users
    const response = await axios.get('/users')
    // A cada usuario le agregamos una propiedad local `selectedRole` que arranca en su rol actual
    users.value = response.data.map(u => ({
      ...u,
      selectedRole: u.rolesList?.[0] ?? 'USER' // Asigna el primer rol o 'USER' por defecto
    }))
  } catch (err) {
    error.value = 'Error al cargar la lista de usuarios.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Al cambiar el rol, llamamos al endpoint que lo actualiza en el servidor
const changeUserRole = async (email, newRole) => {
  await axios.patch('/users/role', null, {
    params: {
      email,
      role: newRole
    }
  })
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <v-container>
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
              {{ user.nombre || user.name || 'Sin nombre' }}
            </v-card-title>
            <v-card-text>
              <p>
                <strong>Email:</strong> {{ user.email }}
              </p>

              <!-- v-select con el rol actual como valor inicial (user.selectedRole).
                     Al cambiar, se invoca changeUserRole(...) y se hace PATCH al backend -->
              <v-select
                v-model="user.selectedRole"
                :items="availableRoles"
                label="Rol"
                @update:model-value="val => changeUserRole(user.email, val)"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
