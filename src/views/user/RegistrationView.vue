<template>
  <body>
    <div v-if="!regSuccess" class="wrapper">
      <h2>Regisztráció</h2>
      <form @submit.prevent="onRegister">
        <div class="input-box">
          <input
            type="text"
            placeholder="Név"
            v-model="regForm.name"
            required
          />
        </div>
        <div class="input-box">
          <input
            type="email"
            placeholder="E-mail"
            v-model="regForm.email"
            required
          />
        </div>
        <div class="input-box">
          <input
            type="password"
            placeholder="Jelszó"
            v-model="regForm.password"
            required
          />
        </div>
        <div class="input-box">
          <input
            type="text"
            placeholder="Lakcím"
            v-model="regForm.adress"
            required 
          />
        </div>
        <div class="input-box">
          <input
            type="text"
            placeholder="Telefonszám"
            v-model="regForm.phone_number"
            required maxlength="12"
          />
        </div>
        <!-- <div class="input-box">
          <input
            type="password"
            placeholder="Jelszó újra"
            v-model="regForm.confirm_password"
            required
          />
        </div> -->
        <div class="input-box button">
          <input type="Submit" value="Regisztráció" />
        </div>
        <div class="text">
          <h3>Van már fiókod? <a href="/bejelentkezes">Jelentkezz be!</a></h3>
        </div>
      </form>
    </div>
    <div v-else class="alert alert-success col-12 col-md-6 mx-auto">
      <p class="text-center">
        Sikeres regisztráció, átirányítás a Bejelentkezéshez.
        <i class="pi pi-spin pi-spinner"></i>
      </p>
    </div>
  </body>
</template>

<script setup>
import { ref } from "vue";
import userservice from "../../services/userservice";
import { useRouter } from "vue-router";
import 'primeicons/primeicons.css'

const router = useRouter();
const regForm = ref({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  adress: "",
  phone_number: "",
});

const regSuccess = ref(false);
const errorMessages = ref({});

function onRegister() {
  // console.log(regForm.value);
  userservice
    .registerUser(regForm.value)
    .then(() => {
      regSuccess.value = true;
      setTimeout(() => {
        router.push("/bejelentkezes");
      }, 2000);
    })
    .catch((err) => {
      // console.log(err.data.data);
      errorMessages.value = err.data.data;
    });
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
