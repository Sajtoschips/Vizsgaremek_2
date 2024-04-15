<template>

  <body>
    <div v-if="!SendEmailSucces" class="wrapper">
      <h2>Jelszó visszaállítás</h2>
      <form @submit.prevent="onLogin">
        <div class="input-box">
          <input type="email" class="form-control" id="email" placeholder="E-mail" v-model="email" required
            :class="{ 'error': sendEmailError }" />
        </div>
        <div class="input-box button">
          <input @click="send" type="Submit" value="Küldés" />
        </div>
        <div v-if="sendEmailError" class="error-message text-center">Hibás e-mail cím vagy már kiküldésre került az email.</div>
      </form>
    </div>
    <div v-else class="alert alert-success col-12 col-md-6 mx-auto">
      <p class="text-center">
        Az email címre elküldtük az új jelszót.
        <br>
        <router-link :to="{ name: 'Login' }">Tovább a bejelentkezéshez</router-link>
      </p>
    </div>
  </body>
</template>


<script setup>
import { ref } from 'vue'
import userservice from '../../services/userservice';

const SendEmailSucces = ref(false)
const sendEmailError = ref(false);
const email = ref()
const send = () => {
  if (email.value) {
    userservice.sendEmail(email.value)
      .then(() => {
        SendEmailSucces.value = true;
      })
      .catch(() => {
        sendEmailError.value = true;
        SendEmailSucces.value = false; // Hiba esetén állítsd vissza a sikeres értéket
      });
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.error {
  border-color: red !important;
  /* Fontos, hogy a !important-et használjuk, hogy felülírjuk a többi stílust */
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4070f4;
}

.wrapper {
  position: relative;
  max-width: 430px;
  width: 100%;
  background: #fff;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.wrapper h2 {
  position: relative;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.wrapper h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 28px;
  border-radius: 12px;
  background: #4070f4;
}

.wrapper form {
  margin-top: 30px;
}

.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}

form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #c7bebe;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}

form .policy {
  display: flex;
  align-items: center;
}

form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}

.input-box.button input:hover {
  background: #0e4bf1;
}

form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}

form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}

form .text h3 a:hover {
  text-decoration: underline;
}
</style>
