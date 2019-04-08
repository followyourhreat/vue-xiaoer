import Vue from 'vue'
import Router from 'vue-router'
//src重定义为@
import Main from '@/pages/Main'

Vue.use(Router)

//基础路由,一般不包含父组件Main
export const baseRouter = [{
    path: '/',
    name: 'login',
    title: '登录',
    component: resolve => require(['../pages/login/login.vue'], resolve)
  },
  {
    path: '/forget',
    name: 'forget',
    title: '忘记密码',
    component: (resolve) => require(['../pages/login/forget.vue'], resolve)
  }
];

/*
 *作为Main组件的子页面展示并且在左侧菜单显示的路由,参数说明
 *@path 路径
 *@name 路由别名
 *@icon 一级菜单图标
 *@title 名字
 *@toName 跳转指定二级菜单
 *@component 对应组件加载
 *@hasChildren 是否有二级菜单
 *@children 二级菜单
 */
export const pagesRouter = [
  // {
  //   path: '/home',
  //   name: 'home',
  //   icon: 'home',
  //   title: '首页',
  //   toName: 'home-index',
  //   component: Main,
  //   hasChildren: false,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'home-index',
  //       title: '首页',
  //       component: resolve => require(['../pages/home3/index3'], resolve)
  //     }
  //   ]
  // },
  {
    path: '/device',
    name: 'device',
    icon: 'shangpin',
    title: '设备管理',
    toName: 'device-list',
    component: Main,
    hasChildren: false,
    children: [{
      path: 'list',
      name: 'device-list',
      title: '设备管理',
      component: resolve => require(['../pages/1_device/list'], resolve)
    }]
  },
  {
    path: '/account',
    name: 'account',
    icon: 'zhanghao',
    title: '用户管理',
    toName: 'account-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'account-list',
        title: '角色管理',
        component: resolve => require(['../pages/2_account/list'], resolve)
      },
      {
        path: 'list2',
        name: 'account-list2',
        title: '运营账号管理',
        component: resolve => require(['../pages/2_account/list2'], resolve)
      },
      {
        path: 'list3',
        name: 'account-list3',
        title: '运营商管理',
        component: resolve => require(['../pages/2_account/list3'], resolve)
      }
    ]
  },
  {
    path: '/xiaoer',
    name: 'xiaoer',
    icon: 'xiaoer',
    title: '小二管理',
    toName: 'xiaoer-list',
    component: Main,
    hasChildren: false,
    children: [{
      path: 'list',
      name: 'xiaoer-list',
      title: '小二管理',
      component: resolve => require(['../pages/3_xiaoer/list'], resolve)
    }]
  },
  {
    path: '/finance',
    name: 'finance',
    icon: 'caiwu',
    title: '财务管理',
    toName: 'finance-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'finance-list',
        title: '分润明细',
        component: resolve => require(['../pages/4_finance/list'], resolve)
      },
      {
        path: 'list2',
        name: 'finance-list2',
        title: '提现管理',
        component: resolve => require(['../pages/4_finance/list2'], resolve)
      },
    ]
  },
  {
    path: '/flow',
    name: 'flow',
    icon: 'liucheng',
    title: '流程引擎',
    toName: 'flow-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'flow-list',
        title: '流程管理',
        component: resolve => require(['../pages/5_flow/list'], resolve)
      },
      {
        path: 'list2',
        name: 'flow-list2',
        title: '工单管理',
        component: resolve => require(['../pages/5_flow/list2'], resolve)
      },
      {
        path: 'list3',
        name: 'flow-list3',
        title: '工单录入',
        component: resolve => require(['../pages/5_flow/list3'], resolve)
      }
    ]
  },
  {
    path: '/shop',
    name: 'shop',
    icon: 'jinxiaocun',
    title: '进销存管理',
    toName: 'shop-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'shop-list',
        title: '货物管理',
        component: resolve => require(['../pages/6_shop/list'], resolve)
      },
      {
        path: 'list2',
        name: 'shop-list2',
        title: '代理商库存',
        component: resolve => require(['../pages/6_shop/list2'], resolve)
      },
    ]
  },
  {
    path: '/message',
    name: 'message',
    icon: 'message',
    title: '消息管理',
    toName: 'message-list',
    component: Main,
    hasChildren: false,
    children: [{
      path: 'list',
      name: 'message-list',
      title: '消息管理',
      component: resolve => require(['../pages/7_message/list'], resolve)
    }]
  },
  {
    path: '/system',
    name: 'system',
    icon: 'xitong',
    title: '系统管理',
    toName: 'system-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'system-list',
        title: '库存操作日志',
        component: resolve => require(['../pages/8_system/1_stock'], resolve)
      },
      {
        path: 'account_log',
        name: 'account_log',
        title: '人员登录日志',
        component: resolve => require(['../pages/8_system/account_log'], resolve)
      },
      {
        path: 'allocate_log',
        name: 'allocate_log',
        title: '账号分配日志',
        component: resolve => require(['../pages/8_system/allocate_log'], resolve)
      },
      {
        path: 'password',
        name: 'password',
        title: '修改密码',
        component: resolve => require(['../pages/8_system/password'], resolve)
      },
      {
        path: 'sanction',
        name: 'sanction',
        title: '奖罚设置',
        component: resolve => require(['../pages/8_system/sanction'], resolve)
      },
      {
        path: 'setting',
        name: 'setting',
        title: 'APP设置',
        component: resolve => require(['../pages/8_system/setting'], resolve)
      }
    ]
  },
];

/*
 *作为Main组件的子页面展示但是不在左侧菜单显示的路由,参数说明
 *@path 路径
 *@name 路由别名
 *@title 名字
 *@component 对应组件加载
 */
export const othersRouter = [{
    path: '/user',
    name: 'user',
    title: '用户板块',
    component: Main,
    children: [{
        path: 'index',
        name: 'user-index',
        title: '用户信息',
        component: resolve => require(['../pages/user/index'], resolve)
      },
      {
        path: 'index2',
        name: 'user-index2',
        title: '修改密码',
        component: resolve => require(['../pages/user/index2'], resolve)
      },
    ]
  },
  {
    path: '/others',
    name: 'othersRouter',
    redirect: '/home',
    title: '单菜单',
    component: Main,
    children: [{
      path: 'edit',
      name: 'home-edit',
      title: '编辑',
      component: resolve => require(['../pages/home/index'], resolve)
    }]
  },
];

//网络错误路由403,404,500等等页面
export const errRouter = [{
    path: '/*',
    name: 'error-404',
    title: '404-页面不存在',
    component: resolve => require(['../pages/errorPage/404.vue'], resolve)
  },
  {
    path: '/403',
    name: 'error-403',
    title: '403-权限不足',
    component: resolve => require(['../pages/errorPage/403.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error-500',
    title: '500-服务端错误',
    component: resolve => require(['../pages/errorPage/500.vue'], resolve)
  },
];

//...将一个数组转为用逗号分隔的参数序列,组装成router
export default new Router({
  routes: [
    ...baseRouter,
    ...pagesRouter,
    ...othersRouter,
    ...errRouter,
  ]
})
