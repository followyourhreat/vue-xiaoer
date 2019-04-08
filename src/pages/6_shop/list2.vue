<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input v-model="params.keyword1" class="dt-search-input" placeholder="运营商姓名、手机号"/>
        </div>
        <div class="dt-search-cell">
          <Input v-model="params.keyword2" class="dt-search-input" placeholder="货物编号、名称"/>
        </div>
        <div class="dt-search-cell">
          等级：
          <Select v-model="params.level" class="dt-search-select">
            <Option value="0">全部</Option>
            <Option value="1">一级</Option>
            <Option value="2">二级</Option>
          </Select>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="info" @click="handleExport">导出</Button>
      </div>
    </div>
    <dt-table ref="table" url="stock/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="角色名称" prop="role_name">
          <Input v-model="formData.role_name" placeholder="请输入角色名称" :maxlength="10"></Input>
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
        keyword1: "",
        keyword2: "",
        level: ""
      },
      columns: [
        {
          title: "运营商",
          key: "agent",
          render: (h, params) => {
            const label =
              params.row.agent &&
              `${params.row.agent.realname}/${params.row.agent.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "等级",
          key: "level",
          render: (h, params) => {
            const obj = { "1": "一级", "2": "二级" };
            const label = obj[params.row.agent && params.row.agent.level];
            return h("span", {}, label);
          }
        },
        {
          title: "货物编号",
          key: "goods",
          render: (h, params) => {
            const label = params.row.goods && params.row.goods.serial;
            return h("span", {}, label);
          }
        },
        {
          title: "货物名称",
          key: "goods",
          render: (h, params) => {
            const label = params.row.goods && params.row.goods.name;
            return h("span", {}, label);
          }
        },
        { title: "货物总量", key: "total" },
        { title: "剩余库存", key: "remain" }
      ],
      itemId: 0,
      modal1: false,
      formData: {
        role_name: ""
      },
      rule: {}
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  mounted() {},
  methods: {
    handleAdd() {
      this.modal1 = true;
      this.itemId = 0;
      this.$refs.form.resetFields();
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
    },
    handleSubmit() {
      if (this.itemId) {
        this.$post("role/edit", {
          id: this.itemId
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
          this.$post("admin/detail", {}).then(res => {
            this.$store.dispatch("setUserInfoAction", res.data);
          });
        });
      } else {
        this.$post("role/add", {
          role_name: this.formData.role_name
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
          this.$post("stock/list", {
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