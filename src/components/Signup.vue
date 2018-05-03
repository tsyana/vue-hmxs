<template>
  <div class="login-page">
    <div class="">
      <img src="@/assets/logo-hmxs.png" alt="" class="logo">
      <mt-field label="姓名" placeholder="请输入姓名"  v-model="name"></mt-field>
      <mt-field label="手机号" :state="phoneState" placeholder="请输入手机号" v-model="mobile"></mt-field>
      <mt-field label="身份证号" :state="idState" placeholder="请输入身份证号"  v-model="card_id"></mt-field>
      <mt-field label="密码"  placeholder="请输入密码"  type="password" v-model="password"></mt-field>
      <mt-field label="重复密码" :state="passwordState" type="password" placeholder="请再次输入密码"  v-model="password2"></mt-field>
      <div class="login-button">
        <mt-button size="large" type="primary" :disabled="!verifyid || !verifyPhoneNumber || name == '' || password != password2 || (password == '' || password2 == '')" style="margin-bottom:10px;" @click="goHref()">注册</mt-button>
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
            name: '',
            mobile: '',
            card_id: '',
            password2: '',
            password: '',
            isWeixin: false,
        };
    },
    props: {
        signup: '',
    },
    computed: {
        verifyid() {
            return this.verifyID(this.card_id).pass;
        },
        verifyPhoneNumber() {
            return this.verifyPhone(this.mobile);
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
        idState() {
            switch (this.verifyID(this.card_id).pass) {
                case true:
                    return 'success';
                case false:
                    if (this.card_id === '') {
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
        const u = navigator.userAgent;
        if (u.indexOf('MicroMessenger') > -1) {
            this.isWeixin = true;
        }
    },
    methods: {
        goHref() {
            if (this.verifyPassword(this.password)) {
                this.axios.post('/register', {
                    name: this.name,
                    mobile: this.mobile,
                    card_id: this.card_id,
                    password: this.password,
                    password2: this.password2,
                }).then((res) => {
                    if (res.result === 1) {
                        this.$router.push({
                            path: '/basic',
                            query: {
                                from: 'signup',
                            },
                        });
                        localStorage.setItem('hm_token', res.token);
                    } else {
                        MessageBox('提示', res.message);
                    }
                });
            } else {
                MessageBox('提示', '密码长度在6-18位之间');
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
