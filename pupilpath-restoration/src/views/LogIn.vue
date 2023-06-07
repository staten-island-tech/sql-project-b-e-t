<script setup>
import { onMounted } from 'vue'
import Account from '../components/Account.vue'
import SignIn from '../components/SignIn.vue'
import { useSessionStore } from '../stores/store.js';

const sessionStore = useSessionStore();
onMounted(async () => {
  await sessionStore.sessionCheck();
})
</script>
<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="sessionStore.session" :session="sessionStore.session" />
    <SignIn v-else />
  </div>
</template>
