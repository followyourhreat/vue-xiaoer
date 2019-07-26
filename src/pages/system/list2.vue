<template>
  <div class="role-manage">
    <Row>
      <Col span="24">
        <div class="role-left">
          <div class="role-header">组织机构列表</div>

          <div class="add-btn">
            <Button type="success" @click="handleRole">组织机构录入</Button>
            <Button type="info" @click="handleEdit">组织机构编辑</Button>
            <Button type="default" @click="handleExport">导出</Button>
            <Button type="ghost" @click="handleDown">模板下载</Button>
            <Button type="info" @click="handleEntry">组织机构导入</Button>
          </div>
          <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table>
          <Page :total="100" show-sizer show-elevator/>
        </div>
        <Modal v-model="modal1" title="角色录入" @on-ok="ok" @on-cancel="cancel">
          <Form ref="formInline" :model="formInline" inline :label-width="80">
            <FormItem label="角色名称">
              <Input v-model="formInline.role_name" placeholder="角色名称"></Input>
            </FormItem>
            <FormItem label="角色编码">
              <Input v-model="formInline.role_code" placeholder="角色编码"></Input>
            </FormItem>
          </Form>
        </Modal>
        <Modal v-model="modal2" title="角色编辑" @on-ok="ok" @on-cancel="cancel">
          <Form ref="formInline" :model="formInline" inline :label-width="80">
            <FormItem label="角色名称">
              <Input v-model="formInline.role_name" placeholder="角色名称"></Input>
            </FormItem>
            <FormItem label="角色编码">
              <Input v-model="formInline.role_code" placeholder="角色编码"></Input>
            </FormItem>
          </Form>
        </Modal>
        <Modal v-model="modal3" title="提示" @on-ok="ok" @on-cancel="cancel">
          <p>是否删除该角色</p>
        </Modal>
      </Col>
      <Modal v-model="modal4" title="组织机构录入" @on-ok="ok" @on-cancel="cancel">
        <Form :model="formItem" :label-width="100">
          <FormItem label="组织机构名称">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="组织机构描述">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem label="上级组织机构">
            <Select v-model="formItem.select">
              <Option value="beijing">利众客服部</Option>
              <Option value="shanghai">利众技术部</Option>
              <Option value="shenzhen">利众财务部</Option>
            </Select>
          </FormItem>
          <FormItem label="机构类型">
            <Select v-model="formItem.select2">
              <Option value="beijing">利众客服部</Option>
              <Option value="shanghai">利众技术部</Option>
              <Option value="shenzhen">利众财务部</Option>
            </Select>
          </FormItem>
          <FormItem label="电话号码">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="传真">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="地址">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
        </Form>
      </Modal>
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
              <Button type="ghost" @click="handleSearch">查询</Button>
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
      <Modal v-model="modal8" title="提示" @on-ok="ok" @on-cancel="cancel">
        <p>是否删除该角色</p>
      </Modal>
      <Modal v-model="modal5" title="提示" @on-ok="ok" @on-cancel="cancel">
        <Form :model="formItem" :label-width="80">
          <FormItem label="用户账号">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>
          <FormItem label="用户姓名">
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
      <Modal v-model="modal9" title="利众生活编辑部" @on-ok="ok" @on-cancel="cancel">
        <div style="height: 200px;overflow-y: auto;border: 1px solid #dddee1;">
          <Tree ref="tree" :data="menuList" show-checkbox></Tree>
        </div>
      </Modal>
    </Row>
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
      modal9: false,
      params: {
        keyword: ""
      },
      formInline: {
        role_name: "",
        role_code: ""
      },
      formItem: {
        select2: "",
        input: ""
      },
      menuList: [
        {
          title: "全部",
          expand: true,
          children: [
            { title: "市场专员" },
            { title: "产品经理" },
            { title: "开发人员" },
            { title: "董事长" }
          ]
        }
      ],
      columns: [
        { type: "index", width: 60, align: "center" },
        { title: "组织机构名称", key: "username" },
        { title: "组织机构描述", key: "usermobile" },
        { title: "机构编码", key: "oCode" },
        { title: "机构类型", key: "oType" },
        { title: "电话", key: "tel" },
        { title: "传真", key: "fax" },
        { title: "地址", key: "address" },
        {
          title: "操作",
          key: "operator",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDelete();
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
                      this.handleDetail();
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
                      this.handleOrgSign();
                    }
                  }
                },
                "机构设置"
              )
            ]);
          }
        }
      ],
      data: [
        {
          username: "John Brown",
          usermobile: "13812345678",
          oCode: "100",
          oType: "100",
          tel: "100",
          fax: "100",
          address: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          oCode: "100",
          oType: "100",
          tel: "100",
          fax: "100",
          address: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          oCode: "100",
          oType: "100",
          tel: "100",
          fax: "100",
          address: "100"
        },
        {
          username: "John Brown",
          usermobile: "13812345678",
          oCode: "100",
          oType: "100",
          tel: "100",
          fax: "100",
          address: "100"
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
    handleReset() {},
    handleRole() {
      this.modal4 = true;
    },
    handleEdit() {},
    handleEntry() {},
    handleExport() {},
    handleDown() {},
    ok() {},
    cancel() {},
    handleDetail() {
      this.modal7 = true;
    },
    handleUser() {
      this.modal5 = true;
    },
    handleUserEdit() {},
    handleAddUser() {},
    handleOrgSign() {
      this.modal9 = true;
    },
    handleDelete() {
      this.modal3 = true;
    },
    handleDelete2() {
      this.modal8 = true;
    }
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
  margin-top: 20px;
}
.ivu-page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>