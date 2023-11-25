<template>
    <v-container>
      <v-expansion-panels v-if="Object.keys(seedGroupsByProgram).length > 0">
        <v-expansion-panel v-for="(seedGroups, program) in seedGroupsByProgram" :key="program">
          <v-expansion-panel-title>
            {{ program }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list :items="seedGroups" item-title="seed_group" item-value="seed_group">
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </template>

  <script>
  // Importa la función desde donde esté definida
  import { getSeedGroupsByProgram } from '../lib/database.ts';
  
  export default {
    data() {
      return {
        seedGroupsByProgram: {},
      };
    },
    async created() {
      try {
        // Llama a la función y almacena los resultados en data
        this.seedGroupsByProgram = await getSeedGroupsByProgram();
      } catch (error) {
        console.error('Error fetching seed groups:', error);
      }
    },
  };
  </script>

  