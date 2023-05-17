<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { RouterLink, RouterView } from 'vue-router'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
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
