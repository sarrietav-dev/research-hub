<template>
  <v-sheet width="570" class="mx-auto">
    <v-stepper alt-labels class="text-caption"
      :items="['Agregar Información General', 'Agregar Miembros', 'Agregar Eventos', 'Agregar Proyectos']" complete>
      <template v-slot:item.1>
        <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Información General</v-card-title>
        <v-row>
          <v-col cols="8" class="pb-0">
            <v-text-field label="Nombre del Semillero" :hide-details="true" variant="outlined" class="mb-1 pb-0 pt-3"
              required></v-text-field>
          </v-col>

          <v-col cols="4" class="pb-0">
            <v-text-field label="Acrónimo" :hide-details="true" variant="outlined" class="mb-1 pb-0 pt-3"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="pt-0">
          <v-col cols="6" class="pb-0">
            <v-select label="Programa" v-model="selectedProgram" :items="programsList" item-title="name" item-value="id"
              class="mb-1 pb-0" variant="outlined" :hide-details="true" required>
            </v-select>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-select label="Grupos de Investigación" v-model="groups" @click="updateResearch(selectedProgram)"
              :items="researchGroup" item-title="name" class="mb-1 pb-0" variant="outlined" :hide-details="true"
              required></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field type="date" label="Fecha de Creación" variant="outlined" class="mb-4 pb-0" :hide-details="true"
              required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Período Actual" class="mb-4 pb-0" variant="outlined" :hide-details="true"
              required></v-text-field>
          </v-col>
        </v-row>

        <v-textarea label="Descripción" variant="outlined" class="mb-4 pb-0" :hide-details="true" rows="3"
          required></v-textarea>

        <v-row>
          <v-col cols="12">
            <v-text-field label="Líneas de Investigación" variant="outlined" :hide-details="true"></v-text-field>
          </v-col>
          <v-col cols="12">
          </v-col>
        </v-row>
      </template>

      <template v-slot:item.2>
        <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold">Información de Miembros</v-card-title>
        <PersonAutomplete class="mt-8" label="Nombre del Líder" @select="onLeaderSelect"/>   
        <PersonMultipleAutomplete variant="outlined" label ="Co-investigadores"></PersonMultipleAutomplete>
        <StudentRegistry/>
        <PersonAutomplete class="mt-8" @select="onPersonSelect"/>   
        <v-data-table-virtual :items="memberList">
          <template #headers>
            <tr>
              <th>Nombre</th>
              <th>Cedula</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Programa</th>
            </tr>
          </template>
          <template #item="{ item }">
            <tr>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.identityCard }}
              </td>
              <td>
                {{ item.email }}
              </td>
              <td>
                {{ item.phone }}
              </td>
              <td>
                {{ item.program.name }}
              </td>
            </tr>
          </template>
        </v-data-table-virtual>
      </template>
      
      <template v-slot:item.3>
        <AddEvents class="mb-5"/>
        <v-data-table-virtual>
          
        </v-data-table-virtual>
      </template>

      <template v-slot:item.4>
        <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Nuevo Proyecto</v-card-title>
        <v-text-field label="Nombre del Proyecto" variant="outlined" class="mb-2 pb-0 pt-3" :hide-details="true"
          required></v-text-field>

        <v-row>
          <v-col cols="6">
            <v-text-field type="date" label="Fecha de Inicio" variant="outlined" class="mb-2 pb-0 pt-3"
              :hide-details="true" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field type="date" label="Fecha de Fin" variant="outlined" class="mb-2 pb-0 pt-3" :hide-details="true"
              required></v-text-field>
          </v-col>
        </v-row>

        <v-radio-group class="mb-0 pb-0" :hide-details="true" inline>
          <v-text class="w-100 pl-1 pt-2 mb-0 pb-0">Estado del Proyecto</v-text>
          <v-radio label="En ejecución" value="radio-1" class="mb-0 pb-0"></v-radio>
          <v-radio label="Terminado" value="radio-2" class="mb-0 pb-0"></v-radio>
        </v-radio-group>

        <v-autocomplete v-model="sponsors" :items="existingSponsors" label="Entidad que avala" variant="outlined"
          class="mb-2 pb-0 pt-2" :hide-details="true" required></v-autocomplete>

        <v-text-field label="Monto Aprobado" variant="outlined" prefix="$" class="mb-1 pb-0 pt-2" :hide-details="true"
          required></v-text-field>
      </template>
    </v-stepper>
  </v-sheet>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import baseUrl from '../lib/baseUrl'
import StudentRegistry from '@/components/StudentRegistry.vue'
import {ref, onMounted} from 'vue'
import PersonAutomplete from '@/components/PersonAutomplete.vue';
import type Person from '@/models/Person';
import PersonMultipleAutomplete from '@/components/PersonMultipleAutomplete.vue';
import AddEvents from '@/components/AddEvents.vue';


const dialog = ref()
const dataList = ref()
const date = ref()
const startDate = ref()
const programsList = ref([])
const memberList = ref<Person[]>([])
let newMemberList = ([])


const selectedProgram = ref(null)
const researchGroup = ref([])
const groups = ref(null)
const leaders = ref()
const existingLeaders = ref(["Líder 1", "Líder 2", "Líder 3"])
const coInvestigator = ref()
const existingCoInvestigator = ref(["Co-Investigador 1", "Co-Investigador 2", "Co-Investigador 3"])
const sponsors = ref()
const existingSponsors = ref(["Patrocinador 1", "Patrocinador 2", "Patrocinador 3"])
const line_of_research = ref(["Linea de Investigación 1", "Linea de Investigación 2", "Linea de Investigación 3"])

function onPersonSelect(person: Person){
  memberList.value=[...memberList.value,person]
  console.log(memberList.value)
}
function onLeaderSelect(person: Person){
  leaders.value = person
  console.log(leaders.value)
} 


function updateResearch(programId: any) {
  axios.get(`${baseUrl}/api/programs/${programId}/research-groups`)
    .then(function (axiosResponse) {
      researchGroup.value = axiosResponse.data

      let researchObject = null
      for (const group of researchGroup.value) { researchObject = group.researchGroup }
      researchGroup.value = researchObject

    })
    .catch(function (error) {
      console.log(error)
    })



}

onMounted(async() => {
  try{
    const responsePrograms = await axios.get(`${baseUrl}/api/programs`)
    programsList.value = responsePrograms.data
    console.log(programsList.value)

  } catch (error) {
    console.log(error)
  }
  

})

</script>