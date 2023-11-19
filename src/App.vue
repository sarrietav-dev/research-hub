<script setup>
import UploadFile from './components/UploadFile.vue';
import ListProgram from './components/ListProgram.vue';

</script>

<template>
  <v-app>
    <v-app-bar> 
      <v-app-bar-title>Research Hub</v-app-bar-title>
      <v-btn variant="tonal" prepend-icon="mdi-login">Login</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <ListProgram></ListProgram>
        <UploadFile></UploadFile>
      </v-container>
    </v-main>
  </v-app>
</template>
