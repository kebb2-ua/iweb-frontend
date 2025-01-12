<script setup>
import logo from '@/assets/logo.png';
</script>

<template>
  <v-empty-state
    :image="logo"
    headline="Página no encontrada"
    title="La página a la que intentas acceder no existe"
  />
</template>
