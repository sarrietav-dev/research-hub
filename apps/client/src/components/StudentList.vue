<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-group"></v-icon> &nbsp;
      Integrantes

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        label="Search"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>

      <v-combobox
        v-model="selectedSemester"
        :items="availableSemesters"
        label="Semester"
        dense
        hide-details
        prepend-inner-icon="mdi-calendar"
        @input="filterBySemester"
      ></v-combobox>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table 
      v-model:search="search" 
      :items="filteredData"
      item-key="name"
      @click:row="(item) => handleClick(item)"
    >
      <template #item.name="{ item }">
        <a @click="handleNameClick(item)" style="color: blue; text-decoration: underline;">
          {{ item.name }}
        </a>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      selectedSemester: null,
      availableSemesters: [],
    };
  },
  mounted() {
  this.router = useRouter();
    // Resto del código...
  },
  computed: {
    filteredData() {
      if (!this.selectedSemester) {
        return this.items;
      }
      return this.items.filter(item => item.period.includes(this.selectedSemester));
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(newVal) {
        this.updateAvailableSemesters(newVal);
      },
    },
  },
  methods: {
    updateAvailableSemesters(data) {
      const uniqueSemesters = [...new Set(data.map(item => item.period.substring(0, 7)))];
      this.availableSemesters = uniqueSemesters.sort();
    },
    filterBySemester() {
      console.log('Selected Semester:', this.selectedSemester);
      this.$emit('filterBySemester', this.selectedSemester);
    }, 
    handleClick(item) {
      // Puedes agregar lógica para manejar el clic en la fila si es necesario
    },
    handleNameClick(item, id) {
      id = item.id
      this.router.push({ path: `/student/${item.name}` , query: { id }});
      console.log(`Name clicked: ${item.name}`);
      console.log(`ID clicked: ${id}`);
    },
  },
};
</script>

<style>
  a:hover {
    color: #ff6347 !important;
  }
</style>
