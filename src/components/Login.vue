<template>
  <div class="login-page">
    <div class="">
      <img src="@/assets/logo-hmxs.png" alt="" class="logo">
      <mt-field label="手机号" :state="phoneState" placeholder="请输入手机号" v-model="mobile"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password"  v-model="password"></mt-field>
      <div class="login-button">
        <mt-button size="large" type="primary" style="margin-bottom:10px;" @click="goHref('/signup')">注册</mt-button>
        <mt-button size="large" type="primary" style="margin-bottom:60px;" :disabled='loginDisabled || password == ""' @click="loginIn()">登录</mt-button>
        <a  style="color:#26a2ff;" @click="forgetPwd()">忘记密码？</a>
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
            password: '',
            mobile: '',
            isWeixin: false,
        };
    },
    props: {
        login: '',
    },
    computed: {
        loginDisabled() {
            return !this.verifyPhone(this.mobile);
        },
        phoneState() {
            switch (this.verifyPhone(this.mobile)) {
                case true:
                    return 'success';
                case false:
                    if (this.mobile === '') {
                        return '123';
                    } else { // eslint-disable-line
                        return 'error';
                    }
                default:
                    return 'nolog';
            }
        },
    },
    mounted() {
        localStorage.removeItem('hm_token');
        const u = navigator.userAgent;
        if (u.indexOf('MicroMessenger') > -1) {
            this.isWeixin = true;
        }
    },
    methods: {
        goHref(path) {
            this.$router.push({
                path,
            });
        },
        forgetPwd() {
            if (this.mobile === '') {
                MessageBox('提示', '请先填写手机号');
            } else if (!this.verifyPhone(this.mobile)) {
                MessageBox('提示', '请先填写正确的手机号');
            } else {
                this.axios.post('/SendVerifyCode', {
                    mobile: this.mobile,
                }).then((res) => {
                    if (res.result === 1) {
                        MessageBox.alert(res.message).then((action) => {
                            console.log(action);
                            this.$router.push({
                                path: '/reset',
                                query: {
                                    mobile: this.mobile,
                                },
                            });
                        });
                    } else {
                        MessageBox.alert('员工不存在，请先注册').then((action) => {
                            console.log(action);
                            this.$router.push('/signup');
                        });
                    }
                });
            }
        },
        loginIn() {
            this.axios.post('/login', {
                mobile: this.mobile,
                password: this.password,
            }).then((res) => {
                if (res.result === 1) {
                    this.$router.push({
                        path: '/basic',
                        query: {
                            from: 'login',
                        },
                    });
                    localStorage.setItem('hm_token', res.token);
                } else {
                    MessageBox('提示', res.message);
                }
            });
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
