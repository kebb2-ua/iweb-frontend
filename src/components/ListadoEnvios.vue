<script setup>
let props = defineProps({
  envios: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <v-table fixed-header>
    <thead>
      <tr>
        <th class="text-left">
          Remitente
        </th>
        <th class="text-left">
          Destinatario
        </th>
        <th class="text-left">
          Número de bultos
        </th>
        <th class="text-left">
          Número de seguimiento
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="envio in props.envios"
        :key="envio"
      >
        <td>{{ envio.origen.nombre }}</td>
        <td>{{ envio.destino.lineaDireccion1 }} {{ envio.destino.lineaDireccion2 }}, {{ envio.destino.codigoPostal }} {{ envio.destino.ciudad }} {{ envio.destino.provincia }} ({{ envio.destino.pais }})</td>
        <td>{{ envio.bultos.length }} bulto(s)</td>
        <td>{{ envio.seguimiento }}</td>
        <td>
          <v-btn
            size="small"
            color="primary"
            prepend-icon="mdi-eye"
            :to="`/envios/${envio.seguimiento}`"
          >
            Ver
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
