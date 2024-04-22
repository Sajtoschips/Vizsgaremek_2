<template>
  <div class="container p-5">
    <div class="mt-5 row justify-content-around">
      <div class="col-10 col-md-6">
        <div class="mb-3">
          <label for="name" class="form-label">Név</label>
          <input type="text" class="form-control" id="name" v-model="userData.name" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="userData.email" />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Cím</label>
          <input type="text" class="form-control" id="address" v-model="userData.adress" />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Telefonszám</label>
          <input type="tel" class="form-control" id="phone" v-model="userData.phone_number" pattern="[0-9]*" />
          <div class="invalid-feedback">
            A telefonszám csak számjegyeket tartalmazhat.
          </div>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="changePassword" v-model="changePassword" />
          <label class="form-check-label" for="changePassword">Jelszó változtatása</label>
        </div>
        <div v-if="changePassword">
          <div class="mb-3">
            <label for="newPassword" class="form-label">Új jelszó</label>
            <input type="password" class="form-control" id="newPassword" v-model="userData.new_password"
              minlength="8" />
            <div class="invalid-feedback">
              Az új jelszónak legalább 8 karakter hosszúnak kell lennie.
            </div>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Új jelszó megerősítése</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="userData.confirm_password" />
          </div>
        </div>
        <div class="mb-3">
          <label for="currentPassword" class="form-label">Aktuális jelszó</label>
          <input type="password" class="form-control" id="currentPassword" v-model="userData.current_password" />
        </div>

        <!-- Save button -->
        <button class="btn btn-primary" @click="saveUserData">Mentés</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import userservice from '../../services/userservice';

const userData = ref(JSON.parse(sessionStorage.getItem('user')));
const changePassword = ref(false); // New data property to control password change visibility

function saveUserData() {
  // Validate current password if password change is requested
  if (changePassword && !userData.value.current_password) {
    alert('Kérjük, adja meg az aktuális jelszavát a frissítéshez.');
    return;
  }

  // Validate new password length
  if (changePassword && userData.value.new_password && userData.value.new_password.length < 8) {
    alert('Az új jelszónak legalább 8 karakter hosszúnak kell lennie.');
    return;
  }

  // Other form data validation and saving logic
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

  sessionStorage.setItem('user', JSON.stringify(userData.value));

  // If there are changes, send the new data to the server
  if (hasChanges) {
    userservice.updateUser(userData.value.token, {
      ...updatedData,
      current_password: userData.value.current_password,
      new_password: userData.value.new_password
    }).then((response) => {
      alert('Felhasználói adatok sikeresen frissítve!');
      userData.value = response.data;
      location.reload();
    }).catch((error) => {
      console.log(error);
      if (error.status === 422) {
        alert('Hibás jelszó. Kérjük, adja meg az aktuális jelszavát helyesen.');
      } else {
        console.error('Hiba történt a felhasználói adatok frissítése közben:', error);
        alert('Hiba történt a felhasználói adatok frissítése közben. Kérjük, próbálja újra később!');
      }
    });
  } else {
    alert('Nincs új adat a frissítéshez.');
  }
}
</script>