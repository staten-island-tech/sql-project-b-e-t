<script>
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
    <div id="header"> 
    <h1>Sign Up</h1>
  <div class="info">
    Username: <input type="text" v-model="username" />
    <br>
    Password: <input type="text" v-model="password" />
    <button type="button">Submit</button>
    <!-- <li v-for="country in countries" :key="country.id">{{ country.name }}</li> -->
  </div>
</div>
  </div>
  <div id="container">
    <RouterLink to="/">Sign Up / Log in</RouterLink>
    <br>
    <RouterLink to="/Attendance">Attendance</RouterLink>
<RouterView />
  </div>
  
</template>

<style scoped>
.info {
  font-size: 20px;
  margin: auto 5px;
}
#header {
  font-size: 40px;
}

</style>