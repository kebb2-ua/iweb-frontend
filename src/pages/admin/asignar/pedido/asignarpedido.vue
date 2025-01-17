<route lang="json">
{
  "name": "asignar-pedido",
  "meta": {
    "requiresAuth": true,
    "requiresRole": "ADMIN"
  }
}
</route>


<template>
    <v-container>
      <h1 class="text-h4">Asignar Pedido a Ruta</h1>
  
      <!-- Desplegable de pedidos -->
      <v-select
        v-model="pedidoSeleccionado"
        :items="pedidosDisponibles"
        item-text="seguimiento"
        item-value="seguimiento"
        label="Selecciona un pedido"
        @change="mostrarDetallesPedido"
      />
  
      <!-- Detalles del pedido seleccionado -->
      <v-card v-if="detallesPedido">
        <v-card-text>
          <p><strong>Origen:</strong> {{ detallesPedido.origen.direccion }}</p>
          <p><strong>Destino:</strong> {{ detallesPedido.destino.direccion }}</p>
          <p><strong>Estado:</strong> {{ detallesPedido.estado }}</p>
        </v-card-text>
      </v-card>
  
      <!-- Botón para asignar -->
      <v-btn
        :disabled="!pedidoSeleccionado"
        color="success"
        class="mt-3"
        @click="asignarPedido"
      >
        Asignar Pedido
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from '@/api/axios'
  
  const route = useRoute()
  const router = useRouter()
  const userId = route.params.userId
  
  const pedidosDisponibles = ref([])
  const pedidoSeleccionado = ref(null)
  const detallesPedido = ref(null)
  
  // Cargar pedidos no asignados
  const cargarPedidosDisponibles = async () => {
    try {
      
      const token = localStorage.getItem('authToken')
    
      const response = await axios.get('/envios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      pedidosDisponibles.value = response.data
        .filter(pedido => !pedido.rutaAsignada)
        .map(pedido => pedido.seguimiento) 
    } catch (error) {
      console.error('Error al cargar pedidos:', error)
    }
  }
  
  // Mostrar detalles del pedido seleccionado
  const mostrarDetallesPedido = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`envios/${pedidoSeleccionado.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      detallesPedido.value = response.data
    } catch (error) {
      console.error('Error al cargar detalles del pedido:', error)
    }
  }
  
  // Asignar el pedido a la ruta
  const asignarPedido = async () => {
    try {
      const token = localStorage.getItem('authToken')
  
      // Verificar si ya tiene ruta asignada el repartidor
      const { data: ruta } = await axios.get('/rutas/diaria', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    
      if (!ruta) {
        // Crear nueva ruta si no existe
        await axios.post('/rutas', {
          repartidor: userId,
          fecha: new Date(),
          pedidos: [pedidoSeleccionado.value]
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } else {
        // Asignar el pedido a la ruta existente
        await axios.post('/rutas/asignar', null, {
          params: {
            email: ruta.repartidor.email,
            seguimiento: pedidoSeleccionado.value
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    
      alert('Pedido asignado correctamente')
      router.push('/usuarios-admin')
    } catch (error) {
      console.error('Error al asignar el pedido:', error)
      alert('Error al asignar el pedido')
    }
  }
  
  onMounted(() => {
    cargarPedidosDisponibles()
  })
  </script>