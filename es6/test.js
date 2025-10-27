function myCreate(proto, props) {
    function F() {}
    F.prototype = proto
    const obj = new F()
    if (props !== undefined) {
        Object.defineProperties(obj, props)
    }
    return obj
}

function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const res = fn.apply(obj, args)
    return typeof res === 'object' || typeof res === 'function' ? res : obj
}

function myNew2(fn, ...args) {
    const obj = {}
    Object.setPrototypeOf(obj, fn.prototype)
    obj.constructor = fn
    const res = fn.apply(obj, args)
    return typeof res === 'object' || typeof res === 'function' ? res : obj
}

function Color(color) {
    this.color = color
}

Color.prototype.getDescription = function () {
    console.log(`颜色是${this.color}`)
}

const pink = myNew(Color, 'pink')
console.log(pink);
console.log(pink.constructor)
console.log(Color.prototype.constructor)