import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/themes/md-light-indigo/theme.css'
// import 'primevue/resources/themes/aura-light-green/theme.css'
import './assets/scss/style.scss';


const app = createApp(App)
app.use(createPinia())
app.use(Toast)
app.use(router)
app.mount('#app')
