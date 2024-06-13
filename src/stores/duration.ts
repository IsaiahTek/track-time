import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type DurationState = {duration: number}
export const useDurationStore = defineStore('duration', {
  state:():DurationState=>({
    duration:0
  }),
  actions:{
    setDuration(newDuration:number) {
      this.duration = newDuration;
    }
  }
})
