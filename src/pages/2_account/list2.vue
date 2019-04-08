<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          状态：
          <dt-select v-model="params.status" class="dt-search-select" url="userStatus"/>
        </div>
        <div class="dt-search-cell">
          角色：
          <Select v-model="params.role_id" class="dt-search-select">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.role_name }}</Option>
          </Select>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">新增</Button>
      </div>
    </div>
    <dt-table ref="table" url="operator/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="账号" prop="username">
          <Input v-model="formData.username" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="姓名" prop="realname">
          <Input v-model="formData.realname" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="formData.phone" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="状态" prop="status">
          <!-- <dt-select v-model="formData.status" class="dt-search-select" url="userStatusModal"/> -->
          <Select name v-model="formData.status" class="dt-search-select">
            <Option
              v-for="(item,index) in statuList"
              :value="item"
              :key="index"
            >{{ item | tranferBool }}</Option>
          </Select>
        </FormItem>
        <FormItem label="角色" prop="role_id">
          <Select v-model="formData.role_id">
            <Option
              v-for="item in roleList"
              :value="item.id"
              :key="item.id"
              style="height:32px !important; "
            >{{ item.role_name }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      params: {
        keyword: "",
        status: "0",
        role_id: ""
      },
      columns: [
        { title: "账号", key: "username" },
        { title: "姓名", key: "realname" },
        { title: "手机号码", key: "phone" },
        {
          title: "角色",
          key: "role_name"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            const obj = { "1": "正常", "2": "禁用" };
            const label = obj[params.row.status];
            return h("span", {}, label);
          }
        },
        {
          title: "登录时间",
          key: "last_login_time",
          width: 200,
          render: (h, params) => {
            const label = new Date(params.row.last_login_time * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        },
        // {
        //   title: "登录地区",
        //   key: "area"
        // },
        // {
        //   title: "登录Ip",
        //   key: "ip"
        // }
        {
          title: "操作",
          width: 200,
          key: "operation",
          render: (h, params) => {
            return h("div", [
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
                      if (this.userInfo.username == params.row.username) {
                        this.statuList = ["1"];
                        this.handleEdit(params.row);
                      } else {
                        this.statuList = ["1", "2"];
                        this.handleEdit(params.row);
                      }
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
                      // 判断该用户是否是现登录的用户
                      if (this.userInfo.username == params.row.username) {
                        this.$Message.error("您不能删除自己");
                        return false;
                      } else {
                        this.handleRemove("operator/del", {
                          id: params.row.id
                        });
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      itemId: 0,
      modal1: false,
      roleList: [],
      statuList: ["1", "2"],
      formData: {
        username: "",
        realname: "",
        phone: "",
        status: "",
        role_id: ""
      },
      rule: {},
      uid: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  created() {},
  mounted() {
    this.getRoleList();
    console.log(this.statuList);
    this.uid = this.userInfo.username;
  },
  methods: {
    getRoleList() {
      this.$post("role/list", { page: 0 }).then(res => {
        this.roleList = res.data.list;
      });
    },

    handleReset(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定重置密码 ?",
        onOk: () => {
          this.$post("operator/resetpwd", { id: item.id }).then(res => {
            this.$Message.success("重置成功");
            this.handleSearch();
          });
        },
        onCancel: () => {}
      });
    },
    handleAdd() {
      this.modal1 = true;
      this.itemId = 0;
      this.$refs.form.resetFields();
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
      this.formData = Object.assign({}, item);
      this.getRoleList();
      // this.$post('admin/detail',{id: item.id}).then( res => {
      //   var data = res.data;
      //   this.formData = Object.assign(this.formData,data);
      // })
    },
    handleSubmit() {
      // 自定义验证规则
      // let vArr = [
      //   [this.formData.username, '账号', 'empty'],
      //   [this.formData.real_name, '姓名', 'empty'],
      // ];
      // this.$validate(vArr).then(valid => {

      // });
      if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
        this.$Message.destroy();
        this.$Message.warning("请输入正确格式的手机号");
        return;
      }
      let params = {};
      if (this.itemId) {
        params = Object.assign({}, this.formData, { id: this.itemId });
        console.log(params);
        this.$post("operator/edit", params).then(res => {
          this.modal1 = false;
          this.getRoleList();
          this.handleSearch();
          this.$post("operator/detail", {}).then(res => {
            this.$store.dispatch("setUserInfoAction", res.data);
          });
        });
      } else {
        params = Object.assign({}, this.formData);
        this.$post("operator/add", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    }
  },
  filters: {
    tranferBool(val) {
      if (val == "1") {
        return "正常";
      } else if (val == "2") {
        return "禁用";
      }
    }
  }
};
</script>
<style scoped>
.dt-search-select2 {
  display: inline-block;
  width: 100%;
  line-height: 32px;
  height: 32px;
  position: relative;
  outline: none;
  border: none;
  background: none;
  filter: none !important;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url(../../assets/three-icon2.png) no-repeat;
  background-position: 369px 10px;
  border-radius: 4px;
  border: 1px solid #dddee1;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  padding-left: 5px;
}
.dt-search-select option {
  margin: 0;
  padding: 7px 16px;
  height: 32px;
  clear: both;
  color: #495060;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}
</style>
