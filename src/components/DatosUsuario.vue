<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <v-card>
    <v-card-title>
      <h3>Hola, {{ user.nombre ? user.nombre : user.razonSocial }}</h3>
    </v-card-title>
    <v-card-text>
      <p>Tus datos personales registrados son:</p>
      <v-list>
        <!-- Si no tiene nombre, mostrar razón social en vez de nombre y apellidos -->
        <v-list-item v-if="user.nombre">
          <v-list-item-title>Nombre</v-list-item-title>
          <v-list-item-subtitle>{{ user.nombre }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item v-if="user.nombre">
          <v-list-item-title>Apellidos</v-list-item-title>
          <v-list-item-subtitle>{{ user.apellidos }}</v-list-item-subtitle>
        </v-list-item>
        
        <!-- Si no tiene nombre, mostrar razón social -->
        <v-list-item v-else>
          <v-list-item-title>Razón Social</v-list-item-title>
          <v-list-item-subtitle>{{ user.razonSocial }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Número de Identificación Fiscal (NIF)</v-list-item-title>
          <v-list-item-subtitle>{{ user.nif }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>Correo electrónico</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
