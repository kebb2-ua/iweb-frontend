<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import countries from '@/assets/paises.js'

let emit = defineEmits(['error']);

const nif = ref('');
const nombre = ref('');
const apellidos = ref('')
const razonSocial = ref('')
const email = ref('')
const password = ref('')
const lineaDireccion1 = ref('')
const lineaDireccion2 = ref('')
const codigoPostal = ref('')
const pais = ref('')
const provincia = ref('')
const municipio = ref('')
const localidad = ref('')

const visible = ref(false);
let isEmpresa = ref(true);

const authStore = useAuthStore();
const router = useRouter();

const registro = async () => {
  try {
    await authStore.registro(nif.value, nombre.value, apellidos.value, razonSocial.value, email.value, password.value, 
    lineaDireccion1.value, lineaDireccion2.value, codigoPostal.value, pais.value, provincia.value, municipio.value, localidad.value, isEmpresa.value);
    router.push('/login');
  } catch(error) {
    console.error(error)
    emit('error', error);
  }
};

</script>

<template>
  <v-form @submit.prevent="registro">
    <div class="text-subtitle-1 text-high-emphasis">
      Datos personales
    </div>

    
    <v-switch 
      v-model="isEmpresa"
      class="mt-3"
      label="¿Eres una empresa?"
      color="primary"
    />
    
    <div
      v-if="!isEmpresa"
      class="text-subtitle-1 text-medium-emphasis"
    >
      NIF
    </div>

    <div
      v-if="isEmpresa"
      class="text-subtitle-1 text-medium-emphasis"
    >
      CIF
    </div>

    <v-text-field
      v-model="nif"
      type="nif"
      density="compact"
      placeholder="12345678X"
      prepend-inner-icon="mdi-credit-card-outline"
      variant="outlined"
      maxlength="9"
      required
    />

    <div
      v-if="!isEmpresa"
      class="datosPersona"
    >
      <div class="text-subtitle-1 text-medium-emphasis">
        Nombre
      </div>

      <v-text-field
        v-model="nombre"
        type="text"
        density="compact"
        prepend-inner-icon="mdi-account"
        placeholder="Enrique"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis">
        Apellidos
      </div>

      <v-text-field
        v-model="apellidos"
        type="text"
        density="compact"
        prepend-inner-icon="mdi-account"
        placeholder="Paz Juan"
        variant="outlined"
      />
    </div>

    <div
      v-if="isEmpresa"
      class="datosEmpresa"
    >
      <div class="text-subtitle-1 text-medium-emphasis">
        Razón social
      </div>

      <v-text-field
        v-model="razonSocial"
        type="text"
        density="compact"
        prepend-inner-icon="mdi-domain"
        placeholder="Enrikiwi Diabetic Friendly Food SL"
        variant="outlined"
      />
    </div>
        
    <div class="text-subtitle-1 text-medium-emphasis">
      Correo electrónico
    </div>

    <v-text-field
      v-model="email"
      type="email"
      density="compact"
      placeholder="usuario@email.com"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      required
    />
        
    <div class="text-subtitle-1 text-medium-emphasis">
      Contraseña
    </div>

    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      placeholder="********"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
    />

    <div class="text-subtitle-1 text-high-emphasis">
      Dirección(es)
    </div>

    <div class="text-subtitle-1 text-medium-emphasis">
      Dirección principal
    </div>

    <v-text-field
      v-model="lineaDireccion1"
      type="text"
      density="compact"
      placeholder="Calle La Pantomima Nº13"
      prepend-inner-icon="mdi-home-floor-1"
      variant="outlined"
      required
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Dirección secundaria
    </div>

    <v-text-field
      v-model="lineaDireccion2"
      type="text"
      density="compact"
      placeholder="P.º de los Melancólicos Nº43"
      prepend-inner-icon="mdi-home-floor-2"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Código postal
    </div>

    <v-text-field
      v-model="codigoPostal"
      type="text"
      density="compact"
      placeholder="03680"
      prepend-inner-icon="mdi-map-search-outline"
      variant="outlined"
      required
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Pais
    </div>

    <v-select
      v-model="pais"
      :items="countries"
      label="Seleccione un país"
      prepend-inner-icon="mdi-earth"
      variant="outlined"
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Provincia
    </div>

    <v-text-field
      v-model="provincia"
      type="text"
      density="compact"
      placeholder="Alicante"
      prepend-inner-icon="mdi-map"
      variant="outlined"
      required
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Localidad
    </div>

    <v-text-field
      v-model="localidad"
      type="text"
      density="compact"
      placeholder="Aspe"
      prepend-inner-icon="mdi-earth-box"
      variant="outlined"
      required
    />

    <div class="text-subtitle-1 text-medium-emphasis">
      Municipio
    </div>

    <v-text-field
      v-model="municipio"
      type="text"
      density="compact"
      placeholder="Aspe"
      prepend-inner-icon="mdi-home-map-marker"
      variant="outlined"
      required
    />
        
    

    <v-btn
      type="submit"
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      block
    >
      Registrarse
    </v-btn>
  </v-form>
</template>