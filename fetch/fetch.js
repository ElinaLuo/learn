var url = 'http://m.51ping.com/beautytry/zerohelp/trialturn?channel=16';
var headers = new Headers()
headers.append('Content-Type', 'application/json;charset=UTF-8')

fetch(url, {
  // method: 'get',
  // headers,
  // credentials: 'include'
  // mode: 'no-cors'
}).then(function(response){
  console.log('第一次进入then...', response.type, response.headers.get('Content-Type'));
  if(response.status>=200 && response.status<300){
    console.log('Content-Type: ' + response.headers.get('Content-Type'));
    console.log('Date: ' + response.headers.get('Date'));
    console.log('status: ' + response.status);
    console.log('statusText: ' + response.statusText);
    console.log('type: ' + response.type);
    console.log('url: ' + response.url);
    return response.json();
  }else{
    return Promise.reject(new Error(response.statusText));
  }
}).then(function(data){
  console.log('第二次进入then...');
  console.log(data);
}).catch(function(e){
  console.log('抛出的错误如下:');
  console.log(e);
});