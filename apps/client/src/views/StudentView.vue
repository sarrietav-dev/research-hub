
<script setup lang = "ts">
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import baseUrl from '@/lib/baseUrl';

const memberInfo = ref()
const memberProducts = ref()
const router = useRoute()
const isCharged = ref()

onMounted(async () => {
  try {
    const url = `${baseUrl}/api/person/` + router.params.id
    isCharged.value = true
    const responseMember = await axios.get(url)
    const responseProducts = await axios.get(url + '/products')

    isCharged.value = false
    memberInfo.value = responseMember.data
    memberProducts.value = responseProducts.data

    console.log(memberInfo.value)
    console.log(memberProducts.value)

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
            Código institucional: {{ memberInfo.identityCard }}<br>
            
          </v-card-subtitle>
          <v-card-text>
            <b>Teléfono: </b> {{ memberInfo.phone }}<br>
            <b>Correo electrónico: </b> {{ memberInfo.email }} <br>
            <b>Programa: </b> {{ memberInfo.program.name }} ({{ memberInfo.program.id }})<br>
          </v-card-text>
          <v-divider/>
          <v-card-text>
            <h3>Productos:</h3><br>
            <v-list>
                <v-list-item v-for = "item in memberProducts.products " :key = "item"> 
                    <v-list-item-title icon="mdi-circle-medium" class="text-wrap"> 
                      <v-icon icon="mdi-circle-medium"></v-icon>
                      {{ item.name }}
                    </v-list-item-title>             
                    <v-list-item-subtitle class = "mb-4"> {{  item.date }}</v-list-item-subtitle>
                    <v-list-item-subtitle class = "mb-4"> {{  item.description }}</v-list-item-subtitle>
                    <v-divider/>
                </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
            
      </v-layout>
    </v-container>
  </div>
</template>
  