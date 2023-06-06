<script setup>
import { onMounted, ref } from 'vue'
import Attendance from '../components/Attendance.vue'
import { supabase } from '../supabase'

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
    <Attendance v-if="session" :session="session" />
    <div v-else>Log in before you can access your attendance!</div>
  </div>
</template>
