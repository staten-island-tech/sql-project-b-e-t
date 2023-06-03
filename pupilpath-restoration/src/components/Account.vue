<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const username = ref('')
const first_name = ref('')
const last_name = ref('')

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
    const { data, error } = await supabase.from('profiles').select().eq('id', user.id)
    if (error) throw error
    console.log(data)
    console.log(data[0].first_name)
    console.log(data[0].last_name)
  } catch (error) {
    alert(error.message)
  }
}
displayName()
async function signOut() {
  try {
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

function clearInputs() {
  email.value = ''
  password.value = ''
}
</script>

<template>
  <form class="form-widget" @click="updateProfile(), clearInputs()">
    <div>
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
      <input type="submit" class="button primary block" />
    </div>

    <div>
      <button class="button block" @click="signOut()">Sign Out</button>
    </div>
    <div v-for="data in data" :key="data.id"> {{ data.first_name  }} </div>
  </form>
</template>
