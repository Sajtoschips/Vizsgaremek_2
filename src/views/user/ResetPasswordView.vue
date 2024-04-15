<template>
  <body>
    <h1>Jelszó helyreállítás</h1> 
    
    <div>
      <input type="password"/>
      <button>MEG KELL MÉG CSINÁLNI H JELSZÓT LEHESSEN VELE VÁLTOZTATNI</button>  
    </div>
  </body>
</template>


<script setup>
import { useRoute } from "vue-router";

const route = useRoute()

const token = route.params.token
console.log(token);
</script>

<style scoped>
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
