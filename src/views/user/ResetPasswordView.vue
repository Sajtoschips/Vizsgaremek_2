<template>
  <body>
    <div v-if="!pwresetsucces" class="password-reset-container">
      <h1 class="password-reset-title">Jelszó helyreállítás</h1>
      <div class="password-reset-form">
        <input
          type="password"
          v-model="newPassword"
          placeholder="Új jelszó"
          class="password-input"
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Új jelszó megerősítése"
          class="password-input"
        />
        <p v-if="passwordsDontMatch" class="password-error">
          A két jelszó nem egyezik meg!
        </p>
        <p v-if="newPassword.length < 8" class="password-error">
          A jelszónak legalább 8 karakter hosszúnak kell lennie!
        </p>
        <button
          @click="changePassword"
          :disabled="passwordsDontMatch || newPassword.length < 8"
          class="password-change-button"
        >
          Jelszó változtatás
        </button>
      </div>
    </div>
    <div v-else class="alert alert-success col-12 col-md-6 mx-auto">
      <p class="text-center">
        Sikeres jelszóváltoztatás,
        <router-link to="/bejelentkezes">jelentkezz</router-link>be.
      </p>
    </div>
  </body>
</template>

<script setup>
import { useRoute } from "vue-router";
import userservice from "../../services/userservice";
import { ref } from "vue";
import { computed } from "vue";
const route = useRoute();

const token = route.params.token;
console.log(token);

const pwresetsucces = ref(false);
const newPassword = ref(""); // Új jelszó állapot létrehozása
const confirmPassword = ref(""); // Megerősítő jelszó állapot létrehozása
const passwordsDontMatch = computed(
  () => newPassword.value !== confirmPassword.value
);

const changePassword = () => {
  pwresetsucces.value = false;
  if (newPassword.value && newPassword.value === confirmPassword.value) {
    userservice
      .changePassword(token, newPassword.value)
      .then(() => {
        // Sikeres jelszóváltoztatás esetén itt végezhetsz további teendőket
        console.log("Jelszó sikeresen megváltoztatva");
        pwresetsucces.value = true;
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

.password-reset-container {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.password-reset-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.password-reset-form {
  display: flex;
  flex-direction: column;
}

.password-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.password-error {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}

.password-change-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.password-change-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
