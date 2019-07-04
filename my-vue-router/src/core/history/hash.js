import baseHistory from './base'

class hashHistory extends baseHistory {
    constructor(router) {
        super(router)
        
        window.addEventListener('hashchange', () => {
            this.updateRouter()
        })
        // URL修正
        if(!window.location.hash) {
            this.push({
                path: '#/'
            })
        }
    }
    push(location) {
        window.location.hash = location.path
    }
    replace(location) {
        window.location.replace(getUrl(location.path))
    }
    go(n) {
        window.history.go(n)
    }
}

function getUrl (path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
}

export default hashHistory