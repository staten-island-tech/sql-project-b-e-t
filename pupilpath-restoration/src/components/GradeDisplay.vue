<script setup>
import { supabase } from '../supabase'
import { ref, toRefs, onMounted } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const english_grade = ref('')
const math_grade = ref('')
const science_grade = ref('')
const history_grade = ref('')
const data = ref([])
async function updateProfile() {
  try {
    const { user } = session.value

    const updates = {
      id: user.id,
      English: english_grade.value,
      Math: math_grade.value,
      Science: science_grade.value,
      History: history_grade.value
    }
    let { error } = await supabase.from('grades').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  }
}

async function getGrades() {
  try {
    const { user } = session.value
    const { data: userData, error } = await supabase.from('grades').select().eq('id', user.id)
    if (error) throw error
    data.value = userData
    console.log(userData)
  }
  catch (error) {
    alert(error.message)
  }
}
getGrades()
async function clearInputs() {
  english_grade.value = ''
  math_grade.value = ''
  science_grade.value = ''
  history_grade.value = ''
}

async function updateProfileClearInputs() {
  await updateProfile()
  await clearInputs()
  getGrades()
}
</script>
<template>
  <table>
    <tr>
      <th>Subject</th>
      <th>Teacher</th>
      <th>Current Grade</th>
      <th>New Grade</th>
    </tr>
    <tr>
      <td>English</td>
      <td>Maria Anders</td>
      <th v-for="data in data" :key="data.id">{{ data.English }}</th>
      <td><input id="EnglishGrade" type="text" v-model="english_grade" /></td>
    </tr>
    <tr>
      <td>Math</td>
      <td>Francisco Chang</td>
      <th v-for="data in data" :key="data.id">{{ data.Math }}</th>
      <td><input id="MathGrade" type="text" v-model="math_grade" /></td>
    </tr>
    <tr>
      <td>Science</td>
      <td>Roland Mendel</td>
      <th v-for="data in data" :key="data.id">{{ data.Science }}</th>
      <td><input id="ScienceGrade" type="text" v-model="science_grade" /></td>
    </tr>
    <tr>
      <td>History</td>
      <td>Helen Bennett</td>
      <th v-for="data in data" :key="data.id">{{ data.History }}</th>
      <td><input id="HistoryGrade" type="text" v-model="history_grade"/></td>
    </tr>
    <tr>
      <td>Average
        <td v-for="data in data" :key="data.id">{{ (data.History + data.Science + data.Math + data.English)/4}}</td>
      </td>
    </tr>
    <button @click="updateProfileClearInputs()">Update</button>
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
