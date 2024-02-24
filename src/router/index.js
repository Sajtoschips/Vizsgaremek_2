import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/user/RegistrationView.vue'
import LoginView from '../views/user/LoginView.vue'
import ProductsView from '../views/productsViews/ProductsView.vue'
import CartView from '../views/CartView.vue'
import { useUserStore } from '../stores/userstore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: "Home", component: HomeView},
    { path: '/regisztracio', name:"Registration" ,component: RegistrationView},
    { path: '/bejelentkezes', name: "Login",component: LoginView},
    { path: '/termekek', name: "Termekek", component: ProductsView},
    { path: '/kosar', name: "Kosar", component: CartView},
  ]
})

router.beforeEach((to,from,next) =>{
  const {status} = storeToRefs(useUserStore());
  const publicPages = ['/','/bejelentkezes','/regisztracio','/termekek','/kosar'];
  const autRequired = !publicPages.includes(to.path);
  if (autRequired && !status.value.loggedIn){
    return next('/bejelentkezes')
  }
  next(); // tovább a to-ra
});

export default router
