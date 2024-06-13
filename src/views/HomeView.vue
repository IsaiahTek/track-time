<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import {useDurationStore} from "../stores/duration"
import { ref } from "vue";
const duration = ref<Duration>({hours:0, minutes:0, seconds:0});
function openFloatingWindow(){
  let durationToString = JSON.stringify(duration.value);
  invoke('show_floating_window', {duration:durationToString}).catch(err => console.error("Failed to invoke show_floating_window:", err));
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <section class="main-body">
      <div><h1>Set Alarm</h1></div>
      <div class="duration-box">
        <div class="input-controller">
          <label for="hour">Hr</label>
          <input name="hour" v-model="duration.hours" placeholder="hr" type="number" max="24" min="0" />
        </div>
        <div class="input-controller">
          <label for="minutes">Min</label>
          <input name="minutes" v-model="duration.minutes" placeholder="min" type="number" max="59" min="0" />
        </div>
  
        <div class="input-controller">
          <label for="seconds">Sec</label>
          <input name="seconds" v-model="duration.seconds" placeholder="sec" type="number" max="59" min="0" />
        </div>
      </div>
      <button @click="openFloatingWindow">Start</button>
    </section>
  </main>
</template>

<style>
header{
  position: absolute;
  left: 0;
  top: 0%;
  bottom: 0%;
  background-color: aliceblue;
  width: 20%;
  /* z-index: 0; */
}
header nav{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 20px;
}
main{
  position: relative;
  left: 20%;
}
main .main-body{
  padding: 20px;
  /* background-color: red; */
}
button{
  padding: 8px 15px;
  background-color: rgb(0, 128, 255);
  border: none;
  border-radius: 5px;
  color: aliceblue;
}
input{
  width: 60px;
  height: 30px;
  text-align: center;
}
button{
  cursor: pointer;
}
div.duration-box{
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
div.input-controller{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
