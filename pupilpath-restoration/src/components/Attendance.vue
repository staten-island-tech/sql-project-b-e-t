<template>
    <VDatePicker v-model="date" mode="date" is-required :attributes="attributes" />
    <div>
      <label class="text" for="dateSelected">Date Selected</label>
      <br />
      <label id="dateSelected">{{ cleanDate }}</label>
      <br />
      <br />
      <label class="text" for="attendance">Mark the day as:</label>
      <br />
      <button
        class="green"
        id="attendance"
        value="present"
        @click="markAttendance('green', date, 'Present')"
      >
        Present
      </button>
      <button
        class="yellow"
        id="attendance"
        value="tardy"
        @click="markAttendance('yellow', date, 'Tardy')"
      >
        Tardy
      </button>
      <button
        class="red"
        id="attendance"
        value="absent"
        @click="markAttendance('red', date, 'Absent')"
      >
        Absent
      </button>
      <button @click="clearAttendance(date)">Clear Attendance</button>
    </div>
  </template>
  
  <script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  
  onMounted(() => {
    getAttributes()
  })
  
  const props = defineProps(['session'])
  const { session } = toRefs(props)
  
  const date = ref(new Date())
  
  let cleanDate = date.value.toString().split(' ').slice(0, 4).join(' ')
  //Listens for date clicks
  addEventListener('click', () => {})
  onclick = () => {
    //Get clean date from clicked date
    cleanDate = date.value.toString().split(' ').slice(0, 4).join(' ')
    console.log(cleanDate)
    document.getElementById('dateSelected').innerHTML = cleanDate
  }
  
  let attributes = ref([])
  
  async function markAttendance(value, date, attendance) {
    try {
      //check if selected date is not already in list of attributes
      for (const attrs in attributes.value) {
        if (attributes.value[attrs].dates == date.toDateString()) {
          //change the color of the bar
          attributes.value[attrs].bar = value
          updateAttributes()
          return
        }
      }
      const newAttr = {
        bar: value,
        dates: date.toDateString(),
        popover: {
          label: attendance,
          visibility: 'hover',
          placement: 'top',
          showPointer: true,
          showArrow: true
        }
      }
      attributes.value.push(newAttr)
      updateAttributes()
      //console.log(date.toDateString());
      //console.log(attributes.value);
    } catch (error) {
      alert(error.message)
    }
  }
  
  function clearAttendance(date) {
    for (const attrs in attributes.value) {
      if (attributes.value[attrs].dates == date.toDateString()) {
        delete attributes.value[attrs]
        updateAttributes()
      }
    }
  }
  
  async function getAttributes() {
    try {
      const { user } = session.value
  
      let { data, error, status } = await supabase
        .from('attendance')
        .select(`attributes`)
        .eq('id', user.id)
  
      if (error && status !== 406) throw error
  
      if (data) {
        console.log(data)
        attributes.value = data.attributes
      }
    } catch (error) {
      alert(error.message)
    }
  }
  
  async function updateAttributes() {
    try {
      const { user } = session.value
  
      const updates = {
        id: user.id,
        attributes: attributes.value
      }
  
      let { error } = await supabase.from('attendance').upsert(updates)
  
      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  }
  </script>
  
  <style>
  .text {
    font-size: 20px;
  }
  
  .green {
    background-color: green;
  }
  
  .yellow {
    background-color: yellow;
  }
  
  .red {
    background-color: red;
  }
  </style>
  