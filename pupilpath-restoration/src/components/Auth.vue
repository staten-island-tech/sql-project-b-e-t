<template>
  <div>
    <h2>Create an account!</h2>
    <div>
      <label for="email">Email: </label>
      <input id="email" type="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <button @click="signUpClearInputs()">Sign Up</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')

async function signUp() {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })
  if (error) {
    alert(error)
  } else {
    alert('Check your email')
  }
}

function clearInputs() {
  email.value = ''
  password.value = ''
}

function signUpClearInputs() {
  signUp()
  clearInputs()
}
</script>
<style scoped>
div {
  align-content: center;
  padding: 10px;
  background-color: rgb(240, 240, 240);
  color: black;
}
</style>
