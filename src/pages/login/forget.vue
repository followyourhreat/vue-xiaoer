<template>
  <div class="login">
    <div class="login-main" @keyup.enter="handleLogin">
      <div class="logo">酷蛙小二运营平台</div>
      <Form class="loginForm" ref="form" :model="formData" :rules="rules" :label-width="0">
        <FormItem label="" prop="username">
          <Input v-model.trim="formData.username" placeholder="请输入手机号" :maxlength="11">
            <span slot="prepend">手机号：</span>
          </Input>
        </FormItem>
        <FormItem label="" prop="vcode">
          <div class="code">
            <Input v-model.trim="formData.vcode" placeholder="请输入验证码" :maxlength="6" style="width:220px;">
              <span slot="prepend">验证码：</span>
            </Input>
            <Button type="primary" :disabled="isSend" @click="handleSendCode">{{BtnText}}</Button>
          </div>
        </FormItem>
        <FormItem label="" prop="password">
          <Input v-model.trim="formData.password" placeholder="请输入新密码" :maxlength="18" type="password">
            <span slot="prepend">新密码：</span>
          </Input>
        </FormItem>
        <FormItem label="" prop="repassword">
          <Input v-model.trim="formData.repassword" placeholder="请输入确认密码" :maxlength="18" type="password">
            <span slot="prepend">确认密码：</span>
          </Input>
        </FormItem>
        <FormItem label="">
          <Button type="primary" long @click="handleSubmit">确定</Button>
        </FormItem>
        <FormItem label="">
          <Button type="text" long @click="handleRouter('login')">返回</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSend: false,
        BtnText: '获取验证码',
        formData: {
          username: '',
          password: '',
          repassword: '',
          vcode: ''
        },
        rules: {

        }
      }
    },
    mounted () {
      
    },
    methods: {
      handleSendCode(){
        if(!/^1[0-9]{10}$/.test(this.formData.username)){
          this.$Message.warning('请输入正确格式的手机号');
          return
        }
        // you can write ajax request here
        this.$post('admin/sendvcode',this.formData).then( res => {
          this.$Message.warning('验证码已发送');
          let timeLast = 60;
          let timer = setInterval(() => {
              if (timeLast >= 0) {
                  this.isSend = true;
                  this.BtnText = timeLast + '秒后重试';
                  timeLast -= 1;
              } else {
                  clearInterval(timer);
                  this.isSend = false;
                  this.BtnText = '获取验证码';
              }
          }, 1000);
        })
      },
      handleSubmit () {
        if(!/^1[0-9]{10}$/.test(this.formData.username)){
          this.$Message.warning('请输入正确格式的手机号');
          return
        }
        if(this.formData.password != this.formData.repassword){
          this.$Message.warning('2次输入密码不一致');
          return
        }
        this.$post('admin/resetpwd',this.formData).then( res => {
          this.$Message.success('操作成功,请重新登录');
          this.handleRouter('login');
        }) 
      }
    },
  };
</script>

<style lang="less" scoped>
  .login{
    min-width: 1200px;
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: url('/static/bg.png')  center center no-repeat;
    background-size: cover;
    .login-main{
      background-color: #ffffff;
      position: absolute;
      width: 400px;
      height: 480px;
      left: 50%;
      top: 50%;
      margin-left: -200px;
      margin-top: -220px;
      .logo{
        width: 260px;
        font-size: 30px;
        height: 55px;
        margin: 58px auto 48px;
      }
      .loginForm{
        margin: 20px 30px;
      }
      .code{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
</style>
