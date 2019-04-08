<template>
  <div>
    <div class="dt-search-top">
      <ButtonGroup>
        <Button :type="btn[0]" @click="handleBtn(0)">待处理</Button>
        <Button :type="btn[1]" @click="handleBtn(1)">处理中</Button>
        <Button :type="btn[2]" @click="handleBtn(2)">已完成</Button>
      </ButtonGroup>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="工单号、工单主题、工单内容、运营商、发起人"
          />
        </div>
        <div class="dt-search-cell" v-if="params.status == 1">
          评分小于：
          <Input v-model="params.points" class="dt-search-input" placeholder="评分值"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
      </div>
    </div>
    <dt-table ref="table" url="order/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" title="审批流程" :mask-closable="false" width="650">
      <Row :gutter="40">
        <Col span="14">
          <Form ref="form" :model="formData" :rules="rule" :label-width="100">
            <FormItem label="工单号">{{formData.num}}</FormItem>
            <FormItem label="流程发起人">{{formData.sponsor_realname}}</FormItem>
            <FormItem label="发起人电话">{{formData.sponsor_phone}}</FormItem>
            <FormItem label="工单内容">
              <p>{{formData.content}}</p>
              <img
                v-for="(item,index) in formData.images"
                :key="index"
                :src="item"
                width="60"
                height="60"
              >
            </FormItem>
            <FormItem label="要求处理时长">{{formData.handle_duration}}</FormItem>
            <FormItem label="审批理由" v-if="params.status == '2'">
              <Input type="textarea" v-model="formData.reason" placeholder="请输入审批理由"></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="10">
          <TimelineItem v-for="(item,index) in formData.nodes" :key="index">
            <div class="timeLine">
              <div>
                <p>
                  {{item.real_handler_realname}}
                  <span
                    v-if="item.is_ok == '0'"
                    style="color: #2DB7F5;padding-left: 5px"
                  >未处理</span>
                  <span v-if="item.is_ok == '1'" style="color: #19BE6B;padding-left: 5px">同意</span>
                  <span v-if="item.is_ok == '2'" style="color: #ED3F14;padding-left: 5px">拒绝</span>
                </p>
                <p>要求时长：{{item.handle_duration}}</p>
                <p>延期：{{item.delay}}</p>
              </div>
              <div>
                <p>{{new Date(item.handle_time*1000).Format("yyyy-MM-dd hh:mm")}}</p>
                <p>实际时长：{{item.real_handle_duration}}</p>
              </div>
            </div>
          </TimelineItem>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="ghost" v-if="params.status == '2'" @click="handleSubmit(1)">通过</Button>
        <Button
          type="text"
          v-if="params.status == '2'"
          @click="handleSubmit(2)"
          style="margin-left: 8px"
        >终止</Button>
        <Button
          type="text"
          v-if="params.status != '2'"
          @click="modal1 = false"
          style="margin-left: 8px"
        >取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn: ["ghost", "default", "default"],
      params: {
        by_admin: "2",
        keyword: "",
        status: 2,
        points: ""
      },
      columns: [
        { title: "工单号", key: "num" },
        { title: "工单主题", key: "topic" },
        { title: "工单内容", key: "content" },
        {
          title: "运营商",
          key: "agent_realname",
          width: 200,
          render: (h, params) => {
            const label = `${params.row.agent_realname}/${
              params.row.agent_phone
            }`;
            return h("span", {}, label);
          }
        },
        {
          title: "评分",
          key: "points",
          width: 100,
          render: (h, params) => {
            const label = this.params.status == 1 ? params.row.points : "-";
            return h("span", {}, label);
          }
        },
        {
          title: "发起人",
          key: "sponsor_realname",
          width: 200,
          render: (h, params) => {
            const label = `${params.row.sponsor_realname}/${
              params.row.sponsor_phone
            }`;
            return h("span", {}, label);
          }
        },
        {
          title: "发起时间",
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
          title: "操作",
          width: 150,
          key: "operation",
          render: (h, params) => {
            const obj = { "2": "审批", "3": "详情", "1": "详情" };
            const label = obj[this.params.status];
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
                label
              )
            ]);
          }
        }
      ],
      itemId: 0,
      modal1: false,
      formData: {
        num: "",
        sponsor_realname: "",
        sponsor_phone: "",
        content: "",
        images: [],
        reason: "",
        nodes: []
      },
      rule: {}
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "审批流程" : "审批流程";
    }
  },
  mounted() {},
  methods: {
    handleBtn(val) {
      this.btn = ["default", "default", "default"];
      this.btn[val] = "ghost";
      if (val == 0) {
        this.params = { ...this.params, status: 2 };
      }
      if (val == 1) {
        this.params = { ...this.params, status: 3 };
      }
      if (val == 2) {
        this.params = { ...this.params, status: 1 };
      }
    },
    handleAdd() {
      this.modal1 = true;
      this.itemId = 0;
      this.$refs.form.resetFields();
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
      console.log(this.itemId);
      this.$post("order/detail", { id: this.itemId }).then(res => {
        this.formData = res.data;
        this.formData.images = res.data.images.split(",");
      });
    },
    handleSubmit(val) {
      if (this.itemId) {
        this.$post("order/approve", {
          id: this.itemId,
          reason: this.formData.reason,
          is_ok: val
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      } else {
        this.$post("order/approve", {
          id: this.itemId,
          reason: this.formData.reason,
          is_ok: val
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.timeLine {
  display: flex;
  justify-content: space-between;
}
</style>