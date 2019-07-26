<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          店铺名称：
          <Input
            v-model="params.name"
            class="dt-search-input"
            style="width: 100px"
            placeholder="店铺名称"
          />
        </div>
        <div class="dt-search-cell">
          店铺负责人：
          <Input
            v-model="params.responsibility"
            class="dt-search-input"
            style="width: 100px"
            placeholder="店铺负责人"
          />
        </div>
        <div class="dt-search-cell">
          店铺手机号：
          <Input
            v-model="params.mobile"
            class="dt-search-input"
            style="width: 100px"
            placeholder="店铺手机号"
          />
        </div>
        <div class="dt-search-cell">
          推荐人：
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 100px"
            placeholder="推荐人"
          />
        </div>
        <div class="dt-search-cell">
          省市区：
          <al-selector
            data-type="code"
            level="2"
            v-model="params.code"
            class="dt-search-area"
            @on-change="areaChange"
          />
        </div>
        <div class="dt-search-cell">
          审核状态：
          <dt-select
            v-model="params.checked_status"
            class="dt-search-select"
            url="auditStatus"
            style="width: 100px"
          />
        </div>
        <!-- <div class="dt-search-cell">
          特惠状态：
          <dt-select v-model="params.keyword" class="dt-search-select" url="PreferentialStatus" style="width: 100px"/>
        </div>-->
        <div class="dt-search-cell">
          营业状态：
          <dt-select
            v-model="params.open_status"
            class="dt-search-select"
            url="BusinessStatus"
            style="width: 100px"
          />
        </div>
        <div class="dt-search-cell">
          审核时间：
          <dt-selectDate
            v-model="params.checked_time"
            class="dt-search-date"
            @on-select="handleCheckDateSelect"
          />
        </div>
        <div class="dt-search-cell">
          创建时间：
          <dt-selectDate
            v-model="params.created_time"
            class="dt-search-date"
            @on-select="handleCreateDateSelect"
          />
        </div>
        <div class="dt-search-operation">
          <Button type="success" @click="handleReset">重置</Button>
          <Button type="ghost" @click="handleSearch">查询</Button>
        </div>
      </div>
    </div>

    <div class="add-btn">
      <Button type="ghost" @click="handleExport">导出</Button>
      <Button type="warning" @click="handleUnty">解绑二维码</Button>
      <Button type="error" @click="handleDeny">商家迁移</Button>
    </div>
    <dt-table ref="table" url="/merchantList" :params="params" :columns="columns"></dt-table>
    <!-- <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table>
    <div class="count-data">
      <span>合计</span><span>店铺余额</span><span>123132</span><span>消费人数</span><span>123132</span>
    </div>
    <Page :total="100" show-sizer show-elevator />-->
    <!-- <dt-table ref="table" url="flow/list" :params="params" :columns="columns"></dt-table> -->
    <Modal v-model="modal1" title="解绑二维码" @on-ok="ok" ok-text="确定解绑" @on-cancel="cancel">
      <div class="select-shop">
        <div class="select-title">已选商家</div>
        <div class="select-content">
          <ul>
            <li>
              <div class="shopName">
                <span>店铺名称：</span>
                <span>沙县小吃</span>
              </div>
              <div class="shopName">
                <span>店铺手机号：</span>
                <span>15645674642</span>
              </div>
              <div class="shopName">
                <span>推荐人：</span>
                <span>张三</span>
              </div>
            </li>
            <li>
              <div class="shopName">
                <span>店铺名称：</span>
                <span>沙县小吃</span>
              </div>
              <div class="shopName">
                <span>店铺手机号：</span>
                <span>15645674642</span>
              </div>
              <div class="shopName">
                <span>推荐人：</span>
                <span>张三</span>
              </div>
            </li>
            <li>
              <div class="shopName">
                <span>店铺名称：</span>
                <span>沙县小吃</span>
              </div>
              <div class="shopName">
                <span>店铺手机号：</span>
                <span>15645674642</span>
              </div>
              <div class="shopName">
                <span>推荐人：</span>
                <span>张三</span>
              </div>
            </li>
            <li>
              <div class="shopName">
                <span>店铺名称：</span>
                <span>沙县小吃</span>
              </div>
              <div class="shopName">
                <span>店铺手机号：</span>
                <span>15645674642</span>
              </div>
              <div class="shopName">
                <span>推荐人：</span>
                <span>张三</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="select-count">共计四项</div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      uploadData: {
        target: "icon"
      },
      params: {
        keyword: "",
        name: "",
        responsibility: "",
        code: [],
        mobile: "",
        checked_status: "",
        open_status: "",
        checked_time: "",
        created_time: "",
        stimulateActivitySwitch: ""
      },
      columns: [
        { type: "selection", width: 60, align: "center" },
        { type: "index", width: 60, align: "center" },
        { title: "店铺名", key: "name", width: 120 },
        { title: "店铺负责人", key: "responsibility", width: 120 },
        { title: "店铺手机号", key: "mobile", width: 150 },
        { title: "店铺注册手机号", key: "tel", width: 150 },
        { title: "推荐人", key: "consumer", width: 100 },
        { title: "店铺营业额", key: "sumOrderMoney", width: 120 },
        { title: "省", key: "pid", width: 80 },
        { title: "市", key: "cid", width: 80 },
        { title: "区", key: "aid", width: 80 },
        { title: "地址", key: "sid", width: 80 },
        { title: "详细地址", key: "addr", width: 210 },
        { title: "店铺推荐码", key: "rcdCode", width: 110 },
        { title: "审核状态", key: "checkedStatus", width: 100,
          render: (h, params) => {
            const obj = { "0": "审核通过", "1": "待审核" };
            const label = obj[params.row.checkedStatus];
            return h("span", {}, label);
          }
        },
        { title: "审核时间", key: "checkedTime", width: 180 },
        { title: "消费人数", key: "consumer", width: 100 },
        { title: "营业状态", key: "openStatus", width: 100 ,
          render: (h, params) => {
            const obj = { "0": "歇业", "1": "营业中" };
            const label = obj[params.row.openStatus ];
            return h("span", {}, label);
          }
        },
        { title: "审核意见", key: "disableStatus", width: 110 },
        {
          title: "操作",
          key: "operator",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleDetail(params.row.id);
                    }
                  }
                },
                "查看详情"
              )
            ]);
          }
        }
      ],
      data: [
        {
          name: "John Brown",
          responsibility: "1111",
          mobile: "12312312312",
          tel: "12312312312",
          recommender: "1231",
          shopBalance: "1231",
          province: "1231",
          city: "1231",
          district: "1231",
          Street: "1231",
          adress: "1231",
          rcdCode: "222",
          auditStatus: "222",
          auditTime: "222",
          consunmers: "222",
          businessStatus: "222",
          auditOpinions: "222"
        },
        {
          shopName: "John Brown",
          shopManager: "1111",
          shopPhone: "12312312312",
          shopRegPhone: "12312312312",
          recommender: "1231",
          shopBalance: "1231",
          province: "1231",
          city: "1231",
          district: "1231",
          Street: "1231",
          adress: "1231",
          rcdCode: "222",
          auditStatus: "222",
          auditTime: "222",
          consunmers: "222",
          businessStatus: "222",
          auditOpinions: "222"
        },
        {
          shopName: "John Brown",
          shopManager: "1111",
          shopPhone: "12312312312",
          shopRegPhone: "12312312312",
          recommender: "1231",
          shopBalance: "1231",
          province: "1231",
          city: "1231",
          district: "1231",
          Street: "1231",
          adress: "1231",
          rcdCode: "222",
          auditStatus: "222",
          auditTime: "222",
          consunmers: "222",
          businessStatus: "222",
          auditOpinions: "222"
        },
        {
          shopName: "John Brown",
          shopManager: "1111",
          shopPhone: "12312312312",
          shopRegPhone: "12312312312",
          recommender: "1231",
          shopBalance: "1231",
          province: "1231",
          city: "1231",
          district: "1231",
          Street: "1231",
          adress: "1231",
          rcdCode: "222",
          auditStatus: "222",
          auditTime: "222",
          consunmers: "222",
          businessStatus: "222",
          auditOpinions: "222"
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    areaChangeModal() {},
    handleReset() {},

    handleUnty() {
      this.modal1 = true;
    },
    handleExport() {},
    handleCheckDateSelect(value) {
      console.log(value);
    },
    handleCreateDateSelect() {},
    areaChange(value) {
      console.log(value);
    },
    handleDeny() {},
    ok() {
      this.$Message.info("解绑成功");
    },
    cancel() {},
    handleDetail(idx) {
      console.log(idx);
      this.$router.push({ path: "/mall/detail", query: { id: idx } });
    }
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

.dt-search-top .dt-search-area {
  width: 325px;
  display: inline-block;
  vertical-align: middle;
}

.count-data {
  position: relative;
  width: 100%;
  overflow: hidden;
  span {
    display: block;
    float: left;
    border: 1px solid #ccc;
    line-height: 48px;
    height: 48px;
    text-align: center;
  }
  span:nth-child(1) {
    width: 300px;
  }
  span:nth-child(2) {
    width: 150px;
  }
  span:nth-child(3) {
    width: 150px;
  }
  span:nth-child(4) {
    width: 150px;
  }
  span:nth-child(5) {
    width: 150px;
  }
  // span:last-child{
  //   width:auto;
  // }
}
.ivu-page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.add-btn {
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  padding-left: 20px;
}
.select-shop {
  position: relative;
  width: 80%;
  margin: auto;
  border: 1px solid #ccc;
  .select-title {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    background: #093151;
    color: #fff;
    text-align: center;
  }
  ul {
    position: relative;

    li {
      list-style-type: none;
      border-bottom: 1px solid #ccc;

      .shopName {
        position: relative;
        overflow: hidden;
        width: 100%;
        display: flex;
        justify-content: center;
        line-height: 30px;
      }
    }
    li:last-child {
      border: none;
    }
  }
}
.select-count {
  width: 80%;
  margin: 20px auto;
  text-align: right;
}
</style>