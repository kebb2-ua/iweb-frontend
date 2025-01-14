<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
  >
    <v-list>
      <v-list-item
        prepend-avatar="@/assets/logo.svg"
        title="Yaco Packages"
        :subtitle="authStore.isAuthenticated ? authStore.email : null"
      />
    </v-list>


    <v-divider />
    <v-list>
      <v-list-item
        v-for="item in menu"
        :key="item.text"
        :prepend-icon="item.icon"
        :title="item.text"
        :to="item.path"
        link
      />
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, reactive } from 'vue';


const authStore = useAuthStore();

const menuItems = reactive([
  { icon: 'mdi-home', text: 'Inicio', path: '/' },
  { icon: 'mdi-send', text: 'Envíos', path: '/envios' },
  { icon: 'mdi-magnify', text: 'Buscar', path: '/buscar' },
  { icon: 'mdi-account-group', text: 'Sobre nosotros', path: '/nosotros' },
  { icon: 'mdi-cart', text: 'Cesta', path: '/cesta' },
  { icon: 'mdi-login-variant', text: 'Iniciar sesión', path: '/login', show: computed(() => !authStore.isAuthenticated) },
  { icon: 'mdi-account-plus', text: 'Registro', path: '/registro', show: computed(() => !authStore.isAuthenticated) },
  { icon: 'mdi-account', text: 'Perfil', path: '/perfil', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-cog', text: 'Configuración', path: '/perfil/editar', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-logout', text: 'Cerrar sesión', path: '/logout', show: computed(() => authStore.isAuthenticated) },
])

const menu = computed(() => {
  return menuItems.filter(item => item.show !== false);
});
</script>
