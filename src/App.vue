<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>  
  <RouterView />
</template>

<style>
input{
  width: 60px;
  height: 30px;
  text-align: center;
}
button{
  cursor: pointer;
}
button.disabled{
  cursor: not-allowed;
}
body{
  background-color: rgb(250, 250, 250);
}
</style>
