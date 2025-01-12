<template>
  <v-navigation-drawer
    expand-on-hover
    rail
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-account-circle"
        subtitle="Sesión no iniciada"
        title="Anónimo"
      />
    </v-list>

      <v-divider />

    <v-list>
      <v-list-item
        v-for="item in menu"
        :key="item.text"
        :prepend-icon="item.icon"
        :title="item.text"
        link
      />
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
const menu = [
  { icon: 'mdi-home', text: 'Inicio' },
  { icon: 'mdi-account', text: 'Catálogo' },
  { icon: 'mdi-magnify', text: 'Buscar' },
  { icon: 'mdi-account-group', text: 'Sobre nosotros' },
  { icon: 'mdi-cart', text: 'Cesta' },
  { icon: 'mdi-login-variant', text: 'Iniciar sesión' },
  { icon: 'mdi-logout', text: 'Registro' },
]
</script>
