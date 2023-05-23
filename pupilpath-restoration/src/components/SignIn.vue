<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'
  
  const loading = ref(false)
  const username = ref('')
  const password = ref('')
  
  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signInWithPassword({
        username: username.value,
        password: password.value,
      })
      if (error) throw error
      alert('Logged in successfully!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading.value = false
    }
  }
  </script>

<template>
    <form class="row flex-center flex" @submit.prevent="handleLogin">
      <div class="col-6 form-widget">
        <h1 class="header">Login</h1>
        <div>
          <input class="inputField" required type="text" placeholder="Username" v-model="username" />
        </div>
        <div>
          <input class="inputField" required type="password" placeholder="Password" v-model="password" />
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Login'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </template>
  
