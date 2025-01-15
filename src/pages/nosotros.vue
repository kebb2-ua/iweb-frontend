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

  <div class="body-section">
    <v-divider></v-divider>

    <v-card
      class="my-10 pa-12 pb-8 mx-5"
      elevation="8"
      max-width="640"
      rounded="lg"
    >

    
    </v-card>

    <v-divider></v-divider>
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

<style scooped>
  .body-section {
    background-color: rgb(50, 56, 60);
  }
</style>
