<script setup>
import { supabase } from './supabase'
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
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
    <RouterLink
      to="/"
      draggable="false"
      class="router"
      v-if="session"
      :session="session"
    ></RouterLink>
    <RouterLink to="/" draggable="false" class="router" v-else>Sign Up</RouterLink>
    <RouterLink to="/Login" draggable="false" class="router" v-if="session" :session="session"
      >Homepage</RouterLink
    >
    <RouterLink to="/Login" draggable="false" class="router" v-else>Log In</RouterLink>
    <RouterLink to="/Grades" draggable="false" class="router" false>Grades</RouterLink>
    <RouterLink to="/Attendance" draggable="false" class="router" false>Attendance</RouterLink>
    <button class="button block" @click="signOut" v-if="session" :session="session">
      Sign Out
    </button>
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
  background-color: rgb(240, 240, 240);
}
</style>
