<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="container" false>
    <RouterLink to="/" draggable="false" class="router">Sign/Log in</RouterLink>
    <RouterLink to="/Grades" draggable="false" class="router">Grades</RouterLink>
    <RouterView />
  </div>
</template>
<style scoped>
#header {
  font-size: 40px;
}
.router {
  border: 10px;
  padding: 10px;
}
</style>
