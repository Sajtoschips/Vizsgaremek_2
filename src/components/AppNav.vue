<template>
  <body colore-scheme="isDark ? 'dark' : 'light' ">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div class="navbar-nav col-md-6">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <div v-for="menu in menuItems">
                <li class="nav-item" v-if="menu.isLoggedIn">
                  <router-link class="nav-link" :to="menu.to">{{
                    menu.title
                  }}</router-link>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="navbar-nav col-md-6">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="!status.loggedIn">
              <div class="dropdown">
                <a id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><ion-icon
                    class="icon" name="person-outline"></ion-icon></a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link class="dropdown-item" to="/bejelentkezes">Bejelentkezés</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/regisztracio">Regisztráció</router-link>
                  </li>
                </ul>
                <router-link class="router-link" to="/cart"><ion-icon class="icon" name="cart-outline"></ion-icon>({{
                  data.countCartItems }})</router-link>
              </div>
            </li>
            
            
            <div v-if="status.loggedIn">
              <li class="nav-item" v-if="status.loggedIn">
                <a class="nav-link" href="#" @click="onLogout">Kijelentkezés</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </body>
</template>


<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/userstore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
const { status, user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const router = useRouter();

import { useShoppingStore } from "../stores/shoppingStore";
// get store
const data = useShoppingStore();

const menuItems = computed(() => {
  return [
    {
      title: "Nyitó oldal",
      to: "/",
      isLoggedIn: true,
    },
    {
      title: "Termékek",
      to: "/termekek",
      isLoggedIn: true,
    },
  ];
});

function onLogout() {
  console.log(status.value)
  logout().then(() => {
    router.push("/");
  });
}

</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  margin: 5px;
  color: black;
}

// .kosar {
//   color: black;
// }
.router-link {
  color: black;
}
</style>
