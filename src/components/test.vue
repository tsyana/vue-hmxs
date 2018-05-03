<template lang="html">
  <div class="">
    <h3>helloworld</h3>
    <component :is="currentView" :login="login" :signup="signup"></component>
  </div>
</template>

<script>
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Success from '@/components/Success';
import ResetPassword from '@/components/ResetPassword';
import BasicInfo from '@/components/BasicInfo';

export default {
    data() {
        return {
            currentView: 'Signup',
            login: 'from login',
            signup: 'from signup',
        };
    },
    components: {
        Login,
        Signup,
        Success,
        ResetPassword,
        BasicInfo,
    },
};
</script>

<style lang="less">
</style>
