class baseHistory {
    constructor(router) {
        this.router = router
        this.pathMap = {}
        this.router.routes.forEach(route => {
            this.pathMap[route.path] = route
        })
        this.current = this.getCurrentRoute()
    }
    listen(cb) {
        this.cb = cb
    }
    updateRouter(location) {
        const path = location ? location.path : null
        const route = this.getRouteByPath(path)
        if(!route) {
            console.error('找不到匹配的路由')
            return
        }
        this.cb(route)
    }
    getRouteByPath(path) {
        !path && (path = this.getCurrentPath())
        return this.pathMap[path]
    }
    // 获取当前路径匹配的route
    getCurrentRoute() {
        const path = this.getCurrentPath()
        return this.getRouteByPath(path)
    }
    // 获取当前路径
    getCurrentPath() {
        let path = window.location.pathname
        if(this.router.mode == 'hash') {
            path = window.location.hash
            path.startsWith('#') && (path = path.slice(1))
        }
        return path
    }
}
export default baseHistory