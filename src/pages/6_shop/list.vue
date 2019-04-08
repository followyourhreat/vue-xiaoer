<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input v-model="params.keyword" class="dt-search-input" placeholder="编号，货物名称"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">新增</Button>
      </div>
    </div>
    <dt-table ref="table" url="goods/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="编号" prop="serial">
          <Input v-model="formData.serial" placeholder="请输入编号"></Input>
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input v-model="formData.name" placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="描述" prop="descr">
          <Input type="textarea" v-model="formData.descr" placeholder="请输入描述"></Input>
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
        keyword: ""
      },
      columns: [
        { title: "编号", key: "serial" },
        { title: "名称", key: "name" },
        { title: "描述", key: "descr" },
        {
          title: "操作",
          width: 150,
          key: "operation",
          render: (h, params) => {
            return h("div", [
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
                      this.handleRemove("goods/del", { id: params.row.id });
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
      formData: {
        serial: "",
        name: "",
        descr: ""
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
      this.formData = Object.assign({}, item);
    },
    handleSubmit() {
      let params = {};
      if (this.itemId) {
        params = Object.assign({}, this.formData, { id: this.itemId });
        this.$post("goods/edit", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      } else {
        params = Object.assign({}, this.formData);
        this.$post("goods/add", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    }
  }
};
</script>