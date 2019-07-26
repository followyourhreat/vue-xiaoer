<template>
  <div class="main">
    <dt-slideMenu/>
    <div class="main-header">
      <div class="main-left"></div>
      <div class="main-title">利众生活云管理平台</div>
      <div class="main-right" style="top: 10px">
        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        <Poptip trigger="click" placement="bottom-end" width="100px">
          <span class="user">{{userInfo.username}}</span>
          <div class="tips" slot="content">
            <!-- <div class="tip-item" @click="handleRouter('user-index')">用户信息</div>
            <div class="tip-item" @click="handleRouter('user-index2')">修改密码</div>-->
            <div class="tip-item" @click="handleLogout">退出登录</div>
          </div>
        </Poptip>
        <!-- <p style="font-size: 12px;color: #899ABE">{{userInfo.role_name}}</p> -->
      </div>
    </div>
    <div class="main-body">
      <!-- <transition name="singlePage"> -->
        <router-view></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    
  },
  methods: {
    handleLogout() {
      this.$router.push({ name: "login" });
      // this.$post("admin/logout", {}).then(res => {
      //   this.$router.push({ name: "login" });
      //   console.log("---退出登录---");
      // });
    }
  }
};
</script>

<style lang="less">
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 1200px;
}
.main-header {
  z-index: 1;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 60px;
  padding-left: 200px;
  box-shadow: 0 2px 1px 1px hsla(0, 0%, 39%, 0.1);
  background: #ffffff;
  .main-icon {
    display: inline-block;
    .ivu-btn-text {
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
  .main-title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
  .main-left {
    position: absolute;
    top: 20px;
    left: 220px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-size: 14px;
  }
  .main-right {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
  .user {
    cursor: pointer;
  }
  .tips {
    color: #333;
    text-align: center;
    .tip-item {
      padding: 5px 0px;
      cursor: pointer;

      &:hover {
        color: #f29100;
      }
    }
  }
}
.main-body {
  position: absolute;
  left: 200px;
  top: 60px;
  right: 0px;
  bottom: 0px;
  padding: 5px;
  background-color: #f6f8fc;
  transition: left 0.3s;
  overflow: auto;
}
</style>
