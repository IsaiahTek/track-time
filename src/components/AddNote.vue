<script lang="ts">
import { useNoteStore } from '@/stores/note';

export default{
    props: {
        date: {
            type: Number,
            required: true,
        }
    },
    data(){
        return {
            title: '',
            details: '',
        }
    },
    methods:{
        add(){
            useNoteStore().add({id:'', title: this.title, details: this.details, date: this.date})
            this.title = ''
            this.details = ''
        }
    }
}
</script>

<template>
    <div class="mb-1">
        <input placeholder="Title" class="f-w" type="text" name="" id="title" v-model="title">
    </div>
    <div class="mb-1">
        <textarea contenteditable="true" placeholder="Note" class="contenteditable" type="text" name="" id="title" v-model="details" >
        </textarea>
    </div>
    <div>
        <button :disabled="title.length < 1 && details.length < 1" :class="title.length < 1 && details.length < 1 ? 'disabled':null" class="add" @click="add">Add</button>
    </div>
</template>
<style>
.placeholder{
    position: relative;
    top: 30px;
}
.contenteditable{
    border: 1px solid gainsboro;
    height: 100px;
    padding: 5px 10px;
    width: 100%;
    border-radius: 5px;
}
.contenteditable:focus{
    outline: none;
}
.mb-1{
    margin-bottom: 10px;
}
.add{
    padding: 8px 15px;
    background-color: blue;
    outline: none;
    border-radius: 5px;
    border-width: 0px;
    color: white
}
button.disabled{
    background-color: gainsboro !important;
    /* color:blue */
}
</style>