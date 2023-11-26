<script>
import axios from 'axios';
export default {
  data() {
    return {
      dataListPrograms: [],
      dataListSeeds: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/programs')
      .then(response => {
        this.dataListPrograms = response.data
          console.log(this.dataListPrograms)
        })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:3000/api/seed-groups')
    .then(response => {
      this.dataListSeeds = response.data
      console.log(this.dataListSeeds)
    })
    .catch(error => {
      console.log(error)
    })
  }
};
</script>
<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="item in dataListPrograms" :key="item">
      <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list v-if="dataListSeeds.programId == dataListPrograms.id " :items="dataListSeeds" item-title="name" item-value="name">
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>