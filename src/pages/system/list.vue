<template>
  <div class="role-manage">
    <Row>
      <Col span="24">
        <div class="role-left">
          <div class="role-header">角色列表</div>
          <div class="dt-search-top">
            <div class="dt-search-cell">
              角色名称：
              <Input
                v-model="params.keyword"
                class="dt-search-input"
                style="width: 100px"
                placeholder="请输入觉色名称"
              />
            </div>
         
            <div class="dt-search-operation">
              <Button type="success" @click="handleReset">重置</Button>
              <Button type="ghost" @click="handleSearch">查询</Button>
            </div>
          </div>
          <div class="add-btn">
            <Button type="success" @click="handleRole">角色录入</Button>
            <Button type="info" @click="handleEdit">角色编辑</Button>
            <Button type="default" @click="handleEntry">导入</Button>
            <Button type="info" @click="handleExport">导出</Button>
            <Button type="ghost" @click="handleDown">模板下载</Button>
          </div>
          <dt-table ref="table" url="/findAllRole" :params="params" :columns="columns"></dt-table>
          <!-- <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table>
          <Page :total="100" show-sizer show-elevator/> -->
        </div>
        <Modal v-model="modal1" title="角色录入" @on-ok="handleAddRole" @on-cancel="cancel">
          <Form ref="formInline" :model="formInline" inline :label-width="80">
            <FormItem label="角色名称">
              <Input v-model="formInline.name" placeholder="角色名称"></Input>
            </FormItem>
            <FormItem label="角色编码">
              <Input v-model="formInline.nameZh" placeholder="角色编码"></Input>
            </FormItem>
          </Form>
        </Modal>
        <Modal v-model="modal2" title="角色编辑" @on-ok="editDone" @on-cancel="cancel">
          <Form ref="formInline" :model="formInline" inline :label-width="80">
            <FormItem label="角色名称">
              <Input v-model="formInline.name" placeholder="角色名称"></Input>
            </FormItem>
            <FormItem label="角色编码">
              <Input v-model="formInline.nameZh" placeholder="角色编码"></Input>
            </FormItem>
          </Form>
        </Modal>
        <Modal v-model="modal3" title="提示" @on-ok="ok" @on-cancel="cancel">
          <p>是否删除该角色</p>
        </Modal>
      </Col>
    </Row>
    <Modal v-model="modal7" title="提示" @on-ok="ok" width="1000" @on-cancel="cancel">
      <div class="role-right">
        <div class="role-header">用户列表:董事长</div>
        <div class="dt-search-top">
          <div class="dt-search-cell">
            用户账户：
            <Input
              v-model="params.keyword"
              class="dt-search-input"
              style="width: 100px"
              placeholder="账号、姓名、手机号码"
            />
          </div>
          <div class="dt-search-cell">
            用户姓名：
            <Input
              v-model="params.keyword"
              class="dt-search-input"
              style="width: 100px"
              placeholder="账号、姓名、手机号码"
            />
          </div>

          <div class="dt-search-operation">
            <Button type="success" @click="handleReset">重置</Button>
            <Button type="ghost" @click="handleSearch3">查询</Button>
          </div>
        </div>

        <div class="add-btn">
          <Button type="success" @click="handleUser">用户录入</Button>
          <Button type="ghost" @click="handleUserEdit">用户编辑</Button>
          <Button type="primary" @click="handleAddUser">添加已有客户</Button>
        </div>
        <Table highlight-row ref="currentRowTable" :columns="columns2" :data="data2" border></Table>
        <Page :total="100" show-sizer show-elevator/>
      </div>
    </Modal>
    <Modal v-model="modal4" title="提示" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="用户账号">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="用户姓名">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="设置密码">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="重复密码">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="组织机构">
          <Select v-model="formItem.select">
            <Option value="beijing">利众客服部</Option>
            <Option value="shanghai">利众技术部</Option>
            <Option value="shenzhen">利众财务部</Option>
          </Select>
        </FormItem>
        <FormItem label="角色名称">
          <Select v-model="formItem.select2">
            <Option value="beijing">利众客服部</Option>
            <Option value="shanghai">利众技术部</Option>
            <Option value="shenzhen">利众财务部</Option>
          </Select>
        </FormItem>
        <FormItem label="电话号码">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="办公电话">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="常用邮箱">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal5" title="添加已有用户" @on-ok="ok" width="1000" @on-cancel="cancel">
      <div class="dt-search-top">
        <div class="dt-search-cell">
          用户账户：
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 100px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          用户姓名：
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 100px"
            placeholder="账号、姓名、手机号码"
          />
        </div>

        <div class="dt-search-operation">
          <Button type="success" @click="handleReset2">重置</Button>
          <Button type="ghost" @click="handleSearch2">查询</Button>
        </div>
      </div>
      <!-- <dt-table ref="table" url="/findAllRole" :params="params" :columns="columns"></dt-table> -->
      <Table highlight-row ref="currentRowTable" :columns="columns2" :data="data2" border></Table>
      <Page :total="100" show-sizer show-elevator/>
    </Modal>

    <Modal v-model="modal6" title="市场经理：权限设置" @on-ok="ok" @on-cancel="cancel">
      <Form ref="form" :model="formData" :label-width="100">
        <FormItem label="角色名称" prop="role_name">
          <Input v-model="formData.role_name" placeholder="请输入角色名称" :maxlength="10"></Input>
        </FormItem>
        <FormItem label="角色权限" prop="form2">
          <div style="height: 300px;overflow-y: auto;border: 1px solid #dddee1;">
            <Tree ref="tree" :data="menuList" show-checkbox></Tree>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal8" title="提示" @on-ok="ok" @on-cancel="cancel">
      <p>是否删除该角色</p>
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
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      modal8: false,
      showDetail: false,
      params: {
        keyword: ""
      },
      formInline: {
        name: "",
        nameZh: ""
      },
      formItem: {
        input: "",
        select: "",
        select2: ""
      },
      formData: {
        role_name: ""
      },
      menuList: [
        {
          title: "首页",
          expand: true,
          children: [
            { title: "会员总数" },
            { title: "商家总数" },
            { title: "会员总数" },
            { title: "会员总数" },
            { title: "会员总数" },
            { title: "会员总数" }
          ]
        },
        {
          title: "会员管理"
        },
        {
          title: "交易管理",
          expand: true,
          children: [
            { title: "交易记录查询" },
            { title: "交易记录查询" },
            { title: "交易记录查询" }
          ]
        },
        {
          title: "商家管理",
          expand: true,
          children: [
            { title: "交易记录查询" },
            { title: "交易记录查询" },
            { title: "交易记录查询" }
          ]
        },
        {
          title: "系统管理",
          expand: true,
          children: [
            { title: "交易记录查询" },
            { title: "交易记录查询" },
            { title: "交易记录查询" }
          ]
        }
      ],
      columns: [
        { type: "selection", width: 60, align: "center" },
        { type: "index", width: 60, align: "center" },
        { title: "角色编码", key: "name" },
        { title: "角色名称", key: "nameZh" },
        {
          title: "操作",
          key: "operator",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDelete(params.row.id);
                    }
                  }
                },
                "删除"
              ),
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
                "用户"
              ),

              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleRoleSign();
                    }
                  }
                },
                "权限设置"
              )
            ]);
          }
        }
      ],
      data: [
        {
          username: "John Brown",
          usermobile: "13812345678",
          userbalance: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          userbalance: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          userbalance: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          userbalance: "100"
        }
      ],
      columns2: [
        { type: "index", width: 60, align: "center" },
        { title: "用户账号", key: "username" },
        { title: "用户名称", key: "usermobile" },
        { title: "状态", key: "status" },
        {
          title: "操作",
          key: "operator",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDelete2();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data2: [
        {
          username: "John Brown",
          usermobile: "13812345678",
          status: "激活"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          status: "激活"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          status: "激活"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          status: "激活"
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    handleDateSelect() {},
    handleReset() {
      this.params.keyword = "";
    },
    handleRole() {
      this.modal1 = true;
    },
    handleEdit() {
      var arr = this.$refs.table.getSelect();
      if(arr.length == "1"){
        this.modal2 = true;
        let targetUser = {};
        this.$http.post("/detailsRole",{id:arr[0]}).then(res=>{
             this.formInline = Object.assign({},res.data);
        })
      }else{
        this.$Message.warning("请选择一项");

      }

    },
    editDone(){
      let params = Object.assign({},this.formInline);
      this.$http.post("/updRole",params).then(res=>{
         this.$Message.success('修改用户成功');
         this.handleSearch();
      })
    },
    handleEntry() {},
    handleExport() {},
    handleDown() {},
    handleDelete(idx) {
      this.$http.post("/delRole",{id:idx}).then(res=>{
         this.$Message.success('删除用户成功');
         this.handleSearch();
      })
    },
    handleDelete2() {
      this.modal8 = true;
    },
    handleDetail(idx) {
      this.modal7 = true;
      this.$http.post("/findAllUserById",{role_id:idx,pageNo:1}).then(res=>{
        console.log(res);
    })



    },
    handleRoleSign() {
      this.modal6 = true;
    },
    ok() {
      this.$Message.info("更新成功");
    },
    cancel() {},
    handleUser() {
      this.modal4 = true;
    },
    handleUserEdit() {},
    handleAddUser() {
      this.modal5 = true;
    },
    handleReset2() {},
    handleSearch2() {},
    handleSearch3(){},
    //角色录入
    handleAddRole(){
      let params = Object.assign({},this.formInline)
      this.$http.post("/addRole",params).then(res=>{
         this.$Message.success('新增用户成功');
         this.handleSearch();
      })
    },




  }
};
</script>

<style lang="less" scoped>
.role-header {
  position: relative;
  background: #093151;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.add-btn {
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding-left: 20px;
}
.ivu-page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.role-right {
  border-left: 1px solid #ccc;
}
.dt-search-top .dt-search-date {
}
</style>