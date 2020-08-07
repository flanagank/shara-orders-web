import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from "./services/auth-service"


import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

const authService = new AuthService(); //useless here, web app
Vue.prototype.$authService = authService;

localStorage.setItem("API_URL", "https://shara-orders-backend.herokuapp.com");

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')