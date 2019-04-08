<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input v-model="params.keyword" class="dt-search-input" placeholder="消息名称，消息内容"/>
        </div>
        <div class="dt-search-cell">
          是否已推送：
          <Select v-model="params.is_push" class="dt-search-select">
            <Option value="0">全部</Option>
            <Option value="1">是</Option>
            <Option value="2">否</Option>
          </Select>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">新增</Button>
      </div>
    </div>
    <dt-table ref="table" url="message/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="消息名称" prop="title">
          <Input v-model="formData.title" placeholder="请输入消息名称"></Input>
        </FormItem>
        <FormItem label="消息内容" prop="content">
          <Input type="textarea" v-model="formData.content" placeholder="请输入消息内容"></Input>
        </FormItem>
        <FormItem label="推送对象" prop="scope">
          <RadioGroup v-model="formData.scope" vertical @on-change="radioChange">
            <Radio label="1">
              <span>所有代理商</span>
            </Radio>
            <Radio label="2">
              <span>一级代理商</span>
            </Radio>
            <Radio label="3">
              <span>二级代理商</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="选择代理商" prop="users" v-if="formData.scope != '1'">
          <CheckboxGroup v-if="formData.scope == '2'" v-model="formData.users">
            <Checkbox
              v-for="(item,index) in firstList"
              :key="index"
              :label="item.id"
              style="display: block;"
            >
              <span>{{item.realname}}</span>
            </Checkbox>
          </CheckboxGroup>
          <CheckboxGroup v-if="formData.scope == '3'" v-model="formData.users">
            <Checkbox
              v-for="(item,index) in secondList"
              :key="index"
              :label="item.id"
              style="display: block;"
            >
              <span>{{item.realname}}</span>
            </Checkbox>
          </CheckboxGroup>
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
        is_push: ""
      },
      columns: [
        { title: "消息名称", key: "title" },
        { title: "消息内容", key: "content" },
        {
          title: "推送对象",
          key: "scope",
          width: 150,
          render: (h, params) => {
            const obj = {
              "1": "所有代理商",
              "2": "一级代理商",
              "3": "二级代理商"
            };
            const label = obj[params.row.scope];
            return h("span", {}, label);
          }
        },
        {
          title: "是否已推送",
          key: "is_push",
          width: 150,
          render: (h, params) => {
            const obj = { "1": "是", "2": "否" };
            const label = obj[params.row.is_push];
            return h("span", {}, label);
          }
        },
        {
          title: "操作",
          width: 150,
          key: "operation",
          render: (h, params) => {
            if (params.row.is_push == "2") {
              return h("div", [
                h(
                  "span",
                  {
                    class: "span-active",
                    on: {
                      click: () => {
                        this.handleStatus(params.row);
                      }
                    }
                  },
                  "推送"
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
                        this.handleRemove("message/del", { id: params.row.id });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            } else {
              return h("span", {}, "-");
            }
          }
        }
      ],
      itemId: 0,
      modal1: false,
      firstList: [],
      secondList: [],
      formData: {
        title: "",
        content: "",
        scope: "1",
        users: [],
        is_push: "2"
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
    this.getFirstLevel();
    this.getSecondLevel();
  },
  methods: {
    getFirstLevel() {
      this.$post("agent/first-level", { page: 0 }).then(res => {
        this.firstList = res.data;
      });
    },
    getSecondLevel() {
      this.$post("agent/second-level", { page: 0 }).then(res => {
        this.secondList = res.data;
      });
    },
    handleStatus(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: `确定推送消息吗 ?`,
        onOk: () => {
          this.$post("message/push", { id: item.id }).then(res => {
            this.$Message.success("推送成功");
            this.handleSearch();
          });
        },
        onCancel: () => {}
      });
    },
    radioChange(val) {
      this.formData.users = [];
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
      this.formData.users = item.users ? item.users.split(",") : [];
    },
    handleSubmit() {
      if (this.itemId) {
        this.$post("message/edit", {
          id: this.itemId,
          title: this.formData.title,
          content: this.formData.content,
          scope: this.formData.scope,
          users: this.formData.users.join(),
          is_push: this.formData.is_push
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      } else {
        this.$post("message/add", {
          title: this.formData.title,
          content: this.formData.content,
          scope: this.formData.scope,
          users: this.formData.users.join(),
          is_push: this.formData.is_push
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    }
  }
};
</script>