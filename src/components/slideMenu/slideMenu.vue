<template>
  <div class="slide">
    <div style="height:60px; background: #F6F8FC;text-align: center;">
      <img width="auto" height="40px" src="@/assets/logo.png" style="margin: 10px;">
    </div>
    <Menu accordion theme="dark" :active-name="activeName" width="auto" @on-select="changeMenu">
      <!-- <div v-for="(item,index) in menuList" :key="index">
        <MenuItem  v-if="item.checked" :name="item.url">
          <p class="icon" :class="item.icon"></p>
          <p>{{ item.menu_name }}</p>
        </MenuItem>
      </div> -->
      <!-- <div v-for="(item,index) in menuList" :key="index">
        <MenuItem :name="item.toName">
          <i class="icon" :class="item.icon"></i>{{ item.title }}
        </MenuItem>
      </div> -->
      <div v-for="(item,index) in menuList" :key="index">
        <MenuItem v-if="!item.hasChildren" :name="item.toName">
          <i class="icon" :class="item.icon"></i>{{ item.title }}
        </MenuItem>
        <Submenu v-else :name="item.toName">
          <template slot="title">
            <i class="icon" :class="item.icon"></i>{{ item.title }}
          </template>
          <MenuItem v-for="(item2,index2) in item.children" :key="index2" :name="item2.name">{{ item2.title }}</MenuItem>
        </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>
  import { pagesRouter } from '@/router/index'
  export default {
    name: 'slideMenu',
    data() {
      // var pagesRouter = JSON.parse(localStorage.getItem("menuInfo"))
      return {
        activeName: localStorage.getItem("menuName"),
        menuList: pagesRouter,
      }
    },
    methods: {
      changeMenu(name){
        localStorage.setItem("menuName",name)
        this.$router.push({name});
      }
    },
    watch: {
      
    },

    computed: {
      
    },
    mounted() {

    }
  };
</script>

<style lang="less" scoped>
  .slide{
    position: fixed;
    width: 200px;
    top: 0px;
    left:0px;
    bottom: 0px;
    z-index: 2;
    overflow: auto;
    background: #093151;
  }
  .icon{
    height: 20px;
    width: 20px;
    vertical-align: middle;
    display: inline-block;
  }
  //首页
  .home{
    background: url('/static/home.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //设备管理
  .shangpin{
    background: url('/static/shangpin.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //用户管理
  .zhanghao{
    background: url('/static/zhanghao.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //小二管理
  .xiaoer{
    background: url('/static/xiaoer.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //财务管理
  .caiwu{
    background: url('/static/caiwu.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //流程引擎
  .liucheng{
    background: url('/static/liucheng.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //进销存管理
  .jinxiaocun{
    background: url('/static/jinxiaocun.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //消息管理
  .message{
    background: url('/static/message.png') center center no-repeat;
    background-size: 100% 100%;
  }
  //系统管理
  .xitong{
    background: url('/static/xitong.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .slide>ul>div:nth-child(3) li>ul>li:nth-child(4){
    display: none;
  }
</style>
