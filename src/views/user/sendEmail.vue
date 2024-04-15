<template>

  <body>

    <h2>Adja meg az E-mail címét: </h2>


    <div class="d-flex justify-content-center ms-1">
      <input type="text" class="form-control" v-model="email" />
      <button class="btn btn-primary" @click="send">Küldés</button>
    </div>
  </body>
</template>


<script setup>
import { ref } from 'vue'
import userservice from '../../services/userservice';
const email = ref()
const send = () => {
  if (email.value) {
    console.log(email.value);
    userservice.sendEmail(email.value)
  }
}
</script>

<style scoped>
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>