<script setup>
import { onMounted, ref } from 'vue'
import GradeDisplay from '../components/GradeDisplay.vue'
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
    <GradeDisplay v-if="session" :session="session" />
    <div v-else>
      Sign in before you can access your grades!
    </div>
  </div>
</template>
