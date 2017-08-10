import Vue from 'vue';
import App from './App';

// 下面的代码是为了让eslint跳过new的检查，正常的js必须给new赋值
/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App }
});

