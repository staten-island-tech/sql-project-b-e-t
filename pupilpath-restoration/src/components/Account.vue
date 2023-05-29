<script setup>
import { supabase } from '../supabase'
import { onMounted, ref, toRefs } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const first_name = ref('')
const last_name = ref('')
const avatar_url = ref('')
const password = ref('')
const email = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`first_name, last_name, username, avatar_url, password, email`)
      .eq('id', user.id)

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      first_name.value = data.first_name
      last_name.value = data.last_name
      avatar_url.value = data.avatar_url
      password.value = data.password
      email.value = data.email
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      avatar_url: avatar_url.value,
      password: password.value,
      email: email.value,
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" v-model="email"/>
    </div>
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
      <label for="avatarurl">Avatar Url</label>
      <input id="avatarurl" type="text" v-model="avatar_url" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="text" v-model="password" />
    </div>
    <div>
      <input
        type="submit"
        class="button primary block"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>