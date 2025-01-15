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
        :subtitle="authStore.isAuthenticated ? (authStore.user.nombre + ' ' + authStore.user.apellidos) : null"
      />
    </v-list>


    <v-divider />
    <v-list>
      <template
        v-for="item in menu"
        :key="item.text"
      >
        <v-divider
          v-if="item.type == 'divider'"
          class="my-2"
        />

        <v-list-subheader v-else-if="item.type == 'header'">
          {{ item.text }}
        </v-list-subheader>

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
  { icon: 'mdi-cog', text: 'Ajustes', path: '/ajustes', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-logout', text: 'Cerrar sesión', path: '/logout', show: computed(() => authStore.isAuthenticated) },
  { type: 'divider', show: computed(() => authStore.isAuthenticated) },
  { type: 'header', text: 'Administración', show: computed(() => authStore.isAuthenticated) },
  { icon: 'mdi-account-group', text: 'Lista de usuarios', path: '/admin/listausuarios', show: computed(() => authStore.isAuthenticated),},
  { icon: 'mdi-truck-delivery', text: 'Lista de envíos', path: '/admin/listaenvios', show: computed(() => authStore.isAuthenticated), },
])

const menu = computed(() => {
  return menuItems.filter(item => item.show !== false);
});
</script>
