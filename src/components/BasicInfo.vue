<template>
  <div class="login-page">
    <div class="">
      <h3>请填写基本信息</h3>

      <mt-field label="姓名" :disabled="true" placeholder="请输入姓名" v-model="name"></mt-field>
      <mt-field label="身份证号" :disabled="true" placeholder="请输入身份证号"  v-model="card_id"></mt-field>
      <mt-field label="手机号" :disabled="true" placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
      <mt-field v-if="submitDisabled" label="城市" :disabled="submitDisabled" placeholder="请输入城市"  v-model="area_org_name"></mt-field>
      <div class="select-modal"   v-if="!submitDisabled">
        <span>城市</span>
        <multiselect
        class="select-muti"
        selectLabel=""
        deselectLabel=""
        v-model="city_org_name"
        placeholder="请输入城市"
        track-by="name"
        label="name"
        @input="selectChange"
        :options="cityList">
          >
        </multiselect>
      </div>
      <div class="select-modal" v-if="!submitDisabled">
        <span>区域</span>
        <multiselect
        class="select-muti"
        selectLabel=""
        deselectLabel=""
        v-model="area_org_name"
        placeholder="请输入区域"
        @input="selectChange"
        track-by="name"
        label="name"
        :options="areaList">
          >
        </multiselect>
      </div>
      <div class="select-modal" v-if="!submitDisabled">
        <span>门店名称</span>
        <multiselect
          class="select-muti"
          selectLabel=""
          deselectLabel=""
          v-model="organization_name"
          placeholder="请输入门店名称"
          track-by="name"
          label="name"
          :options="organizationList">
        >
        </multiselect>
      </div>

      <mt-field label="区域" v-if="submitDisabled" :disabled="submitDisabled" placeholder="请输入区域" v-model="city_org_name"></mt-field>
      <mt-field v-if="submitDisabled" label="门店名称" :disabled="submitDisabled" placeholder="请输入门店名称" v-model="organization_name"></mt-field>
      <mt-field label="紧急联系人" :disabled="submitDisabled"  placeholder="请输入紧急联系人" type="text" v-model="emergency_contact"></mt-field>
      <mt-field label="紧急联系人电话" :disabled="submitDisabled"  placeholder="请输入紧急联系人电话" type="tel" rows="4" v-model="emergency_contact_mobile"></mt-field>
      <div class="login-button">
        <mt-button size="large" type="primary" style="margin-bottom:10px;" :disabled="submitDisabled" @click="goHref()">提交</mt-button>
        <mt-button size="large" type="default" style="margin-bottom:10px;" @click="cancel">返回</mt-button>
      </div>

    </div>

  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { MessageBox } from 'mint-ui';
import 'vue-multiselect/dist/vue-multiselect.min.css';

export default {
    components: { Multiselect },
    data() {
        return {
            name: '',
            mobile: '',
            card_id: '',
            city_org_name: '',
            organization_name: '',
            area_org_name: '',
            emergency_contact_mobile: '',
            emergency_contact: '',
            isWeixin: false,
            organizationList: [],
            cityList: [],
            areaList: [],
            submitDisabled: false,
            value: { language: 'JavaScript', library: 'Vue-Multiselect' }, // eslint-disable-line
            options: [ // eslint-disable-line
                {	language: 'JavaScript', library: 'Vue.js' }, // eslint-disable-line
                { language: 'JavaScript', library: 'Vue-Multiselect' }, // eslint-disable-line
                { language: 'JavaScript', library: 'Vuelidate' }, // eslint-disable-line
            ],
        };
    },
    mounted() {
        this.getData();
        const u = navigator.userAgent;
        if (u.indexOf('MicroMessenger') > -1) {
            this.isWeixin = true;
        }
    },
    methods: {
        getData() {
            this.axios.post('/getEmployeeDetail').then((res) => {
                if (res.result == 0) { // eslint-disable-line
                    MessageBox.alert(res.messgage).then(() => {
                        this.$router.push('/');
                    });
                } else {
                    this.mobile = res.data.mobile;
                    this.card_id = res.data.card_id;
                    this.name = res.data.name;
                    if (res.data.has_submit == 1) { // eslint-disable-line
                        this.submitDisabled = true;
                        this.city_org_name = res.data.city_org_name;
                        this.organization_name = res.data.organization_name;
                        this.area_org_name = res.data.area_org_name;
                        this.emergency_contact_mobile = res.data.emergency_contact_mobile;
                        this.emergency_contact = res.data.emergency_contact;
                    } else {
                        this.areaSelect(2);
                    }
                }
            });
        },
        cancel() {
            if (!this.submitDisabled) {
                MessageBox.confirm('您未完成登记，确定离开?').then(() => {
                    this.$router.push('/');
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                this.$router.push('/');
            }
        },
        goHref() {
            const params = {
                name: this.name,
                mobile: this.mobile,
                card_id: this.card_id,
                city_org_name: this.city_org_name.name,
                organization_name: this.organization_name.name,
                area_org_name: this.area_org_name.name,
                city_org_id: this.city_org_name.id,
                organization: this.organization_name.id,
                area_org_id: this.area_org_name.id,
                emergency_contact_mobile: this.emergency_contact_mobile,
                emergency_contact: this.emergency_contact,
            };
            // if (this.verifyPhone(this.emergency_contact_mobile)) {
            this.axios.post('/saveEmployeeBasicInfo', params).then((res) => {
                if (res.result == 0) { // eslint-disable-line
                    MessageBox('提示', res.message);
                } else {
                    MessageBox.alert('您的信息已提交').then((action) => {
                        console.log(res, action);
                        this.getData();
                    });
                }
            });
            // } else {
            //     MessageBox('提示', '手机号输入不正确');
            // }
        },
        selectChange(val) {
            if (val) {
                if (val.org_level === '2') {
                    this.areaSelect(3, val.id);
                } else if (val.org_level === '3') {
                    this.areaSelect(4, val.id);
                }
            }
        },
        areaSelect(level, pid) {
            this.axios.post('/getOrgList', {
                org_level: level,
                parent_org_id: pid,
            }).then((cityRes) => {
                if (level === 2) {
                    this.cityList = cityRes.data;
                } else if (level === 3) {
                    this.areaList = cityRes.data;
                } else if (level === 4) {
                    this.organizationList = cityRes.data;
                }
            });
        },
    },
};
</script>

<style lang="less">
.mint-field .mint-cell-title{
  width: 125px;
}
.multiselect__tags{
  border: 0;
}

.select-modal{
  margin: 0 10px;
  height: 48px;
  line-height: 48px;
  text-align: left;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  span{
    display: inline-block;
    width: 125px;
    left: 0;
  }
  .select-muti{
    width: 155px;
  }
}


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
