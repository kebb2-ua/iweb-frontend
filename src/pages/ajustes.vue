<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>Hola, {{ authStore.user.nombre }}</h3>
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

      <v-col cols="12" md="6">
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
