let data = {
    a: ''
}
let temp = data.a
Object.defineProperty(data, 'a', {
    get: function() {
        console.log('get methods called');
        return temp 
    },
    set: function(value) {
        console.log('set methods called');
        temp = value
    }
})

// data.a
// data.a = 'a'
data = Object.assign(data, {
    a: '1'
})
data.a
data.a = 'a'