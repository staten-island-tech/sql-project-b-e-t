<script setup>
import { onMounted } from 'vue'
import GradeDisplay from '../components/GradeDisplay.vue'
import { session, useSessionStore } from '../stores/store.js';

const sessionStore = useSessionStore();
onMounted(async () => {
  await sessionStore.sessionCheck();
})
</script>
<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <GradeDisplay v-if="session" :session="session" />
    <div v-else style="background-color: white;">Log in before you can access your grades!</div>
  </div>
</template>
