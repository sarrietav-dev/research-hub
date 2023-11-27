<script setup lang = "ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const seed_information = ref()
const seed_members = ref()
const isCharged = ref()
onMounted( async () => {
    try {
        const url = "http://localhost:3000/api/seed-groups/" + new URL(location.href).searchParams.get('id')

        isCharged.value = true
        const responseGroups = await axios.get(url)
        const responseMembers = await axios.get(url + "/members")
        isCharged.value = false

        seed_information.value = responseGroups.data
        seed_members.value = responseMembers.data
        console.log(seed_information.value)
        console.log(seed_members.value)

    }catch(error){
        console.log(error)
    }
})


</script>
<template>
    <div id="app">
        <v-container>
            <v-layout v-if="isCharged == false">
                <v-card class="overflow-auto">
                    <v-card-title primary-title class="headline font-weight-bold text-xs-center">
                        {{ seed_information.name }} ({{ seed_information.id }})
                    </v-card-title>
                    <v-card-subtitle class="font-weight-bold subtile"
                        v-for = "item in seed_information.researchLines" :key = "item">
                        {{ item }}
                    </v-card-subtitle>
                    <v-card-text>
                        {{ seed_information.description }}
                    </v-card-text>
                    <v-card-title>
                        Miembros
                    </v-card-title>
                    <v-card-text>
                        <ul v-for = "item in seed_members" :key = "item">
                            ◽ {{ item.member.name }} | <b>{{ item.role }} </b>
                        </ul>
                    </v-card-text>
                </v-card>
                <v-expansion-panels variant = "inset">
                    <h2>Proyectos</h2>
                    <v-expansion-panel v-for = "item in seed_information.projects" :key = "item">
                        <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
                        <v-expansion-panel-text> 
                            Dinero Aprobado: <b>{{ item.approvedAmount }}</b>
                            <h4>Productos</h4>
                            <v-list>
                                <v-list-item-content v-for = "item2 in item.products " :key = "item2"> 
                                    <v-list-item-title class="text-wrap"> {{ item2.name }} </v-list-item-title>
                                    <v-list-item-subtitle class = "mb-4"> {{  item2.description }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-layout>
            <v-layout v-else>
                <v-progress-circular class="mx-auto"
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </v-layout>
        </v-container>
    </div>
</template>