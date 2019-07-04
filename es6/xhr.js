
/**
 * @description 获取XMLHttpRequest对象
 */
function getXHR() {
  let xhr = null
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    try {
      xhr = new ActiveXObject('Msxml2.XMLHTTP')
    } catch (error) {
      try {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      } catch (error) {
        alert('您的游览器暂不支持Ajax!')
      }
    }
  }
  return xhr
}

const timer = setTimeout(function() {
  console.log('setTimeout')
}, 0)

function ajax(url, method) {
  const xhr = getXHR()
  xhr.onreadystatechange = function(e) {
    console.log('onreadystatechange', this.readyState)
    if(this.readyState === 4) {
      const status = this.status
      // console.log('status', status, e, this.responseText)
    }
  }
  xhr.onloadstart = function() {
    console.log('onloadstart')
  }
  xhr.onload = function() {
    console.log('onload', this.responseType, this.getResponseHeader('Content-Type'), this.getAllResponseHeaders())
  }
  xhr.onprogress = function(e) {
    console.log('progress:', e.loaded/e.total);
  }
  xhr.open(method, url, true)
  xhr.setRequestHeader('Cache-Control', 3600)
  xhr.send()
}

ajax('https://user-gold-cdn.xitu.io/2017/3/15/c6eacd7c2f4307f34cd45e93885d1cb6.png', 'GET')
console.warn('这里的log并不是最先打印出来的.')