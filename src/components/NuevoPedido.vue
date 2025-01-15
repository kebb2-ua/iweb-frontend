<script setup>
    import countries from '@/assets/paises.js'
    import { useEnvioStore } from '@/stores/envio';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    let emit = defineEmits(['error']);

    let nombreRemitente = ref('');
    let lineaDireccionOrigen1 = ref('');
    let lineaDireccionOrigen2 = ref('');
    let codigoPostalOrigen = ref('');
    let paisOrigen = ref('');
    let provinciaOrigen = ref('');
    let municipioOrigen = ref('');
    let localidadOrigen = ref('');

    let nifDestinatario = ref('');
    let nombreDestinatario = ref('');
    let lineaDireccionDestino1 = ref('');
    let lineaDireccionDestino2 = ref('');
    let codigoPostalDestino = ref('');
    let paisDestino = ref('');
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
            console.log({
                nombreRemitente: nombreRemitente.value,
                lineaDireccionOrigen1: lineaDireccionOrigen1.value,
                lineaDireccionOrigen2: lineaDireccionOrigen2.value,
                codigoPostalOrigen: codigoPostalOrigen.value,
                paisOrigen: paisOrigen.value,
                provinciaOrigen: provinciaOrigen.value,
                municipioOrigen: municipioOrigen.value,
                localidadOrigen: localidadOrigen.value,
                nifDestinatario: nifDestinatario.value,
                nombreDestinatario: nombreDestinatario.value,
                lineaDireccionDestino1: lineaDireccionDestino1.value,
                lineaDireccionDestino2: lineaDireccionDestino2.value,
                codigoPostalDestino: codigoPostalDestino.value,
                paisDestino: paisDestino.value,
                provinciaDestino: provinciaDestino.value,
                municipioDestino: municipioDestino.value,
                localidadDestino: localidadDestino.value,
                observaciones: observaciones.value,
                bultos: bultos.value,
            });

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
            <div class="text-h6 text-high-emphasis my-2">
                Datos del origen
            </div>

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

            <div class="text-subtitle-1 text-medium-emphasis">
                Dirección de origen principal
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

            <div class="text-subtitle-1 text-medium-emphasis">
                Dirección de origen secundaria
            </div>
            
            <v-text-field
                v-model="lineaDireccionOrigen2"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-map-marker"
                placeholder="Calle Gogo, 456"
                variant="outlined"
            />

            <div class="text-subtitle-1 text-medium-emphasis">
                Codigo postal de origen
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

            <div class="text-subtitle-1 text-medium-emphasis">
                Pais de origen
            </div>

            <v-select
                v-model="paisOrigen"
                :items="countries"
                label="Seleccione un país"
                prepend-inner-icon="mdi-earth"
                variant="outlined"
            />
            
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


            <div class="text-h6 text-high-emphasis my-2">
                Datos del destino
            </div>
            
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

            <div class="text-subtitle-1 text-medium-emphasis">
                Dirección de destino principal
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

            <div class="text-subtitle-1 text-medium-emphasis">
                Dirección de destino secundaria
            </div>

            <v-text-field
                v-model="lineaDireccionDestino2"
                type="text"
                density="compact"
                prepend-inner-icon="mdi-map-marker"
                placeholder="Calle Yako, 404"
                variant="outlined"
            />

            <div class="text-subtitle-1 text-medium-emphasis">
                Codigo postal de destino
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
                
            <div class="text-subtitle-1 text-medium-emphasis">
                Pais de destino
            </div>

            <v-select
                v-model="paisDestino"
                :items="countries"
                label="Seleccione un país"
                prepend-inner-icon="mdi-earth"
                variant="outlined"
            />

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

            <div class="text-subtitle-1 text-medium-emphasis">
                Observaciones
            </div>
            <v-textarea
                v-model="observaciones"
                density="compact"
                placeholder="Me gustaría que el paquete llegara antes que la PR de David"
                variant="outlined"
            />
        
            <!-- Sección para bultos -->
            <div class="text-h6 text-high-emphasis my-2">
                Bultos
            </div>

            <v-btn class="mb-4" color="primary" @click="agregarBulto">Añadir bulto</v-btn>

            <div v-for="(bulto, index) in bultos" :key="index" class="mt-4">
                <div class="text-subtitle-1 text-high-emphasis my-2">
                    Bulto {{ index + 1 }}
                </div>
                
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

                <div class="text-subtitle-1 text-medium-emphasis">
                    Descripción
                </div>

                <v-textarea
                    v-model="bulto.descripcion"
                    density="compact"
                    placeholder="Descripción del contenido"
                    variant="outlined"
                />

                <v-checkbox
                    v-model="bulto.peligroso"
                    label="¿Es peligroso?"
                />

                <v-btn class="mb-4" color="error" @click="eliminarBulto(index)">
                    Eliminar bulto
                </v-btn>
            </div>

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

        </v-form>

        
       
    </v-container>
</template>