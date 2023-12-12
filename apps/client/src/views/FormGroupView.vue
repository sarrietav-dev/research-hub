<template>
  <v-sheet width="570" class="mx-auto">
    <v-stepper alt-labels class="text-caption" v-model="step"
      :items="['Agregar Información General', 'Agregar Miembros', 'Agregar Eventos', 'Agregar Proyectos']" complete>
      <template v-slot:item.1>
        <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Información General</v-card-title>
        <v-row>
          <v-col cols="8" class="pb-0">
            <v-text-field v-model="basicInfo.name" label="Nombre del Semillero" :hide-details="true" variant="outlined"
              class="mb-1 pb-0 pt-3" required></v-text-field>
          </v-col>

          <v-col cols="4" class="pb-0">
            <v-text-field label="Acrónimo" v-model="basicInfo.acronym" :hide-details="true" variant="outlined"
              class="mb-1 pb-0 pt-3"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="pt-0">
          <v-col cols="6" class="pb-0">
            <v-select label="Programa" v-model="basicInfo.programId" :items="programsList" item-title="name"
              item-value="id" class="mb-1 pb-0" variant="outlined" :hide-details="true" required>
            </v-select>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-select label="Grupo de Investigación" v-model="basicInfo.researchGroupId" :items="researchGroup"
              item-value="id" item-title="name" class="mb-1 pb-0" variant="outlined" :hide-details="true"
              :disabled="!isResearchGroupEnabled" required></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field type="date" label="Fecha de Creación" v-model="basicInfo.creationDate" variant="outlined"
              class="mb-4 pb-0" :hide-details="true" required></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Período Actual" class="mb-4 pb-0" variant="outlined" :hide-details="true"
              v-model="basicInfo.currentPeriod" required></v-text-field>
          </v-col>
        </v-row>

        <v-textarea label="Descripción" variant="outlined" class="mb-4 pb-0" v-model="basicInfo.description"
          :hide-details="true" rows="3" required></v-textarea>

        <v-row>
          <v-col cols="12">
            <v-text-field v-model="researchLinesInput" label="Líneas de Investigación" @keydown.enter.prevent="addChip"
              variant="outlined" :hide-details="true"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-chip v-for="(chip, index) in basicInfo.researchLines" :key="index" closable
              @click:close="removeChip(index)">
              {{ chip }}
            </v-chip>
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
        <v-data-table-virtual :items="memberInfo.members">
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
        <AddEvents class="mb-5" @click="onEventCreate" />
        <v-data-table :items="events">
          <template #headers>
            <tr>
              <th class="text-left">Nombre</th>
              <th class="text-left">Fecha de Inicio</th>
              <th class="text-left">Fecha de Fin</th>
              <th class="text-left">Tipo de Evento</th>
            </tr>
          </template>

          <template #item="{ item }">
            <tr>
              <td>{{ item.description }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>{{ item.type }}</td>
            </tr>
          </template>
        </v-data-table>
      </template>

      <template v-slot:item.4>
        <v-form @submit.prevent="onProjectSubmit">
          <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Nuevo Proyecto</v-card-title>
          <v-text-field label="Nombre del Proyecto" v-model="projectData.name" variant="outlined" class="mb-2 pb-0 pt-3"
            :hide-details="true" required></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field type="date" v-model="projectData.startDate" label="Fecha de Inicio" variant="outlined"
                class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field type="date" label="Fecha de Fin" v-model="projectData.endDate" variant="outlined"
                class="mb-2 pb-0 pt-3" :hide-details="true" v-show="isFinished"></v-text-field>
            </v-col>
          </v-row>

          <v-radio-group class="mb-0 pb-0" :hide-details="true" inline v-model="projectData.type">
            <p class="w-100 pl-1 pt-2 mb-0 pb-0">Estado del Proyecto</p>
            <v-radio label="En ejecución" value="InProgress" class="mb-0 pb-0"></v-radio>
            <v-radio label="Terminado" value="Finished" class="mb-0 pb-0"></v-radio>
          </v-radio-group>

          <person-automplete label="Director" @select="onDirectorSelect"></person-automplete>

          <v-autocomplete v-model="projectData.certifyingOrganizationId" :items="sponsors" label="Entidad que avala"
            variant="outlined" class="mb-2 pb-0 pt-2" :hide-details="true" item-title="name" item-value="id"
            required></v-autocomplete>

          <v-text-field label="Monto Aprobado" v-model="projectData.approvedAmount" variant="outlined" prefix="$"
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
                        <v-text-field label="Nombre del Producto" v-model="productData.name" variant="outlined"
                          class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-text-field label="Descripcion del Producto" v-model="productData.description"
                          variant="outlined" class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-text-field type="date" v-model="productData.date" label="Fecha" variant="outlined"
                          class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                        <v-select v-model="productData.productTypeId" :items="productTypes" item-title="name"
                          item-value="id" label="Tipo de Producto" variant="outlined" class="mb-2 pb-0 pt-3"
                          :hide-details="true" required></v-select>

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

      <template #actions>
        <v-stepper-actions>
          <template #prev>
            <v-btn color="primary" @click="() => step--">Anterior</v-btn>
          </template>

          <template #next>
            <v-btn color="primary" :disabled="false" @click="handleNext">
              <v-progress-circular v-if="isSubmitLoading" indeterminate color="primary"></v-progress-circular>
              <span v-else>{{ nextBtnName }}</span>
            </v-btn>
          </template>
        </v-stepper-actions>
      </template>
    </v-stepper>
  </v-sheet>
</template>
  
<script setup lang="ts">
import StudentRegistry from '@/components/StudentRegistry.vue'
import { ref, onMounted, computed } from 'vue'
import PersonAutomplete from '@/components/PersonAutomplete.vue';
import type Person from '@/models/Person';
import PersonMultipleAutomplete from '@/components/PersonMultipleAutomplete.vue';
import AddEvents from '@/components/AddEvents.vue';
import getCertOrgs from '@/lib/api/cert-orgs';
import getProductTypes, { type ProductType } from '@/lib/api/products';
import type { CertOrg } from '@/models/CertOrgs';
import { createSeedGroup, type Product, type Project, type Event as SeedGroupEvent } from '@/lib/api/seed-groups';
import { reactive } from 'vue';
import { getPrograms, getResearchGroups, type Program } from '@/lib/api/programs';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const step = ref<number>(1)

const programsList = ref<Program[]>([])
const researchLinesInput = ref<string>('')
const researchGroup = ref<{ id: number, name: string }[]>([])
const events = ref<SeedGroupEvent[]>([])
const isSubmitLoading = ref<boolean>(false)

const basicInfo = reactive<{
  name: string,
  acronym: string,
  programId?: number,
  researchGroupId?: number,
  creationDate: string,
  currentPeriod: string,
  description: string,
  period: string,
  researchLines: string[]
}>({
  name: '',
  acronym: '',
  programId: undefined,
  researchGroupId: undefined,
  creationDate: '',
  currentPeriod: '',
  description: '',
  period: '',
  researchLines: []
});

const sponsors = ref<CertOrg[]>([]);
const isDialogOpen = ref<boolean>(false);
const productTypes = ref<ProductType[]>();
const projects = ref<Project[]>([]);

let projectData = reactive<Project>({
  name: "",
  certifyingOrganizationId: 1,
  approvedAmount: 0,
  startDate: "",
  endDate: "",
  type: "InProgress",
  directorId: 1,
  products: [],
});

const isFinished = computed(() => projectData.type === 'Finished');

let productData = reactive<Product>({
  name: "",
  description: "",
  date: "",
  productTypeId: 1,
  members: [],
});

watchEffect(async () => {
  if (basicInfo.programId && basicInfo.programId !== 0) {
    researchGroup.value = await getResearchGroups(basicInfo.programId!);
  }
})

const isResearchGroupEnabled = computed(() => basicInfo.programId !== 0)

const memberInfo = reactive<{
  leaderId: number,
  coInvestigators: Person[],
  members: Person[]
}>({
  leaderId: 0,
  coInvestigators: [],
  members: []
})

function onPersonSelect(person: Person) {
  memberInfo.members = [...memberInfo.members, person]
}

function onLeaderSelect(person: Person) {
  memberInfo.leaderId = person.id;
}

onMounted(async () => {
  sponsors.value = await getCertOrgs();
  productTypes.value = await getProductTypes();
  programsList.value = await getPrograms();
})


function onDirectorSelect(person: Person) {
  projectData.directorId = person.id;
}

function onAddProduct(index: number) {
  projects.value[index].products.push({
    ...productData,
  });

  isDialogOpen.value = false;

  productData.date = "";
  productData.description = "";
  productData.name = "";
  productData.productTypeId = 1;
  productData.members = [];
}

function onProductMemberSelect(person: Person[]) {
  productData.members = person;
}

function getProductTypeName(id: number) {
  return productTypes.value?.find(p => p.id == id)?.name ?? ''
}

function addChip() {
  basicInfo.researchLines.push(researchLinesInput.value.trim());
}

function removeChip(index: number) {
  basicInfo.researchLines.splice(index, 1);
}

function onEventCreate(event: SeedGroupEvent) {
  events.value = [...events.value, event];
}

function onProjectSubmit() {
  projects.value.push({
    ...projectData,
  });

  projectData.products = [];
  projectData.name = "";
  projectData.certifyingOrganizationId = 1;
  projectData.approvedAmount = 0;
  projectData.startDate = "";
  projectData.endDate = "";
  projectData.type = "InProgress";
  projectData.directorId = 1;

}

async function submitSeedGroup() {
  const response = await createSeedGroup({
    acronym: basicInfo.acronym,
    name: basicInfo.name,
    programId: basicInfo.programId!,
    researchGroupId: basicInfo.researchGroupId!,
    creationDate: new Date(Date.parse(basicInfo.creationDate)).toUTCString(),
    description: basicInfo.description,
    period: basicInfo.period,
    researchLines: basicInfo.researchLines,
    leaderId: memberInfo.leaderId,
    coResearchers: memberInfo.coInvestigators.map(c => ({
      id: c.id,
    })),
    members: memberInfo.members.map(m => ({
      ...m,
      affiliationDate: new Date().toUTCString(),
      functions: ["Miembro"],
      isActive: true,
      roleId: 1,
    })),
    events: events.value,
    projects: projects.value.map(p => ({
      ...p,
      startDate: new Date(Date.parse(p.startDate)).toUTCString(),
      endDate: new Date(Date.parse(p.endDate ?? '')).toUTCString(),
      products: p.products.map(pr => ({
        ...pr,
        date: new Date(Date.parse(pr.date)).toUTCString(),
      })),
    })),
  });

  return response;
}

const router = useRouter();

async function handleNext() {
  if (step.value < 4) {
    step.value++;
  } else {
    try {
      isSubmitLoading.value = true;
      const { id } = await submitSeedGroup();
      router.push(`/seed_groups/${id}`);
    } catch (error) {
      
    } finally {
      isSubmitLoading.value = false;
    }
  }
}

const nextBtnName = computed(() => {
  if (step.value === 4) {
    return 'Enviar';
  }

  return 'Siguiente';
})
</script>