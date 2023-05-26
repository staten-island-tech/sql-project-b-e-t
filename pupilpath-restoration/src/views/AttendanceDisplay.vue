<script setup>
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

</script>

<template>
  <h1>Attendance</h1>
<VCalendar />
  <VDatePicker v-model="date" />
  </template>
  
  <style>
.grid{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>
  