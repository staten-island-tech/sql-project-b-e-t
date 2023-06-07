<template>
  <div>
    <h2>Log in to your account!</h2>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <button @click="loginClearInputs">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }
}

function clearInputs() {
  email.value = ''
  password.value = ''
}

function loginClearInputs() {
  login()
  clearInputs()
}
</script>
<style scoped>
div {
  background-color: rgb(240, 240, 240);
  padding: 10px;
}
</style>
