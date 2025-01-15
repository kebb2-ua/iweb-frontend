<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <h3>Hola, {{ authStore.user.nombre }}</h3>
          </v-card-title>
          <v-card-text>
            <p>Tus datos personales registrados son:</p>
            <v-list>
              <v-list-item>
                <v-list-item-title>Nombre</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.nombre }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Apellidos</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.apellidos }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Número de Identificación Fiscal (NIF)</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.nif }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Correo electrónico</v-list-item-title>
                <v-list-item-subtitle>{{ authStore.user.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <h3>Tus claves API</h3>
          </v-card-title>
          <v-card-text>
            asdasd
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">
              Actualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
