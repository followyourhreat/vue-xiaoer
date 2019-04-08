<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="MAC、名称、用户名、手机号、详细地址"
          />
        </div>
        <div class="dt-search-cell">
          一级运营商：
          <Select v-model="params.first_agent" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option
              v-for="item in firstList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>
        </div>

        <!-- <div class="dt-search-cell">
          二级运营商：
          <Select v-model="params.second_agent" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option
              v-for="item in secondList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>


        </div>-->
        <div class="dt-search-cell" style="padding:0 10px 0 0 !important;">
          <span class="agent-word">二级运营商：</span>
          <input
            v-model="params.second_agent"
            class="ivu-input agent-search"
            placeholder="请输入运营商"
            @click="agentSearch"
            @keydown="agentChange"
          >

          <div class="ivu-select-dropdown agent-search2" v-show="agentShow">
            <ul class="ivu-dropdown-menu agent-ul">
              <li
                v-for="item in secondList"
                :value="item.realname"
                :key="item.id"
                @click="agentPut2(item.realname)"
                class="ivu-dropdown-item agent-li"
              >{{ item.realname }}/{{ item.phone }}</li>
            </ul>
          </div>
        </div>

        <div class="dt-search-cell">
          品牌：
          <Select v-model="params.brand" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option v-for="item in brandList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <div class="dt-search-cell">
          系列：
          <Select v-model="params.series" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option v-for="item in seriesList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </div>
        <div class="dt-search-cell">
          型号：
          <Select v-model="params.model" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option v-for="item in modelList" :value="item" :key="item">{{ item }}</Option>
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
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd" v-if="this.adminLevel == 1">更换二级运营商</Button>
        <Button type="info" @click="handleExport">导出</Button>
      </div>
    </div>
    <dt-table ref="table" url="device/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" title="更换二级运营商" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="二级运营商" prop="second_id">
          <!-- <Select v-model="formData.second_id">
            <Option
              v-for="item in secondList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>-->

          <input
            v-model="formData.second_id"
            class="ivu-input agent-search"
            placeholder="请输入运营商"
            @click="agentSearch"
            @keydown="agentChange2"
          >

          <div class="ivu-select-dropdown agent-search2 agent-search-box" v-show="agentShow">
            <ul class="ivu-dropdown-menu agent-ul">
              <li
                v-for="item in secondList"
                :value="item.realname"
                :key="item.id"
                @click="agentPut22(item.realname)"
                class="ivu-dropdown-item agent-li"
              >{{ item.realname }}/{{ item.phone }}</li>
            </ul>
          </div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="handCancel()" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      params: {
        keyword: "",
        first_agent: "",
        second_agent: "",
        brand: "",
        series: "",
        model: "",
        code: []
      },
      brandList: [],
      seriesList: [],
      modelList: [],
      columns: [
        { type: "selection", width: 60 },
        {
          title: "一级运营商",
          key: "first",
          width: 150,
          render: (h, params) => {
            const label =
              params.row.first &&
              `${params.row.first.realname}/${params.row.first.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "二级运营商",
          key: "second",
          width: 150,
          render: (h, params) => {
            const label =
              params.row.second &&
              `${params.row.second.realname}/${params.row.second.phone}`;
            return h("span", {}, label);
          }
        },
        { title: "设备MAC", key: "mac", width: 160 },
        { title: "设备名称", key: "name", width: 150 },
        { title: "通讯方式", key: "connect_type", width: 150 },
        { title: "系列", key: "series", width: 150 },
        { title: "型号", key: "model", width: 150 },
        { title: "套餐状态", key: "expire_time", width: 150 },
        { title: "总套餐", key: "expire_time", width: 150 },
        { title: "地址", key: "address", width: 150 },
        { title: "姓名", key: "nickname", width: 150 },
        { title: "手机号码", key: "phone", width: 150 },
        {
          title: "激活日期",
          key: "ctime",
          width: 150,
          render: (h, params) => {
            const label = new Date(params.row.ctime * 1000).Format(
              "yyyy-MM-dd hh:mm"
            );
            return h("span", {}, label);
          }
        }
      ],
      itemId: 0,
      modal1: false,
      firstList: [],
      secondList: [],
      agentList: [],
      formData: {
        second_id: ""
      },
      rule: {},
      adminLevel: "",
      username: "",
      password: "",
      agentShow: ""
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    },
    ...mapGetters(["userInfo"])
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");
    this.getFirstLevel();
    this.getSecondLevel();
    this.getBrand();
    this.getSeries();
    this.getModel();
    this.getRole();
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
        this.agentList = this.secondList;
      });
    },
    getBrand() {
      this.$post("device/brands", { page: 0 }).then(res => {
        this.brandList = res.data;
      });
    },
    getSeries() {
      this.$post("device/series", { page: 0 }).then(res => {
        this.seriesList = res.data;
      });
    },
    getModel() {
      this.$post("device/models", { page: 0 }).then(res => {
        this.modelList = res.data;
      });
    },
    getRole() {
      this.$post("admin/login", {
        username: this.username,
        password: this.password
      }).then(res => {
        this.adminLevel = res.data.identity;
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
      this.agentShow = false;
      this.itemId = 0;
      this.$refs.form.resetFields();
    },
    handleSubmit() {
      //获取选中的列表项,默认返回id数组,支持传参getSelect('key1');
      var arr = this.$refs.table.getSelect();
      if (arr.length > 0) {
        this.$post("device/change-agent", {
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
    handleExport() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定导出数据 ?",
        onOk: () => {
          this.$post("device/list", {
            ...this.params,
            export: 1
          }).then(res => {
            window.location.href = res.data.filename;
          });
        },
        onCancel: () => {}
      });
    },
    agentSearch() {
      console.log("123");

      this.agentShow = !this.agentShow;
    },
    agentPut2(value) {
      this.params.second_agent = value;

      console.log(value);
      this.agentShow = false;
    },
    agentPut22(value) {
      this.formData.second_id = value;

      console.log(value);
      this.agentShow = false;
    },
    agentChange() {
      console.log("change-------");
      this.newData2();
    },
    agentChange2() {
      console.log("change-------");
      this.newData22();
    },
    newData2() {
      this.secondList = this.agentList;
      var arrByZM = [];
      for (var i = 0; i < this.secondList.length; i++) {
        //for循环数据中的每一项（根据name值）

        if (
          this.secondList[i].realname.indexOf(this.params.second_agent) != -1
        ) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功

          arrByZM.push(this.secondList[i]);
          //向空数组中添加数据
        }
      }
      console.log(arrByZM);
      return (this.secondList = arrByZM);
    },
    newData22() {
      this.secondList = this.agentList;
      var arrByZM = [];
      for (var i = 0; i < this.secondList.length; i++) {
        //for循环数据中的每一项（根据name值）

        if (
          this.secondList[i].realname.indexOf(this.formData.second_id) != -1
        ) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功

          arrByZM.push(this.secondList[i]);
          //向空数组中添加数据
        }
      }
      console.log(arrByZM);
      return (this.secondList = arrByZM);
    },
    handCancel() {
      this.modal1 = false;
      this.agentShow = false;
    }
  }
};
</script>
<style scoped>
.agent-search {
  max-width: 160px;
}
.agent-search2 {
  max-width: 160px;
  margin-left: 88px;
}
.agent-word {
  display: inline-block;
}
.agent-ul {
  min-width: 160px !important;
}
.agent-search-box {
  margin-left: 0px;
}
</style>
