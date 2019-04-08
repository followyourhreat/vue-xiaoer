<template>
  <div>
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
          申请时间：
          <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
        </div>
        <div class="dt-search-cell">
          审核时间：
          <dt-selectDate class="dt-search-date" @on-select="handleDateSelect2"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <!-- <Button type="info" @click="handleExport">导出</Button> -->
      </div>
    </div>
    <dt-table ref="table" url="cash/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="审批" prop="reason">
          <Input type="textarea" v-model="formData.reason" placeholder="请输入审批理由"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit(1)">通过</Button>
        <Button type="text" @click="handleSubmit(2)" style="margin-left: 8px">拒绝</Button>
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
        cash_num: "",
        business_num: "",
        start_time: "",
        end_time: "",
        check_start_time: "",
        check_end_time: ""
      },
      columns: [
        { title: "提现单号", key: "cash_num" },
        { title: "运营商姓名", key: "realname" },
        { title: "运营商账号", key: "username" },
        { title: "运营商手机", key: "phone" },
        { title: "用户余额", key: "remain_amount" },
        { title: "提现金额", key: "cash_amount" },
        { title: "手续费", key: "service_fee" },
        {
          title: "状态",
          key: "is_agree",
          render: (h, params) => {
            const obj = { "0": "待审核", "1": "通过", "2": "拒绝" };
            const label = obj[params.row.is_agree];
            return h("span", {}, label);
          }
        },
        { title: "商户号", key: "business_num" },
        { title: "原因", key: "reason" },
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
        {
          title: "审核时间",
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
          width: 150,
          key: "operation",
          render: (h, params) => {
            if (params.row.is_agree == "0") {
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
                  "审核"
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
      formData: {
        reason: ""
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
    handleDateSelect(val) {
      this.params.start_time = val[0];
      this.params.end_time = val[1];
    },
    handleDateSelect2(val) {
      this.params.check_start_time = val[0];
      this.params.check_end_time = val[1];
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
    },
    handleSubmit(val) {
      if (this.itemId) {
        this.$post("cash/check", {
          id: this.itemId,
          reason: this.formData.reason,
          is_agree: val
        }).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      } else {
        this.$post("cash/check", {
          id: this.itemId,
          reason: this.formData.reason,
          is_agree: val
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