// https://www.zcfy.cc/article/es-modules-a-cartoon-deep-dive-mozilla-hacks-the-web-developer-blog
import { count } from './counter.js.js'
import render from './render.js.js'

console.log('main--', count)
render()

export let message = 'eval complete'