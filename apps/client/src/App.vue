
<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-btn variant="plain" to="/">Research Hub</v-btn>
      </v-app-bar-title>
      <v-btn variant="tonal" prepend-icon="mdi-login">Login</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>