<script setup>
import {  reactive } from 'vue'
import Menu from './components/Menu.vue'
import routes from "./routes/routes";

const except = ['Login']
const navigation = routes.map((url, index)=>{
  if (!except.includes(url.name) ){
    return  { 
      name: url.name,
      href: url.path,
      current: (index==0) ? true : false,
      index: index
      }
  }
}).filter(function(dato){
  return dato != undefined
});

const state = reactive({
    login: localStorage.getItem('isLogin'),
})

function isLogin(){
  state.login = localStorage.getItem('isLogin')
}

</script>

<template>
  <Menu :navigation="navigation" :islogin="state.login"/>
  <router-view @is-login="isLogin"></router-view>
</template>
<style>
body{
  background: #1f2937;
}
</style>