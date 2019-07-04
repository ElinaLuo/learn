import hashHistory from './history/hash.js'
import html5History from './history/html5.js'
import { install } from './install'


class VueRouter {
    constructor({ mode, routes }) {
        this.apps = []
        this.mode = mode || 'history'
        this.routes = routes
        if(this.mode == 'history') {
            this.history = new html5History(this)
        } else {
            this.history = new hashHistory(this)
        }
    }
    init(app) {
        this.apps.push(app)
        this.history.listen(route => {
            this.apps.forEach(app => {
                app._route = route
            })
        })
    }
    push (location) {
        this.history.push(location)
    }

    replace (location) {
        this.history.replace(location)
    }

    go (n) {
        this.history.go(n)
    }

    back () {
        this.go(-1)
    }

    forward () {
        this.go(1)
    }
}

VueRouter.install = install

export default VueRouter