<template>
  <div class="page">
    <Tabs :animated="false">
      <TabPane label="常见问题" name="name1" v-if="tab[0].checked"><problem /></TabPane>
      <TabPane label="公司信息" name="name2" v-if="tab[1].checked"><company /></TabPane>
      <TabPane label="用户指南" name="name3" v-if="tab[2].checked"><user /></TabPane>
      <TabPane label="系统设置" name="name4" v-if="tab[3].checked"><setting /></TabPane>
      <TabPane label="修改密码" name="name5" v-if="tab[4].checked"><password /></TabPane>
    </Tabs>
  </div>
</template>
<script>
  import problem from './problem.vue'
  import company from './company.vue'
  import user from './user.vue'
  import setting from './setting.vue'
  import password from './password.vue'
  export default {
    components: {
      problem,
      company,
      user,
      setting,
      password,
    },
    data () {
      var pagesRouter = JSON.parse(localStorage.getItem("menuInfo"))
      return {
        tab: pagesRouter[9].child
      }
    },

    mounted () {

    },

    methods: {
    
    },
  };
</script>