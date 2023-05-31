<template>
  <div>
    <h2>Log in to your account!</h2>
<<<<<<< Updated upstream
      <div> 
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button @click="login(), clearInputs()">Login</button>
      </div>
=======
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <button @click="login">Login</button>
    </div>
>>>>>>> Stashed changes
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')

async function login() {
<<<<<<< Updated upstream
const { data, error } = await supabase.auth.signInWithPassword({
  email: email.value,
  password: password.value,
})
if (error) {
alert(error)
}
else{
  console.log(data)
}
}

function clearInputs() {
  email.value = ''
  password.value = ''
}

</script>
=======
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
</script>
>>>>>>> Stashed changes
