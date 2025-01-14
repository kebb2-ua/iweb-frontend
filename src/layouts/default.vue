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
      <template
        v-for="item in menu"
        :key="item.text"
      >
        <v-divider v-if="item.type == 'divider'" />
        
        <v-list-item
          v-else
          :prepend-icon="item.icon"
          :title="item.text"
          :to="item.path"
          link
        />
      </template>
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
  { icon: 'mdi-account-group', text: 'Sobre nosotros', path: '/nosotros' },
  { icon: 'mdi-login-variant', text: 'Iniciar sesión', path: '/login', show: computed(() => !authStore.isAuthenticated) },
  { icon: 'mdi-account-plus', text: 'Registro', path: '/registro', show: computed(() => !authStore.isAuthenticated) },
  { icon: 'mdi-account', text: 'Perfil', path: '/perfil', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-cog', text: 'Configuración', path: '/perfil/editar', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-logout', text: 'Cerrar sesión', path: '/logout', show: computed(() => authStore.isAuthenticated) },
  { type: 'divider' },
  { icon: 'mdi-account-group', text: 'Lista de usuarios', path: '/admin/listausuarios', show: computed(() => authStore.isAuthenticated),},
  { icon: 'mdi-truck-delivery', text: 'Lista de envíos', path: '/admin/listaenvios', show: computed(() => authStore.isAuthenticated), },
])

const menu = computed(() => {
  return menuItems.filter(item => item.show !== false);
});
</script>
