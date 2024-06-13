<script setup lang="ts">
import { listen } from '@tauri-apps/api/event';
import { computed, onMounted, ref, watch } from "vue";
import TimeView from '@/components/TimeView.vue';
import { Duration } from '@/models/duration';
const duration = ref<Duration>();
const isTimeUp = ref<boolean>(false);
const isTiming = ref<boolean>(false);
const intervalId = ref<undefined|number>(undefined);

const audioFile = ref<HTMLAudioElement|undefined>(undefined)

onMounted(()=>{
  audioFile.value = document.getElementById('audio') as HTMLAudioElement
});
// onBeforeUpdate(()=>{
//   audioFile.value?.play().then(()=>audioFile.value?.pause());
// })

listen('duration', (event)=>{
  // Cancel initial tracking
  pauseTracking();

  // Assign the new value to duration
  let durat = JSON.parse((event.payload as {duration:string}).duration as string);
  duration.value = new Duration(durat);

  // Reset the time-up-blinking indicator
  isTimeUp.value = false;

  // Start tracking/counting
  startTracking();
})

const startTracking = () =>{
  duration.value?.tickTime()
  intervalId.value = setInterval(()=>{
    if(duration.value != undefined && duration.value.toMilliseconds() > 0){
      duration.value = duration.value.now();
    }else{
      clearInterval(intervalId.value)
    }
  }, 100);
  isTiming.value = true;
}

const pauseTracking = ()=>{
  clearInterval(intervalId.value)
  duration.value?.pauseTick()
  isTiming.value = false;
}

const isZeroOrNull = (val:number|undefined) => !((typeof val === 'number') && val > 0)

const isEmptyDuration = computed(()=>isZeroOrNull(duration.value?.seconds) && isZeroOrNull(duration.value?.minutes) && isZeroOrNull(duration.value?.hours) && isZeroOrNull(duration.value?.milliseconds))

watch(()=>duration.value?.isTimeUp, (newTimeUp, oldTimeUp)=>{
  if(newTimeUp != oldTimeUp){
    isTimeUp.value = duration.value?.isTimeUp!;
    if(isTimeUp.value){
      console.log("Playing")
      audioFile.value?.play();
    }else{
      audioFile.value?.pause();
      audioFile.value!.currentTime! = 0;
    }
  }
});

</script>

<template>
  <div class="timer" :class="isTimeUp?'time-up-blink':'timer'">
    <TimeView v-if="duration != undefined" :duration="duration"></TimeView>
    <div class="controls">
      <p class="label"><button v-if="!isEmptyDuration" @click="()=>isTiming ?pauseTracking(): startTracking()">{{ isTiming? 'Pause': 'Resume' }}</button></p>
    </div>
    <audio id="audio" controls>
      <source src="/audios/Tchaikovsky-Waltz-op39-no8.mp3" type="audio/mpeg">
    </audio>
    </div>
  </template>

<style>
.timer{
  padding: 10px;
  height: 100vh;
  background-color: rgb(231, 231, 231);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.label{
  text-align: center;
  font-style: italic;
}
div.controls{
  margin: 2.5px auto;
}
div.time-up-blink{
  background-color: red;
  animation: time-up-blink .2s ease-in-out infinite;
}
div.remove-time-up-blinking{
  background-color: inherit;
  animation: time-up-blink none none none;
}
@keyframes time-up-blink{
  50%{
    background-color: white;
  }
}
</style>
