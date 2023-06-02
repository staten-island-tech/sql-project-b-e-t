<script setup>
import { supabase } from '../supabase'
import { ref, toRefs, onMounted } from 'vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const english_grade = ref('')
const math_grade = ref('')
const science_grade = ref('')
const history_grade = ref('')

const grades = ref([])

async function getGrades() {
  const { data } = await supabase.from('grades').select()
  grades.value = data
}

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
onMounted(() => {
  getGrades()
})
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
      <th>Current</th>
      <td><input id="EnglishGrade" type="text" v-model="english_grade" /></td>
    </tr>
    <tr>
      <td>Math</td>
      <td>Francisco Chang</td>
      <th>Current Grade</th>
      <td><input id="MathGrade" type="text" v-model="math_grade" /></td>
    </tr>
    <tr>
      <td>Science</td>
      <td>Roland Mendel</td>
      <th>Current Grade</th>
      <td><input id="ScienceGrade" type="text" v-model="science_grade" /></td>
    </tr>
    <tr>
      <td>History</td>
      <td>Helen Bennett</td>
      <th>Current Grade</th>
      <td><input id="HistoryGrade" type="text" v-model="history_grade" /></td>
    </tr>
    <button @click="updateProfile">Update</button>
    <li v-for="grade in grades" :key="grade.id">{{ grade.value }}</li>
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
