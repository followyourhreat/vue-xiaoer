<template>
  <div>
    <div class="dt-search-top">
      <ButtonGroup>
        <Button :type="btn[0]" @click="handleBtn(0)">正式小二</Button>
        <Button :type="btn[1]" @click="handleBtn(1)">待审批小二</Button>
      </ButtonGroup>
    </div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="账号、姓名、手机号、详细地址"
          />
        </div>
        <div class="dt-search-cell">
          运营商：
          <Select v-model="params.second_agent" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option
              v-for="item in secondList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>
        </div>
        <div class="dt-search-cell">
          省市区：
          <al-selector
            data-type="name"
            level="2"
            v-model="params.code"
            class="dt-search-area"
            @on-change="areaChange"
          />
        </div>
        <div class="dt-search-cell" v-if="params.is_active == 1">
          评分小于：
          <Input v-model="params.points" class="dt-search-input" placeholder="评分值"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">更换二级运营商</Button>
      </div>
    </div>
    <dt-table ref="table" url="employee/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" title="更换二级运营商" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="二级运营商" prop="second_id">
          <Select v-model="formData.second_id">
            <Option
              v-for="item in secondList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" title="评价详情" :mask-closable="false" width="650">
      <Row :gutter="40">
        <Col span="12">
          <h2 class="title">月度评价</h2>
          <div class="cell">
            <span>订单数</span>
            <span>{{detail.month_order_num}}单</span>
          </div>
          <div class="cell">
            <span>综合评分</span>
            <span>
              <Rate allow-half disabled v-model="detail.month_points"></Rate>
            </span>
          </div>
          <div class="cell">
            <span>评分统计</span>
            <span></span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="5"></Rate>
            </span>
            <span>{{detail.month_star_info[5]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="4"></Rate>
            </span>
            <span>{{detail.month_star_info[4]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="3"></Rate>
            </span>
            <span>{{detail.month_star_info[3]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="2"></Rate>
            </span>
            <span>{{detail.month_star_info[2]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="1"></Rate>
            </span>
            <span>{{detail.month_star_info[1]}}</span>
          </div>
          <div class="cell">
            <span>评分字条</span>
            <span></span>
          </div>
          <div>
            <span class="btn" v-for="(item,index) in detail.month_comments_info">{{index}} {{item}}</span>
          </div>
        </Col>
        <Col span="12">
          <h2 class="title">整体评价</h2>
          <div class="cell">
            <span>订单数</span>
            <span>{{detail.total_order_num}}单</span>
          </div>
          <div class="cell">
            <span>综合评分</span>
            <span>
              <Rate allow-half disabled v-model="detail.total_points"></Rate>
            </span>
          </div>
          <div class="cell">
            <span>评分统计</span>
            <span></span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="5"></Rate>
            </span>
            <span>{{detail.total_star_info[5]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="4"></Rate>
            </span>
            <span>{{detail.total_star_info[4]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="3"></Rate>
            </span>
            <span>{{detail.total_star_info[3]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="2"></Rate>
            </span>
            <span>{{detail.total_star_info[2]}}</span>
          </div>
          <div class="cell">
            <span>
              <Rate disabled :value="1"></Rate>
            </span>
            <span>{{detail.total_star_info[1]}}</span>
          </div>
          <div class="cell">
            <span>评分字条</span>
            <span></span>
          </div>
          <div>
            <span class="btn" v-for="(item,index) in detail.total_comments_info">{{index}} {{item}}</span>
          </div>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="text" @click="modal2 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" title="身份证" :mask-closable="false">
      <div style="text-align: center">
        <img :src="detail3.idcard_front" height="200px">
        <img :src="detail3.idcard_back" height="200px">
      </div>
      <div slot="footer">
        <Button type="text" @click="modal3 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btn: ["ghost", "default"],
      params: {
        is_active: "1",
        keyword: "",
        second_agent: "",
        code: [],
        points: ""
      },
      brandList: [],
      seriesList: [],
      modelList: [],
      columns: [
        { type: "selection", width: 60 },
        {
          title: "运营商/所属社区",
          key: "second",
          render: (h, params) => {
            const label =
              params.row.second &&
              `${params.row.second.realname}/${params.row.second.phone}`;
            return h("span", {}, label);
          }
        },
        { title: "账号", key: "username" },
        { title: "姓名", key: "realname" },
        { title: "手机号", key: "phone" },
        {
          title: "性别",
          key: "sex",
          render: (h, params) => {
            const obj = { "1": "男", "2": "女" };
            const label = obj[params.row.online];
            return h("span", {}, label);
          }
        },
        { title: "出生年月", key: "birthday" },

        {
          title: "状态",
          key: "online",
          width: 100,
          render: (h, params) => {
            if (this.params.is_active == 1) {
              const obj = { "1": "在线", "2": "离线" };
              const label = obj[params.row.online];
              return h("span", {}, label);
            } else {
              return h("span", {}, "/");
            }
          }
        },

        {
          title: "申请时间",
          key: "ctime",
          width: 150,
          render: (h, params) => {
            const label = new Date(params.row.ctime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        },
        { title: "详细地址", key: "address" },
        // {
        //   title: "订单总数",
        //   key: "total_order_num",
        //   render: (h, params) => {
        //     const label =
        //       params.row.extend && params.row.extend.total_order_num;
        //     return h("span", {}, label);
        //   }
        // },
        // {
        //   title: "评分",
        //   key: "total_points",
        //   render: (h, params) => {
        //     const label = params.row.extend && params.row.extend.total_points;
        //     return h("span", {}, label);
        //   }
        // },
        {
          title: "操作",
          width: 180,
          key: "operation",
          render: (h, params) => {
            const obj = { "1": "评价详情", "2": "身份证" };
            const label = obj[this.params.is_active];
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDetail(params.row);
                    }
                  }
                },
                label
              ),
              h(
                "span",
                {
                  class: "span-del",
                  on: {
                    click: () => {
                      this.handleRemove("employee/del", { id: params.row.id });
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
      firstList: [],
      secondList: [],
      formData: {
        second_id: ""
      },
      rule: {},
      modal2: false,
      detail: {
        remain_money: "",
        month_salary: "",
        device_num: "",
        new_device_num: "",
        month_order_num: "",
        month_points: 0,
        month_star_info: {},
        month_comments_info: {},
        total_salary: "",
        total_order_num: "",
        total_points: 0,
        total_star_info: {},
        total_comments_info: {}
      },
      modal3: false,
      detail3: {
        idcard_front: "",
        idcard_back: ""
      }
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    }
  },
  mounted() {
    this.getSecondLevel();
  },
  methods: {
    handleBtn(val) {
      this.btn = ["default", "default"];
      this.btn[val] = "ghost";
      if (val == 0) {
        this.params = { ...this.params, is_active: 1 };
      }
      if (val == 1) {
        this.params = { ...this.params, is_active: 2 };
      }
    },
    getSecondLevel() {
      this.$post("agent/second-level", { page: 0 }).then(res => {
        this.secondList = res.data;
      });
    },
    areaChange(val) {
      if (val.length == 1) {
        this.params.province = val[0];
      }
      if (val.length == 2) {
        this.params.province = val[0];
        this.params.city = val[1];
      }
      if (val.length == 3) {
        this.params.province = val[0];
        this.params.city = val[1];
        this.params.district = val[2];
      }
    },
    handleAdd() {
      this.modal1 = true;
      this.itemId = 0;
      this.$refs.form.resetFields();
    },
    handleSubmit() {
      //获取选中的列表项,默认返回id数组,支持传参getSelect('key1');
      var arr = this.$refs.table.getSelect();
      if (arr.length > 0) {
        this.$post("employee/change-agent", {
          agent_id: this.formData.second_id,
          ids: arr.join()
        }).then(res => {
          this.$Message.success("更换成功");
          this.modal1 = false;
          this.handleSearch();
        });
      } else {
        this.$Message.warning("请选择至少一项");
      }
    },
    handleDetail(item) {
      if (this.params.is_active == 1) {
        this.modal2 = true;
        this.detail = Object.assign({}, item.extend);
        this.detail.month_points = parseFloat(item.extend.month_points) / 2;
        this.detail.total_points = parseFloat(item.extend.total_points) / 2;
        console.log(this.detail);
      } else {
        this.modal3 = true;
        this.detail3 = Object.assign({}, item);
      }
    },
    handleExport() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定导出数据 ?",
        onOk: () => {
          this.$post("finance/list", {
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

<style lang="less" scoped>
.title {
  padding-left: 8px;
  border-left: 10px solid #093151;
}
.cell {
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
}
.btn {
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 10px 10px 0px;
  color: #ffffff;
  background: #d8d8d8;
  display: inline-block;
}
</style>