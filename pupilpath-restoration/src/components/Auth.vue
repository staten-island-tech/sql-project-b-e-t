
<template>
  <div>
    <h2>Create an account!</h2>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button @click="signUp">Sign Up</button>
        <br>
        <button @click="login">Login</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

//let
const email = ref('')
const password = ref('')

async function signUp() {
const { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
})
if (error) {
  console.log(error)
}
else{
  console.log(data)
}
}

async function login() {
const { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
})
if (error) {
  console.log(error)
}
else{
  console.log(data)
}
}
</script>