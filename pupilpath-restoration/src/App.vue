<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useSessionStore } from './stores/store.js';
import { supabase } from './supabase'

const sessionStore = useSessionStore();
onMounted(async () => {
  await sessionStore.sessionCheck();
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
    <RouterLink to="/" draggable="false" class="router" v-if="sessionStore.session" :session="sessionStore.session"></RouterLink>
    <RouterLink to="/" draggable="false" class="router" v-else>Sign Up</RouterLink>
    <RouterLink to="/Login" draggable="false" class="router" v-if="sessionStore.session" :session="sessionStore.session">Homepage</RouterLink>
    <RouterLink to="/Login" draggable="false" class="router" v-else>Log In</RouterLink>
    <RouterLink to="/Grades" draggable="false" class="router" false>Grades</RouterLink>
    <RouterLink to="/Attendance" draggable="false" class="router" false>Attendance</RouterLink>
    <button class="button block" @click="signOut" v-if="sessionStore.session" :session="sessionStore.session">
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
