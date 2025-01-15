<template>
  <!-- Cabecera -->
  <v-container 
    class="d-flex align-items-center justify-start py-6"
    max-height="128"
  >
      <v-img
        class="mx-5 "
        max-width="96"
        src="@/assets/logo.svg"
        
      />

      <div>
        <div class="text-h3 text-high-emphasis font-weight-bold">
          Yaco Packages
        </div>
      
        <div class="text-h6 text-medium-emphasis">
          Entrega rápida, como el vuelo de un Yaco.
        </div>
      </div>
    
  </v-container>

  <!-- Cuerpo página -->
  <div class="body-section">
    <v-divider></v-divider>

    <v-card
      class="my-10 pa-12 pb-8 mx-5"
      elevation="8"
      max-width="640"
      rounded="lg"
    >
      <v-card-title class="font-weight-bold text-high-emphasis mb-2">Volando para llevar tus sueños</v-card-title>

      <v-card-text>
        <p class="mb-2 mx-5">
          En Yaco Packages nos dedicamos a hacer llegar tus paquetes a cualquier parte de Europa.
        </p>
        <p class="mb-2 mx-5">
          Nuestro equipo de profesionales se encargará de que tu paquete llegue a su destino en el menor tiempo posible.
        </p>
      </v-card-text>

      
    </v-card>

    <div class="d-flex justify-end">
      <v-card
        class="my-10 pa-12 pb-8 mx-5"
        elevation="8"
        max-width="640"
        rounded="lg"
      >

        <v-card-title class="font-weight-bold text-high-emphasis mb-2">¿Cómo funciona?</v-card-title>

        <v-card-text>
          <p class="mb-2 mx-3">
            Para poder realizar un envío con Yaco Packages, simplemente sigue estos pasos:
          </p>
          <ol>
            <li class="ml-10">Regístrate en nuestra plataforma.</li>
            <li class="ml-10">Crea un envío.</li>
            <li class="ml-10">Indica los detalles de los paquetes y donde entregarlos.</li>
            <li class="ml-10">¡Listo! Nosotros nos encargamos del resto.</li>
          </ol>
        </v-card-text>

        <v-btn
          type="submit"
          class="my-2"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          Crear pedido ahora
        </v-btn>
      </v-card>
    </div>
  </div>

  <!-- Pie de página -->
  <v-footer
    class="d-flex align-cen justify-end"
    max-height="128"
  >

    <v-img
      class="mx-5"
      max-width="64"
      src="@/assets/logo.svg"
    />

    <div>
      <div class="text-h6 text-medium-emphasis">
        © 2025 Yaco Packages
      </div>
    </div>
  </v-footer>

</template>

<script setup>
  //
</script>

<style scooped>
  .body-section {
    background-color: rgb(50, 56, 60);
  }
</style>
