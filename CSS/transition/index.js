const Home = {
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>hello</p>
    </div>
  `
}

const Foo = { template: '<div class="foo">foo</div>' }
const Bar = { template: '<div class="bar">bar</div>' }

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/CSS/transition', component: Home },
    { path: '/CSS/transition/foo', component: Foo },
    { path: '/CSS/transition/bar', component: Bar }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Transitions</h1>
      <ul>
        <li><router-link to="/CSS/transition">/</router-link></li>
        <li><router-link to="/CSS/transition/foo">/foo</router-link></li>
        <li><router-link to="/CSS/transition/bar">/bar</router-link></li>
      </ul>
      <div class="view-wrap">
        <transition 
            name="fade">
            <router-view class="view"></router-view>
        </transition>
      </div>
    </div>
  `,
  methods: {
    beforeEnter: function (el) {
        // ...
        console.log('beforeEnter');
      },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      enter: function (el, done) {
        // ...
        done()
      },
      afterEnter: function (el) {
        // ...
      },
    
      // --------
      // 离开时
      // --------
    
      beforeLeave: function (el) {
        // ...
      },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      leave: function (el, done) {
        // ...
        console.log('leave');
        console.log(el);
      console.log(document.getElementById('app'));
        done()
        // console.log(el);
      },
      afterLeave: function (el) {
        // ...
      },
      // leaveCancelled 只用于 v-show 中
      leaveCancelled: function (el) {
        // ...
      }
  },
}).$mount('#app')