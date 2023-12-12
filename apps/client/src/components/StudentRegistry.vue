<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="1000px">
      <template v-slot:activator="{ props }">
        <v-btn class="mt-10" color="grey-lighten-2" v-bind="props"> Añadir estudiantes</v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center mt-5" style="font-size: 1.5em; font-weight: bold">Registro</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-text-field v-model="nombre" label="Nombre" variant="outlined" :hide-details="true" />
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="cedula" type="number" label="Cedula" variant="outlined" :hide-details="true" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="correo" type="email" label="Correo" variant="outlined" :hide-details="true" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="phone" type="number" label="Teléfono" variant="outlined" :hide-details="true" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="codigoInstitucional" type="number" label="Codigo institucional" variant="outlined"
                  :hide-details="true" />
              </v-col>
              <v-col cols="6">
                <v-select v-model="selectedProgram" :items="programsList" label="Programa" item-value="id"
                  item-title="name" variant="outlined" :hide-details="true" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-btn color="grey-lighten-2" @click="onClick" type="submit"> Añadir estudiante</v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import axios from 'axios';
import baseUrl from '../lib/baseUrl'
import { ref, onMounted } from 'vue'



const dialog = ref(false);
const nombre = ref('');
const cedula = ref('');
const correo = ref('');
const phone = ref('');
const codigoInstitucional = ref('');
const programsList = ref([])
const selectedProgram = ref(null);

onMounted(async () => {
  try {
    const responsePrograms = await axios.get(`${baseUrl}/api/programs`)
    programsList.value = responsePrograms.data
    console.log(programsList.value)

  } catch (error) {
    console.log(error)
  }

})

function postPerson() {
  const newUser = ref({
    name: nombre.value,
    email: correo.value,
    phone: phone.value,
    identityCard: cedula.value,
    institutionalCode: codigoInstitucional.value,
    programId: selectedProgram.value
  })
  try {
    const res = axios.post(`${baseUrl}/api/person`, newUser.value)
    console.log(newUser.value)
    console.log(res)
  } catch (err) {
    console.log(newUser.value)
    console.log(err)
  }

}
function onClick() {
  console.log('Nombre:', nombre.value);
  console.log('Cedula:', cedula.value);
  console.log('Correo:', correo.value);
  console.log('Correo:', phone.value);
  console.log('Codigo institucional:', codigoInstitucional.value);
  console.log('Programa:', selectedProgram);
  postPerson();
  dialog.value = false;
}
</script>
  