import Vue from 'vue'
import VueRouter from './core/index'
import App from './app.vue'
import Main from './main.vue'
import Foo from './foo.vue'
import Bar from './bar.vue'

Vue.use(VueRouter)

const routes = [
    { 
        path: '/',
        name: 'main',
        component: Main
    },
    { 
        path: '/foo',
        name: 'foo',
        component: Foo
    },
    { 
        path: '/bar', 
        name: 'bar',
        component: Bar
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

new Vue({
    el: '#app',
    router,
    render: (h) => h(App),
})