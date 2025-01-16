<script setup>
let props = defineProps({
  envio: {
    type: Object,
    required: true
  }
});

defineEmits(['pagar']);
</script>

<template>
  <v-alert
    v-if="props.envio.estadoPago === 'PENDIENTE'"
    class="mb-4"
    title="Estado del pago"
    text="El pago no se ha completado. Por favor, procede a realizar el pago para que el envío pueda ser procesado. "
    color="red"
    icon="mdi-close-octagon"
  >
    <span
      style="cursor: pointer; text-decoration: underline;"
      @click="$emit('pagar')"
    >Realizar pago</span>
  </v-alert>

  <v-card>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card-title>
            Información del envío
          </v-card-title>
          <v-card-text>
            <span class="caption font-weight-bold">Observaciones</span>
            <p>{{ props.envio.observaciones ?? 'Sin observaciones' }}</p>
            <v-divider class="my-2" />
            <p>Número de seguimiento: {{ props.envio.seguimiento }}</p>
            <p>Estado actual: {{ props.envio.estado }}</p>
            <p>Estado del pago: {{ props.envio.estadoPago }}</p>
          </v-card-text>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card-title>
            Origen
          </v-card-title>
          <v-card-text>
            <p>{{ props.envio.origen.nombre }}</p>
            <p>{{ props.envio.origen.lineaDireccion1 }}</p>
            <p>{{ props.envio.origen.lineaDireccion2 }}</p>
            <p>{{ props.envio.origen.codigoPostal }}</p>
            <p>{{ props.envio.origen.ciudad }}</p>
            <p>{{ props.envio.origen.provincia }}</p>
            <p>{{ props.envio.origen.pais }}</p>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card-title>
            Bultos
          </v-card-title>
          <v-card-text>
            <p>El paquete contiene {{ props.envio.bultos.length }} bulto(s).</p>
            <p>Peso total: {{ props.envio.bultos.reduce((acc, bulto) => acc + bulto.peso, 0) }} kg</p>

            <v-list>
              <v-list-item
                v-for="i in props.envio.bultos.length"
                :key="props.envio.bultos[i-1]"
                :title="`Bulto ${i}`"
                :subtitle="`Peso: ${props.envio.bultos[i-1].peso} kg. Dimensiones: ${props.envio.bultos[i-1].altura}x${props.envio.bultos[i-1].ancho}x${props.envio.bultos[i-1].profundidad} cm`"
              />
            </v-list>
          </v-card-text>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-card-title>
            Destino
          </v-card-title>
          <v-card-text>
            <p>{{ props.envio.destino.nombre }}</p>
            <p>{{ props.envio.destino.lineaDireccion1 }}</p>
            <p>{{ props.envio.destino.lineaDireccion2 }}</p>
            <p>{{ props.envio.destino.codigoPostal }}</p>
            <p>{{ props.envio.destino.ciudad }}</p>
            <p>{{ props.envio.destino.provincia }}</p>
            <p>{{ props.envio.destino.pais }}</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
