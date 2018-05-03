// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import qs from 'qs';
import vueSignature from 'vue-signature';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'vue-fullpage/vue-fullpage.css';
import VueFullpage from 'vue-fullpage';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import Verify from './plugin/Verify';
import { env } from './config';

console.log(process.env.NODE_ENV, env);

const cdpAxios = axios.create({
    baseURL: env.baseUrl,
    // baseURL: '/api',
    headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        Authorization: localStorage.getItem('hm_token'),
    },
    transformRequest: [function (data) { // eslint-disable-line
        return qs.stringify(data);
    }],
    timeout: 10000,
    validateStatus: () => true,
});

// 添加一个请求拦截器
cdpAxios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('hm_token');
    return config;
}, (error) => { // eslint-disable-line
    return Promise.reject(error);
});

cdpAxios.interceptors.response.use((res) => {
    if (res.status.toString() === '200') return Promise.resolve(res.data.data);
    return Promise.reject();
}, error => Promise.reject(error));

Vue.use(VueAxios, cdpAxios);

Vue.use(vueSignature);
Vue.use(MintUI);
Vue.use(VueFullpage);
Vue.use(Verify);

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
