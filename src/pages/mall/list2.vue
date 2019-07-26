<template>
  <div class="shop-transfer">
    <div class="tranfer-hedaer">
      商家迁移
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cell">
          推荐人/市场专员：
          <Input
              v-model="params.keyword"
              class="dt-search-input"
              style="width: 100px"
              placeholder="账号、姓名、手机号码"
          />
      </div>
      <div class="dt-search-cell">
          电话号码：
          <Input
              v-model="params.keyword"
              class="dt-search-input"
              style="width: 100px"
              placeholder="账号、姓名、手机号码"
          />
      </div>
      <div class="dt-search-cell">
          入职时间：
        <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
      </div>
      <div class="dt-search-operation">

          <Button type="success" @click="handleReset">重置</Button>
          <Button type="ghost" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="add-btn">
          <Button type="success"  @click="handleTranfer">确定迁移</Button>
         
    </div>
     <Modal
        v-model="modal1"
        title="商家迁移"
        @on-ok="ok"
        @on-cancel="cancel">
        <p></p>
        <p>确定要迁移选中的商家到该推荐人名下吗？</p>
        <p></p>
    </Modal>
    <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table>
    <Page :total="100" show-sizer show-elevator />

  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1:false,
      params:{
        keyword:""
      },
      columns: [
           
            { type: 'selection', width: 60,align: 'center'}, 
             { type: 'index',  width: 60,align: 'center' }, 
            { title: '推荐人/市场专员',key: 'username'},
            { title: '电话号码',key: 'usermobile'},
            { title: '推荐码',key: 'userbalance'},
            { title: '已管理商家总数',key: 'shopName'},
            { title: '入职时间',key: 'shopPhone'},  
          ],
      data: [
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '12312312312',
             
          },
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
             
          },
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
             
          },
            {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
             
          },
      ],
    };
  },
  computed: {
    
  },
  mounted() {},
  methods: {
    handleDateSelect(){

    },
    handleReset(){

    },
    handleSearch(){

    },
    handleTranfer(){
      this.modal1 = true;
    },
    ok(){
      this.$Message.info('迁移成功');
    },
    cancel(){

    }
   
  }
};
</script>
<style lang="less" scoped>
  .tranfer-hedaer{
    position: relative;
    background: #093151;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    color:#fff;
  }
  .add-btn{
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    padding-left: 20px;
  
  }
  .ivu-page{
    display: flex;
    justify-content: center;
    margin-top:30px;
  }
</style>