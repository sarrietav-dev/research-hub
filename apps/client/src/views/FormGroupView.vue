<template>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form" class="pa-4"> 
        <v-radio-group v-model="nuevoGroup" class="mb-4" inline>
            <v-text>Desea crear un nuevo grupo de investigación</v-text>
            <v-radio label="Si" value="true"></v-radio>
            <v-radio label="No" value="false"></v-radio>
        </v-radio-group>
  
        <v-text-field
          v-if="nuevoGroup === 'true'"
          v-model="group"
          label="Nuevo Grupo de Investigación"
          required
          class="mb-4"
        ></v-text-field>
  
        <v-select
          v-if="nuevoGroup === 'false'"
          v-model="selectedGroup"
          :items="existingGroups"
          label="Selecciona un Grupo Existente"
          required
          class="mb-4"
        ></v-select>   
        
        <v-radio-group 
          v-model="nuevoSeedGroup" 
          class="mb-4" 
          v-if="nuevoGroup === 'false'"
        inline>
            <v-text>Desea crear un nuevo semillero de investigación</v-text>
            <v-radio label="Si" value="true"></v-radio>
            <v-radio label="No" value="false"></v-radio>
        </v-radio-group>
  
        <v-text-field
          v-if="nuevoSeedGroup === 'true' || nuevoGroup === 'true'"
          v-model="seedGroup"
          label="Nuevo Semillero de Investigación"
          required
          class="mb-4"
        ></v-text-field>
  
        <v-select
          v-if="nuevoGroup === 'false' && nuevoSeedGroup === 'false'"
          v-model="selectedSeedGroup"
          :items="existingSeedGroups"
          label="Selecciona un Semillero Existente"
          required
          class="mb-4"
        ></v-select>  
      </v-form>
    </v-sheet>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        nuevoGroup: 'false', 
        group: "", 
        selectedGroup: null, 
        existingGroups: ["Grupo 1", "Grupo 2", "Grupo 3"],
        nuevoSeedGroup: 'false', 
        seedGroup: "", 
        selectedSeedGroup: null, 
        existingSeedGroups: ["Semillero 1", "Semillero 2", "Semillero 3"],
      };
    },
    // Otros métodos y opciones de componente
  };
  </script>