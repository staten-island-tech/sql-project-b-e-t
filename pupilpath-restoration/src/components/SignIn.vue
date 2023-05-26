<template>
  <div>
    <h2>Sign in to your account</h2>
    <form @submit.prevent="handleSignin">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div>
        <button type="submit" @submit.prevent="handleLogin">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const email = ref('')
const password = ref('')


const handleLogin = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    alert('You successfully signed up!')
    console.log(data)
    console.log(error)
    console.log("hi")
  } catch (error) {
    console.log("hi")
    if (error instanceof Error) {
      alert(error.message)
      console.log("hi")

    }
  } finally {
    loading.value = false
  }
}

// export default {
//   setup() {

//   onMounted(() => {
//   handleSignIn()
// })
//     const email = ref("");
//     const password = ref("");

//     const handleSignIn = async () => {
      
//       try {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email: data.email,
//           password: data.password,
//         });
//         if (error) throw error, console.log(data);
//       } catch (error) {
//         console.log(data), alert(error.error_description || error.message);
//       }
//     };

//     const handleSignin = async () => {
      
//       let { data } = await supabase
//       .from('profiles')
//       .select(`password, email`)

    //   try {
    //     const { error } = await supabase.auth.signInWithPassword({
    //       email: data.email,
    //       password: data.password,
    //     });
    //     if (error) throw error;
    //   } catch (error) {
    //     alert(error.error_description || error.message);
    //   }
    // };

//     return {
//       email,
//       password,
//       handleSignin,
//     };
//   },
// };
</script>