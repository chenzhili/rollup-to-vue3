import { createApp, h } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
// 局部引入
import '../lib/test/index.min.css'
import Test from '../lib/test/index'
// import '../lib/time.esm.css'
// 全局引入方式
import TestUI from '../lib/index'
import '../lib/index.min.css'


const app = createApp({
  render: () => h(App)
})
// console.log(app);
// app.component(Test.name, Test)
/* 全局引入方式 */
app.use(TestUI)
/* 局部引入方式 */
// app.use(Test)

app.mount('#app');
// Vue.component(Test.name, Test)
// new Vue({
//   render: (h) => h(App)
// }).$mount('#app')