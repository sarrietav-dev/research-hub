<template>
    <v-row justify="center">
        <v-dialog
        v-model="dialog"
        max-width="1000px">
        <template v-slot:activator="{props}">
            <v-btn
            class="mt-10"
            color="grey-lighten-2"
            v-bind="props"
            > Añadir estudiantes</v-btn>
        </template>
        <v-card>
        <v-card-title class="text-center mt-5" style="font-size: 1.5em; font-weight: bold" >Registro</v-card-title>
        <v-card-text>
            <v-container>
            <v-row>
                <v-col cols="8">
                <v-text-field label="Nombre" variant="outlined" :hide-details="true"/>
                </v-col>
                <v-col cols="4">
                <v-text-field label="Cedula" variant="outlined" :hide-details="true"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-text-field label="Correo" variant="outlined"/>
                </v-col>
                <v-col cols="4">
                    <v-text-field label="Codigo insitucional" variant="outlined"/>
                </v-col>
                <v-col cols="4">
                    <v-select label="Programa" variant="outlined"/>
                </v-col>
            </v-row>
            </v-container>
        </v-card-text>
        <v-btn
            color="grey-lighten-2"
            @click = "dialog = false"
            > Añadir estudiante</v-btn>
        </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const dialog = ref(false)




</script>
