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

  <div class="body2-section">
    <v-divider></v-divider>

    

    <div class="d-flex justify-end">
        <v-card
          class="my-7 pa-12 pb-8 mx-5"
          elevation="8"
          max-width="720"
          rounded="lg"
        >
          <v-card-title class="font-weight-bold text-high-emphasis mb-2">Datos de contacto</v-card-title>
        
          <v-card-text>
            <p class="mb-5">
              Aquí encontrarás los datos de contacto de Yaco Packages para cualquier duda o consulta.
            </p>
            <p class="mb-2 mx-5">
              - Email (Dudas y soporte general):  <a href="ua-pracs@kikisito.com">ua-pracs@kikisito.com</a>
            </p>
          </v-card-text>
      
        </v-card>
    </div>

    <v-card
          class="my-7 pa-12 pb-8 mx-5"
          elevation="8"
          max-width="720"
          rounded="lg"
        >

        <v-card-title class="font-weight-bold text-high-emphasis mb-2">Sobre nosotros</v-card-title>

        <div class="d-flex justify-center">
            <img
              class="mx-5"
              width="50%"
              leght="50%"
              src="@/assets/nosotros.jpg"
            />

            <v-card-text>
              <p class="mb-2">
                Página web creada por los integrantes del grupo 9 de la asignatura de Ingeniería Web.
              </p>
              <ul>
                <li class="ml-10">Kyllian Edouard Boucir</li>
                <li class="ml-10">Samuel Padilla Belvis</li>
                <li class="ml-10">Antonio López Sobreviela</li>
                <li class="ml-10">Yaco Paco</li>
                <li class="ml-10">David Almenar Martínez</li>
              </ul>

            </v-card-text>
        </div>
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
  .body2-section {
    background-color: rgb(65, 59, 65);
  }
</style>
