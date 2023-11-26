<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel v-for="(seedGroups, program) in seedGroupsByProgram" :key="program">
        <v-expansion-panel-title>
          {{ program }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list>
            <v-list-item @click = "onClick(group.seed_group)" v-for="group in seedGroups" :key="group.seed_group" :title="group.seed_group">
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
// Importa la función desde donde esté definida
import { ref } from 'vue';
import { getSeedGroupsByProgram } from '../lib/database.ts';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const seedGroupsByProgram = ref()

onMounted(async () => {
  seedGroupsByProgram.value = await getSeedGroupsByProgram()
})

const router=useRouter()

function onClick(name: string){
  router.push({ path: `/seed_groups/${name}`})
}
</script>

  