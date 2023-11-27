<template>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form" class="pa-4"> 
        <v-radio-group v-model="nuevoGroup" class="mb-4">
          <v-select
            v-model="nuevoGroup"
            :items="['Si', 'No']"
            label="Crear un nuevo grupo de investigación"
          ></v-select>
        </v-radio-group>
         
        <v-text-field
          v-if="nuevoGroup === 'Si'"
          v-model="group"
          label="Nuevo Grupo de Investigación"
          required
        ></v-text-field>
  
        <v-select
          v-if="nuevoGroup === 'No'"
          v-model="selectedGroup"
          :items="existingGroups"
          label="Selecciona un Grupo Existente"
          class="h-auto"
          required
        ></v-select>      
        
        <v-radio-group v-model="nuevoSeedGroup" class="mb-4">
          <v-select
            v-model="nuevoSeedGroup"
            :items="['Si', 'No']"
            label="Crear un nuevo semillero"
            class="h-auto"
          ></v-select>
        </v-radio-group>
         
        <v-text-field
          v-if="nuevoSeedGroup === 'Si'"
          v-model="seedGroup"
          label="Nuevo Semillero de Investigación"
          class="h-auto"
          required
        ></v-text-field>
  
        <v-select
          v-if="nuevoSeedGroup === 'No'"
          v-model="selectedSeedGroup"
          :items="existingSeedGroups"
          label="Selecciona un Semillero Existente"
          class="h-auto"
          required
        ></v-select>      
      </v-form>
    </v-sheet>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        nuevoGroup: 'no', 
        nuevoSeedGroup: 'no',
        group: "", 
        seedGroup: "",
        selectedGroup: null,
        selectedSeedGroup: null, 
        existingGroups: ["Grupo 1", "Grupo 2", "Grupo 3"],
        existingSeedGroups: ["Semillero 1", "Semillero 2", "Semillero 3"] 
      };
    },
    // Otros métodos y opciones de componente
  };
  </script>