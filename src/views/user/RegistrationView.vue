<!-- <template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="display-4 text-center my-5">Regisztráció</h1>
      </div>
    </div>
    <div class="row" v-if="!regSuccess">
      <div class="col-12 col-md-4 mx-auto">
        <form @submit.prevent="onRegiter">
          <div class="form-floating mb-3">
            <input 
              type="text" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.name}"
              id="name" 
              placeholder="Név" 
              v-model="regForm.name">
            <label for="name">Név</label>
            <div v-if="errorMessages.name">
              <span v-for="m in errorMessages.name" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.email}"
              id="email" 
              placeholder="E-mail"
              v-model="regForm.email">
            <label for="email">E-mail</label>
            <div v-if="errorMessages.email">
              <span v-for="m in errorMessages.email" class="error-message">{{ m }} <br/></span>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.password}"
              id="password" 
              placeholder="Jelszó"
              v-model="regForm.password">
            <label for="password">Jelszó</label>
            <div v-if="errorMessages.password">
              <span v-for="m in errorMessages.password" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.confirm_password}"
              id="password_confirmation" 
              placeholder="Jelszó újra"
              v-model="regForm.confirm_password">
            <label for="password_confirmation">Jelszó újra</label>
            <div v-if="errorMessages.confirm_password">
              <span v-for="m in errorMessages.confirm_password" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary w-100 py-3 mt-3">Regisztráció</button>
          </div>
        </form>
      </div>
    </div>

    <div v-else class="alert alert-success col-12 col-md-6 mx-auto">
      A regisztráció sikerült, most már bejelentkezhet.
    </div>

  </div>
</template> -->

<template>
  <body>
    <div class="wrapper">
      <h2>Regisztráció</h2>
      <form @submit.prevent="onRegister">
        <div class="input-box">
          <input type="text" placeholder="Név" 
              v-model="regForm.name" required>
        </div>
        <div class="input-box">
          <input type="email" placeholder="E-mail"
              v-model="regForm.email" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Jelszó"
              v-model="regForm.password" required>
        </div>
        <div class="input-box">
          <input type="password" placeholder="Jelszó újra"
              v-model="regForm.confirm_password" required>
        </div>
        <div class="policy">
          <input type="checkbox">
          <h3>Elfogadom az általános szerződési feltételeket</h3>
        </div>
        <div class="input-box button">
          <input type="Submit" value="Regisztráció">
        </div>
        <div class="text">
          <h3>Van már fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></h3>
        </div>
      </form>
    </div>
    
  </body>
</template>

<script setup>
import { ref } from 'vue';
import userservice from '../../services/userservice';


const regForm = ref({
  name: '',
  email: '',
  password: '',
  confirm_password: '',
});

const regSuccess = ref(false);
const errorMessages = ref({});

function onRegister() {
  // console.log(regForm.value);
  userservice.registerUser(regForm.value)
    .then(() => {
      regSuccess.value = true;
    })
    .catch(err => {
      // console.log(err.data.data);
      errorMessages.value = err.data.data;
    })
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
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
  content: '';
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
  border: 1.5px solid #C7BEBE;
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