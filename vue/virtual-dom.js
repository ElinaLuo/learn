/**
 * @description 模拟virtual dom算法
 * 1.用js对象创建dom树
 * 2.比较两颗虚拟dom树的差异(diff)
 * 3.将差异应用到真正的dom树上
 */
function Element(tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}
Element.prototype.render = function() {
  const el = document.createElement(this.tagName)
  for(let propName in props) {
    el.setAttribute(propName, props[propName])
  }
  const children = this.children || []
  children.forEach(child => {
    child instanceof Element ? 
    child.render()// 如果子节点也是虚拟DOM，递归构建DOM节点
    : document.createTextNode(child)// 如果字符串，只构建文本节点
    el.appendChild(child)
  })
  return el
}
// 创建一个ul的js dom树
const ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])
const uRoot = ul.render()
document.body.appendChild(uRoot)

function diff(oldTree, newTree) {
  let patches = {}
  dfs(oldTree, newTree, 0, patches)
}
function dfs(oldNode, newNode, index, patches) {
  patches[0] = [...]

  if()

  diffChildren(oldNode.children, newNode.children, index, patches)
}
function diffChildren(oldChildren, newChildren, index, patches) {
  var leftNode = null
  let currentNodeIndex = index
  oldChildren.forEach((child, i) => {
    let newChild = newChildren[i]
    currentNodeIndex
  })
}