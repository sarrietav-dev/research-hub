<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar> 
      <v-app-bar-title>Research Hub</v-app-bar-title>
      <v-btn variant="tonal" prepend-icon="mdi-login">Login</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
