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
        <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold">Información de
          Miembros</v-card-title>
        <PersonAutomplete class="mt-8" label="Nombre del Líder" @select="onLeaderSelect" />
        <PersonMultipleAutomplete variant="outlined" label="Co-investigadores"></PersonMultipleAutomplete>
        <StudentRegistry />
        <PersonAutomplete label="Miembros" class="mt-8" @select="onPersonSelect" />
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
        <AddEvents class="mb-5" />
        <v-data-table-virtual>

        </v-data-table-virtual>
      </template>

      <template v-slot:item.4>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Nuevo Proyecto</v-card-title>
          <v-text-field label="Nombre del Proyecto" v-model="name" variant="outlined" class="mb-2 pb-0 pt-3"
            :hide-details="true" required></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field type="date" v-model="startDate" label="Fecha de Inicio" variant="outlined"
                class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field type="date" label="Fecha de Fin" v-model="endDate" variant="outlined" class="mb-2 pb-0 pt-3"
                :hide-details="true" v-show="isFinished"></v-text-field>
            </v-col>
          </v-row>

          <v-radio-group class="mb-0 pb-0" :hide-details="true" inline v-model="status">
            <p class="w-100 pl-1 pt-2 mb-0 pb-0">Estado del Proyecto</p>
            <v-radio label="En ejecución" value="InProgress" class="mb-0 pb-0"></v-radio>
            <v-radio label="Terminado" value="Finished" class="mb-0 pb-0"></v-radio>
          </v-radio-group>

          <person-automplete label="Director" @select="onDirectorSelect"></person-automplete>

          <v-autocomplete v-model="chosenSponsor" :items="sponsors" label="Entidad que avala" variant="outlined"
            class="mb-2 pb-0 pt-2" :hide-details="true" item-title="name" item-value="id" required></v-autocomplete>

          <v-text-field label="Monto Aprobado" v-model="approvedAmount" variant="outlined" prefix="$"
            class="mb-1 pb-0 pt-2" :hide-details="true" required></v-text-field>

          <v-btn type="submit">Submit</v-btn>
        </v-form>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(project, index) in projects" :key="project.name" class="mt-4">
            <v-expansion-panel-title>
              {{ project.name }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p>Fecha de Inicio: {{ project.startDate }}</p>
              <p>Fecha de Fin: {{ project.endDate }}</p>
              <p>Estado: {{ project.type }}</p>
              <p>Director: {{ project.directorId }}</p>
              <p>Entidad que avala: {{ project.certifyingOrganizationId }}</p>
              <p>Monto Aprobado: {{ project.approvedAmount }}</p>

              <v-card flat>
                <v-card-title class="d-flex align-center pe-2">
                  <v-icon icon="mdi-account-group"></v-icon> &nbsp;
                  Productos

                  <v-spacer></v-spacer>

                  <v-dialog v-model="isDialogOpen">
                    <template #activator="{ props }">
                      <v-btn color="primary" v-bind="props">Agregar</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-center">Nuevo Producto</v-card-title>
                      <v-card-text>
                        <v-text-field label="Nombre del Producto" v-model="productName" variant="outlined"
                          class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-text-field label="Descripcion del Producto" v-model="productDescription" variant="outlined"
                          class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-text-field type="date" v-model="productDate" label="Fecha" variant="outlined"
                          class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-select v-model="productType" :items="productTypes" item-title="name" item-value="id"
                          label="Tipo de Producto" variant="outlined" class="mb-2 pb-0 pt-3" :hide-details="true"
                          required></v-select>

                        <person-multiple-automplete label="Integrantes" @select="onProductMemberSelect"
                          v-mo></person-multiple-automplete>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="() => onAddProduct(index)" color="primary">Agregar</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-title>

                <v-data-table :items="project.products">
                  <template #headers>
                    <tr>
                      <th class="text-left">Nombre</th>
                      <th class="text-left">Descripcion</th>
                      <th class="text-left">Fecha</th>
                      <th class="text-left">Tipo de producto</th>
                      <th class="text-left">Numero de participantes</th>
                    </tr>
                  </template>

                  <template #item="{ item }">
                    <tr>
                      <td>{{ item.name }}</td>
                      <td>{{ item.description }}</td>
                      <td>{{ item.date }}</td>
                      <td>{{ getProductTypeName(item.productTypeId) }}</td>
                      <td>{{ item.members.length }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </v-stepper>
  </v-sheet>
</template>
  
<script setup lang="ts">
import axios from 'axios';
import baseUrl from '../lib/baseUrl'
import StudentRegistry from '@/components/StudentRegistry.vue'
import { ref, onMounted, computed } from 'vue'
import PersonAutomplete from '@/components/PersonAutomplete.vue';
import type Person from '@/models/Person';
import PersonMultipleAutomplete from '@/components/PersonMultipleAutomplete.vue';
import AddEvents from '@/components/AddEvents.vue';
import getCertOrgs from '@/lib/api/cert-orgs';
import getProductTypes, { type ProductType } from '@/lib/api/products';
import type { CertOrg } from '@/models/CertOrgs';
import type { Project } from '@/models/Project';


const dialog = ref()
const dataList = ref()
const date = ref()
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
const existingSponsors = ref(["Patrocinador 1", "Patrocinador 2", "Patrocinador 3"])
const line_of_research = ref(["Linea de Investigación 1", "Linea de Investigación 2", "Linea de Investigación 3"])

function onPersonSelect(person: Person) {
  memberList.value = [...memberList.value, person]
  console.log(memberList.value)
}

function onLeaderSelect(person: Person) {
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

onMounted(async () => {
  try {
    const responsePrograms = await axios.get(`${baseUrl}/api/programs`)
    programsList.value = responsePrograms.data
    console.log(programsList.value)

  } catch (error) {
    console.log(error)
  }
})


const name = ref<string>("");
const chosenSponsor = ref<number | null>();
const sponsors = ref<CertOrg[]>([]);
const approvedAmount = ref<number>();
const startDate = ref<Date>();
const endDate = ref<Date>();
const status = ref<"InProgress" | "Finished">("InProgress");
const directorId = ref<number>();
const isDialogOpen = ref<boolean>(false);

const isFinished = computed(() => status.value === 'Finished');

const productName = ref<string>("");
const productDescription = ref<string>("");
const productDate = ref<Date>();
const productType = ref<number>(1);
const productParticipants = ref<Person[]>();

const projects = ref<Project[]>([]);
const productTypes = ref<ProductType[]>();

onMounted(async () => {
  sponsors.value = await getCertOrgs();
  productTypes.value = await getProductTypes();
});

function onDirectorSelect(person: Person) {
  directorId.value = person.id;
}

function onAddProduct(index: number) {
  projects.value[index].products.push({
    name: productName.value,
    description: productDescription.value,
    date: productDate.value ?? new Date(),
    productTypeId: productType.value,
    members: productParticipants.value?.map(({ id }) => ({ id })) ?? [],
  });

  isDialogOpen.value = false;

  productName.value = "";
  productDescription.value = "";
  productDate.value = new Date();
  productType.value = 1;
  productParticipants.value = [];
}

function onProductMemberSelect(person: Person[]) {
  productParticipants.value = person;
}

function getProductTypeName(id: number) {
  return productTypes.value?.find(p => p.id == id)?.name ?? ''
}

function onSubmit() {
  projects.value.push({
    name: name.value,
    certifyingOrganizationId: chosenSponsor.value!,
    approvedAmount: approvedAmount.value!,
    startDate: startDate.value!,
    endDate: endDate.value!,
    type: status.value,
    directorId: directorId.value!,
    products: [],
  });

  name.value = "";
  chosenSponsor.value = null;
  approvedAmount.value = undefined;
  startDate.value = undefined;
  endDate.value = undefined;
  status.value = "InProgress";
  directorId.value = undefined;
}

</script>