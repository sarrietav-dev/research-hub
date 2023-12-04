<template>
  <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Nuevo Proyecto</v-card-title>
  <v-text-field label="Nombre del Proyecto" variant="outlined" class="mb-2 pb-0 pt-3" :hide-details="true"
    required></v-text-field>

  <v-row>
    <v-col cols="6">
      <v-text-field type="date" v-model="startDate" label="Fecha de Inicio" variant="outlined" class="mb-2 pb-0 pt-3"
        :hide-details="true" required></v-text-field>
    </v-col>
    <v-col cols="6">
      <v-text-field type="date" label="Fecha de Fin" v-model="endDate" variant="outlined" class="mb-2 pb-0 pt-3"
        :hide-details="true" v-show="isFinished"></v-text-field>
    </v-col>
  </v-row>

  <v-radio-group class="mb-0 pb-0" :hide-details="true" inline v-model="status">
    <p class="w-100 pl-1 pt-2 mb-0 pb-0">Estado del Proyecto</p>
    <v-radio  label="En ejecución" value="InProgress" class="mb-0 pb-0"></v-radio>
    <v-radio  label="Terminado" value="Finished" class="mb-0 pb-0"></v-radio>
  </v-radio-group>

  <v-autocomplete v-model="chosenSponsor" :items="sponsors" label="Entidad que avala" variant="outlined"
    class="mb-2 pb-0 pt-2" :hide-details="true" item-title="name" item-value="name" required></v-autocomplete>

  <v-text-field label="Monto Aprobado" v-model="approvedAmount" variant="outlined" prefix="$" class="mb-1 pb-0 pt-2"
    :hide-details="true" required></v-text-field>
</template>

<script setup lang="ts">
import getCertOrgs from '@/lib/api/cert-orgs';
import type { CertOrg } from '@/models/CertOrgs';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const chosenSponsor = ref<CertOrg | null>();
const sponsors = ref<CertOrg[]>([]);
const approvedAmount = ref<number>();
const startDate = ref<Date>();
const endDate = ref<Date>();
const status = ref<string>("");

onMounted(async () => {
  sponsors.value = await getCertOrgs();
});

const isFinished = computed(() => status.value === 'Finished');

</script>