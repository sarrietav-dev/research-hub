<template>
  <v-form @submit.prevent="onSubmit">
    <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Nuevo Proyecto</v-card-title>
    <v-text-field label="Nombre del Proyecto" v-model="name" variant="outlined" class="mb-2 pb-0 pt-3"
      :hide-details="true" required></v-text-field>

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
      <v-radio label="En ejecución" value="InProgress" class="mb-0 pb-0"></v-radio>
      <v-radio label="Terminado" value="Finished" class="mb-0 pb-0"></v-radio>
    </v-radio-group>

    <person-automplete @select="onDirectorSelect"></person-automplete>

    <v-autocomplete v-model="chosenSponsor" :items="sponsors" label="Entidad que avala" variant="outlined"
      class="mb-2 pb-0 pt-2" :hide-details="true" item-title="name" item-value="id" required></v-autocomplete>

    <v-text-field label="Monto Aprobado" v-model="approvedAmount" variant="outlined" prefix="$" class="mb-1 pb-0 pt-2"
      :hide-details="true" required></v-text-field>

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
                  <v-text-field label="Nombre del Producto" v-model="productName" variant="outlined" class="mb-2 pb-0 pt-3"
                    :hide-details="true" required></v-text-field>

                  <v-text-field label="Descripcion del Producto" v-model="productDescription" variant="outlined" class="mb-2 pb-0 pt-3"
                    :hide-details="true" required></v-text-field>

                  <v-text-field type="date" v-model="startDate" label="Fecha" variant="outlined"
                    class="mb-2 pb-0 pt-3" :hide-details="true" required></v-text-field>

                  <v-text-field label="Tipo de Producto" v-model="name" variant="outlined" class="mb-2 pb-0 pt-3"
                    :hide-details="true" required></v-text-field>

                  <v-text-field label="Numero de Participantes" v-model="name" variant="outlined" class="mb-2 pb-0 pt-3"
                    :hide-details="true" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary">Agregar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>

          <v-data-table>
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
                <td>{{ item.type }}</td>
                <td>{{ item.participants }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import getCertOrgs from '@/lib/api/cert-orgs';
import type { CertOrg } from '@/models/CertOrgs';
import type { Project } from '@/models/Project';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import PersonAutomplete from './PersonAutomplete.vue';
import type Person from '@/models/Person';

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
const productStartDate = ref<Date>();
const productEndDate = ref<Date>();
const productType = ref<string>("");
const productParticipants = ref<Person[]>();

const projects = ref<Project[]>([]);

onMounted(async () => {
  sponsors.value = await getCertOrgs();
});

function onDirectorSelect(person: Person) {
  directorId.value = person.id;
}

function onAddProduct(index: number) {
  projects.value[index].products.push({
    name: "Producto 1",
    description: "Descripcion 1",
    date: new Date(),
    type: "Tipo 1",
    participants: 10,
  });
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
}


</script>