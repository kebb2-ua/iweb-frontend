<script setup>
import axios from '@/api/axios';
import logo from '@/assets/logo.svg';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

let status = ref("PENDIENTE");
async function changeStatus(newStatus) {
  status.value = newStatus;
}

onMounted(async () => {
  try {
    const response = await axios.get('/pagos/confirm/' + route.params.codigo);
    if(response.status == 200) {
      changeStatus("ACEPTADO");
    } else {
      changeStatus("ERROR");
    }
  } catch (error) {
    changeStatus("ERROR");
    console.error(error);
  }
});
</script>

<template>
  <v-empty-state
    v-if="status === 'ERROR'"
    :image="logo"
    headline="Error en el pago"
    title="Por favor, contacta con un administrador para verificar tu pago."
  />

  <v-empty-state
    v-else-if="status === 'ACEPTADO'"
    :image="logo"
    headline="Pago aceptado"
    title="Tu pedido ha sido pagado con éxito."
  />

  <v-empty-state
    v-else
    :image="logo"
    headline="Verificando pago..."
    title="Estamos verificando tu pago. Por favor, espera unos segundos."
  />
</template>
