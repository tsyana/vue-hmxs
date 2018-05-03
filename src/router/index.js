import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Success from '@/components/Success';
import ResetPassword from '@/components/ResetPassword';
import BasicInfo from '@/components/BasicInfo';
import Test from '@/components/test';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/test',
            name: 'Test',
            component: Test,
        },
        {
            path: '/success',
            component: Success,
        },
        {
            path: '/signup',
            component: Signup,
        },
        {
            path: '/reset',
            component: ResetPassword,
        },
        {
            path: '/basic',
            component: BasicInfo,
        },
    ],
});
