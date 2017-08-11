import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import goods from './components/goods/goods';
// 下面的代码是为了让eslint跳过new的检查，正常的js必须给new赋值
/* eslint-disable no-new */
// new Vue({
//     el: 'body',
//     components: { App }
// });
Vue.use(VueRouter);
let app = Vue.extends(App);
let router = new VueRouter();
router.map({
    '/goods': {
        component: goods
    }
});
router.start(app, '#app');
