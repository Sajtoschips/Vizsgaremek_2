<template>
  <header :class="{ 'scrolled-nav': scrollPosition }">
    <nav>
      <div class="branding">
        <a href="/"><img src="../assets/img/gametrix.png" alt="" /></a>

      </div>
      <ul v-show="!mobile" class="navigation">
        <li>
          <router-link class="link" :to="{ name: 'Home' }">Nyitó oldal</router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Termekek' }">Termékek</router-link>
        </li>
        <li v-if="!status.loggedIn">
          <router-link class="link" :to="{ name: 'Registration' }">Regisztráció</router-link>
        </li>
        <li v-if="!status.loggedIn">
          <router-link class="link" :to="{ name: 'Login' }">Bejelentkezés</router-link>
        </li>
        <li v-if="status.loggedIn">
          <a class="link" href="#" @click="onLogout">Kijelentkezés</a>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Kosar' }"><ion-icon class="kosaricon" name="cart-outline"></ion-icon>({{
            data.countCartItems
          }})</router-link>
        </li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <router-link class="link" :to="{ name: 'Home' }" @click="closeMobileNav">Nyitó oldal</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'Termekek' }" @click="closeMobileNav">Termékek</router-link>
          </li>
          <div v-if="!status.loggedIn">
            <li>
              <router-link class="link" :to="{ name: 'Registration' }" @click="closeMobileNav">Regisztráció</router-link>
            </li>
            <li>
              <router-link class="link" :to="{ name: 'Login' }" @click="closeMobileNav">Bejelentkezés</router-link>
            </li>
          </div>
          <li v-if="status.loggedIn">
            <a class="link" href="#" @click="onLogout">Kijelentkezés</a>
          </li>
          <li>
            <router-link class="link" :to="{ name: 'Kosar' }" @click="closeMobileNav"><ion-icon class="kosaricon"
                name="cart-outline"></ion-icon>({{
                  data.countCartItems
                }})</router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/userstore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const { status, user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const router = useRouter();

import { useShoppingStore } from "../stores/shoppingStore";

const data = useShoppingStore();

import { ref, onMounted, onBeforeUnmount } from "vue";

const scrollPosition = ref(null);
const mobile = ref(true);
const mobileNav = ref(false);
const windowWidth = ref(null);

const closeMobileNav = () => {
  mobileNav.value = false;
};

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

onMounted(() => {
  window.addEventListener("resize", checkScreen);
  checkScreen();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
});

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 845) {
    mobile.value = true;
    mobileNav.value = false;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

// onBeforeUpdate(() => {
//   // Optional: Hook for logic before component updates
// });

function onLogout() {
  console.log(status.value);
  logout().then(() => {
    closeMobileNav();
    router.push("/");
  });
}
</script>

<style lang="scss" scoped>
.kosaricon {
  font-size: 17px;
}

header {
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  // position: fixed;
  transition: 0.5s ease all;
  color: #fff;
  z-index: 99;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 0px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 1140px) {
      max-width: 1140px;
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
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      padding: 4px;
      border-bottom: 1px solid transparent;

      &:hover {
        color: #00afea;
        border-color: #00afea;
      }
    }

    .branding {
      display: flex;
      align-items: center;

      img {
        width: 75px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .icon {
      position: absolute;
      display: flex;
      top: 0;
      align-items: center;
      right: 24px;
      height: 100%;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.8s ease all;
      }
    }

    .icon-active {
      transform: rotate(180deg);
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;

      li {
        margin-left: 0;

        .link {
          color: black;
        }
      }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
      transition: 0.5s all ease;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
      transform: translate(-250px);
    }

    .mobile-nav-enter-to {
      transform: translate(0);
    }
  }
}

// .icon {
//   width: 30px;
//   height: 30px;
//   margin: 5px;
//   color: black;
// }

// .kosar {
//   color: black;
// }
// .router-link {
//   color: black;
// }
</style>
