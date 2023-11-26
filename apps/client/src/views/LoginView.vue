<template>
  <main>
    <div class="login">
      <h1>Login</h1>
      <div class="user">
        <label for="user">Email:</label>
        <input type="email" name="user" v-model="user">
      </div>
      <div class="password">
        <label>Password:</label>
        <input type="password" name="passw" v-model="passw">
      </div>
      <button>Send</button>
    </div>
  </main>
</template>

<script setup lang="ts">
  export default{
    name:'Login',
    data () {
      return {
        user: '',
        password: ''
      }
    },
    methods: {
      login(){
        if(this.user === && this.password === ){

        }
        else {
          alert('Error, Usuario o contraseña incor')
        }
      }
    }
  }
</script>