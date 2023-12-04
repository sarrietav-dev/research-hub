<template>
      <v-row justify-sm="center">
        <v-col sm="10" md="4" class="mt-15 mb-15">
          <v-card class="login p-4 pa-4" elevation="6">
            <v-card-title class="text-center" style="font-size: 1.5em; font-weight: bold;">Login</v-card-title>
            <v-form @submit.prevent="login">
              <v-text-field
                prepend-inner-icon="mdi-email-outline"
                v-model="user"
                label="Email"
                variant="outlined"
                required
                class="mb-2"
              ></v-text-field>
              <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                prepend-inner-icon="mdi-lock-outline"
                :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible"
                v-model="passw"
                label="Password"
                outlined
                required
                class="mb-4"
              ></v-text-field>
              <v-btn block color="primary" dark class="mb-4" rounded @click="login">Send</v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
</template>

<script lang="ts">
import router from '@/router';
import { group } from 'console';
  export default{
    name:'Login',
    data () {
      return {
        visible: false,
        user: '',
        passw: ''
      }
    },
    methods: {
      login(){
        //for (i in range (group.length) ){  
          if(this.user === "admin@unicartagena.edu.co" && this.passw === "abc"){
            alert('Entraste yei')
            router.push({ path: '/form_group' })
          }
          else {
            alert('Error, Usuario o contraseña incorrecto')
          }
        //}
      }
    }
  }
</script>