<script setup>
import countries from '@/assets/paises.js'
import { useAuthStore } from '@/stores/auth';
import { useEnvioStore } from '@/stores/envio';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let emit = defineEmits(['error']);

const authStore = useAuthStore();

let paso = ref("ORIGEN");

let nombreRemitente = ref(authStore.user.razonSocial ?? authStore.user.nombre + ' ' + authStore.user.apellidos);
let lineaDireccionOrigen1 = ref(authStore.user.direccion.lineaDireccion1);
let lineaDireccionOrigen2 = ref(authStore.user.direccion.lineaDireccion2);
let codigoPostalOrigen = ref(authStore.user.direccion.codigoPostal);
let paisOrigen = ref(authStore.user.direccion.pais);
let provinciaOrigen = ref(authStore.user.direccion.provincia);
let municipioOrigen = ref(authStore.user.direccion.municipio);
let localidadOrigen = ref(authStore.user.direccion.localidad);

let nifDestinatario = ref('');
let nombreDestinatario = ref('');
let lineaDireccionDestino1 = ref('');
let lineaDireccionDestino2 = ref('');
let codigoPostalDestino = ref('');
let paisDestino = ref('España');
let provinciaDestino = ref('');
let municipioDestino = ref('');
let localidadDestino = ref('');

let bultos = ref([]);
let observaciones = ref('');
const router = useRouter();

const envioStore = useEnvioStore();

// Función para agregar un nuevo bulto
function agregarBulto() {
    bultos.value.push({
        descripcion: '',
        peso: '',
        altura: '',
        ancho: '',
        profundidad: '',
        peligroso: false
    });
}

// Función para eliminar un bulto
function eliminarBulto(index) {
    bultos.value.splice(index, 1);
}

// Submit del formulario
const crearPedido = async () => {
    try {
        // Verifica que 'bultos.value' sea un array
        if (!Array.isArray(bultos.value)) {
            console.log("El parámetro 'bultos' no es un array válido.");
        }

        await envioStore.crearEnvio(
            nombreRemitente.value,
            lineaDireccionOrigen1.value,
            lineaDireccionOrigen2.value,
            codigoPostalOrigen.value,
            paisOrigen.value,
            provinciaOrigen.value,
            municipioOrigen.value,
            localidadOrigen.value,
            nifDestinatario.value,
            nombreDestinatario.value,
            lineaDireccionDestino1.value,
            lineaDireccionDestino2.value,
            codigoPostalDestino.value,
            paisDestino.value,
            provinciaDestino.value,
            municipioDestino.value,
            localidadDestino.value,
            bultos.value,
            observaciones.value
        );

        router.push('/envios');

    } catch (error) {
        console.error("Ocurrió un error al intentar crear el pedido:", error);
        emit('error', error);
    }
}
</script>

<template>
  <v-container>
    <v-form @submit.prevent="crearPedido">
      <div v-if="paso === 'ORIGEN'">
        <div class="text-h6 text-high-emphasis my-2">
          Datos del origen
        </div>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Nombre completo del remitente       <!-- Me cansé de ser buena onda, así se va a quedar. No voy a jugar a ser dios para sacar el nombre del usuario a partir del email -->
            </div>

            <v-text-field
              v-model="nombreRemitente"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-account"
              placeholder="Dave Armenar Gonzalez"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Línea de dirección de origen 1
            </div>

            <v-text-field
              v-model="lineaDireccionOrigen1"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-marker"
              placeholder="Calle Not Working, 123"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Línea de dirección de origen 2
            </div>

            <v-text-field
              v-model="lineaDireccionOrigen2"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-marker"
              placeholder="Calle Gogo, 456"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Código Postal de origen
            </div>

            <v-text-field
              v-model="codigoPostalOrigen"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-search-outline"
              placeholder="03860"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Provincia de origen
            </div>

            <v-text-field
              v-model="provinciaOrigen"
              type="text"
              density="compact"
              placeholder="Alicante"
              prepend-inner-icon="mdi-map"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Municipio de origen
            </div>

            <v-text-field
              v-model="municipioOrigen"
              type="text"
              density="compact"
              placeholder="Aspe"
              prepend-inner-icon="mdi-home-map-marker"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Localidad de origen
            </div>

            <v-text-field
              v-model="localidadOrigen"
              type="text"
              density="compact"
              placeholder="Aspe"
              prepend-inner-icon="mdi-earth-box"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              País de origen
            </div>

            <v-select
              v-model="paisOrigen"
              :items="countries"
              label="Seleccione un país"
              prepend-inner-icon="mdi-earth"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-btn
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            block
            @click="paso = 'DESTINO'"
          >
            Siguiente
          </v-btn>
        </v-row>
      </div>

      <div v-else-if="paso === 'DESTINO'">
        <div class="text-h6 text-high-emphasis my-2">
          Datos del destino
        </div>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <div class="text-subtitle-1 text-medium-emphasis">
              Nombre completo del destinatario
            </div>

            <v-text-field
              v-model="nombreDestinatario"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-account"
              placeholder="Juan Enrique Paz"
              variant="outlined"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <div class="text-subtitle-1 text-medium-emphasis">
              NIF destinatario
            </div>

            <v-text-field
              v-model="nifDestinatario"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-account"
              placeholder="12345678A"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <div class="text-subtitle-1 text-medium-emphasis">
              Línea de dirección 1
            </div>

            <v-text-field
              v-model="lineaDireccionDestino1"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-marker"
              placeholder="Calle Real, 789"
              variant="outlined"
              required
            />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <div class="text-subtitle-1 text-medium-emphasis">
              Línea de dirección 2
            </div>

            <v-text-field
              v-model="lineaDireccionDestino2"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-marker"
              placeholder="Calle Yako, 404"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Código Postal de destino
            </div>

            <v-text-field
              v-model="codigoPostalDestino"
              type="text"
              density="compact"
              prepend-inner-icon="mdi-map-search-outline"
              placeholder="03680"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Provincia de destino
            </div>

            <v-text-field
              v-model="provinciaDestino"
              type="text"
              density="compact"
              placeholder="Alicante"
              prepend-inner-icon="mdi-map"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Municipio de destino
            </div>

            <v-text-field
              v-model="municipioDestino"
              type="text"
              density="compact"
              placeholder="Aspe"
              prepend-inner-icon="mdi-home-map-marker"
              variant="outlined"
              required
            />
          </v-col>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Localidad de destino
            </div>

            <v-text-field
              v-model="localidadDestino"
              type="text"
              density="compact"
              placeholder="Aspe"
              prepend-inner-icon="mdi-earth-box"
              variant="outlined"
              required
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              País de destino
            </div>

            <v-select
              v-model="paisDestino"
              :items="countries"
              label="Seleccione un país"
              prepend-inner-icon="mdi-earth"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="text-subtitle-1 text-medium-emphasis">
              Observaciones
            </div>
            <v-textarea
              v-model="observaciones"
              density="compact"
              placeholder="Me gustaría que el paquete llegara antes que la PR de David"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              type="submit"
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="paso = 'ORIGEN'"
            >
              Volver al paso anterior
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="paso = 'BULTOS'"
            >
              Siguiente
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div v-else-if="paso === 'BULTOS'">
        <!-- Sección para bultos -->
        <div class="text-h6 text-high-emphasis my-2">
          Bultos
        </div>

        <div
          v-for="(bulto, index) in bultos"
          :key="index"
          class="mt-4"
        >
          <div class="text-subtitle-1 text-high-emphasis my-2">
            Bulto {{ index + 1 }}
          </div>

          <v-row>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">
                Peso (Kg)
              </div>


              <v-text-field
                v-model="bulto.peso"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-scale"
                placeholder="Peso (kg)"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">
                Altura (cm)
              </div>

              <v-text-field
                v-model="bulto.altura"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-ruler"
                placeholder="1920"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">
                Ancho (cm)
              </div>

              <v-text-field
                v-model="bulto.ancho"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-ruler"
                placeholder="1080"
                variant="outlined"
              />
            </v-col>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">
                Profundidad (cm)
              </div>

              <v-text-field
                v-model="bulto.profundidad"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-ruler"
                placeholder="420"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="text-subtitle-1 text-medium-emphasis">
                Descripción
              </div>

              <v-textarea
                v-model="bulto.descripcion"
                density="compact"
                placeholder="Descripción del contenido"
                variant="outlined"
              />
            </v-col>
          </v-row>

          <v-checkbox
            v-model="bulto.peligroso"
            label="¿Es peligroso?"
          />

          <v-btn
            class="mb-4"
            color="error"
            @click="eliminarBulto(index)"
          >
            Eliminar bulto
          </v-btn>
        </div>

        <v-row>
          <v-col>
            <v-btn
              class="mb-4"
              color="primary"
              @click="agregarBulto"
            >
              Añadir bulto
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
              @click="paso = 'DESTINO'"
            >
              Volver al paso anterior
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              type="submit"
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              block
            >
              Crear envío
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-form>
  </v-container>
</template>
