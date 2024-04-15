import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/user/RegistrationView.vue'
import LoginView from '../views/user/LoginView.vue'
import ProductsView from '../views/productsViews/ProductsView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import CartView from '../views/CartView.vue'
import { useUserStore } from '../stores/userstore'
import ProductDetailsView from '../views/productsViews/ProductDetailsView.vue'
import { storeToRefs } from 'pinia'
import PageNotFound from "../views/PageNotFound.vue"
import ProfilView from "../views/user/ProfileView.vue"
import ResetPasswordView from "../views/user/ResetPasswordView.vue"
import SendEmail from '../views/user/sendEmail.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: "Home", component: HomeView},
    { path: '/regisztracio', name:"Registration" ,component: RegistrationView},
    { path: '/bejelentkezes', name: "Login",component: LoginView},
    { path: '/rolunk', name: "AboutUs",component: AboutView},
    { path: '/kontakt', name: "Contact",component: ContactView},
    { path: '/termekek', name: "Termekek", component: ProductsView},
    { path: '/kosar', name: "Kosar", component: CartView},
    { path: '/termek/:ProductName', name: "Termek", component: ProductDetailsView},
    { path: '/:pathName(.*)*', name: "PageNotFound", component: PageNotFound},
    { path: '/profil', name: "Profil", component: ProfilView},
    { path: '/jelszohelyreallitas/:token', name: "Elfelejtett jelszo", component: ResetPasswordView},
    { path: '/sendEmail', name: "Elfelejtett jelszo megadasa", component: SendEmail},

  ]
})

// router.beforeEach((to,from,next) =>{
//   const {status} = storeToRefs(useUserStore());
//   const publicPages = ['/','/bejelentkezes','/regisztracio','/termekek','/termek/:ProductName'];
//   const autRequired = !publicPages.includes(to.path);
//   if (autRequired && !status.value.loggedIn){
//     return next('/bejelentkezes')
//   }
//   next(); // tovább a to-ra
// });

export default router
