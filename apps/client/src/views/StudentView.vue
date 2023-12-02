
<script setup lang = "ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import baseUrl from '@/lib/baseUrl';

const memberInfo = ref()
const memberHistory = ref()
const isCharged = ref()

onMounted(async () => {
  try {
    const url = `${baseUrl}/api/members/` + new URL(location.href).searchParams.get('id')
    isCharged.value = true
    const responseMember = await axios.get(url)
    const responseHistory = await axios.get(url + "/seed-groups?seedGroupId=" + new URL(location.href).searchParams.get('id'))
    isCharged.value = false
    memberHistory.value = responseHistory
    memberInfo.value = responseMember.data
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
        <v-card class="overflow-auto">
          <v-card-title primary-title class="headline font-weight-bold text-xs-center">
            {{ memberInfo.name }} ({{ memberInfo.id }})
          </v-card-title>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
  