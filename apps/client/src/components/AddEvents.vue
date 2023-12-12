<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="1000px">
      <template v-slot:activator="{ props }">
        <v-btn class="mt-10" color="grey-lighten-2" v-bind="props"> Añadir Evento</v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center mt-5" style="font-size: 1.5em; font-weight: bold">Registro</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Nombre del Evento" class="mb-2 pb-0 pt-3" :hide-details="true" variant="outlined"
                  v-model="eventData.name" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field type="date" label="Fecha de Inicio" :hide-details="true" variant="outlined"
                  v-model="eventData.initDate" class="mb-2 pb-0 pt-3" required></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field type="date" label="Fecha de Fin" :hide-details="true" variant="outlined"
                  v-model="eventData.finDate" class="mb-2 pb-0 pt-3" required></v-text-field>
              </v-col>
            </v-row>
            <v-radio-group inline v-model="eventData.typeEvent">
              <p class="w-100 pl-1 pt-2 mb-2 pb-0">Tipo de Evento</p>
              <v-radio label="Local" value="Local" :hide-details="true"></v-radio>
              <v-radio label="Internacional" value="International" :hide-details="true"></v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-btn color="grey-lighten-2" @click="onClick" type="submit"> Añadir Evento</v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false);

const emit = defineEmits<{
  click: [event: {
    name: string,
    initDate: string,
    finDate: string,
    typeEvent: string,
  }]
}>();

const eventData = ref({
  name: '',
  initDate: '',
  finDate: '',
  typeEvent: '',
});

function onClick() {
  emit('click', { ...eventData.value });
  dialog.value = false;
}
</script>