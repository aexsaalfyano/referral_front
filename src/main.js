import Vue from 'vue'
import App from './App.vue'
import router from './router'


// Tailwind CSS
import '@/assets/css/tailwind.css'


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')