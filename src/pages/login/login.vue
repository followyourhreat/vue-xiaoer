<template>
  <div class="login">
    <div class="login-main">
      <div class="logo">
        <span></span>
        <span>利众生活云管理平台</span>
      </div>
      <Form class="loginForm" ref="form" :model="formData" :rules="rules" :label-width="0">
        <FormItem label prop="username">
          <Input v-model.trim="formData.username" placeholder="请输入用户名">
            <span slot="prepend">用户名：</span>
          </Input>
        </FormItem>
        <FormItem label prop="password" v-if="!eye">
          <Input
            v-model.trim="formData.password"
            placeholder="请输入密码"
            type="password"
            :maxlength="18"
          >
            <span slot="prepend">密码：</span>
            <span slot="append">
              <Icon type="eye-disabled" @click.native="handleEye"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem label prop="password" v-if="eye">
          <Input v-model.trim="formData.password" placeholder="请输入密码" :maxlength="18">
            <span slot="prepend">密码：</span>
            <span slot="append">
              <Icon type="eye" @click.native="handleEye"></Icon>
            </span>
          </Input>
        </FormItem>

        <!-- <FormItem label="" prop="verifyCode">
          <div class="code">
            <Input v-model.trim="formData.verifyCode" placeholder="请输入验证码" :maxlength="6" style="width:220px;">
              <span slot="prepend">验证码：</span>
            </Input>
            <Button type="primary"  >1324</Button>
          </div>
        </FormItem>-->
        <!-- <FormItem label prop="remember">
          <div class="remember">
            <Checkbox v-model="remember">记住密码</Checkbox>
            <div style="cursor: pointer" @click="handleRouter('forget')">忘记密码</div>
          </div>
        </FormItem>-->
        <FormItem label>
          <Button type="primary" long @click="handleLogin">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eye: false,
      remember: true,
      formData: {
        username: "",
        password: ""
        // verifyCode:""
      },
      rules: {}
    };
  },
  mounted() {
    this.remember = localStorage.getItem("remember") == "true" ? true : false;
    if (this.remember) {
      console.log("123123");
      this.formData.username = localStorage.getItem("username");
      this.formData.password = localStorage.getItem("password");
    }
    console.log("2222");
  },
  methods: {
    handleEye() {
      this.eye = !this.eye;
    },
    handleLogin() {
      //缓存
      localStorage.setItem("remember", this.remember ? "true" : "false");
      localStorage.setItem("username", this.formData.username);
      localStorage.setItem("password", this.formData.password);
      console.log("123");
      console.log(this);
      this.$http.post("/login", this.formData).then(res => {
        console.log(res);
        this.$Message.success("登录成功");
        this.$store.dispatch("setUserInfoAction", res.data);
        this.$router.push({ name: "index-list" });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  min-width: 1200px;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background: url("../../assets/bg.png") center center no-repeat;
  background-size: cover;
  .login-main {
    background-color: #ffffff;
    position: absolute;
    width: 400px;
    height: 480px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -220px;
    .logo {
      width: 260px;
      font-size: 30px;
      height: 55px;
      margin: 58px auto 48px;
      span {
        text-align: center;
        display: block;
      }
      span:nth-child(1) {
        font-size: 32px;
      }
      span:nth-child(2) {
        font-size: 26px;
      }
    }
    .loginForm {
      margin: 20px 30px;
    }
    .remember {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.code {
  .ivu-input-group {
    float: left;
  }
  button {
    position: relative;
    float: right;
    width: 60px;
  }
}
</style>
