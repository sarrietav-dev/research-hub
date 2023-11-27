<template>
  <main>
    <div class="login">
      <h1 class="text-center">Login</h1><br>
      <div class="user">
        <label for="user">Email:</label>
        <input type="email" name="user" v-model="user">
      </div>
      <div class="password">
        <label>Password:</label>
        <input type="password" name="passw" v-model="passw">
      </div>
      <button @click="login">Send</button>
    </div>
  </main>
</template>

<style>
 .login{
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 20px;
  position: absolute;
  align-content: center;
  height: 390px;
  width: 320px;
  transform: translate(140%, 15%)
 }

 input{
  margin: 5px 2px 15px 0px;
  padding-left: 12px;
  width: 100%;
  min-height: 2.5em;
  background-color: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  color: #000000;
 }

 button {
    display: block;
    width: 60%;
    margin: 1em auto;
    height: 2em;
    font-size: 1.1rem;
    background: #3271a5;
    border-radius: 20px;
    border: none;
    color: white;
    min-width: 280px;
  }

 label {
  padding-bottom: 2px;
 }
</style>

<script lang="ts">
import { group } from 'console';
  export default{
    name:'Login',
    data () {
      return {
        user: '',
        passw: ''
      }
    },
    methods: {
      login(){
        //for (i in range (group.length) ){  
          if(this.user === "admin@unicartagena.edu.co" && this.passw === "abc"){
            alert('Entraste yei')
          }
          else {
            alert('Error, Usuario o contraseña incorrecto')
          }
        //}
      }
    }
  }
</script>