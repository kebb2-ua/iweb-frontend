<route lang="json">
  {
    "name": "ruta",
    "meta": {
      "requiresAuth": true,
      "requiresRole": "REPARTIDOR"
    }
  }
  </route>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from '@/api/axios'
  
    const pedidos = ref([])
    const loading = ref(false)
    const error = ref(null)
    const router = useRouter()
  
    const fetchPedidos = async () => {
      loading.value = true;
      try {
        // Obtener datos de las dos APIs
        const [rutasResponse, enviosResponse] = await Promise.all([
          axios.get('/rutas/diaria'),
          axios.get('/envios'),
        ]);

        // Lista de pedidos desde /rutas/diaria
        const pedidosRutas = rutasResponse.data.pedidos;

        // Lista de envíos completos desde /envios
        const envios = enviosResponse.data;

        // Filtrar envíos que están en pedidosRutas
        const pedidosFiltrados = envios.filter((envio) => {
          return pedidosRutas.some((pedidoRuta) =>
            pedidoRuta.bultos.some((bultoRuta) =>
              envio.bultos.some((bultoEnvio) => bultoRuta.id === bultoEnvio.id)
            )
          );
        });

        // Asignar pedidos filtrados a la variable reactiva
        pedidos.value = pedidosFiltrados;
      } catch (err) {
        error.value = 'Error al cargar los pedidos de hoy.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

  
    const navigateToPedido = (pedidoId) => {
      // Navegamos a la vista de detalles del pedido
      router.push({ name: 'pedido-detalle', params: { id: pedidoId } })
    }
  
    onMounted(() => {
      fetchPedidos()
    })
  </script>
  
  <template>
    <v-container>
      <h1 class="text-h4 my-4">
        Pedidos de la Ruta de Hoy
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
  
      <!-- Sin pedidos -->
      <v-card
        v-if="!loading && pedidos.length === 0"
        class="my-4"
      >
        <v-card-text>No hay pedidos asignados para hoy. Puedes descansar las alas.</v-card-text>
      </v-card>
  
      <!-- Muestra los pedidos -->
      <v-row v-else>
        <v-col
          v-for="(pedido, pIdx) in pedidos"
          :key="pIdx"
          cols="12"
          md="6"
        >
          <v-card class="mb-4 pa-4 elevation-1" @click="navigateToPedido(pedido.id)">
            <v-card-title>
              Pedido #{{ pedido.seguimiento }}
            </v-card-title>
            <v-card-text>
              <div class="mb-2">
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

                <br>
                <br>
                <!-- Detalles -->
                <strong style="text-align: center">Ver Detalles</strong>
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
  </style>  