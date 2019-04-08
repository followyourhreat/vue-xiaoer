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
          登录时间段:
          <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <!-- <Button type="success" @click="handleAdd">新增</Button> -->
      </div>
    </div>
    <dt-table ref="table" url="log/login" :params="params" :columns="columns"></dt-table>
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
          <dt-select v-model="formData.status" class="dt-search-select" url="userStatusModal"/>
        </FormItem>
        <FormItem label="角色" prop="role_id">
          <Select v-model="formData.role_id">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.role_name }}</Option>
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
export default {
  data() {
    return {
      params: {
        keyword: "",
        status: "0",
        role_id: "",
        start_time: "",
        end_time: ""
      },
      columns: [
        { title: "账号", key: "username" },
        { title: "姓名", key: "realname" },
        { title: "手机号码", key: "phone" },

        // {
        //   title: "状态",
        //   key: "status",
        //   render: (h, params) => {
        //     const obj = { "1": "正常", "2": "禁用" };
        //     const label = obj[params.row.status];
        //     return h("span", {}, label);
        //   }
        // },
        {
          title: "登录时间",
          key: "ctime",
          width: 200,
          render: (h, params) => {
            const label = new Date(params.row.ctime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        },
        {
          title: "登录地区",
          key: "area"
        },
        {
          title: "登录Ip",
          key: "ip"
        }
      ],
      itemId: 0,
      modal1: false,
      roleList: [],
      LogList: [],
      formData: {
        username: "",
        realname: "",
        phone: "",
        status: "1",
        role_id: ""
      },
      rule: {}
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  mounted() {
    this.getRoleList();
    this.getLogList();
  },
  methods: {
    getRoleList() {
      this.$post("role/list", { page: 0 }).then(res => {
        this.roleList = res.data.list;
      });
    },
    getLogList() {
      this.$post("log/login", { page: 0 }).then(res => {
        this.logList = res.data.list;
        console.log(this.logList);
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
      // this.$post('admin/detail',{id: item.id}).then( res => {
      //   var data = res.data;
      //   this.formData = Object.assign(this.formData,data);
      // })
    },
    handleDateSelect(val) {
      console.log(val);
      this.params.start_time = val[0];
      this.params.end_time = val[1];
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
        this.$post("operator/edit", params).then(res => {
          this.modal1 = false;
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
  }
};
</script>