import baseHistory from './base'
const _key = Date.now().toFixed(3)

class html5History extends baseHistory {
    constructor(router) {
        super(router)

        window.addEventListener('popstate', () => {
            this.updateRouter()
        })
    }
    push(location) {
        window.history.pushState({ key: _key }, '', location.path)
        this.updateRouter(location)
    }
    replace(location) {
        window.history.replaceState({ key: _key }, '', location.path)
        this.updateRouter(location)
    }
    go(n) {
        window.history.go(n)
    }
    
}
export default html5History