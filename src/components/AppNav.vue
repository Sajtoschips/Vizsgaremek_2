<template>
  <header>
    <div class="branding">
      <router-link :to="{ name: 'Home' }" class="logo">
        <img class="logoimg" src="../assets/img/gametrix.png" alt="" />
      </router-link>
    </div>

    <ul class="navbar" :class="{ active: isNavbarActive }">
      <li>
        <router-link
          :to="{ name: 'Home' }"
          class="link"
          @click="CloseNavElements"
          >Nyitólap</router-link
        >
      </li>
      <li>
        <router-link
          class="link"
          :to="{ name: 'Termekek' }"
          @click="CloseNavElements"
          >Termékek</router-link
        >
      </li>
      <li>
        <router-link
          class="link"
          :to="{ name: 'AboutUs' }"
          @click="CloseNavElements"
          >Rólunk</router-link
        >
      </li>
      <li>
        <router-link
          class="link"
          :to="{ name: 'Contact' }"
          @click="CloseNavElements"
          >Elérhetőségek</router-link
        >
      </li>
    </ul>
    <div class="header-icons">
      <i id="menu-icon" class="bx bx-menu" @click="toggleNavbar"></i>
      <i class="bx bx-cart" @click="toggleCart"></i>
      <i class="bx bx-user" @click="toggleUser"></i>
    </div>

    <!-- Cart Box -->
    <div class="cart" :class="{ active: isCartActive }">
      <div v-if="data.cartItems.length === 0">A kosár üres</div>
      <div v-else>
        <div
          v-for="item in data.cartItems"
          :key="item.ProductNumber"
          class="box"
        >
          <img :src="item.Image" :alt="item.ProductName" />
          <div class="text">
            <h3>{{ item.ProductName }}</h3>
            <span>{{ formatCurrency(item.RetailPrice) }} Ft</span>
            <br />
            <i @click="data.incrementQ(item)" class="bi bi-plus-circle"></i>
            <span class="mx-2">
              {{ item.quantity }}
            </span>
            <i @click="data.decrementQ(item)" class="bi bi-dash-circle"></i>
          </div>
          <div>
            <i @click="data.removeFromCart(item)" class="bx bxs-trash-alt"></i>
          </div>
        </div>
        <br />
        <h2>Összesen: {{ formatCurrency(teljesAr) }} Ft</h2>
        <br />
        <router-link
          :to="{ name: 'Kosar' }"
          class="btn"
          @click="CloseNavElements"
          >Folytatás</router-link
        >
      </div>
    </div>

    <!-- User -->
    <div class="user" :class="{ active: isUserActive }">
      <h2 v-if="!status.loggedIn">Bejelentkezés</h2>
      <h2 v-else>Üdv, {{ user.name }}</h2>
      <form v-if="!status.loggedIn" @submit.prevent="onLogin">
        <input
          type="email"
          v-model="loginForm.email"
          placeholder="Email cím"
          :class="{ error: loginError }"
        />
        <input
          type="password"
          v-model="loginForm.password"
          placeholder="Jelszó"
          :class="{ error: loginError }"
          />
        <input type="submit" value="Login" class="login-btn"/>
        <div v-if="loginError" class="error-message text-center">
          <p>Hibás email cím vagy jelszó!</p>
        </div>
      </form>
      <div v-else>
        <h2 class="text-center mb-2"><router-link :to="{ name: 'Rendelesek' }" @click="CloseNavElements"
          >Rendelések</router-link
        ></h2>

        <h2 class="text-center mb-2"><router-link :to="{ name: 'Profil' }" @click="CloseNavElements"
          >Profilom</router-link
        ></h2>
        
        <h2 v-show="user.role === 1" class="text-center mb-2"><router-link :to="{ name: 'Admin' }" @click="CloseNavElements"
          >Admin</router-link
        ></h2>
        <div>
          <button class="btn-kijelentkezes" @click="onLogout">Kijelentkezés <i style="font-size: 20px; margin-left: 10px;" class="bi bi-box-arrow-right"></i></button>
        </div>
      </div>
      <p v-if="!status.loggedIn">
        Elfelejtett jelszó?
        <router-link @click="CloseNavElements" to="/sendEmail"
          >Visszaállítás</router-link
        >
      </p>
      <p v-if="!status.loggedIn">
        Nincs még fiókod?
        <router-link @click="CloseNavElements" to="/regisztracio"
          >Hozz létre egyet!</router-link
        >
      </p>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userstore";
import { useShoppingStore } from "../stores/shoppingStore";
import { useToast } from "vue-toastification";
import { ref, onMounted, onBeforeUnmount } from "vue";

const { status, user } = storeToRefs(useUserStore());
const { logout, login } = useUserStore();
const router = useRouter();
const loginForm = ref({});
const logSuccess = ref(false);
const loginError = ref(false);
const toast = useToast();
const data = useShoppingStore();


function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



function onLogin() {
  loginError.value = false; // Alaphelyzetbe állítás minden bejelentkezési kísérlet előtt
  login(loginForm.value)
    .then(() => {
      logSuccess.value = true;
      toast.success(`Sikeres bejelentkezés`);
      CloseNavElements();
      setTimeout(() => {
        router.push("/");
      }, 2000);
  })
    .catch(() => {
      loginError.value = true; // Hiba esetén a loginError értékét true-ra állítjuk
    });
}

function onLogout() {
  console.log(status.value);
  logout().then(() => {
    toast.error(`Kijelentkezett`);
    CloseNavElements();
    router.push("/");
  });
}

const teljesAr = computed(() => {
  return data.cartItems.reduce(
    (osszeg, t) => osszeg + t.RetailPrice * t.quantity,
    0
  );
});

const CloseNavElements = () => {
  isNavbarActive.value = false;
  isCartActive.value = false;
  isUserActive.value = false;
};

const isNavbarActive = ref(false);
const isCartActive = ref(false);
const isUserActive = ref(false);

// Metódusok
const toggleNavbar = () => {
  isNavbarActive.value = !isNavbarActive.value;
  const menuIcon = document.getElementById("menu-icon");
  if (isNavbarActive.value) {
    menuIcon.style.transform = "rotate(180deg)";
  } else {
    menuIcon.style.transform = "rotate(0deg)";
  }
  isCartActive.value = false;
  isUserActive.value = false;
};

const toggleCart = () => {
  isCartActive.value = !isCartActive.value;
  isNavbarActive.value = false;
  isUserActive.value = false;
};

const toggleUser = () => {
  isUserActive.value = !isUserActive.value;
  isNavbarActive.value = false;
  isCartActive.value = false;
};
</script>

<style scoped>



i{
  cursor: pointer;
}
.error {
  border-color: red !important; /* Fontos, hogy a !important-et használjuk, hogy felülírjuk a többi stílust */
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-padding-top: 4rem;
  scroll-behavior: smooth;
  list-style: none;
  text-decoration: none;
}

.logoimg {
  width: 70px;
}

.btn {
  padding: 0.7rem 1.2rem;
  background: #4070f4;
  color: var(--bg-color);
  font-weight: 500;
  display: inline-block;
  text-transform: uppercase;
  clip-path: polygon(100% 0, 93% 50%, 86% 99%, 0% 100%, 7% 47%, 13% 0%);
}

.btn-kijelentkezes{
  padding: 0.7rem 1.2rem;
  background: red;
  color: var(--bg-color);
  font-weight: 500;
  display: inline-block;
  text-transform: uppercase;
  border: 0;
}

.btn:hover {
  background: gray;
  letter-spacing: 2px;
  transition: 0.2s;
}

header {
  width: 100%;
  top: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 100px;
  transition: 0.5s linear;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  z-index: 99;
}

.navbar {
  display: flex;
  column-gap: 2.4rem;
}

.navbar a {
  padding: 8px 5px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--bg-color);
}

.header-icons {
  font-size: 30px;
  cursor: pointer;
  z-index: 100000;
  display: flex;
  column-gap: 0.8rem;
}

.header-icons .bx {
  color: var(--bg-color);
}

.header-icons .bx:hover {
  color: #00afea;
}

#menu-icon {
  color: var(--bg-color);
  font-size: 30px;
  z-index: 100001;
  cursor: pointer;
  display: none;
  transform: rotate(0deg); /* Kezdeti forgatás */
  transition: transform 1s ease; /* Animáció */
}

@media (max-width: 1058px) {
  header {
    padding: 0px 60px;
  }
}

@media (max-width: 990px) {
  header {
    padding: 0px 4%;
  }
  #menu-icon {
    display: initial;
  }
  header .navbar {
    /* position: absolute;
        width: 240px;
        height: 100vh;
        top: 100%;
        left: -100%;
        display: flex;
        flex-direction: column;
        background: #ffffff59;
        backdrop-filter: blur(10px);
        row-gap: 1.4rem;
        padding: 20px;
        transition: 0.2s linear;
        text-align: left; */
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    transition: 0.5s all ease;
    max-width: 220px;
    height: 100%;
    backdrop-filter: blur(10px);
    background-color: #ffffff59;
    top: 0;
    left: -110%;
  }
  .navbar a {
    color: black;
    padding: 0px 10px;
  }
  .navbar a:hover {
    color: #00afea;
    border-color: #00afea;
  }
  .navbar.active {
    left: 0;
    justify-content: unset;
  }
}

ul,
.link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
}

li {
  text-transform: uppercase;
  padding: 10px;
}

.link {
  padding: 8px 17px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  transition: 0.3s ease all;
  padding: 4px;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #00afea;
    border-color: #46cdfa;
  }
}

.cart {
  position: absolute;
  top: 110%;
  right: -1000%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  background: white;
  padding: 20px;
  color: black;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 10px 4px rgb(14 55 54 / 15%);
}

.cart img {
  width: 100px;
}
.cart .box {
  display: flex;
  align-items: center;
  column-gap: 2rem;
}

.cart .box .text h3 {
  font-size: 1rem;
}

.cart .box .bx {
  font-size: 24px;
  
}

.cart .box .bx:hover {
  color: red;
  cursor: pointer;
}

.cart h2 {
  font-size: 1.1rem;
  font-weight: 600;
}

.cart.active {
  right: 1rem;
  transition: 0.5s;
}

.user {
  width: 300px;
  position: absolute;
  right: -1000%;
  top: 110%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  background: white;
  padding: 20px;
  border-radius: 0.5rem;
  color: black;
  box-shadow: 2px 2px 10px 4px rgb(14 55 54 / 15%);
}

.user h2 {
  font-size: 1.2rem;
  color: var(--text-color);
}

.user .login-btn {
  background: #4070f4;
  color: var(--bg-color);
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
}

.user .login-btn:hover {
  background: var(--text-color);
  letter-spacing: 2px;
  transition: 0.2s all;
}

.user input {
  border: none;
  outline: none;
  background: var(--second-color);
  padding: 10px;
  border-radius: 0.5rem;
  width: 100%;
}

.user p {
  font-size: 0.938rem;
}

.user a {
  color: #00afea;
}

.user a:hover {
  color: var(--text-color);
}

.user.active {
  right: 1rem;
  transition: 0.5s;
}

/* display: flex;
flex-direction: column;
position: fixed;
width: 100%;
transition: 0.5s;
max-width: 200px;
height: 100%;
backdrop-filter: blur(10px);
background-color: #ffffff59;
top: 0;
left: 0; */
</style>
