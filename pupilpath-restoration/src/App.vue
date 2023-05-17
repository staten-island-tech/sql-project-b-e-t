<script setup>
import { onMounted, ref } from 'vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />
  </div>
  <div id="container">
    <RouterLink to="/" draggable="false">Sign/Log in</RouterLink>
    <RouterLink to="/Grades" draggable="false">Grades</RouterLink>
    <RouterView />
  </div>
</template>
<style scoped>
#header {
  font-size: 40px;
}
</style>
