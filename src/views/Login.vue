<template>
  <div class="login">
    <!-- 头部 -->
    <div class="nav">
      <div class="left">
        <img src="../assets/icons/home_active.png" alt />
        <span>luckin coffee</span>
      </div>
      <div class="right" @click="toHome">先逛一逛</div>
    </div>
    <!-- 头部结束 -->
    <!-- banner -->
    <div class="banner">
      <div class="top">欢迎回来</div>
      <div class="bottom">Please longin your accounts</div>
    </div>
    <!-- banner结束 -->
    <!-- 输入框 -->
    <div class="inp">
      <van-form @submit="onSubmit">
        <van-field v-model="userInfo.phone" name="手机号" label="手机号" placeholder="手机号" />

        <van-field
          v-model="userInfo.password"
          :type="showPassword?'password':'text'"
          name="密码"
          label="密码"
          placeholder="密码"
          :right-icon="showPassword?'closed-eye':'eye-o'"
          @click-right-icon="showPassword =!showPassword"
        />
        <!-- 忘记密码 -->
        <div class="fgPsw">忘记密码?</div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="login">登录</van-button>
        </div>
        <div style="margin: 16px;">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            style="background:white;border: 1px solid black;color: black;"
            @click="showPopup"
          >注册</van-button>
        </div>
      </van-form>
    </div>
    <!-- 输入框结束 -->
    <!-- 注册信息填写弹出层 -->
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '50%' }">
      <div class="register_box">
        <h2>注册</h2>
        <div class="register">
          <van-field v-model="registerInfo.phone" name="手机号" label="手机号" placeholder="手机号" />

          <van-field
            v-model="registerInfo.password"
            :type="showPassword?'password':'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="showPassword?'closed-eye':'eye-o'"
            @click-right-icon="showPassword =!showPassword"
          />
          <van-field
            v-model="registerInfo.nickName"
            type="primary"
            name="昵称"
            label="昵称"
            placeholder="昵称"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="register">注册</van-button>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 弹出层结束 -->
  </div>
</template>

<script>
import "../assets/less/login.less";
import { validForm } from "../assets/validForm.js";
export default {
  data() {
    return {
      show: false,
      showPassword: true,
      userInfo: {
        phone: "",
        password: "",
      },
      registerInfo: {
        phone: "",
        password: "",
        nickName: "",
      },
    };
  },
  methods: {
    onSubmit() {},
    showPopup() {
      this.show = true;
    },
    register() {
      //构造表单验证信息  注册正则
      let o = {
        phone: {
          value: this.registerInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.registerInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.registerInfo.nickName,
          errorMsg: "昵称由字母数字下划线汉字组合(1-10字符)",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        },
      };

      let isPass = validForm.valid(o);
      console.log(isPass);
      if (!isPass) {
        return;
      }
      this.axios({
        method: "post",
        url: "/register",
        data: {
          appkey: this.appkey,
          nickName: this.registerInfo.nickName,
          password: this.registerInfo.password,
          phone: this.registerInfo.phone,
        },
      })
        .then((res) => {
          console.log("提交注册信息", res);
          if (res.data.code == 100) {
            this.$toast(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      //构造表单验证信息  注册正则
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码由数字字母下划线组合(6-16字符)",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };

      let isPass = validForm.valid(o);
      console.log(isPass);
      if (!isPass) {
        return;
      }
      this.axios({
        method: "post",
        url: "/login",
        data: {
          appkey: this.appkey,
          password: this.userInfo.password,
          phone: this.userInfo.phone,
        },
      })
        .then((res) => {
          console.log("提交登录信息", res);
          if (res.data.code == 200) {
            this.$toast(res.data.msg);
            // 将返回的token存入localStorage
            localStorage.setItem("token", res.data.token);
            // 返回上一级页面
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toHome(){
      this.$router.push({name:"Home"});
    },
  },
};
</script>

<style>
</style>