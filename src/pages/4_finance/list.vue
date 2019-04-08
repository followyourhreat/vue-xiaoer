<template>
  <div>
    <div class="dt-search-top">
      <h2>分润金额： {{sum}}</h2>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="分润单号、运营商姓名、运营商账号、运营商手机"
          />
        </div>
        <div class="dt-search-cell">
          分润来源：
          <dt-select v-model="params.source" class="dt-search-select" url="financeSource"/>
        </div>
        <div class="dt-search-cell">
          等级：
          <dt-select v-model="params.agent_level" class="dt-search-select" url="userLevel"/>
        </div>
        <div class="dt-search-cell">
          分润时间：
          <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch2">查询</Button>
        <Button type="info" @click="handleExport">导出</Button>
      </div>
    </div>
    <dt-table ref="table" url="profit/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="角色名称" prop="role_name">
          <Input v-model="formData.role_name" placeholder="请输入角色名称" :maxlength="10"></Input>
        </FormItem>
        <FormItem label="角色权限" prop="form2">
          <div style="height: 300px;overflow-y: auto;border: 1px solid #dddee1;">
            <Tree ref="tree" :data="menuList" show-checkbox></Tree>
          </div>
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
        source: "",
        agent_level: "",
        start_time: "",
        end_time: ""
      },
      sum: null,
      columns: [
        { title: "分润单号", key: "order_num" },
        {
          title: "运营商级别",
          key: "agent_level",
          render: (h, params) => {
            const obj = { "1": "一级", "2": "二级" };
            const label = obj[params.row.agent_level];
            return h("span", {}, label);
          }
        },
        { title: "运营商姓名", key: "realname" },
        { title: "运营商账号", key: "username" },
        { title: "运营商手机", key: "phone" },
        { title: "分润金额", key: "amount" },
        {
          title: "分润来源",
          key: "source",
          render: (h, params) => {
            // const label = this.$filter.financeSourceFilter(params.row.source)
            const obj = {
              "1": "推广费用",
              "2": "装机费用",
              "3": "售后服务费用",
              "4": "续费费用",
              "5": "达标奖励",
              "6": "好评返现",
              "7": "延期罚款",
              "8": "差评罚款"
            };
            const label = obj[params.row.source];
            return h("span", {}, label);
          }
        },
        {
          title: "分润时间",
          key: "ctime",
          width: 150,
          render: (h, params) => {
            const label = new Date(params.row.ctime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        }
      ],
      itemId: 0,
      modal1: false,
      formData: {
        role_name: ""
      },
      rule: {},
      menuList: []
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleDateSelect(val) {
      console.log(val);
      this.params.start_time = val[0];
      this.params.end_time = val[1];
    },
    getList() {
      this.$post("profit/list", this.params).then(res => {
        const data = res.data;
        this.sum = data.sum;
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
    },
    handleSearch2() {
      this.params = Object.assign({}, this.params);
      this.getList();
    },
    handleSubmit() {
      const checkArr = this.$refs.tree.getCheckedNodes();
      const checkId = checkArr.map(item => item.id);
      // if(!checkId.length){
      //   this.$Message.warning('请勾选角色权限');
      //   return
      // }
      if (this.itemId) {
        this.$post("role/edit", {
          id: this.itemId,
          role_name: this.formData.role_name,
          url_ids: checkId.join()
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
          this.$post("admin/detail", {}).then(res => {
            this.$store.dispatch("setUserInfoAction", res.data);
          });
        });
      } else {
        this.$post("role/add", {
          role_name: this.formData.role_name,
          url_ids: checkId.join()
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    },
    handleExport() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定导出数据 ?",
        onOk: () => {
          this.$post("profit/list", {
            ...this.params,
            export: 1
          }).then(res => {
            window.location.href = res.data.filename;
          });
        },
        onCancel: () => {}
      });
    }
  }
};
</script>