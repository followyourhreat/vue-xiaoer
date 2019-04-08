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
          <CheckboxGroup
            v-if="formData.scope == '2'"
            v-model="selectTypes"
            @on-change="SelectQuestionType"
          >
            <div style="padding-bottom:2px;margin-bottom:2px;">
              <Checkbox label="0" key="0" :v-text="0">
                <span>全部</span>
              </Checkbox>
            </div>
            <Checkbox
              v-for="(item,index) in questionTypes"
              :key="index"
              :label="item.id"
              style="display: block;"
              :value="item.id"
              ref="checkboxGroup"
            >
              <span>{{item.realname}}</span>
            </Checkbox>
          </CheckboxGroup>

          <div class="check-group" v-if="formData.scope == '3'">
            <input type="checkbox" class="input-checkbox" v-model="checked" v-on:click="checkedAll">
            <span class="check-control">全选</span>
            <div v-for="checkb in checkboxData" :key="checkb.id" class="input-div">
              <!--给每个复选按钮绑定同一个v-mode数组变量，数组里面有相应的value就被选中-->
              <input
                type="checkbox"
                name="checkboxinput"
                class="input-checkbox"
                v-model="checkboxList"
                :value="checkb.id"
              >

              <span>{{checkb.realname}}</span>
            </div>
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
            // 判断是否已推送
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
      rule: {},

      isAllCheck: false,
      isAllCheck2: false,
      selectTypes: [],
      questionTypes: [],
      selectTypes2: [],
      questionTypes2: [],

      checkboxData: [],
      checkboxList: [],
      checked: false
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
        this.questionTypes = res.data;
        this.selectTypes = res.data;
      });
    },
    getSecondLevel() {
      this.$post("agent/second-level", { page: 0 }).then(res => {
        this.secondList = res.data;
        this.questionTypes2 = res.data;
        this.selectTypes2 = res.data;
        this.items = res.data;
        this.checkboxData = res.data;
      });
    },

    checkedAll: function() {
      if (this.checked) {
        //实现反选
        this.checkboxList = [];
      } else {
        //实现全选
        this.checkboxList = [];
        this.checkboxData.forEach(item => {
          this.checkboxList.push(item.id);
        });
      }
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
      var usersBox =
        this.selectTypes.join(",").toString() ||
        this.checkboxList.join(",").toString();

      console.log(usersBox);
      if (this.itemId) {
        this.$post("message/edit", {
          id: this.itemId,
          title: this.formData.title,
          content: this.formData.content,
          scope: this.formData.scope,
          users: usersBox,
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
          users: usersBox,
          is_push: this.formData.is_push
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    },

    SelectQuestionType(data) {
      console.log(data);
      var checkboxGroup = this.$refs.checkboxGroup;
      var typeIds = data;
      if (this.ArrayContain(data, "0")) {
        if (typeIds.length == checkboxGroup.length && this.isAllCheck == true) {
          for (var i = 0; i < typeIds.length; i++) {
            if (typeIds[i] == "0") {
              typeIds.splice(i, 1);
              break;
            }
          }
          this.isAllCheck = false;
        } else {
          typeIds = [];
          checkboxGroup.forEach(function(item, index) {
            typeIds.push(item.label);
          });
          typeIds.push("0");
          this.isAllCheck = true;
        }
      } else if (typeIds.length == checkboxGroup.length) {
        if (this.isAllCheck) {
          typeIds = [];
          this.isAllCheck = false;
        } else {
          typeIds.push("0");
          this.isAllCheck = true;
        }
      }
      this.selectTypes = typeIds;
    },

    ArrayContain(array, id) {
      var result = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] == id) {
          result = true;
          break;
        }
      }
      return result;
    }
  },
  watch: {
    checkboxList: {
      handler: function(val, oldVal) {
        if (this.checkboxList.length === this.checkboxData.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.input-checkbox {
  width: 16px;
  height: 16px;
  border: none;
  outline: none;
  position: relative;
  display: block;
  float: left;
  -webkit-appearance: none;
  border: 1px solid #dcdee2;
  transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  margin-top: 7px;
}

.input-checkbox:checked {
  background: #093151;
  border-radius: 3px;
  position: relative;
}
.input-checkbox:checked::before {
  content: "";
  position: absolute;
  left: 2px;
  bottom: 6px;
  width: 10px;
  height: 5px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-right-color: transparent;
  -ms-transform: rotate(-60deg);
  -moz-transform: rotate(-60deg);
  -webkit-transform: rotate(-60deg);
  transform: rotate(-45deg);
}
.input-div {
  line-height: 30px;
  margin-bottom: 2px;
  overflow: hidden;
  width: 100%;
}
.input-div span {
  display: block;
  float: left;
  margin-left: 5px;
}
.check-control {
  display: block;
  float: left;
  margin-left: 10px;
}
.check-group input {
  cursor: pointer;
}
</style>
