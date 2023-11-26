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
      <v-data-table v-model:search="search" :items="items">

      </v-data-table>
    </v-card>
  </template>

  <script>
    export default {
      data () {
        return {
          search: '',
          items: [
            {
                year: '2020-1',
                name: 'Ricardo Andrés Solano Pizarro',
                code: '1961910009',
                estate: 'Estudiante',
                program: 'Doctorado en Ingeniería',
                state: 'Yes',
                email: 'rsolanop@unicartagena.edu.co ',
                function: 'Auxilires investigación(proyectos financiados)' 
            },
            {
                year: '2023-1',
                name: 'Udualdo Herrera García',
                code: '1962010007',
                estate: 'Estudiante',
                program: 'Doctorado en Ingeniería',
                state: 'Yes',
                email: 'uherrerag@unicartagena.edu.co',
                function: 'Auxilires investigación(proyectos financiados)	' 

            },
            {
                year: '2020-2',
                name: 'Víctor Fernando del río prens',
                code: '0231810026',
                estate: 'Estudiante',
                program: 'Ingeniería Química',
                state: 'Yes',
                email: 'Areinemerc@unicartagena.edu.co',
                function: 'Trabajos grado(tesis)	' 

            },
            {
                year: '2021-1',
                name: 'Mario José Barrios Pacheco',
                code: '0231810037',
                estate: 'Estudiante',
                program: 'Ingeniería Química',
                state: 'Yes',
                email: 'shelenap@unicartagena.edu.co',
                function: 'Trabajos grado(tesis)	' 

            },
            {
                year: '2022-1',
                name: 'Jonathan Lozano Morelo',
                code: '0231720034',
                estate: 'Estudiante',
                program: 'Ingeniería Química',
                state: 'Yes',
                email: 'jmonterrozar@unicartagena.edu.co',
                function: 'Trabajos grado(tesis)' 
            },
          ],
        }
      },
    }
  </script>