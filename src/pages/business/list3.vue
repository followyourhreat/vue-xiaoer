<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          用户名：
          <Input
            v-model="params.user_name"
            class="dt-search-input"
            style="width: 100px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          店铺名称：
          <Input
            v-model="params.name"
            class="dt-search-input"
            style="width: 100px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          店铺手机号：
          <Input
            v-model="params.moblie"
            class="dt-search-input"
            style="width: 100px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          数据来源：
          <dt-select v-model="params.data_src" class="dt-search-select" url="dataSource"/>
        </div>
        <div class="dt-search-cell">
          状态：
          <dt-select v-model="params.withdrawals_status" class="dt-search-select" url="tradeStatu"/>
        </div>

        <div class="dt-search-cell">
          提现到：
          <dt-select v-model="params.pay_data_src" class="dt-search-select" url="packetType"/>
        </div>
        <div class="dt-search-cell">
          提现时间：
          <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
        </div>
        <!-- <div class="dt-search-cell">
          <al-selector ref="code" data-type="name" level="2" v-model="params.code" style="display: flow-root"  @on-change="areaChangeModal"/>
        </div> -->
      </div>
          <div class="dt-search-operation">
           
            <Button type="success" @click="handleReset">重置</Button>
             <Button type="ghost" @click="handleSearch">查询</Button>
          </div>
      </div>
    

      <div class="add-btn">
          <Button type="success"  @click="handleAgree">通过</Button>
          <Button type="error" @click="handleDeny">驳回</Button>
          <Button type="ghost" @click="handleExport">导出</Button>
      </div>
    <dt-table ref="table" url="ApplyList" :params="params" :columns="columns3"></dt-table>
      <!-- <Table highlight-row ref="currentRowTable" :columns="columns3" :data="data1" border></Table> -->



      <div class="count-data">
        <span>合计</span><span>提现金额</span><span>123132</span><span>店铺余额</span><span>123132</span>
      </div>
      <Page :total="100" show-sizer show-elevator />

      <Modal
        v-model="modal1"
        title="查看详情"
        @on-ok="handleOk"
        width="1000"
        @on-cancel="handleCancle">
        <div class="search-tp">
          <div class="dt-search-cell">
            数据来源：
            <dt-select v-model="params4.data_src" class="dt-search-select" url="dataSource"  style="width: 80px"/>
          </div>
          <div class="dt-search-cell">
            交易日期：
            <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
          </div>
          <div class="dt-search-operation">
           
            <Button type="success" @click="handleReset">重置</Button>
             <Button type="ghost" @click="handleSearch">查询</Button>
          </div>
        </div>    

        <!-- <Table highlight-row ref="currentRowTable2" :columns="columns4" :data="data2"></Table> -->
        
        <!-- <Page :total="100" show-sizer show-elevator /> -->

        <dt-table ref="table" url="detailsApply" :params="params4" :columns="columns4" v-if="isDetail"></dt-table>




      




      </Modal>
       <Modal
        v-model="modal2"
        title="确认"
        @on-ok="checkMoney"
        @on-cancel="cancel">
        <p>是否通过审核</p>
        <p>如果通过审核，提现金额将直</p>
        <p>接转入商家账户</p>
      </Modal>

      <Modal
        v-model="modal3"
        title="驳回审核"
        @on-ok="denyConfirm"
       >
        <p style="font-size:24px;color:#666;margin:20px auto;text-align:center;">驳回理由</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline style="width:300px;margin:auto;">
            <FormItem prop="desc">
                <FormItem label="" prop="desc">
                  <Input v-model="formDeny.desc" type="textarea" :autosize="{minRows: 5}"  placeholder="Enter something..."></Input>
              </FormItem>
            </FormItem>
        </Form>
      </Modal>





  </div>
  
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal3: false,
      user_id:"",
      params: {
        keyword: "",
        code:"",
        user_name:"",
        name:"",
        moblie:"",
        data_src:"",
        withdrawals_status:"",
        pay_data_src:"",
        updated_time:"",
        updated_time2:"", 
      },
      params4:{
        uid:"",
        data_src:"",
        updated_time:"",
        applyNo:"",
      },
      formDeny:{
        desc:"",
        applyNo:"",
      },
      isDetail:false,
      currentDetail:{},
      formInline: {
                    denyReason: '',
                   
                },
      ruleInline: {
                    denyReason: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    
                },
      columns: [
        { type: 'index', width: 60,align: 'center'},
        { type: 'selection', width: 60,align: 'center'},                       
        { title: "账号", key: "username", width: 150 },
        { title: "姓名", key: "realname", width: 150 },
        { title: "手机号码", key: "phone", width: 150 },
        {
          title: "等级",
          key: "level",
          width: 100,
          render: (h, params) => {
            const obj = { "1": "一级", "2": "二级" };
            const label = obj[params.row.level];
            return h("span", {}, label);
          }
        },
        {
          title: "上一级",
          key: "parent",
          width: 160,
          render: (h, params) => {
            const label =
              params.row.parent &&
              `${params.row.parent.realname}/${params.row.parent.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          render: (h, params) => {
            const obj = { "1": "正常", "2": "禁用" };
            const label = obj[params.row.status];
            return h("span", {}, label);
          }
        },
        {
          title: "月收入",
          key: "month_salary",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.month_salary;
            return h("span", {}, label);
          }
        },
        {
          title: "总收入",
          key: "total_salary",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.total_salary;
            return h("span", {}, label);
          }
        },
        {
          title: "总体评分",
          key: "total_points",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.total_points;
            return h("span", {}, label);
          }
        },
        {
          title: "地址",
          key: "address",
          width: 250,
          render: (h, params) => {
            const label = params.row.address;
            return h("span", {}, label);
          }
        },
        {
          title: "添加人",
          key: "creator",
          width: 190,
          render: (h, params) => {
            const label =
              params.row.creator &&
              `${params.row.creator.realname}/${params.row.creator.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "添加时间",
          key: "ctime",
          width: 150,
          render: (h, params) => {
            const label = new Date(params.row.ctime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        },
        {
          title: "操作",
          width: 320,
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleSync(params.row);
                    }
                  }
                },
                "同步设备"
              ),
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDetail2(params.row);
                    }
                  }
                },
                "运营详情"
              ),
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleReset(params.row);
                    }
                  }
                },
                "密码初始化"
              ),
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleEdit(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "span",
                {
                  class: "span-del",
                  on: {
                    click: () => {
                      this.handleRemove("agent/del", { id: params.row.id });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      columns3: [
            { type: 'index',  width: 60,align: 'center' },
            { type: 'selection', width: 60,align: 'center'},  
            { title: '用户名',key: 'user_name',width: 120},
            { title: '用户手机号',key: 'mobile',width: 150},
            { title: '用户奖励余额',key: 'userbalance',width: 150},
            { title: '店铺名',key: 'name',width: 100},
            { title: '店铺手机号',key: 'mobile',width: 150},
            { title: '提现金额',key: 'money',width: 150},
            { title: '店铺余额',key: 'smoney',width: 150},
            { title: '提现到',key: 'payDataSrc',width: 80,
              render: (h, params) => {
                const obj = { "0": "支付宝", "1": "微信"};
                const label = obj[params.row.payDataSrc];
                return h("span", {}, label);
              }
            },
            { title: '数据来源',key: 'dataSrc',width: 100,
              render: (h, params) => {
                const obj = { "0": "web", "1": "app" };
                const label = obj[params.row.dataSrc];
                return h("span", {}, label);
              }
            },
            { title: '状态',key: 'withdrawalsStatus',width: 80,
              render: (h, params) => {
                const obj = { "0": "待审核", "1": "提现成功","2":"提现失败"};
                const label = obj[params.row.withdrawalsStatus];
                return h("span", {}, label);
              }
            },
            { title: '提现失败的理由',key: 'reason',width: 160},
            { title: '提现时间',key: 'updated_time',width: 110},
            { title: '操作',key: 'operator',width: 120,
                render: (h, params) => {
                    return h("div", [
                    
                      h(
                        "span",
                        {
                          class: "span-active",
                          on: {
                            click: () => {
                              this.handleDetail(params.row.id);
                            }
                          }
                        },
                        "查看详情"
                      ),
                    
                    ]);
                }
            }  
              
            
          ],
      data1: [
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '12312312312',
              cash: '1231',
              shopName: '1231',
              shopBalance: '1231',
              cash1: '1231',
              dataSource: '1231',
              status: '1231',
              reason: '1231',
              time: '1999.09.10',
          },
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
              cash: '1231',
              shopName: '1231',
              shopBalance: '1231',
              cash1: '1231',
              dataSource: '1231',
              status: '1231',
              reason: '1231',
              time: '1231',
          },
          {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
              cash: '1231',
              shopName: '1231',
              shopBalance: '1231',
              cash1: '1231',
              dataSource: '1231',
              status: '1231',
              reason: '1231',
              time: '1231',
          },
            {
              username: 'John Brown',
              usermobile: 18,
              userbalance: '100',
              shopName: '1231',
              shopPhone: '1231',
              cash: '1231',
              shopName: '1231',
              shopBalance: '1231',
              cash1: '1231',
              dataSource: '1231',
              status: '1231',
              reason: '1231',
              time: '1231',
          },
      ],

      columns4:[
        { type: 'index',title:'序号',  width: 70,align: 'center' },      
        { title: '店铺名',key: 'shopName',},
        { title: '店铺手机号',key: 'shopPhone',},
        { title: '交易额',key: 'cash'},
        { title: '佣金',key: 'shopBalance'},
        { title: '到账金额',key: 'cash1'},
        { title: '数据来源',key: 'dataSource'},
        { title: '交易日期',key: 'time'},    
      ],
      data2:[
          {
            shopName: '1231',
            shopPhone: '12312312312',
            cash: '1231',
            shopBalance: '1231',
            cash1: '1231',
            dataSource: '1231',
            time: '1999.09.10',
        },
          {
            shopName: '1231',
            shopPhone: '12312312312',
            cash: '1231',
            shopBalance: '1231',
            cash1: '1231',
            dataSource: '1231',
            time: '1999.09.10',
        },
      ]

    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    },
  
  },
  mounted() {
    
  },

  methods: {
    handleDateSelect(){

    },
    handleReset(){},
    handleDetail(idx){
      this.modal1 = true;
      this.isDetail= true;
      this.params4.uid = idx;
      // this.$http.post("/detailsApply",params){
        
      // }


      
    },
    //获取提现详情
    checkMoney(){
      // let params = Object.assign({},this.currentDetail);
      this.$post("modifyApplyStatus", {apply_status:"1",apply_no:this.params4.applyNo,reason:""}).then(res => {
          this.$Message.success("审核成功");
          this.modal2 = false;
          this.handleSearch();
        });
    },
    handleAgree(){
      
     
      
      var arr = this.$refs.table.getSelect("applyNo");
      console.log(arr);
      if(arr.length>0){
        this.modal2 = true;
        this.params4.applyNo = arr[0];
        // this.$http.post("/detailsApply",{id:arr[0]}).then(res=>{
        //   this.user_id = res.data;
        //   console.log(this.currentDetail);
        // })
      }else{
        this.$Message.warning("请选择至少一项");
        return false;
      }
     



    },
    //通过审核
    
    handleDeny(){
    
       var arr = this.$refs.table.getSelect();
      
      if(arr.length>0){
        this.modal3 = true;
        this.user_id = arr[0];
        // this.$http.post("/detailsApply",{id:arr[0]}).then(res=>{
        //   this.user_id = res.data;
        //   console.log(this.currentDetail);
        // })
      }else{
        this.$Message.warning("请选择至少一项");
        return false;
      }
    },
    handleDenySubmit(){
      
    },
    handleExport(){},
    handleOk(){
        this.$Message.info('Clicked ok');
    },
    handleCancle () {
        this.$Message.info('Clicked cancel');
    },
    areaChangeModal(){

    },
    ok () {
        this.$Message.info('Clicked ok');
    },
    cancel () {
        this.$Message.info('Clicked cancel');
    },
    denyConfirm(){
      this.$http.post("modifyApplyStatus",{id:this.user_id,apply_status:"2",reason:this.formDeny.desc,applyNo:this.formDeny.applyNo}).then(res=>{
          this.$Message.success("驳回成功");
          this.modal3 = false;
          this.handleSearch();
      })
     
    },
    denyCancel(){
      this.$Message.info('Clicked cancel');
    }
  },
  watch: {
 
  }
};
</script>

<style lang="less" scoped>
.pickerMap {
  width: 100%;
  height: 388px;
  margin-top: 10px;
}
.title {
  padding-left: 8px;
  border-left: 10px solid #093151;
}
.cell {
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
}
.btn {
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 10px 10px 0px;
  color: #ffffff;
  background: #d8d8d8;
  display: inline-block;
}
.agent-search {
  max-width: 160px;
}
.agent-search2 {
  max-width: 160px;
  margin-left: 60px;
}
.agent-word {
  display: inline-block;
}
.agent-ul {
  min-width: 160px !important;
}


.ivu-page{
  display: flex;
  justify-content: center;
  margin-top:30px;
}
.add-btn{
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding-left: 20px;
 
}
.search-tp{
  position: relative;
  margin-bottom: 20px;
  .dt-search-cell{
    height: 35px;
    line-height: 35px;
    padding: 0px 20px 0px 0px;
    display: inline-block;
  }
  .dt-search-operation{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 35px;
    line-height: 35px;
  }
}
.count-data{
  position: relative;
  width:100%;
  overflow: hidden;
  span{
    display: block;
    float: left;
    border:1px solid #ccc;
    line-height: 48px;
    height: 48px;
    text-align: center;
  }
  span:nth-child(1){
    width:300px;
  }
   span:nth-child(2){
    width:150px;
  }
  span:nth-child(3){
    width:150px;
  }
  span:nth-child(4){
    width:150px;
  }
  span:nth-child(5){
    width:150px;
  }
}
.ivu-form-inline .ivu-form-item{
  width:100%;
  margin:auto;
}




</style>