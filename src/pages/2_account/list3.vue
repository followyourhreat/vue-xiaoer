<template>
  <div>
    <div class="dt-search-top">
      <div class="dt-search-cells">
        <div class="dt-search-cell">
          <Input
            v-model="params.keyword"
            class="dt-search-input"
            style="width: 350px"
            placeholder="账号、姓名、手机号码"
          />
        </div>
        <div class="dt-search-cell">
          等级：
          <dt-select v-model="params.level" class="dt-search-select" url="userLevel"/>
        </div>
        <div class="dt-search-cell" style="padding:0 10px 0 0 !important;">
          <span class="agent-word">上一级：</span>
          <input
            v-model="params.first_level"
            class="ivu-input agent-search"
            placeholder="请输入运营商"
            @click="agentSearch"
            @keydown="agentChange"
          >

          <div class="ivu-select-dropdown agent-search2" v-show="agentShow">
            <ul class="ivu-dropdown-menu agent-ul">
              <li
                v-for="item in firstList"
                :value="item.realname"
                :key="item.id"
                @click="agentPut(item.realname)"
                class="ivu-dropdown-item agent-li"
              >{{ item.realname }}/{{ item.phone }}</li>
            </ul>
          </div>
          <!-- <div class="ivu-select-dropdown agent-search2" v-show="agentShow2">
            <ul class="ivu-dropdown-menu agent-ul">
              <li
                v-for="item in list"
                :value="item.realname"
                :key="item.id"
                @click="agentPut2(item.realname)"
                class="ivu-dropdown-item agent-li"
              >{{ item.realname }}/{{ item.phone }}</li>
            </ul>
          </div>-->
          <!-- <Select v-model="params.first_level" class="dt-search-select">
            <Option value="0" key="-1">全部</Option>
            <Option
              v-for="item in firstList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>-->
        </div>
        <div class="dt-search-cell">
          状态：
          <dt-select v-model="params.status" class="dt-search-select" url="userStatus"/>
        </div>
        <div class="dt-search-cell">
          省市区：
          <al-selector
            data-type="name"
            all="true"
            level="2"
            v-model="params.code"
            class="dt-search-area"
            @on-change="areaChange"
          />
        </div>
        <div class="dt-search-cell">
          月收入大于：
          <Input v-model="params.month_salary" class="dt-search-input" placeholder="月收入金额"/>
        </div>
        <div class="dt-search-cell">
          总收入大于：
          <Input v-model="params.total_salary" class="dt-search-input" placeholder="总收入金额"/>
        </div>
        <div class="dt-search-cell">
          总体评分大于：
          <Input v-model="params.points" class="dt-search-input" placeholder="总体评分"/>
        </div>
      </div>
      <div class="dt-search-operation">
        <Button type="ghost" @click="handleSearch">查询</Button>
        <Button type="success" @click="handleAdd">新增</Button>
        <Button type="info" @click="handleExport">导出</Button>
      </div>
    </div>
    <dt-table ref="table" url="agent/list" :params="params" :columns="columns"></dt-table>
    <Modal v-model="modal1" :title="modelTitle" :mask-closable="false">
      <Form ref="form" :model="formData" :rules="rule" :label-width="100">
        <FormItem label="账号" prop="username">
          <Input v-model="formData.username" placeholder="请输入账号"></Input>
        </FormItem>
        <FormItem label="姓名" prop="realname">
          <Input v-model="formData.realname" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="formData.phone" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="等级" prop="level">
          <dt-select v-model="formData.level" class="dt-search-select" url="userLevelModal"/>
          <!-- <Select v-model="formData.level">
            <Option v-for="(item,index) in levelList" :value="item.index" :key="index">{{ item }}</Option>
          </Select>-->
        </FormItem>
        <!-- <FormItem label="等级" prop="level" v-if="this.adminLevel == 2 ">
          <dt-select v-model="formData.level" class="dt-search-select" url="userLevelModal2"/>
         
        </FormItem>-->
        <FormItem label="上一级" prop="pid">
          <!-- <Select v-model="formData.pid" v-if="this.newName == 2">
            <Option
              v-for="item in firstList"
              :value="item.id"
              :key="item.id"
            >{{ item.realname }}/{{ item.phone }}</Option>
          </Select>-->

          <div class="dt-search-cell" style v-if="this.newName == 2">
            <input
              v-model="formData.pid"
              class="ivu-input"
              placeholder="请输入运营商"
              @click="agentSearch2"
              @keydown="agentChange2"
            >

            <div class="ivu-select-dropdown" v-show="agentShow2">
              <ul class="ivu-dropdown-menu agent-ul">
                <li
                  v-for="item in secondList"
                  :value="item.realname"
                  :key="item.id"
                  @click="agentPut(item.realname)"
                  class="ivu-dropdown-item agent-li"
                >{{ item.realname }}/{{ item.phone }}</li>
              </ul>
            </div>
          </div>
          <Select v-model="formData.pid" v-if="this.newName == 1">
            <Option :value="topList.id" :key="topList.id">{{ topList.realname }}/{{ topList.phone }}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" prop="status">
          <dt-select v-model="formData.status" class="dt-search-select" url="userStatusModal"/>
        </FormItem>
        <FormItem label="角色" prop="role_id">
          <Select v-model="formData.role_id">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.role_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="省市区" prop="code">
          <al-selector
            ref="code"
            data-type="name"
            level="2"
            v-model="formData.code"
            style="display: flow-root"
            @on-change="areaChangeModal"
          />
        </FormItem>
        <FormItem label="详细地址" prop="address">
          <input
            v-model="formData.address"
            type="text"
            ref="search"
            id="search"
            class="ivu-input"
            placeholder="请输入详细地址"
          >
          <div class="pickerMap" ref="map"></div>
        </FormItem>
        <FormItem label="服务范围" prop="serve_range" v-show="rangeShow">
          <Input
            v-model="formData.serve_range"
            placeholder="请输入服务范围"
            style="width:300px;"
            @on-change="loadCircle"
          ></Input>
          <span style="padding: 0px 5px;">公里</span>
        </FormItem>
        <FormItem label="银行卡号" prop="bank_card">
          <Input v-model="formData.bank_card" placeholder="提现时候使用的银行卡号"></Input>
        </FormItem>
        <FormItem label="开户人" prop="bank_user">
          <Input v-model="formData.bank_user" placeholder="请输入开户人名称"></Input>
        </FormItem>
        <FormItem label="开户银行" prop="bank_code">
          <!-- <Input v-model="formData.bank_code" placeholder="请输入开户银行"></Input> -->
          <dt-select v-model="formData.bank_code" class="dt-search-select" url="bankModal"/>
        </FormItem>
        <FormItem label="推广费用" prop="spread_fee">
          <Input v-model="formData.spread_fee" placeholder="推广设备，激活后得到的费用"></Input>
        </FormItem>
        <FormItem label="推广时长" prop="spread_time">
          <Input v-model="formData.spread_time" placeholder="设备需要激活的时长"></Input>
        </FormItem>
        <FormItem label="装机费用" prop="install_fee">
          <Input v-model="formData.install_fee" placeholder="安装一台机器，获得的费用"></Input>
        </FormItem>
        <FormItem label="售后服务费用" prop="service_fee">
          <Input v-model="formData.service_fee" placeholder="每个月每台机器的服务费用"></Input>
        </FormItem>
        <FormItem label="续费费用" prop="renew_fee">
          <Input v-model="formData.renew_fee" placeholder="完成第一次续费，奖励金额"></Input>
        </FormItem>
        <FormItem label="续费时长" prop="renew_time">
          <Input v-model="formData.renew_time" placeholder="续费时长，天数"></Input>
        </FormItem>
        <FormItem label="达标奖励" prop="achieve_reward">
          <Input v-model="formData.achieve_reward" placeholder="达标奖励金额"></Input>
        </FormItem>
        <FormItem label="达标数量" prop="achieve_num">
          <Input v-model="formData.achieve_num" placeholder="月度新增激活设备量"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="handleSubmit()">保存</Button>
        <Button type="text" @click="modal1 = false" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" title="运营详情" :mask-closable="false" width="650">
      <h1>余额: {{detail.remain_money}}元</h1>
      <Row :gutter="40">
        <Col span="12">
          <h2 class="title">月度运营详情</h2>
          <div class="cell">
            <span>月度收入</span>
            <span>{{detail.month_salary}}元</span>
          </div>
          <div class="cell">
            <span>设备数</span>
            <span>{{detail.device_num}}台</span>
          </div>
          <div class="cell">
            <span>新装机数</span>
            <span>{{detail.new_device_num}}台</span>
          </div>
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
          <h2 class="title">整体运营详情</h2>
          <div class="cell">
            <span>总收入</span>
            <span>{{detail.total_salary}}元</span>
          </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        keyword: "",
        level: "",
        first_level: "",
        status: "0",
        code: [],
        month_salary: "",
        total_salary: "",
        points: ""
      },
      columns: [
        { title: "账号", key: "username", width: 150 },
        { title: "姓名", key: "realname", width: 150 },
        { title: "手机号码", key: "phone", width: 150 },
        {
          title: "等级",
          key: "level",
          width: 100,
          render: (h, params) => {
            const obj = { "1": "一级", "2": "二级" };
            const label = obj[params.row.level];
            return h("span", {}, label);
          }
        },
        {
          title: "上一级",
          key: "parent",
          width: 160,
          render: (h, params) => {
            const label =
              params.row.parent &&
              `${params.row.parent.realname}/${params.row.parent.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "状态",
          key: "status",
          width: 100,
          render: (h, params) => {
            const obj = { "1": "正常", "2": "禁用" };
            const label = obj[params.row.status];
            return h("span", {}, label);
          }
        },
        {
          title: "月收入",
          key: "month_salary",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.month_salary;
            return h("span", {}, label);
          }
        },
        {
          title: "总收入",
          key: "total_salary",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.total_salary;
            return h("span", {}, label);
          }
        },
        {
          title: "总体评分",
          key: "total_points",
          width: 150,
          render: (h, params) => {
            const label = params.row.extend && params.row.extend.total_points;
            return h("span", {}, label);
          }
        },
        {
          title: "地址",
          key: "address",
          width: 250,
          render: (h, params) => {
            const label = params.row.address;
            return h("span", {}, label);
          }
        },
        {
          title: "添加人",
          key: "creator",
          width: 190,
          render: (h, params) => {
            const label =
              params.row.creator &&
              `${params.row.creator.realname}/${params.row.creator.phone}`;
            return h("span", {}, label);
          }
        },
        {
          title: "添加时间",
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
          title: "操作",
          width: 320,
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleSync(params.row);
                    }
                  }
                },
                "同步设备"
              ),
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
                "运营详情"
              ),
              h(
                "span",
                {
                  class: "span-active",
                  on: {
                    click: () => {
                      this.handleReset(params.row);
                    }
                  }
                },
                "密码初始化"
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
                      this.handleRemove("agent/del", { id: params.row.id });
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
      topList: [],
      topList_realname: "",
      topList_phone: "",
      topList_id: "",
      roleList: [],
      formData: {
        username: "",
        realname: "",
        phone: "",
        level: "",
        pid: "",
        status: "1",
        role_id: "",
        code: ["全部", "全部", "全部"],
        province: "全部",
        city: "全部",
        district: "全部",
        address: "",
        longitude: "",
        latitude: "",
        serve_range: "1",
        bank_card: "",
        bank_user: "",
        bank_code: "",
        spread_fee: "",
        spread_time: "",
        install_fee: "",
        service_fee: "",
        renew_fee: "",
        renew_time: "",
        achieve_reward: "",
        achieve_num: ""
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
      agentShow: false,
      agentShow2: false,
      agentList: [],
      agentList2: [],
      secondList: [],
      rangeShow: true,
      newData: "",
      username: "",
      password: "",
      adminLevel: ""
    };
  },
  computed: {
    modelTitle() {
      return this.itemId ? "编辑" : "新增";
    },
    newName() {
      return this.formData.level;
    }
    // newData() {
    //   return this.params.first_level;
    // }
  },
  mounted() {
    this.getFirstLevel();
    this.getRoleList();
    this.getTopLevel();
    this.getSecondLevel();
    this.newData = this.params.first_level;
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");
    this.getAdmin();
  },

  methods: {
    getFirstLevel() {
      this.$post("agent/first-level", { page: 0 }).then(res => {
        this.firstList = res.data;
        this.agentList = this.firstList;
      });
    },
    getSecondLevel() {
      this.$post("agent/second-level", { page: 0 }).then(res => {
        this.secondList = res.data;
        this.agentList2 = this.secondList;
        console.log(this.agentList2);
      });
    },
    getTopLevel() {
      this.$post("agent/top-level", { page: 0 }).then(res => {
        this.topList = res.data;
        this.topList_id = this.topList_id;
        this.topList_realname = this.topList.realname;
        this.topList_phone = this.topList.phone;
        // console.log(this.topList.realname);
      });
    },
    getRoleList() {
      this.$post("role/list", { page: 0 }).then(res => {
        this.roleList = res.data.list;
      });
    },
    getAdmin() {
      this.$post("admin/login", {
        username: this.username,
        password: this.password
      }).then(res => {
        this.adminLevel = res.data.identity;
        console.log(this.adminLevel);
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
    areaChangeModal(val) {
      if (val.length == 1) {
        this.formData.province = val[0];
      }
      if (val.length == 2) {
        this.formData.province = val[0];
        this.formData.city = val[1];
      }
      if (val.length == 3) {
        this.formData.province = val[0];
        this.formData.city = val[1];
        this.formData.district = val[2];
      }
    },
    // 加载地图
    loadMap() {
      const self = this;
      const map = new AMap.Map(this.$refs.map, {
        zoom: 16,
        resizeEnable: true
      });
      this.map = map;
      if (this.formData.longitude) {
        map.setZoom(15);
        map.setCenter([this.formData.longitude, this.formData.latitude]);
        self.loadCircle();
      }
      // AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
      //   // 拖拽选址
      //   const positionPicker = new PositionPicker({
      //     mode: 'dragMap',
      //     map: map
      //   });
      //   // 拖拽地图成功回调
      //   positionPicker.on('success', function (positionResult) {
      //     self.formData.longitude = positionResult.position.lng;
      //     self.formData.latitude = positionResult.position.lat;
      //     self.formData.address = positionResult.address;
      //     self.loadCircle()
      //   });
      //   // 拖拽地图失败回调
      //   positionPicker.on('fail', function (positionResult) {
      //     self.formData.longitude = 0;
      //     self.formData.latitude = 0;
      //     self.formData.address = '定位解析失败，请稍后重试！';
      //   });
      //   // 开启拖拽选址
      //   positionPicker.start();
      // });

      // 输入地址
      var auto = new AMap.Autocomplete({
        input: "search"
      });
      //注册监听，当选中某条记录时会触发
      AMap.event.addListener(auto, "select", function(e) {
        if (e.poi && e.poi.location) {
          map.setZoom(15);
          map.setCenter(e.poi.location);
          self.formData.longitude = e.poi.location.lng;
          self.formData.latitude = e.poi.location.lat;
          self.formData.address = e.poi.name;
          self.loadCircle();
        }
      });
    },
    loadCircle() {
      const circle = new AMap.Circle({
        center: [this.formData.longitude, this.formData.latitude],
        radius: Number(this.formData.serve_range) * 1000, //半径,单位米
        strokeColor: "#1791fc",
        strokeWeight: 1,
        strokeOpacity: 0.4,
        fillColor: "#1791fc",
        fillOpacity: 0.4,
        zIndex: 50
      });
      this.map.clearMap();
      this.map.add(circle);
    },
    handleSync(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定同步设备 ?",
        onOk: () => {
          this.$post("agent/device-sync", { agent_id: item.id }).then(res => {
            this.$Message.success("同步成功");
            this.handleSearch();
          });
        },
        onCancel: () => {}
      });
    },
    handleReset(item) {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定重置密码 ?",
        onOk: () => {
          this.$post("agent/resetpwd", { id: item.id }).then(res => {
            this.$Message.success("重置成功");
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
      this.$refs.code.isInit = true;
      this.formData.code = ["北京市", "市辖区", "东城区"];
      this.formData.longitude = "";
      this.formData.latitude = "";
      this.map && this.map.destroy();
      this.loadMap();
    },
    handleEdit(item) {
      this.modal1 = true;
      this.itemId = item.id;
      this.formData = Object.assign(this.formData, item, item.extend);
      this.$refs.code.isInit = true;
      this.formData.code = [item.province, item.city, item.district];
      this.map && this.map.destroy();
      this.loadMap();
      // this.$post('admin/detail',{id: item.id}).then( res => {
      //   var data = res.data;
      //   this.formData = Object.assign(this.formData,data);
      // })
    },
    handleSubmit() {
      // 自定义验证规则
      // let vArr = [
      //   [this.formData.username, '账号', 'empty'],
      //   [this.formData.real_name, '姓名', 'empty'],
      // ];
      // this.$validate(vArr).then(valid => {

      // });
      console.log(this.formData);
      if (!/^1[0-9]{10}$/.test(this.formData.phone)) {
        this.$Message.destroy();
        this.$Message.warning("请输入正确格式的手机号");
        return;
      }
      var params = {};
      if (this.itemId) {
        params = Object.assign({}, this.formData, { id: this.itemId });
        this.$post("agent/edit", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
          // this.$post('agent/detail', {}).then( res => {
          //   this.$store.dispatch('setUserInfoAction',res.data)
          // })
        });
      } else {
        params = Object.assign({}, this.formData);
        this.$post("agent/add", params).then(res => {
          this.modal1 = false;
          this.handleSearch();
        });
      }
    },
    handleDetail(item) {
      this.modal2 = true;
      this.detail = Object.assign({}, item.extend);
      this.detail.month_points = parseFloat(item.extend.month_points) / 2;
      this.detail.total_points = parseFloat(item.extend.total_points) / 2;
      console.log(this.detail);
    },
    handleExport() {
      this.$Modal.confirm({
        title: "温馨提示",
        content: "确定导出数据 ?",
        onOk: () => {
          this.$post("agent/list", {
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
    agentPut(value) {
      this.params.first_level = value;
      console.log(value);
      this.agentShow = false;
    },
    agentSearch2() {
      console.log("123");

      this.agentShow2 = !this.agentShow2;
    },
    agentPut2(value) {
      this.formData.pid = value;
      console.log(value);
      this.agentShow2 = false;
    },
    // agentPut2(value) {
    //   this.params.first_level = value;
    //   console.log(value);
    //   this.agentShow2 = false;
    // },
    agentChange() {
      console.log("change-------");
      this.newData2();
    },
    agentChange2() {
      console.log("change-------");
      this.newData22();
    },
    levelChange() {
      if (this.params.level == 1) {
        this.rangeShow = false;
      }
    },
    newData2() {
      this.firstList = this.agentList;
      var arrByZM = [];
      for (var i = 0; i < this.firstList.length; i++) {
        //for循环数据中的每一项（根据name值）

        if (this.firstList[i].realname.indexOf(this.params.first_level) != -1) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功

          arrByZM.push(this.firstList[i]);
          //向空数组中添加数据
        }
      }
      console.log(arrByZM);
      return (this.firstList = arrByZM);
    },
    newData22() {
      this.secondList = this.agentList2;
      console.log(this.agentList2);
      var arrByZM2 = [];
      for (var i = 0; i < this.secondList.length; i++) {
        //for循环数据中的每一项（根据name值）

        if (this.secondList[i].realname.indexOf(this.formData.pid) != -1) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功

          arrByZM2.push(this.secondList[i]);
          //向空数组中添加数据
        }
      }
      console.log(arrByZM2);
      return (this.secondList = arrByZM2);
    }
  },
  watch: {
    newName() {
      if (this.formData.level == 1) {
        this.rangeShow = false;
      } else {
        this.rangeShow = true;
      }
    }

    // newData() {
    //   this.agentShow = true;
    //   console.log("1111");
    //   this.firstList = this.agentList;
    //   var arrByZM = []; //声明一个空数组来存放数据

    //   for (var i = 0; i < this.firstList.length; i++) {
    //     //for循环数据中的每一项（根据name值）

    //     if (this.firstList[i].realname.indexOf(this.params.first_level) != -1) {
    //       //判断输入框中的值是否可以匹配到数据，如果匹配成功

    //       arrByZM.push(this.firstList[i]);
    //       //向空数组中添加数据
    //     }
    //   }
    //   return (this.firstList = arrByZM);
    // }
  }
};
</script>

<style lang="less" scoped>
.pickerMap {
  width: 100%;
  height: 388px;
  margin-top: 10px;
}
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
.agent-search {
  max-width: 160px;
}
.agent-search2 {
  max-width: 160px;
  margin-left: 60px;
}
.agent-word {
  display: inline-block;
}
.agent-ul {
  min-width: 160px !important;
}
</style>