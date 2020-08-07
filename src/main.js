import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from "./services/auth-service"


import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

const authService = new AuthService();
Vue.prototype.$authService = authService;


// const productsService = new ProductsService();
// Vue.prototype.$productsService = productsService;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')