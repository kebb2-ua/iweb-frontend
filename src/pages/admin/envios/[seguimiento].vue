<route lang="json">
  {
    "name": "detalles-envio-admin",
    "meta": {
      "requiresAuth": true,
      "requiresRole": "ADMIN"
    }
  }
  </route>

<template>
  <v-container
    fluid
    class="py-4 background-light"
  >
    <div
      class="mx-auto"
      style="max-width: 1000px;"
    >
      <!-- Título principal -->
      <h1 class="text-h4 font-weight-bold my-4 title-text">
        Detalles de Envío
      </h1>

      <!-- Loading -->
      <div
        v-if="loading"
        class="d-flex justify-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          class="my-4"
        />
      </div>

      <!-- Error -->
      <v-alert
        v-if="error"
        type="error"
        class="my-4"
        border="left"
        density="compact"
      >
        {{ error }}
      </v-alert>

      <!-- Datos del Envío -->
      <v-card
        v-if="!loading && envio"
        class="pa-4 elevation-1 card-minimal"
      >
        <v-card-text class="py-2">
          <!-- Seguimiento -->
          <v-row>
            <v-col cols="12">
              <div class="mb-4">
                <h2 class="text-h6 font-weight-bold primary--text mb-2">
                  Nº Seguimiento
                </h2>
                <p>{{ envio.seguimiento }}</p>
              </div>
            </v-col>
          </v-row>

          <v-divider />

          <!-- ORIGEN Y DESTINO EN COLUMNAS -->
          <v-row class="pt-4">
            <!-- Origen -->
            <v-col
              cols="12"
              md="6"
            >
              <h3 class="subtitle font-weight-medium mb-2">
                Origen
              </h3>
              <ul class="no-bullet">
                <li><strong>Nombre:</strong> {{ envio.origen.nombre }}</li>
                <li><strong>Dirección:</strong> {{ envio.origen.lineaDireccion1 }}</li>
                <li><strong>Código Postal:</strong> {{ envio.origen.codigoPostal }}</li>
                <li><strong>Localidad:</strong> {{ envio.origen.localidad }}</li>
                <li><strong>Municipio:</strong> {{ envio.origen.municipio }}</li>
                <li><strong>Provincia:</strong> {{ envio.origen.provincia }}</li>
                <li><strong>País:</strong> {{ envio.origen.pais }}</li>
              </ul>
            </v-col>

            <!-- Destino -->
            <v-col
              cols="12"
              md="6"
            >
              <h3 class="subtitle font-weight-medium mb-2">
                Destino
              </h3>
              <ul class="no-bullet">
                <li><strong>Nombre:</strong> {{ envio.destino.nombre }}</li>
                <li><strong>Dirección:</strong> {{ envio.destino.lineaDireccion1 }}</li>
                <li><strong>Código Postal:</strong> {{ envio.destino.codigoPostal }}</li>
                <li><strong>Localidad:</strong> {{ envio.destino.localidad }}</li>
                <li><strong>Municipio:</strong> {{ envio.destino.municipio }}</li>
                <li><strong>Provincia:</strong> {{ envio.destino.provincia }}</li>
                <li><strong>País:</strong> {{ envio.destino.pais }}</li>
              </ul>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <!-- BULTOS -->
          <v-row>
            <v-col cols="12">
              <h3 class="subtitle font-weight-medium mb-2">
                Bultos ({{ envio.bultos.length }})
              </h3>
              <div
                v-for="(bulto, idx) in envio.bultos"
                :key="idx"
                class="bulto-container mb-4"
              >
                <ul class="no-bullet">
                  <li><strong>ID:</strong> {{ bulto.id }}</li>
                  <li><strong>Peso:</strong> {{ bulto.peso }} kg</li>
                  <li>
                    <strong>Dimensiones:</strong>
                    {{ bulto.altura }} x {{ bulto.ancho }} x {{ bulto.profundidad }} (cm)
                  </li>
                  <li>
                    <strong>Peligroso:</strong> {{ bulto.peligroso ? 'Sí' : 'No' }}
                  </li>
                  <li v-if="bulto.descripcion">
                    <strong>Descripción:</strong> {{ bulto.descripcion }}
                  </li>
                </ul>
                <!-- Separador entre bultos (opcional) -->
                <v-divider
                  v-if="idx < envio.bultos.length - 1"
                  class="mt-3"
                />
              </div>
            </v-col>
          </v-row>

          <!-- REPARTIDOR + BOTÓN ASIGNAR/CAMBIAR -->
          <v-row>
            <v-col cols="12">
              <v-divider class="my-4" />

              <!-- Datos del Repartidor (si existe) -->
              <div v-if="envio.repartidor">
                <h3 class="subtitle font-weight-medium mb-2">
                  Repartidor
                </h3>
                <ul class="no-bullet">
                  <li><strong>ID:</strong> {{ envio.repartidor.id }}</li>
                  <li><strong>NIF:</strong> {{ envio.repartidor.nif }}</li>
                  <li>
                    <strong>Nombre Completo:</strong>
                    {{ envio.repartidor.nombre }} {{ envio.repartidor.apellidos }}
                  </li>
                  <li>
                    <strong>Razón Social:</strong> {{ envio.repartidor.razonSocial }}
                  </li>
                  <li><strong>Email:</strong> {{ envio.repartidor.email }}</li>
                  <template v-if="envio.repartidor.direccion">
                    <li>
                      <strong>Dirección:</strong>
                      {{ envio.repartidor.direccion.lineaDireccion1 }}
                      <template v-if="envio.repartidor.direccion.lineaDireccion2">
                        , {{ envio.repartidor.direccion.lineaDireccion2 }}
                      </template>
                    </li>
                    <li>
                      <strong>Código Postal:</strong>
                      {{ envio.repartidor.direccion.codigoPostal }}
                    </li>
                    <li>
                      <strong>Provincia:</strong> {{ envio.repartidor.direccion.provincia }}
                    </li>
                    <li>
                      <strong>Municipio:</strong> {{ envio.repartidor.direccion.municipio }}
                    </li>
                    <li>
                      <strong>Localidad:</strong> {{ envio.repartidor.direccion.localidad }}
                    </li>
                    <li>
                      <strong>País:</strong> {{ envio.repartidor.direccion.pais }}
                    </li>
                  </template>
                </ul>
              </div>

              <!-- Botón Asignar/Cambiar -->
              <v-btn
                color="primary"
                class="mt-4"
                @click="abrirDialogRepartidor"
              >
                {{ envio.repartidor ? 'Cambiar Repartidor' : 'Asignar Repartidor' }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>

    <!-- DIALOG PARA SELECCIONAR REPARTIDOR -->
    <v-dialog
      v-model="openRepartidorDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          <span class="text-h6">
            {{ envio.repartidor ? 'Cambiar' : 'Asignar' }} Repartidor
          </span>
        </v-card-title>
        <v-card-text>
          <!-- Desplegable de repartidores: item-title="nombre" -->
          <v-select
            v-model="selectedRepartidor"
            :items="repartidores"
            item-title="nombre"
            return-object
            label="Selecciona un repartidor"
            density="compact"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="secondary"
            @click="cancelarRepartidor"
          >
            Cancelar
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="asignarRepartidorAlEnvio"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router/auto'
  import axios from '@/api/axios'

  // ==========================
  // PARÁMETROS DE RUTA
  // ==========================
  const route = useRoute()
  const seguimientoParam = route.params.seguimiento // p.ej. "ENV-2025-PRUEBA"

  // ==========================
  // STATE PRINCIPAL
  // ==========================
  const envio = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ==========================
  // SELECTOR DE REPARTIDOR
  // ==========================
  const openRepartidorDialog = ref(false)  // Para abrir/cerrar el <v-dialog>
  const repartidores = ref([])            // Lista de repartidores devuelta por /users
  const selectedRepartidor = ref(null)    // El repartidor seleccionado en el <v-select>

  // ==========================
  // OBTENER DETALLES DEL ENVÍO
  // ==========================
  const fetchEnvio = async () => {
    loading.value = true
    try {
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

  // ==========================
  // OBTENER LISTA DE REPARTIDORES
  // ==========================
  const loadRepartidores = async () => {
    try {
      const response = await axios.get('/users')
      // Filtramos únicamente aquellos usuarios que tengan rol REPARTIDOR
      repartidores.value = response.data.filter((user) =>
        user.rolesList && user.rolesList.includes('REPARTIDOR')
      )
      console.log('Repartidores obtenidos (solo REPARTIDOR):', repartidores.value)
    } catch (err) {
      console.error('Error al obtener repartidores:', err)
    }
  }

  // ==========================
  // DIALOGO: ABRIR/CERRAR
  // ==========================
  const abrirDialogRepartidor = async () => {
    openRepartidorDialog.value = true
    // Carga la lista de usuarios (solo REPARTIDOR)
    await loadRepartidores()
    // Preseleccionamos el repartidor actual (si lo hay)
    selectedRepartidor.value = envio.value?.repartidor || null
  }

  const cancelarRepartidor = () => {
    openRepartidorDialog.value = false
    selectedRepartidor.value = null
  }

  // ==========================
  // ASIGNAR REPARTIDOR AL ENVÍO
  // ==========================
  const asignarRepartidorAlEnvio = async () => {
    if (!selectedRepartidor.value) return

    try {
      // Asumimos que en tu backend tienes un endpoint:
      // POST /envios/{seguimiento}/asignar?emailRepartidor=xxxxx
      // que asigna (o cambia) el repartidor de un pedido.
      const seguimiento = envio.value.seguimiento
      const email = selectedRepartidor.value.email

      const resp = await axios.post(`/envios/${seguimiento}/asignar`, null, {
        params: { emailRepartidor: email }
      })
      // Actualizamos el envío local con la respuesta
      envio.value = resp.data
      console.log('Repartidor asignado correctamente:', resp.data)
    } catch (err) {
      console.error('Error al asignar repartidor:', err)
      error.value = 'Error al asignar repartidor al envío.'
      return
    }

    openRepartidorDialog.value = false
  }

  onMounted(() => {
    fetchEnvio()
  })
  </script>

  <style scoped>
  .background-light {
    /* background-color: #f8f9fa; */
  }

  .my-4 {
    margin: 1rem 0;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .mt-3 {
    margin-top: 0.75rem;
  }

  /* Estilos de lista sin viñetas */
  .no-bullet {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .card-minimal {
    /* background-color: #fff; */
    border-radius: 6px;
  }

  .title-text {
    color: #3a3a3a;
  }

  .subtitle {
    color: #555;
    font-size: 1rem;
  }

  .bulto-container {
    padding: 0.5rem;
    border-radius: 4px;
  }
  </style>
