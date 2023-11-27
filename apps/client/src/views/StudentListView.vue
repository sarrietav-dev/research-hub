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
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="dataList">
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      search: '',
      dataList: [],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/seed-groups/1/members')
      .then(response => {
        this.dataList = response.data.map(item => {
          return {
            period: item.period,
            name: item.member.name,
            role: item.role,
            isActive: item.isActive,
            identityCard: item.member.identityCard,
            institutionalCode: item.member.institutionalCode,
            email: item.member.email,
            functions: item.functions.join(', '),
          };
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>
