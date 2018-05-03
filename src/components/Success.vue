<template lang="html">
  <div class="success-page">
    <img src="@/assets/icon_03.png" alt="">
    <h3>您已成功验证</h3>
    <div class="btn-bar">
      <mt-button plain type="danger" @click="goContract">查看合同</mt-button>
      <mt-button plain type="primary" @click="goLogin">返回登录页</mt-button>
    </div>
  </div>
</template>

<script>

export default {
    methods: {
        goContract() {
            this.$router.push({
                path: '/contract',
                query: {
                    status: 0,
                },
            });
        },
        goLogin() {
            this.$router.push({
                path: '/',
            });
        },
    },
};
</script>

<style lang="less">
.success-page{
   position: absolute;
   top:30%;
   left:50%;
   width: 100%;
   transform:translate(-50%,-50%);
   .btn-bar{
      width: 100%;
      margin-top: 100px;
     button{
       width: 130px;
       height: 30px;
     }
   }
}
</style>
