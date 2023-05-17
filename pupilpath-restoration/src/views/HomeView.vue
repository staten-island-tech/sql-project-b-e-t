<script></script>
<template>
  <div id="header">
    <h1>Sign Up</h1>
    <div class="info">
      Username: <input type="text" v-model="username" />
      <br />
      Password: <input type="text" v-model="password" />
      <button type="button">Submit</button>
      <!-- <li v-for="country in countries" :key="country.id">{{ country.name }}</li> -->
    </div>
  </div>
</template>
<style scoped>
.info {
  font-size: 20px;
  margin: auto 5px;
}
</style>
