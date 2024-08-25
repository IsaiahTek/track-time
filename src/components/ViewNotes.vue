<script setup lang="ts">
import { useNoteStore } from '@/stores/note';
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
import ViewNote from './ViewNote.vue';
const props = defineProps({
    date: {
        type: Number,
        required: true
    }
})

const notes = ref<Note[]>([]);

const date = ref(props.date);

function fetchNotes(date:number){
    useNoteStore().getNoteByDate(date).then((v)=>{
        notes.value = []
        notes.value = Array.from(new Set(v))
        console.log("NOTEs IN VIEW NOTES", v, date, notes.value)
    });
}

onBeforeMount(()=>{
    fetchNotes(date.value)
})

watch(props, async(prop, oldDate)=>{
    console.log(oldDate.date, prop.date)
    fetchNotes(prop.date)
})


</script>
<template>
    <h1>All Notes on {{ new Date(props.date).toDateString() }}</h1>
    <div :key="note.id.toString()" v-for="note in notes">
        <ViewNote :note="note" ></ViewNote>
    </div>
</template>