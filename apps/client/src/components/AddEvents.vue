<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{props}">
          <v-btn class="mt-10" color="grey-lighten-2" v-bind="props"> Añadir Evento</v-btn>
        </template>
        <v-card>
          <v-card-title class="text-center mt-5" style="font-size: 1.5em; font-weight: bold">Registro</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                    <v-text-field
                        label="Nombre del Evento"
                        class="mb-2 pb-0 pt-3"
                        :hide-details="true"
                        variant="outlined"
                        required
                        ></v-text-field>                
                    </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                    <v-text-field 
                        type="date"
                        label="Fecha de Inicio"
                        :hide-details="true"
                        variant="outlined"
                        class="mb-2 pb-0 pt-3"
                        required
                    ></v-text-field>                
                </v-col>
                <v-col cols="6">
                    <v-text-field 
                    type="date"
                    label="Fecha de Fin"
                    :hide-details="true"
                    variant="outlined"
                    class="mb-2 pb-0 pt-3"
                    required
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-radio-group inline>
                <v-text class="w-100 pl-1 pt-2 mb-2 pb-0">Tipo de Evento</v-text>
                <v-radio
                    label="Local"
                    value="radio-1"
                    :hide-details="true"
                ></v-radio>
                <v-radio
                    label="Internacional"
                    value="radio-2"
                    :hide-details="true"
                ></v-radio>
                </v-radio-group>
            </v-container>
          </v-card-text>
          <v-btn color="grey-lighten-2" @click="onClick" type="submit"> Añadir Evento</v-btn>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script setup lang="ts">
    import {ref} from 'vue'
    const dialog = ref(false);
    const name = ref(false);
    const initDate = ref('');
    const finDate = ref('');
    const typeEvent = ref('');
    

    
    function onClick() {
        
        dialog.value = false;
    }
</script>