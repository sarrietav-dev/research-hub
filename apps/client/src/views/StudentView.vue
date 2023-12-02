
<script setup lang = "ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import baseUrl from '@/lib/baseUrl';
import { values } from 'lodash';

const memberInfo = ref()
const memberHistory = ref()
const isCharged = ref()

onMounted(async () => {
  try {
    const url = `${baseUrl}/api/person/` + new URL(location.href).searchParams.get('id')
    isCharged.value = true
    const responseMember = await axios.get(url)
    const responseHistory = await axios.get(url + "/seed-groups?seedGroupId=" + new URL(location.href).searchParams.get('id'))
    isCharged.value = false
    memberInfo.value = responseMember.data
    memberHistory.value = responseHistory.data[0]
    Object.assign({}, memberHistory.value)
    console.log(memberInfo.value)
    console.log(memberHistory.value)
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
        <v-card variant="flat" class="overflow-auto" >
          <v-card-title primary-title class="headline font-weight-bold text-xs-center">
            {{ memberInfo.name }} ({{ memberInfo.id }})
          </v-card-title>
          <v-card-subtitle>
            Código institucional: {{ memberInfo.institutionalCode }}<br>
            Correo electrónico: {{ memberInfo.email }}
            
          </v-card-subtitle>
          <v-card-text>
            <b>Rol:</b> {{ memberHistory.role }}<br>
            <b>Funciones</b>: {{ memberHistory.functions[0] }}<br>
            <b>Periodo</b>: {{ memberHistory.period }}<br>
            <b>Fecha de afiliación</b>: {{ memberHistory.affiliationDate }}<br>
            <b>Estado actual</b>: {{ memberInfo.state }}<br>
            
            
            
            

          </v-card-text>
        </v-card>
            
      </v-layout>
    </v-container>
  </div>
</template>
  