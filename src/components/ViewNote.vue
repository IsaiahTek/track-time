<script lang="ts">
export default{
    name:"NoteView",
    props: {
        note: {
            type: Object as ()=> Note,
            required: true,
        }
    },
}
</script>

<template>
    <div class="card">
        <p class="t-bold text"># {{ note.title }}</p>
        <p class="text">{{ note.details }}</p>
        <small class="text">{{ note.date }}</small>
    </div>
</template>

<style>
.card{
    display: block;
    border-radius:5px;
    padding: 20px;
    background-color: white;
    box-shadow: 1px 2px 20px gainsboro;
    margin-bottom: 20px;
    margin-top: 10px;
    width: 100%;
}
.t-bold{
    font-weight: 550;
    font-size: larger;
    margin-bottom: 10px;
}
.text{
    color: rgb(95, 95, 95);
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>

