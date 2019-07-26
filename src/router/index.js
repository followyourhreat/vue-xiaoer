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
    path: '/index',
    name: 'index',
    icon: 'shangpin',
    title: '首页',
    toName: 'index-list',
    component: Main,
    hasChildren: false,
    children: [{
      path: 'list',
      name: 'index-list',
      title: '首页',
      component: resolve => require(['../pages/index/list'], resolve)
    }]
  },
  {
    path: '/business',
    name: 'business',
    icon: 'zhanghao',
    title: '交易管理',
    toName: 'business-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'business-list',
        title: '交易记录查询',
        component: resolve => require(['../pages/business/list'], resolve)
      },
      {
        path: 'list2',
        name: 'business-list2',
        title: '订单记录查询',
        component: resolve => require(['../pages/business/list2'], resolve)
      },
      {
        path: 'list3',
        name: 'business-list3',
        title: '提现交易查询',
        component: resolve => require(['../pages/business/list3'], resolve)
      }
    ]
  },
 
  {
    path: '/mall',
    name: 'mall',
    icon: 'liucheng',
    title: '商家管理',
    toName: 'mall-list',
    component: Main,
    hasChildren: true,
    children: [{
        path: 'list',
        name: 'mall-list',
        title: '商家列表',
        component: resolve => require(['../pages/mall/list'], resolve)
      },
      {
        path: 'list2',
        name: 'mall-list2',
        title: '商家迁移',
        component: resolve => require(['../pages/mall/list2'], resolve)
      },
      {
        path: 'list3',
        name: 'mall-list3',
        title: '批量生成商家二维码',
        component: resolve => require(['../pages/mall/list3'], resolve)
      },
      
      {
        path: 'detail',
        name: 'detail',
        title: '商家详情',
        component: resolve => require(['../pages/mall/detail'], resolve)
      },
      {
        path: 'list4',
        name: 'mall-list4',
        title: '商家绑定',
        component: resolve => require(['../pages/mall/list4'], resolve)
      },
    ]
  },
  {
    path: '/system',
    name: 'system',
    icon: 'jinxiaocun',
    title: '系统管理',
    toName: 'system-list',
    component: Main,
    hasChildren: true,
    children: [{
      path: 'list',
      name: 'system-list',
      title: '角色管理',
      component: resolve => require(['../pages/system/list'], resolve)
    },
    {
      path: 'list2',
      name: 'system-list2',
      title: '组织机构管理',
      component: resolve => require(['../pages/system/list2'], resolve)
    },
    {
      path: 'list3',
      name: 'system-list3',
      title: '用户管理',
      component: resolve => require(['../pages/system/list3'], resolve)
    }]
  },

  // {
  //   path: '/finance',
  //   name: 'finance',
  //   icon: 'caiwu',
  //   title: '财务管理',
  //   toName: 'finance-list',
  //   component: Main,
  //   hasChildren: true,
  //   children: [{
  //       path: 'list',
  //       name: 'finance-list',
  //       title: '分润明细',
  //       component: resolve => require(['../pages/4_finance/list'], resolve)
  //     },
  //     {
  //       path: 'list2',
  //       name: 'finance-list2',
  //       title: '提现管理',
  //       component: resolve => require(['../pages/4_finance/list2'], resolve)
  //     },
  //   ]
  // },
  // {
  //   path: '/shop',
  //   name: 'shop',
  //   icon: 'jinxiaocun',
  //   title: '进销存管理',
  //   toName: 'shop-list',
  //   component: Main,
  //   hasChildren: true,
  //   children: [{
  //       path: 'list',
  //       name: 'shop-list',
  //       title: '货物管理',
  //       component: resolve => require(['../pages/6_shop/list'], resolve)
  //     },
  //     {
  //       path: 'list2',
  //       name: 'shop-list2',
  //       title: '代理商库存',
  //       component: resolve => require(['../pages/6_shop/list2'], resolve)
  //     },
  //   ]
  // },
  // {
  //   path: '/message',
  //   name: 'message',
  //   icon: 'message',
  //   title: '消息管理',
  //   toName: 'message-list',
  //   component: Main,
  //   hasChildren: false,
  //   children: [{
  //     path: 'list',
  //     name: 'message-list',
  //     title: '消息管理',
  //     component: resolve => require(['../pages/7_message/list'], resolve)
  //   }]
  // },
  
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
