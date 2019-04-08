<template>
  <div>
    <div class="page-form2">
      <Form ref="form" :model="formData" :rules="rule">
        <Row>
          <Col span="8">
            <FormItem label="延期扣款:" prop="delay_over">
              <Input v-model="formData.delay_over" @keydown="handleInput2" placeholder="延期超过多少小时"></Input>
            </FormItem>
            <FormItem prop="delay_deduct">
              <Input v-model="formData.delay_deduct" placeholder="	
      延期超过设定时间后扣除金额"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="好评奖励:" prop="good_over">
              <Input v-model="formData.good_over" @keydown="handleInput2" placeholder="月度达到多少分"></Input>
            </FormItem>
            <FormItem prop="good_reward">
              <Input v-model="formData.good_reward" placeholder="奖励金额"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="差评扣款:" prop="bad_below">
              <Input v-model="formData.bad_below" @keydown="handleInput2" placeholder="月度低于多少分"></Input>
            </FormItem>
            <FormItem prop="good_reward">
              <Input v-model="formData.bad_deduct" placeholder="扣款金额"></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label prop>
          <Button type="ghost" @click="handleSubmit()">保存</Button>
        </FormItem>
      </Form>
      <div class="word-wraper">
        <span class="word-control">词条管理</span>
        <span class="line-split"></span>
      </div>
      <div class="word-container">
        <!-- <Tabs type="card" closable @on-tab-remove="handleRemove2">
          <TabPane :label="comment.content" v-for="comment in comments" :key="comment.id"></TabPane>
        </Tabs>-->
        <!-- <Button size="large" @click="handleAdd" slot="extra">+</Button> -->
      </div>
      <div class="word-box">
        <ul>
          <li class="word-li" v-for="(item,index) in comments" :key="item.index">
            <span>{{ item.content }}</span>
            <em
              class="word-close"
              @click="handleRemove3('comments/del',{id:item.id},index)"
              :name="item.id"
            ></em>
          </li>
          <Button size="large" @click="handleAdd" slot="extra">+</Button>
        </ul>
      </div>
    </div>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData2" :rules="rule" :label-width="100">
        <FormItem label="新增评价" prop="content">
          <Input v-model="formData2.content" placeholder="请输入评价"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit2()">保存</Button>
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
        id: ""
      },
      props: ["key"],
      formData: {
        delay_over: "",
        delay_deduct: "",
        good_over: "",
        good_reward: "",
        bad_below: "",
        bad_deduct: ""
      },
      comments: [],
      itemId: 0,
      modal1: false,
      rule: {},
      formData2: {
        id: "",
        content: ""
      },
      active: false
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  mounted() {
    this.getMessage();
    this.getComments();
  },
  methods: {
    handleInput2() {
      // 通过正则过滤小数点后两位
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0 - 2] || null;
    },
    getMessage() {
      this.$post("reward-deduct/detail", { page: 0 }).then(res => {
        this.formData = res.data;
      });
    },
    //删除数据,单条或者多条数据
    handleRemove2() {
      let params = {};
      params = Object.assign({}, this.comments);
      console.log(params);
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定删除数据 ?",
        onOk: () => {
          this.$post("comments/del", params.row.id).then(res => {
            this.$Message.success("删除成功");
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
    // handleRemove2(){
    //   list.splice(this.index, 1);

    // },
    delComment(list, index) {
      // console.log(this.comments);
      list.splice(index, 1);
      console.log(index);
      // this.$post("comments/del", {
      //   content: list.join(","),
      //   id: this.index
      // }).then(res => {
      //   // this.$Message.success("操作成功");
      // });
    },
    handleSubmit() {
      this.$post("reward-deduct/edit", {
        delay_over: this.formData.delay_over,
        delay_deduct: this.formData.delay_deduct,
        good_over: this.formData.good_over,
        good_reward: this.formData.good_reward,
        bad_below: this.formData.bad_below,
        bad_deduct: this.formData.bad_deduct
      }).then(res => {
        // this.$Message.success('操作成功');
      });
    },
    handleSubmit2() {
      let params = {};
      params = Object.assign({}, this.formData2);
      // this.comments.push(this.formData2.content);
      this.$post("comments/add", params).then(res => {
        this.modal1 = false;
        this.handleSearch();
        this.getComments();
      });
    },
    handleRemove3(url, params = {}, index) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定删除数据 ?",
        onOk: () => {
          this.$post(url, params).then(res => {
            this.$Message.success("删除成功");
            this.handleSearch();
            this.delComment(this.comments, index);
          });
        },
        onCancel: () => {}
      });
    },
    getComments() {
      this.$post("comments/list", { page: 0 }).then(res => {
        this.comments = res.data;
        console.log(this.comments);
      });
    },
    selectStyle(item) {
      var _this = this;
      _this.$set(item, "active", false);
    }
  }
};
</script>
<style scoped>
.ivu-col {
  position: relative;
  text-align: center;
}
.ivu-form-item {
  display: inline-block;
}
.page-form2 {
  position: relative;
  padding: 20px;
  overflow: hidden;
  margin-top: 20px;
}
.ivu-form-label-right {
  text-align: center;
}
.ivu-form-item-content {
  float: left !important;
}
.ivu-btn-ghost {
  display: block;
  margin: auto;
  width: 300px;
  height: 40px;
  text-align: center;
  line-height: 30px;
}
.ivu-modal-footer .ivu-btn-ghost {
  display: inline;
  width: auto;
  height: auto;
}
.word-wraper {
  width: 100%;
}
.word-control {
  width: 300px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #093151;
  background: #093151;
  color: #fff;
  text-align: center;
  margin: auto;
  display: block;
  margin-top: 80px;
  position: relative;
  overflow: hidden;
}
.line-split {
  height: 1px;
  background: #093151;
  width: 100%;
  display: block;
  margin-top: -19px;
  z-index: -1;
}
.word-container {
  overflow: hidden;
  margin-top: 60px;
}
.ivu-tabs-bar {
  border-bottom: none !important;
}
.ivu-tabs {
  width: auto !important;
  float: left;
}
.ivu-btn-large {
  float: left;
}
.ivu-btn-large {
  padding: 5px 16px 4px;
  font-size: 24px;
  width: 56px;
  height: 32px;
  line-height: 20px;
  border-radius: 16px;
  margin-left: 15px;
  text-align: center;
}
.ivu-btn-large > span {
  display: inline-block;
}
.word-box {
  width: 100%;
  overflow: hidden;
}
.word-box ul li {
  list-style-type: none;
  height: 32px;
  line-height: 32px;
  padding: 0 25px 0 15px;
  float: left;
  margin: 0 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #333;
  position: relative;
}
.word-box ul li em {
  font-family: Ionicons;
  width: 14px;
  transform: translateZ(0);
  font-size: 22px;
  vertical-align: middle;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
  font-style: normal;
  cursor: pointer;
  top: 0;
  right: 5px;
  position: absolute;
}
.word-box ul li em::before {
  content: "\F404";
}
</style>
