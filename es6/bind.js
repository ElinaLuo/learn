/**
 * 函数绑定的实现源码
 */
Function.prototype._bind = function(context) {
    const args = Array.prototype.slice.call(arguments, 1)
    return (...rest) => {
        const bindArgs = Array.prototype.slice.call(rest)
        this.apply(context, args.concat(bindArgs))
    }
}


function func(...args) {
  console.log('my name is',this.name, args)
}

const data = {
  name: 'Tom'
}

func._bind(data, 1, 2)(3, 4)



