<template>
  <div class="login-page">
    <div class="">
      <img src="@/assets/logo-hmxs.png" alt="" class="logo">
      <mt-field label="验证码" class="test" placeholder="请输入验证码"  v-model="verify_code">
        <mt-button :disabled="reDisabled" @click="reSend()" type="default">{{time == 0 ? '重新发送' : time + '秒后重发'}}</mt-button>
      </mt-field>
      <mt-field label="新密码" type="password" placeholder="请输入新密码" v-model="password"></mt-field>
      <mt-field label="再次输入密码" :state="passwordState" type="password" placeholder="请再次输入密码"  v-model="password2"></mt-field>
      <div class="login-button">
        <mt-button size="large" type="primary" :disabled="verify_code == '' || password != password2 || (password == '' || password2 == '')" style="margin-bottom:10px;" @click="goHref()">确认</mt-button>
        <mt-button size="large" type="default" style="margin-bottom:10px;" @click="$router.push('/')">取消</mt-button>
      </div>

    </div>
    <!-- <div class="modal-part" v-if="isWeixin">
      <div class="">
        <h3>为了更好体验:<br><br>安卓用户请选择使用手机<span class="strong">原生浏览器</span>打开<br><br>IOS用户请选择在<span class="strong">safari</span>中打开</h3>
      </div>
      <div class="btn-part">
        <mt-button plain type="danger" @click="isWeixin = false">继续在微信中访问</mt-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
    data() {
        return {
            verify_code: '',
            password: '',
            password2: '',
            isWeixin: false,
            time: 60,
            reDisabled: true,
        };
    },
    mounted() {
        this.timeClock();
        const u = navigator.userAgent;
        if (u.indexOf('MicroMessenger') > -1) {
            this.isWeixin = true;
        }
    },
    computed: {
        passwordState() {
            if (this.password === '' || this.password2 === '') {
                return 'nolog';
            } else { // eslint-disable-line
                if (this.password == this.password2) { // eslint-disable-line
                    return 'success';
                } else { // eslint-disable-line
                    return 'error';
                }
            }
        },
    },
    methods: {
        timeClock() {
            const self = this;
            if (self.time === 0) {
                self.reDisabled = false;
            } else {
                self.time -= 1;
                if (self.time === 0) {
                    self.reDisabled = false;
                } else {
                    setTimeout(() => {
                        self.timeClock();
                    }, 1000);
                }
            }
        },
        reSend() {
            this.time = 60;
            this.reDisabled = true;
            this.timeClock();
        },
        goHref() {
            if (this.verifyPassword(this.password)) {
                this.axios.post('/resetPassword', {
                    verify_code: this.verify_code,
                    password: this.password,
                    password2: this.password2,
                    mobile: this.$route.query.mobile,
                }).then((res) => {
                    if (res.result === 1) {
                        MessageBox.alert('修改成功').then((action) => {
                            console.log(res, action);
                            this.$router.push({
                                path: '/',
                            });
                        });
                    } else {
                        MessageBox('提示', res.message);
                    }
                });
            } else {
                MessageBox('提示', '密码必须6位数字与字母组合');
            }
        },
    },
};
</script>

<style lang="less">
  .login-page{
    .mint-field .mint-cell-title{
      text-align: left;
    }

    .logo{
      width: 80%;
      margin: 10%;
    }
    .login-button{
      margin: 40px 10px 0px;
    }
    .modal-part{
      background: #010b17;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      .btn-part{
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate(-50%);
      }
      img{
        position: absolute;
        right: 0;
      }
      h3{
        font-weight: 300;
        color: white;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 40%;
        font-size: 16px;
        left: 50%;
        .strong{
          font-weight: 600;
          color: firebrick;
        }
      }
    }
  }
</style>
