<route lang="json">
{
  "name": "pedido-ruta",
  "meta": {
    "requiresAuth": true
  }
}
</route>

<script setup>
import EnviosList from '@/components/PedidoRuta.vue';
</script>

<template>
  <v-container>
    <v-img
      class="mx-auto my-6"
      max-width="128"
      src="@/assets/logo.svg"
    />

    <v-card
      class="mx-auto pa-8"
      elevation="8"
      max-width="1024"
      rounded="lg"
    >
      <v-card-title>Detalles del Envío</v-card-title>
      <v-card-text>
        <EnviosList />
      </v-card-text>
    </v-card>
  </v-container>
</template>