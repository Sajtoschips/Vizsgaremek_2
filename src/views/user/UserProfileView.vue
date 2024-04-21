<template>
  <div class="container p-5">
    <div class="mt-5 row justify-content-around">
      <div class="col-10 col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">Név</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="userData.name"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="userData.email"
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Cím</label>
          <input
            type="text"
            class="form-control"
            id="address"
            v-model="userData.adress"
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Telefonszám</label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="userData.phone_number"
            pattern="[0-9]*"
          />
          <div class="invalid-feedback">
            A telefonszám csak számjegyeket tartalmazhat.
          </div>
        </div>
        <div class="mb-3">
          <label for="currentPassword" class="form-label"
            >Aktuális jelszó</label
          >
          <input
            type="password"
            class="form-control"
            id="currentPassword"
            v-model="userData.current_password" 
          />
        </div>
        <div class="mb-3">
          <label for="newPassword" class="form-label">Új jelszó</label>
          <input
            type="password"
            class="form-control"
            id="newPassword"
            v-model="userData.new_password"
            minlength="8"
          />
          <div class="invalid-feedback">
            Az új jelszónak legalább 8 karakter hosszúnak kell lennie.
          </div>
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label"
            >Új jelszó megerősítése</label
          >
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="userData.confirm_password"
          />
        </div>
        <button class="btn btn-primary" @click="saveUserData">Mentés</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import userservice from '../../services/userservice';

const userData = ref(JSON.parse(sessionStorage.getItem('user')));

function saveUserData() {
  // Ellenőrizzük, hogy van-e megadva az aktuális jelszó
  if (!userData.value.current_password) {
    alert('Kérjük, adja meg az aktuális jelszavát a frissítéshez.');
    return;
  }

  // Ellenőrizzük, hogy az új jelszó legalább 8 karakter hosszú-e
  if (userData.value.new_password && userData.value.new_password.length < 8) {
    alert('Az új jelszónak legalább 8 karakter hosszúnak kell lennie.');
    return;
  }

  // Ellenőrizzük, hogy van-e változás az adatokban
  const updatedData = {};
  let hasChanges = false;
  if (userData.value.name !== userData.value.original_name) {
    updatedData.name = userData.value.name;
    hasChanges = true;
  }
  if (userData.value.email !== userData.value.original_email) {
    updatedData.email = userData.value.email;
    hasChanges = true;
  }
  if (userData.value.adress !== userData.value.original_adress) {
    updatedData.adress = userData.value.adress;
    hasChanges = true;
  }
  if (userData.value.phone_number !== userData.value.original_phone_number) {
    updatedData.phone_number = userData.value.phone_number;
    hasChanges = true;
  }

  userData.value = { ...userData.value, ...updatedData };

  // Frissítjük a sessionStorage-t az új adatokkal
  sessionStorage.setItem('user', JSON.stringify(userData.value));

  // Ha vannak változások, elküldjük az új adatokat a szervernek
  if (hasChanges) {
    userservice.updateUser(userData.value.token, {
      ...updatedData,
      current_password: userData.value.current_password,
      new_password: userData.value.new_password
    }).then((response) => {
      // Sikeres frissítés esetén
      alert('Felhasználói adatok sikeresen frissítve!');
      // Frissítjük a tárolt felhasználói adatokat a válasz alapján
      userData.value = response.data;
      location.reload()
    }).catch((error) => {
      // Hiba esetén
      if (error.response.status === 422) {
        // Hibás jelszó esetén
        alert('Hibás jelszó. Kérjük, adja meg az aktuális jelszavát helyesen.');
      } else {
        // Egyéb hibák esetén
        console.error('Hiba történt a felhasználói adatok frissítése közben:', error);
        alert('Hiba történt a felhasználói adatok frissítése közben. Kérjük, próbálja újra később!');
      }
    });
  } else {
    alert('Nincs új adat a frissítéshez.');
  }
}
</script>

<style scoped>
/* Itt adhatod meg a saját stílusodat a komponenshez */
</style>
