import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'main',
        component: () =>
            import ('../components/Main.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../components/Signup.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () =>
            import ('../components/ForgotPassword.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import ('../components/Cart.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () =>
            import ('../components/Checkout.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router