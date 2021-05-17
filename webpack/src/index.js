require('./style.css');
import Vue from 'vue';
import App from './app.vue';

new Vue({
  el: '#app',
  render: createElement => createElement(App, {
    props: {
      message: 'hello vue',
    }
  }),
})
