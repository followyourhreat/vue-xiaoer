<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="流程名称、流程编码"
          />
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd(1)">新增通用流程</Button>
        <Button type="info" @click="handleAdd(2)">新增进出库流程</Button>
      </div>
    </div>
    <dt-table ref="table" url="flow/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="流程名称" prop="name">
          <Input v-model="formData.name" placeholder="请输入流程名称"></Input>
        </FormItem>
        <FormItem label="流程描述" prop="descr">
          <Input type="textarea" v-model="formData.descr" placeholder="请输入流程描述"></Input>
        </FormItem>
        <FormItem label="流程发起人" prop="sponsor_type">
          <RadioGroup v-model="formData.sponsor_type" vertical>
            <Radio label="5">
              <span>流程发起人</span>
            </Radio>
            <Radio label="1">
              <span>酷蛙小二</span>
            </Radio>
            <Radio label="2">
              <span>一级运营商</span>
            </Radio>
            <Radio label="3">
              <span>二级运营商</span>
            </Radio>
            <Radio label="4">
              <span>运营人员</span>
            </Radio>
            <Radio label="6">
              <span>第三方系统用户</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否可删除" prop="can_del">
          <Select v-model="formData.can_del">
            <Option value="1">是</Option>
            <Option value="2">否</Option>
          </Select>
        </FormItem>
        <FormItem label="流程图标" prop="icon">
          <img v-if="formData.icon" class="formItemImg" :src="formData.icon">
          <Upload
            type="drag"
            action="http://120.24.55.58:8146//upload/upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :data="uploadData"
            name="image"
            accept=".png, .jpg, .jpeg, .gif"
            :on-success="onSuccess"
            style="width: 60px;display: inline-block;"
          >
            <div style="padding: 10px 0">
              <Icon type="plus" size="30"></Icon>
            </div>
          </Upload>
          <p style="display: inline-block;">200*200px图标</p>
        </FormItem>
        <!-- <FormItem label="主题">
          <Input disabled placeholder="如：更换滤芯"></Input>
        </FormItem>
        <FormItem v-if="formData.type=='2'" label="货物">
          <Input disabled placeholder="10001/净水器"></Input>
        </FormItem>
        <FormItem v-if="formData.type=='2'" label="数量">
          <Input disabled placeholder="如：提一件滤芯"></Input>
        </FormItem>
        <FormItem label="内容">
          <Input type="textarea" disabled placeholder="详细的内容资料，如设备ID，需要服务内容描述"></Input>
        </FormItem>-->
        <!-- <FormItem label="图片" prop="icon">
          <div
            style="width: 60px;display: inline-block;padding: 10px 0; border: 1px dashed #dddee1;text-align: center;"
          >
            <Icon type="plus" size="30"></Icon>
          </div>
        </FormItem>-->
        <FormItem label="流程设计" prop="role_name">
          <div class="tip" v-for="(item,index) in formData.nodes" @click="edit(item,index)">
            <span>{{item.node_name}}</span>
          </div>
          <div class="add" @click="add">
            <span>添加新流程</span>
          </div>
        </FormItem>
        <FormItem label="高级设置">
          <h3>完成流程后，系统处理事宜</h3>
          <Checkbox v-if="formData.type=='1'" v-model="formData.gen_delay" style="display: block;">
            <span>记录延期</span>
          </Checkbox>
          <Checkbox v-if="formData.type=='1'" v-model="formData.gen_spread" style="display: block;">
            <span>生成推广费用</span>
          </Checkbox>
          <Checkbox
            v-if="formData.type=='1'"
            v-model="formData.gen_install"
            style="display: block;"
          >
            <span>生成装机费用</span>
          </Checkbox>
          <Checkbox v-if="formData.type=='1'" v-model="formData.gen_renew" style="display: block;">
            <span>生成续费奖励费用</span>
          </Checkbox>
          <Checkbox
            v-if="formData.type=='1'"
            v-model="formData.gen_achieve"
            style="display: block;"
          >
            <span>生成达标奖励</span>
          </Checkbox>
          <Checkbox
            v-if="formData.type=='1'"
            v-model="formData.gen_comments"
            style="display: block;"
          >
            <span>生成评价表</span>
          </Checkbox>
          <Checkbox
            v-if="formData.type=='2'"
            v-model="formData.gen_stock_in"
            style="display: block;"
          >
            <span>更新进库记录</span>
          </Checkbox>
          <Checkbox
            v-if="formData.type=='2'"
            v-model="formData.gen_stock_out"
            style="display: block;"
          >
            <span>更新出库记录</span>
          </Checkbox>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal
      v-model="modal2"
      title="流程节点"
      :mask-closable="false"
      @on-cancel="modal1 = true, modal2 = false"
    >
      <Form ref="form2" :model="formData2" :rules="rule" :label-width="100">
        <FormItem label="节点名称" prop="node_name">
          <Input v-model="formData2.node_name" placeholder="请输入节点名称"></Input>
        </FormItem>
        <FormItem label="处理人" prop="handler_type">
          <div
            style="height: 200px;overflow-y: scroll;border: 1px solid #dddee1;padding: 0px 10px;"
          >
            <RadioGroup v-model="formData2.handler_type" vertical>
              <Radio v-for="(item,index) in flowList" :key="index" :label="item.sponsor_type">
                <span>{{item.sponsor_name}}</span>
                <CheckboxGroup v-if="item.children" v-model="formData2.handler_uid">
                  <Checkbox
                    v-for="(item2,index2) in item.children"
                    :key="index2"
                    :label="item2.id"
                    style="display: block;margin-left: 25px;"
                  >
                    <span>{{item2.realname}}</span>
                  </Checkbox>
                </CheckboxGroup>
              </Radio>
            </RadioGroup>
          </div>
        </FormItem>
        <FormItem label="处理时间" prop="handle_duration">
          <Input v-model="formData2.handle_duration" placeholder="请输入处理时间" style="width:300px;"></Input>
          <span style="padding: 0px 5px;">小时</span>
        </FormItem>
        <FormItem label="延期提醒" prop="delay_remind">
          <Select v-model="formData2.delay_remind">
            <Option value="1">开启</Option>
            <Option value="2">关闭</Option>
          </Select>
        </FormItem>
        <FormItem label="默认通过" prop="default_pass">
          <Select v-model="formData2.default_pass">
            <Option value="1">开启</Option>
            <Option value="2">关闭</Option>
          </Select>
        </FormItem>
        <FormItem label="默认通过时长" prop="default_pass_duration">
          <Input
            v-model="formData2.default_pass_duration"
            placeholder="请输入默认通过时长"
            style="width:300px;"
          ></Input>
          <span style="padding: 0px 5px;">小时</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit2()">保存</Button>
        <Button type="text" @click="modal1 = true, modal2 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uploadData: {
        target: "icon"
      },
      params: {
        keyword: ""
      },
      columns: [
        { title: "流程编码", key: "code" },
        { title: "流程名称", key: "name" },
        { title: "流程描述", key: "descr" },
        {
          title: "流程发起人",
          key: "sponsor_type",
          width: 150,
          render: (h, params) => {
            const obj = {
              "1": "酷蛙小二",
              "2": "一级代理",
              "3": "二级代理",
              "4": "运营人员",
              "5": "流程发起人",
              "6": "第三方系统用户"
            };
            const label = obj[params.row.sponsor_type];
            return h("span", {}, label);
          }
        },
        {
          title: "更新时间",
          key: "utime",
          width: 150,
          render: (h, params) => {
            const label = new Date(params.row.utime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        },
        {
          title: "操作",
          width: 200,
          key: "operation",
          render: (h, params) => {
            const obj = { "2": "启用", "1": "禁用" };
            const label = obj[params.row.is_enable];
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
                label
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
                      this.handleRemove("flow/del", { id: params.row.id });
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
      defaultList: [],
      formData: {
        type: "1",
        name: "",
        descr: "",
        sponsor_type: "",
        can_del: "",
        icon: "",
        gen_delay: false,
        gen_spread: false,
        gen_install: false,
        gen_renew: false,
        gen_achieve: false,
        gen_comments: false,
        gen_stock_in: false,
        gen_stock_out: false,
        nodes: []
      },
      rule: {},
      flowList: [],
      modal2: false,
      formData2: {
        flow_id: "",
        node_num: "",
        node_name: "",
        handler_type: "",
        handler_uid: [],
        handle_duration: "",
        delay_remind: "",
        default_pass: "",
        default_pass_duration: ""
      }
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "录入";
    }
  },
  mounted() {
    this.getFlowList();
  },
  methods: {
    getFlowList() {
      this.$post("flow/handler", { page: 0 }).then(res => {
        this.flowList = res.data;
        console.log(this.flowList);
      });
    },
    handleStatus(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: `确定${item.is_enable == "1" ? "禁用" : "启用"}流程吗 ?`,
        onOk: () => {
          this.$post("flow/setstatus", {
            id: item.id,
            is_enable: item.is_enable == "1" ? "2" : "1"
          }).then(res => {
            this.$Message.success("操作成功");
            this.handleSearch();
          });
        },
        onCancel: () => {}
      });
    },
    onSuccess(response, file, fileList) {
      this.formData.icon = response.data.path;
    },
    handleAdd(val) {
      this.modal1 = true;
      this.itemId = 0;
      this.$refs.form.resetFields();
      this.formData.type = val;
      this.formData.nodes = [];
      this.formData.gen_delay = false;
      this.formData.gen_spread = false;
      this.formData.gen_install = false;
      this.formData.gen_renew = false;
      this.formData.gen_achieve = false;
      this.formData.gen_comments = false;
      this.formData.gen_stock_in = false;
      this.formData.gen_stock_out = false;
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
      this.$post("flow/detail", { id: item.id }).then(res => {
        let detail = res.data;
        this.formData = Object.assign({}, detail);
        this.formData.gen_delay = detail.gen_delay == "1" ? true : false;
        this.formData.gen_spread = detail.gen_spread == "1" ? true : false;
        this.formData.gen_install = detail.gen_install == "1" ? true : false;
        this.formData.gen_renew = detail.gen_renew == "1" ? true : false;
        this.formData.gen_achieve = detail.gen_achieve == "1" ? true : false;
        this.formData.gen_comments = detail.gen_comments == "1" ? true : false;
        this.formData.gen_stock_in = detail.gen_stock_in == "1" ? true : false;
        this.formData.gen_stock_out =
          detail.gen_stock_out == "1" ? true : false;
      });
    },
    handleSubmit() {
      let params = Object.assign({}, this.formData);
      params.gen_delay = params.gen_delay ? "1" : "2";
      params.gen_spread = params.gen_spread ? "1" : "2";
      params.gen_install = params.gen_install ? "1" : "2";
      params.gen_renew = params.gen_renew ? "1" : "2";
      params.gen_achieve = params.gen_achieve ? "1" : "2";
      params.gen_comments = params.gen_comments ? "1" : "2";
      params.gen_stock_in = params.gen_stock_in ? "1" : "2";
      params.gen_stock_out = params.gen_stock_out ? "1" : "2";
      if (this.itemId) {
        params = Object.assign({}, params, { id: this.itemId });
        this.$post("flow/edit", params).then(res => {
          this.modal1 = false;
          this.modal2 = false;
          this.handleSearch();
        });
      } else {
        params = Object.assign({}, params);
        this.$post("flow/add", params).then(res => {
          this.modal1 = false;
          this.modal2 = false;
          this.handleSearch();
        });
      }
    },
    add() {
      this.modal1 = false;
      this.modal2 = true;
      let item = {
        node_name: "",
        handler_type: "",
        handler_uid: [],
        handle_duration: "",
        delay_remind: "",
        default_pass: "",
        default_pass_duration: ""
      };
      this.indexItem = -1;
      this.formData2 = Object.assign({}, item);
    },
    edit(item, index) {
      this.modal1 = false;
      this.modal2 = true;
      this.indexItem = index;
      this.formData2 = Object.assign({}, item);
    },
    handleSubmit2() {
      if (this.indexItem == -1) {
        this.formData.nodes.push(this.formData2);
      } else {
        this.formData.nodes.splice(this.indexItem, 1, this.formData2);
      }
      this.modal1 = true;
      this.modal2 = false;
    },
    handleCancel() {}
  }
};
</script>

<style lang="less" scoped>
.tip {
  height: 40px;
  line-height: 40px;
  float: left;
  display: flex;
  background: #093151;
  color: #ffffff;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    padding-right: 20px;
  }
}
.tip:before {
  content: "";
  border-width: 20px;
  border-style: solid;
  border-color: #093151 #093151 #093151 #ffffff;
}
.tip:after {
  content: "";
  border-width: 20px;
  border-style: solid;
  border-color: #ffffff #ffffff #ffffff #093151;
}

.add {
  height: 40px;
  line-height: 40px;
  float: left;
  display: flex;
  background: #cfcfcf;
  color: #ffffff;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    padding-right: 20px;
  }
}
.add:before {
  content: "";
  border-width: 20px;
  border-style: solid;
  border-color: #cfcfcf #cfcfcf #cfcfcf #ffffff;
}
.add:after {
  content: "";
  border-width: 20px;
  border-style: solid;
  border-color: #ffffff #ffffff #ffffff #cfcfcf;
}
</style>