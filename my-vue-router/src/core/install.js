import Vue from 'vue'
import Link from './components/router-link.vue'
import View from './components/router-view.vue'

export function install() {
    Vue.mixin({
        beforeCreate() {
            // root
            if(this.$options.router) {
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this)
                // 响应式
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        },
    })

    // 注册组件
    Vue.component('router-link', Link)
    Vue.component('router-view', View)

    // 代理
    Object.defineProperty(Vue.prototype, '$router', {
        get: function() {
            return this._routerRoot._router
        }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get: function() {
            return this._routerRoot._route
        }
    })
}