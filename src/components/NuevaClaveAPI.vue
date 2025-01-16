<script setup>
import { useApiKeyStore } from '@/stores/apikeys';
import { ref } from 'vue';

const apiKeyStore = useApiKeyStore();
let key = ref(null);

async function generateKey() {
  const response = await apiKeyStore.createApiKey();
  key.value = response;
}
</script>

<template>
  <v-dialog
    max-width="500"
    @after-enter="generateKey"
    @after-leave="key = null"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        text="Nueva clave API"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="Nueva clave API">
        <v-card-text>
          Tu clave API ha sido generada correctamente. Esta será la única vez que puedas verla, así que asegúrate de guardarla en un lugar seguro.

          <v-text-field
            v-model="key"
            class="mt-4"
            label="Clave API"
            outlined
            readonly
          >
            <template #loader>
              <v-progress-linear
                :active="key == null"
                color="primary"
                height="7"
                indeterminate
              />
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="¡Guardada!"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
