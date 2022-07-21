import Vue from 'vue'
import VueRouter from 'vue-router'
/* Home */
import Home from '../views/Home.vue'
import ListReferralCode from '../views/ReferralCodes/ListReferralCode.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    /*
     * ReferralCode Route
     */
    {
        path: '/referral',
        name: 'ListReferralCode',
        component: ListReferralCode,
        meta: {
            requiresAuth: false,
            // requiresAuth: true,
            // group: 'product',
            // role: ['ROLE_ADMIN']
        }
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// to.matched.some(item => item.meta.role.includes(store.getters['auth/userProfile'].role))

/* Navigation Guard for Auth Access */
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.getters['auth/isLoggedIn']) {
//             next()
//             return
//         }
//         next('/login')
//     } else {
//         next()
//     }
// })

export default router