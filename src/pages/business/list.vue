<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="角色名称"
          />
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">新增</Button>
      </div>
    </div>
    <dt-table ref="table" url="role/list" :params="params" :columns="columns"></dt-table>
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
        role_name: ""
      },
      columns: [
        { title: "角色名称", key: "role_name", width: 200 },
        { title: "角色权限", key: "url_names" },
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
                      this.handleRemove("role/del", { id: params.row.id });
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
  mounted() {},
  methods: {
    getMenuList() {
      this.$post("menu/usermenu", {}).then(res => {
        const list = res.data;
        list.forEach(item => {
          item.title = item.menu_name;
          if (item.child) {
            item.children = item.child;
            item.children.forEach(item2 => {
              item2.title = item2.menu_name;
            });
          }
        });
        this.menuList = list;
      });
    },
    handleAdd() {
      this.modal1 = true;
      this.itemId = 0;
      this.menuList = [];
      this.$refs.form.resetFields();
      this.getMenuList();
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
      this.menuList = [];
      this.$post("role/detail", { id: item.id }).then(res => {
        const detail = res.data;
        this.formData.role_name = detail.role_name;
        const list = detail.menus_tree;
        list.forEach(item => {
          item.title = item.menu_name;
          if (item.child) {
            item.children = item.child;
            item.children.forEach(item2 => {
              item2.title = item2.menu_name;
            });
          }
        });
        this.menuList = list;
      });
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
    }
  }
};
</script>