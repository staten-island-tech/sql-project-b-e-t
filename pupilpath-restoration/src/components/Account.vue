<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const username = ref('')
const first_name = ref('')
const last_name = ref('')
const data = ref([])
onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    const { user } = session.value

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`first_name, last_name, username`)
      .eq('id', user.id)

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      first_name.value = data.first_name
      last_name.value = data.last_name
    }
  } catch (error) {
    alert(error.message)
  }
}

async function updateProfile() {
  try {
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

async function displayName() {
  try {
    const { user } = session.value
    const { data: userData, error } = await supabase.from('profiles').select().eq('id', user.id)
    if (error) throw error
    data.value = userData
  } catch (error) {
    alert(error.message)
  }
}
displayName()

async function clearInputs() {
  username.value = ''
  first_name.value = ''
  last_name.value = ''
}

async function updateProfileclearInputs() {
  await updateProfile()
  await displayName()
  await clearInputs()
  getProfile()
}
</script>

<template>
  <div class="box">
    <label for="username">Username</label>
    <input id="username" type="text" v-model="username" />
  </div>
  <div>
    <label for="firstname">First Name</label>
    <input id="firstname" type="text" v-model="first_name" />
  </div>
  <div>
    <label for="lastname">Last Name</label>
    <input id="lastname" type="text" v-model="last_name" />
  </div>
  <div>
    <button class="button block" @click="updateProfileclearInputs">Update</button>
  </div>
  <div v-for="data in data" :key="data.id">Welcome, {{ data.first_name }}, to "pupilpath"</div>
</template>
<style scoped>
div {
  background-color: rgb(240, 240, 240);
  padding: 10px;
  color: black;
}
</style>
