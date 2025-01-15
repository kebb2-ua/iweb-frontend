<route lang="json">
    {
      "name": "envio-nuevo",
      "meta": {
        "redirectIfAuth": false
      }
    }
</route>

<script setup>
    import NuevoPedido from '@/components/NuevoPedido.vue';
    import { ref } from 'vue';

    const error = ref(false);

    const showError = () => {
      error.value = true;
    };

</script>

<template>
  <v-container>
    <h1 class="text-h3 my-6">
      Nuevo envío
    </h1>

    <v-alert
      v-model="error"
      class="mx-auto mb-6"
      title="Error"
      text="Ha ocurrido un error durante la creación del envío"
      type="error"
      closable
    />

    <NuevoPedido @error="showError" />
  </v-container>
</template>
