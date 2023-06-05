<template>
  <VDatePicker v-model="date" mode="date" is-required :attributes="attributes" />
  <div>
    <label class="text" for="dateSelected">Date Selected</label>
    <br>
    <label id="dateSelected">{{ cleanDate }}</label>
    <br>
    <br>
    <label class="text" for="attendance">Mark the day as:</label>
    <br>
    <button class="green" id="attendance" value="present"
      @click="markAttendance('green', date, 'Present')">Present</button>
    <button class="yellow" id="attendance" value="tardy" @click="markAttendance('#ca8a04', date, 'Tardy')">Tardy</button>
    <button class="red" id="attendance" value="absent" @click="markAttendance('red', date, 'Absent')">Absent</button>
    <button @click="clearAttendance(date)">Clear Attendance</button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
const date = ref(new Date());

let cleanDate = date.value.toString().split(" ").slice(0, 4).join(" ");;
//Listens for date clicks
addEventListener("click", () => { });
onclick = () => {
  //Get clean date from clicked date
  cleanDate = date.value.toString().split(" ").slice(0, 4).join(" ");
  console.log(cleanDate);
  document.getElementById("dateSelected").innerHTML = cleanDate;
};


let attributes = ref([])

async function markAttendance(value, date, attendance) {
  try {
    //check if selected date is not already in list of attributes
    for (const attrs in attributes.value) {
      if (attributes.value[attrs].dates == date.toDateString()) {
        alert("Date already marked");
        return;
      }
    }
    const newAttr = {
      bar: value,
      dates: date.toDateString(),
      popover: {
        label: attendance,
        visibility: "hover",
        placement: "top",
        showPointer: true,
        showArrow: true,
      },
    }
    attributes.value.push(newAttr);
    console.log(date.toDateString());
    console.log(attributes.value);
  }
  catch (error) {
    alert(error.message);
  }
}

function clearAttendance(date) {
  for (const attrs in attributes.value) {
    if (attributes.value[attrs].dates == date.toDateString()) {
      delete attributes.value[attrs];
    }
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
  background-color:#ca8a04;
}

.red {
  background-color: red;
}
</style>