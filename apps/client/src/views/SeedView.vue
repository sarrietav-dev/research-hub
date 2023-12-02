<script setup lang = "ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import StudentList from '../components/StudentList.vue';
import baseUrl from '../lib/baseUrl'

const seed_information = ref()
const seed_members = ref()
const isCharged = ref()
let dataList: any = []

onMounted(async () => {
  try {
    const url = `${baseUrl}/api/seed-groups/` + new URL(location.href).searchParams.get('id')

    isCharged.value = true
    const responseGroups = await axios.get(url)
    const responseMembers = await axios.get(url + "/members")
    isCharged.value = false
    seed_information.value = responseGroups.data
    seed_members.value = responseMembers.data
    console.log(seed_information.value)
    console.log(seed_members.value)
    dataList = seed_members.value.map((item: { period: any; member: { name: any; identityCard: any; institutionalCode: any; email: any; }; role: any; isActive: any; functions: any[]; }) => {
      return {
        period: item.period,
        name: item.member.name,
        role: item.role,
        isActive: item.isActive,
        identityCard: item.member.identityCard,
        institutionalCode: item.member.institutionalCode,
        email: item.member.email,
        functions: item.functions.join(', '),
      };
    });

  } catch (error) {
    console.log(error)
  }
}
)
</script>
<template>
  <div id="app">
    <v-container class="flex-1-1-100 ma-2 pa-2">
      <v-layout v-if="isCharged == false">
        <v-card class="overflow-auto">
          <v-card-title primary-title class="headline font-weight-bold text-xs-center">
            {{ seed_information.name }} ({{ seed_information.id }})
          </v-card-title>
          <v-card-subtitle class="font-weight-bold subtile" v-for="item in seed_information.researchLines" :key="item">
            {{ item }}
          </v-card-subtitle>
          <v-card-text>
            {{ seed_information.description }}
          </v-card-text>

          <v-card>
            <v-card-title primary-title class="headline font-weight-bold text-xs-center">Proyectos</v-card-title>
            <v-expansion-panels>
              <v-expansion-panel v-for="item in seed_information.projects" :key="item">
                <v-expansion-panel-title>{{ item.name }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                  Dinero Aprobado: <b>{{ item.approvedAmount }}</b>
                  <h4>Productos</h4>
                  <v-list>
                    <v-list-item-content v-for="item2 in item.products " :key="item2">
                      <v-list-item-title class="text-wrap"> {{ item2.name }} </v-list-item-title>
                      <v-list-item-subtitle class="mb-4"> {{ item2.description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
          <StudentList :items="dataList"></StudentList>
        </v-card>
      </v-layout>
    </v-container>




  </div>
</template>