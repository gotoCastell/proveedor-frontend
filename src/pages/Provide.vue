<script setup>
import {  reactive } from 'vue'
const state = reactive({
    user: JSON.parse(localStorage.getItem('user')),
})
 
</script>

<template>
    <div class="grid place-items-center pt-32">
       <p class="text-white font-semibold text-5xl text-center">
         Bienvenido {{ state.user.name }}
       </p>
    </div>
</template>