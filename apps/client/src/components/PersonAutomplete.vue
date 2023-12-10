<template>
  <v-autocomplete variant="outlined" v-model:search="personName" v-model:model-value="selectedPerson" :items="items"
    :loading="isLoading" :label="label" outlined dense item-title="name" item-value="id" @update:search="onSearch"
    @update:model-value="selectPerson" :custom-filter="filterByName" return-object></v-autocomplete>
</template>

<script setup lang="ts">
import { getPersons } from '@/lib/api/person';
import type Person from '@/models/Person';
import { useDebounceFn } from '@vueuse/core';
import { onMounted } from 'vue';
import { ref } from 'vue';

const items = ref<Person[]>([]);
const isLoading = ref(false);
const personName = ref("");
const selectedPerson = ref<Person | null>(null);

const emit = defineEmits<{
  select: [value: Person]
}>();

const { label } = defineProps<{
  label: string
}>();

onMounted(async () => {
  isLoading.value = true
  await fetchPeople({ page: 1, query: '', take: 5 })
  isLoading.value = false
})

async function onSearch() {
  isLoading.value = true
  await search();
  isLoading.value = false
}


const search = useDebounceFn(async () => {
  await fetchPeople({ page: 1, query: personName.value, take: 5 })
}, 500)

async function fetchPeople({ query = '', take = 5, page = 1 }: {
  query?: string,
  take?: number,
  page?: number
}) {
  const { data } = await getPersons(
    page,
    take,
    query,
  )

  items.value = data
}

function filterByName(value: string, query: string, item?: any) {
  return item.title.toLowerCase().indexOf(query.toLowerCase()) > -1
}

function selectPerson(person: Person) {
  selectedPerson.value = person
  if (person) {
    emit('select', person)
  }
}
</script>