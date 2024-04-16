<template>
  <body>
    <h1>Jelszó helyreállítás</h1>
    <div>
      <div>
        <input type="password" v-model="newPassword" placeholder="Új jelszó" />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Új jelszó megerősítése"
        />
        <p v-if="passwordsDontMatch" style="color: red">
          A két jelszó nem egyezik meg!
        </p>
        <button @click="changePassword" :disabled="passwordsDontMatch">
          Jelszó változtatás
        </button>
      </div>
    </div>
  </body>
</template>

<script setup>
import { useRoute } from "vue-router";
import userservice from "../../services/userservice";
const route = useRoute();

const token = route.params.token;
console.log(token);

const newPassword = ref(""); // Új jelszó állapot létrehozása
const confirmPassword = ref(""); // Megerősítő jelszó állapot létrehozása
const passwordsDontMatch = computed(
  () => newPassword.value !== confirmPassword.value
);

const changePassword = () => {
  if (newPassword.value && newPassword.value === confirmPassword.value) {
    userservice
      .changePassword(token, newPassword.value)
      .then(() => {
        // Sikeres jelszóváltoztatás esetén itt végezhetsz további teendőket
        console.log("Jelszó sikeresen megváltoztatva");
      })
      .catch((error) => {
        console.error("Hiba történt a jelszóváltoztatás során:", error);
      });
  } else {
    console.error("A két jelszó nem egyezik meg vagy nincs megadva!");
  }
};
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
