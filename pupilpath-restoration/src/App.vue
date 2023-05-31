<script setup>
import { supabase } from './supabase'
import { RouterLink, RouterView } from 'vue-router'
async function signOut() {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}
</script>

<template>
  <div id="container" false>
    <RouterLink to="/" draggable="false" class="router">Sign Up</RouterLink>
    <RouterLink to="/Login" draggable="false" class="router">Log In</RouterLink>
    <RouterLink to="/Grades" draggable="false" class="router" false>Grades</RouterLink>
    <button class="button block" @click="signOut">Sign Out</button>
    <RouterView />
  </div>
</template>
<style scoped>
#header {
  font-size: 40px;
}
.router {
  border: 10px;
  padding: 10px;
}
</style>
