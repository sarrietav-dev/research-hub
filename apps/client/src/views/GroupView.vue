<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'

const router = useRouter()
function onClick(name: string, id: any){
  router.push({path: `/seed_groups/${name}`, query: { id }})
}

const dataListPrograms = ref()
const dataListSeeds = ref()

onMounted(async () => {
  try {
    const responseProg = await axios.get('http://localhost:3000/api/programs')
    dataListPrograms.value = responseProg.data
    console.log(dataListPrograms.value)

    const responseSeed = await axios.get('http://localhost:3000/api/seed-groups')
    dataListSeeds.value = responseSeed.data
    console.log(dataListSeeds.value)

  } catch(error){
    console.log(error)
  }

})
</script>
<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="item in dataListPrograms" :key="item">
      <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list v-if="dataListSeeds.programId == dataListPrograms.id">
          <v-list-item @click = "onClick(seed.name, seed.id)" v-for="seed in dataListSeeds" :key="seed" :title="seed.name" :value="seed.name">
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>