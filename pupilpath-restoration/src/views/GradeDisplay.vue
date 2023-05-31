<script>
const username = ref('')
const first_name = ref('')
const last_name = ref('')
const avatar_url = ref('')
const password = ref('')
const email = ref('')
async function updateProfile() {
  try {
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      first_name: first_name.value,
      last_name: last_name.value,
      avatar_url: avatar_url.value,
      password: password.value,
      email: email.value
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}
</script>
<template>
  <table>
    <tr>
      <th>Subject</th>
      <th>Teacher</th>
      <th>Grade</th>
    </tr>
    <tr>
      <td>English</td>
      <td>Maria Anders</td>
      <td><input id="firstname" type="text" v-model="english_grade" /></td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td>Austria</td>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
    </tr>
    <tr>
      <td>Laughing Bacchus Winecellars</td>
      <td>Yoshi Tannamuri</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
    </tr>
  </table>
</template>

<style>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
