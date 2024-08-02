<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import {useDurationStore} from "../stores/duration"
import Calendar from './Calendar.vue';
import { ref } from "vue";
const duration = ref<Duration>({hours:0, minutes:0, seconds:0});
function openFloatingWindow(){
  let durationToString = JSON.stringify(duration.value);
  invoke('show_floating_window', {duration:durationToString}).catch(err => console.error("Failed to invoke show_floating_window:", err));
}

function toSentenceCase(text:String){
  return text.split('').map((val, index)=>(index==0)?val.toUpperCase():val).join('');
}

const tabs = ['alarm', 'calendar'];
const currentTab = ref<number>(0);

</script>

<template>
  <section class="flex">
    <header>
      <div class="wrapper">
        <nav>
          <div @click="()=>{currentTab = index}" v-for="(tab, index) in tabs" class="link" :class="currentTab==index?'active':null">
            <span>{{toSentenceCase(tab)}}</span>
          </div>
        </nav>
      </div>
    </header>
    <main>
      <section v-if="currentTab==0" class="main-body">
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
      <section v-if="currentTab==1" class="main-body">
        <Calendar />
      </section>
    </main>
  </section>
</template>

<style scoped>
section.flex{
  display: flex;
  min-height: 100vh;
  max-width: 100%;
  flex-wrap: wrap;
}
header{
  background-color: rgb(228, 222, 187);
  width: 20%;
  /* z-index: 0; */
}
header nav{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 20px;
}
nav div.link{
  padding: 10px 30px;
  background-color: white;
  margin-bottom: 10px;
  margin-right: 20px;
}
nav div.link.active{
  margin-right: 0px;
}
nav div.link:hover{
  cursor: pointer;
  box-shadow: rgb(235, 235, 235) -5px 1px 5px;
}
main{
  /* overflow-wrap: break-word;
  word-wrap:break-word;
  word-break: break-all;
  text-wrap: wrap; */
  width: 80%;
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
