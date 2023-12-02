<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-group"></v-icon> &nbsp;
      Personas

      <v-spacer></v-spacer>

      <v-text-field v-model="searchQuery" append-icon="mdi-magnify" label="Buscar" single-line
        hide-details></v-text-field>

    </v-card-title>

    <v-divider></v-divider>

    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="searchQuery" :loading="isLoading" :items="items"
      item-key="id" @update:options="onSearch" :items-length="totalItems">
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
        <tr class="person-row" @click="onRowClick(item.id)">
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
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getPersons } from '@/lib/api/person'
import type Person from "@/models/Person"
import { onMounted } from 'vue';
import { useDebounceFn } from "@vueuse/core"

const router = useRouter();

const items = ref<Person[]>([]);
const isLoading = ref(false);
const searchQuery = ref('');
const itemsPerPage = ref(10);
const totalItems = ref(0);

async function onSearch({
  page,
  itemsPerPage,
}: {
  page: number,
  itemsPerPage: number
}) {
  isLoading.value = true
  await search({
    page, itemsPerPage
  });
  isLoading.value = false
}

const search = useDebounceFn(async ({
  page,
  itemsPerPage,
}: {
  page: number,
  itemsPerPage: number
}) => {
  await fetchPeople({ page: page, query: searchQuery.value, take: itemsPerPage })
}, 500)

onMounted(async () => {
  isLoading.value = true
  await fetchPeople({ page: 1, query: '', take: 10 })
  isLoading.value = false
})

async function fetchPeople({ query = '', take = 10, page = 1 }: {
  query?: string,
  take?: number,
  page?: number
}) {
  const { data, count } = await getPersons(
    page,
    take,
    query,
  )

  items.value = data
  totalItems.value = count
}

function onRowClick(id: number) {
  router.push(`/person/${id}`);
}

</script>

<style>
.person-row {
  cursor: pointer;
}

.person-row:hover {
  background-color: #f5f5f5;
}
</style>
