<script setup>
import { onMounted } from 'vue'
import GradeDisplay from '../components/GradeDisplay.vue'
import { useSessionStore } from '../stores/store.js'

const sessionStore = useSessionStore()
onMounted(async () => {
  await sessionStore.sessionCheck()
})
</script>
<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <GradeDisplay v-if="sessionStore.session" :session="sessionStore.session" />
    <div v-else style="background-color: white" class="login">
      Log in before you can access your grades!
    </div>
  </div>
</template>
<style scoped>
.login {
  color: black;
  padding: 10px;
}
</style>
