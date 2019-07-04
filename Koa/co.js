function getData(param) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(param)
            return param
        }, 1000)
    })
}
function * test() {
    console.log('start')
    const res1 = yield getData(1)
    console.log('res1', res1)
    const res2 = yield getData(2)
    console.log('res2', res2)
}
const gen = test()
// let res = gen.next()

function co(gen) {
    let res = gen.next()
    if(!res.done) {
        // co中约定value为Promise
        res.value.then(() => {
            co(gen)
        })
    }
}
console.log(co(gen))