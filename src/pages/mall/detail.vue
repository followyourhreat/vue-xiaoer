<template>
  <div class="detail-mall">
    <Tabs type="card" closable @on-tab-remove="handleTabRemove">
      <TabPane label="商家详情" v-if="tab0">
        <Form :model="formItem" :label-width="130">
          <div class="shop-detail-info">
            <div class="shop-name">
              <div class="shop-title">店铺信息</div>
              <div class="shop-content">
                <FormItem label="店铺名:">
                  <Input v-model="formItem.name"></Input>
                </FormItem>
                <FormItem label="店铺负责人:">
                  <Input v-model="formItem.responsibility"></Input>
                </FormItem>
                <FormItem label="推荐人:">
                  <Input v-model="formItem.responsibility"></Input>
                </FormItem>
                <FormItem label="店铺手机号:">
                  <Input v-model="formItem.mobile"></Input>
                </FormItem>
              </div>
              <div class="shop-title">店铺配置</div>
              <div class="shop-content">
                <FormItem label="积分兑换比例:">
                  <Col span="20">
                    <Input v-model="formItem.commissionReturnScoreRate"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
                <FormItem label="佣金扣率:">
                  <Col span="20">
                    <Input v-model="formItem.commissionRate"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
              </div>
              <div class="shop-title">推荐奖励</div>
              <div class="shop-content">
                <FormItem label="推荐会员开关:">
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="消费转推荐奖励比例:">
                  <Col span="20">
                    <Input v-model="formItem.input7"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
                <FormItem label="奖励转余额手续费:">
                  <Col span="20">
                    <Input v-model="formItem.input8"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
                <FormItem label="推荐会员开关:">
                  <RadioGroup v-model="formItem.radio2">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
              </div>
              <div class="shop-title">千元激励奖励</div>
              <div class="shop-content">
                <FormItem label="千元激励奖励开关:">
                  <RadioGroup v-model="formItem.stimulateActivitySwitch">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="千元激励奖励比例:">
                  <Col span="20">
                    <Input v-model="formItem.input"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
                <FormItem label="千元激励奖励周期:">
                  <Col span="20">
                    <Input v-model="formItem.input"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
              </div>
              <div class="shop-title">营业奖励</div>
              <div class="shop-content">
                <FormItem label="营业奖励开关:">
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="佣金转商家积分比例:">
                  <Col span="20">
                    <Input v-model="formItem.input"></Input>
                  </Col>
                  <Col span="4">%</Col>
                </FormItem>
              </div>
              <div class="shop-title">营业状况</div>
              <div class="shop-content">
                <FormItem label="营业状况:">
                  <RadioGroup v-model="formItem.openStatus">
                    <Radio label="0">歇业</Radio>
                    <Radio label="1">营业</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="营业时间:">
                  <Row>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </div>
              <div class="shop-title">配送情况</div>
              <div class="shop-content">
                <FormItem label="配送开关:">
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="配送状态:">
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="配送时间:">
                  <Row>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
              </div>
              <div class="shop-title">店铺详情</div>
              <div class="shop-content">
                <FormItem label="禁用状态">
                  <RadioGroup v-model="formItem.disableStatus">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="经营分类:">
                  <Select v-model="formItem.select">
                    <Option value="beijing">便利店</Option>
                    <Option value="shanghai">火锅店</Option>
                    <Option value="shenzhen">小吃店</Option>
                  </Select>
                </FormItem>
                <FormItem label="二级分类:">
                  <Select v-model="formItem.select">
                    <Option value="beijing">便利店</Option>
                    <Option value="shanghai">火锅店</Option>
                    <Option value="shenzhen">小吃店</Option>
                  </Select>
                </FormItem>
                <FormItem label="配送时间:">
                  <Row>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">-</Col>
                    <Col span="11">
                      <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                      </FormItem>
                    </Col>
                  </Row>
                </FormItem>
                <FormItem label="省市区">
                  <al-selector
                    data-type="name"
                    level="2"
                    v-model="formItem.code"
                    class="dt-search-area"
                    @on-change="areaChange"
                  />
                </FormItem>
                <FormItem label="详细地址:">
                  <Input v-model="formItem.addr"></Input>
                </FormItem>
                <FormItem label="地址备注:">
                  <Input v-model="formItem.input1"></Input>
                </FormItem>
                <FormItem label="满减状态">
                  <RadioGroup v-model="formItem.radio">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="消费人数:">
                  <Input v-model="formItem.consumer"></Input>
                </FormItem>
                <FormItem label="余额:">
                  <Input v-model="formItem.money"></Input>
                </FormItem>
                <FormItem label="审核状态:">
                  <span v-if="formItem.checkedStatus == 0">审核通过</span>
                  <span v-if="formItem.checkedStatus == 1">待审核</span>
                  <span v-if="formItem.checkedStatus == 2">审核失败</span>
                </FormItem>
                <FormItem label="创建时间:">
                  <Input v-model="formItem.createdTime" disabled></Input>
                </FormItem>
                <FormItem label="审核时间:">
                  <Input v-model="formItem.updatedTime" disabled></Input>
                </FormItem>

                <FormItem label="经纬度  经度:">
                  <Input v-model="formItem.lng"></Input>
                </FormItem>
                <FormItem label="经度:">
                  <Input v-model="formItem.lat"></Input>
                </FormItem>
                <dt-AMapAddress></dt-AMapAddress>
              </div>
              <div class="shop-title">审核结果</div>
              <div class="shop-content">
                <FormItem label="是否通过:">
                  <RadioGroup
                    v-model="formItem.checkedStatus"
                    v-if="formItem.checkedStatus == 1"
                    @on-change="radioChange"
                  >
                    <Radio label="0">通过</Radio>
                    <Radio label="1">驳回</Radio>
                  </RadioGroup>
                  <RadioGroup v-model="formItem.checkedStatus" v-if="formItem.checkedStatus == 0">
                    <Radio label="0" disabled>通过</Radio>
                    <Radio label="1" disabled>驳回</Radio>
                  </RadioGroup>
                  <span v-if="formItem.checkedStatus == 2">审核失败</span>
                </FormItem>
                <FormItem label="审核意见:">
                  <Input
                    v-if="formItem.checkedStatus == 0"
                    v-model="formItem.checkedReason"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    placeholder="Enter something..."
                  ></Input>
                  <Input
                    v-if="formItem.checkedStatus == 2"
                    v-model="formItem.checkedReason"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}"
                    :placeholder="formItem.checkedReason"
                  ></Input>
                </FormItem>
              </div>
              <div class="shop-boot">
                <Button type="primary" @click="handleSubmitDetail">提交</Button>
              </div>
            </div>
          </div>
        </Form>
      </TabPane>
      <TabPane label="店内图片管理" v-if="tab1">
        <div class="shop-picture">
          <ul>
            <li>
              <div class="shop-pic-title">商家二维码</div>
              <div class="shop-pic-content">
                <img :src="qrCode" alt>
                <Button type="primary" @click="handleDownCode">下载二维码</Button>
              </div>
            </li>
            <li>
              <div class="shop-pic-title">商家首页图</div>
              <div class="shop-pic-content">
                <!-- <img src="@/assets/cry.png" alt=""> -->
                <img :src="formItem.cover" alt>
                <Upload
                  action="http://www.lizsh.net/bgApi/detailsShopPic"
                  :data="uploadData"
                  :on-success="onSuccess"
                >
                  <Button icon="ios-cloud-upload-outline">选择图片</Button>
                </Upload>
              </div>
            </li>
          </ul>
          <div class="shop-pic-btn">
            <Button type="primary" @click="handleSubmit">提交</Button>
          </div>
        </div>
        <Modal v-model="modal1" title="提示" @on-ok="ok" @on-cancel="cancel">
          <p></p>
          <p>是否保存当前信息</p>
          <p></p>
        </Modal>
      </TabPane>
      <TabPane label="企业详情" v-if="tab2">
        <div class="company-detail">
          <form enctype="multipart/form-data" name="fileinfo" id="myForm">
            <div class="company-info">
              <Col span="5">
                <div class="company-info-title">企业名称</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">{{companyDetail.companyName}}</div>
              </Col>
              <Col span="5">
                <div class="company-info-title">法人姓名</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">{{companyDetail.legalUser}}</div>
              </Col>
              <Col span="5">
                <div class="company-info-title">法人手机号</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">{{companyDetail.legalMobile}}</div>
              </Col>
              <Col span="5">
                <div class="company-info-title">法人身份证号</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">{{companyDetail.legalIdentity}}</div>
              </Col>
              <Col span="5">
                <div class="company-info-title">组织机构代码</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">111</div>
              </Col>
              <Col span="5">
                <div class="company-info-title">企业地址</div>
              </Col>
              <Col span="7">
                <div class="company-info-desc">{{companyDetail.addr}}</div>
              </Col>
            </div>
            <div class="company-picture">
              <Col span="5">
                <div class="company-picture-title">营业执照照片</div>
              </Col>
              <Col span="7">
                <div class="company-picture-desc">
                  <img :src="companyDetail.businessLicense" alt>
                </div>
              </Col>
              <Col span="12">
                <!-- <img src="" alt="" id="businessImg"> -->
                <!-- <input type="file" name="files" id="business" @change="getFile($event)"> -->
                <Upload
                  action="http://192.168.2.117:8080/LZCloudPlatform/updateShopAuth"
                  :before-upload="handleUpload"
                  name="files"
                  :data="companyDetail"
                  :on-success="onCompanySuccess"
                >
                  <Button icon="ios-cloud-upload-outline">选择图片</Button>
                </Upload>
              </Col>
            </div>
            <div class="company-picture">
              <Col span="5">
                <div class="company-picture-title">身份证正面</div>
              </Col>
              <Col span="7">
                <div class="company-picture-desc">
                  <img :src="companyDetail.identityPositive" alt>
                </div>
              </Col>
              <Col span="12">
                <!-- <img src="" alt=""> -->
                <!-- <input type="file" name="files" id="business2" @change="getFile($event)"> -->
                <Upload
                  multiple ref="upload"
                  action="http://192.168.2.117:8080/LZCloudPlatform/updateShopAuth"
                  :before-upload="handleUpload"
                  :data="companyDetail"
                  name="files"
                  :on-success="onCompanySuccess"
                >
                  <Button icon="ios-cloud-upload-outline">选择图片</Button>
                </Upload>
              </Col>
            </div>
            <div class="company-picture">
              <Col span="5">
                <div class="company-picture-title">身份证反面</div>
              </Col>
              <Col span="7">
                <div class="company-picture-desc">
                  <img :src="companyDetail.identityNegative" alt>
                </div>
              </Col>
              <Col span="12">
                <!-- <input type="file" name="files" id @change="getFile($event)"> -->
                <Upload
                  action="http://192.168.2.117:8080/LZCloudPlatform/updateShopAuth"
                  :data="companyDetail"
                  :before-upload="handleUpload"
                  :on-success="onCompanySuccess"
                  name="files"
                >
                  <Button icon="ios-cloud-upload-outline">选择图片</Button>
                </Upload>
              </Col>
            </div>
            <div class="company-btn-submit">
              <Button type="primary" @click="handleCompanyDetail">提交</Button>
            </div>
          </form>
        </div>
        <Modal v-model="modal2" title="提示" @on-ok="ok" @on-cancel="cancel">
          <p></p>
          <p>是否保存当前信息</p>
          <p></p>
        </Modal>
      </TabPane>
      <TabPane label="客户评价" v-if="tab3">
        <div class="Customer-comments">
          <div class="comment-header">客户评价</div>
          <div class="dt-search-top">
            <div class="dt-search-cell">
              用户名：
              <Input
                v-model="params.keyword"
                class="dt-search-input"
                style="width: 100px"
                placeholder="账号、姓名、手机号码"
              />
            </div>
            <div class="dt-search-cell">
              手机号码：
              <Input
                v-model="params.keyword"
                class="dt-search-input"
                style="width: 100px"
                placeholder="账号、姓名、手机号码"
              />
            </div>
            <div class="dt-search-cell">
              建立时间：
              <dt-selectDate class="dt-search-date" @on-select="handleDateSelect"/>
            </div>
            <div class="dt-search-operation">
              <Button type="success" @click="handleReset">重置</Button>
              <Button type="ghost" @click="handleSearch">查询</Button>
            </div>
          </div>
          <Table highlight-row ref="currentRowTable" :columns="columns" :data="data" border></Table>
          <Page :total="100" show-sizer show-elevator/>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Vue from "Vue"
import axios from "axios"
export default {
  data() {
    return {
      idx: "",
      tab0: true,
      tab1: true,
      tab2: true,
      tab3: true,
      modal1: false,
      modal2: false,
      map: null,
      params: {
        keyword: ""
      },
      uploadData: {
        id: ""
      },
      // uploadCompanyData:{
      //   businessLicense:"",
      //   identityPositive:"",
      //   identityNegative:""
      // },
      detailPicPath: "",
      formItem: {
        id: "",
        name: "", //店铺名称
        responsibility: "", //责任人
        input3: "",
        mobile: "", //店铺手机
        commissionReturnScoreRate: "", //返还比例
        stimulateActivitySwitch: "1", //千元激励开关
        openStatus: "", //营业状态
        businessStart: "", //营业开始时间
        businessEnd: "", //营业结束时间
        disableStatus: "", //禁用状态
        addr: "", //地址
        input12: "未审核",
        createdTime: "",
        updatedTime: "",
        input15: "广东省深圳市南山区桃园地铁",
        consumer: "", //消费人数
        money: "", //余额
        lng: 0, //经度
        lat: 0, //纬度
        radio: "",
        radio2: "",
        date: "",
        select: "",
        code: [],
        longitude: "110",
        latitude: "30",
        serve_range: "1",
        textarea: "",
        isAgree: "",
        checkedStatus: "",
        checkedReason: "",
        cover: "",
        qrCodeUrl:"",
      },
      companyDetail: {
        companyName: "", //企业名称
        addr: "", //企业地址
        legalUser: "", //法人姓名
        legalIdentity: "", //法人身份证
        legalMobile: "", //法人手机号码,
        businessLicense: "", //营业执照
        identityPositive: "",
        identityNegative: "",
        credentials1: "",
        credentials2: "",
        createdTime: "",
        updatedTime: "",

        files: []
      }, // 总文件List
      imageList: [],
      columns: [
        { type: "index", width: 60, align: "center" },

        { title: "用户名", key: "username" },
        { title: "手机号", key: "usermobile" },
        { title: "商品评分", key: "userbalance" },
        { title: "服务评分", key: "shopName" },
        { title: "环境评分", key: "shopPhone" },
        { title: "用户评论", key: "reason" },
        { title: "评论图片", key: "cash" },
        { title: "建立时间", key: "time" },
        { title: "商家回复", key: "cash1" }
      ],
      data: [
        {
          username: "John Brown",
          usermobile: 18,
          userbalance: "100",
          shopName: "1231",
          shopPhone: "12312312312",
          reason: "1231",
          cash: "1231",
          time: "1999.09.10",
          cash1: "1231"
        },
        {
          username: "John Brown",
          usermobile: 18,
          userbalance: "100",
          shopName: "1231",
          shopPhone: "12312312312",
          reason: "1231",
          cash: "1231",
          time: "1999.09.10",
          cash1: "1231"
        },
        {
          username: "John Brown",
          usermobile: 18,
          userbalance: "100",
          shopName: "1231",
          shopPhone: "12312312312",
          reason: "1231",
          cash: "1231",
          time: "1999.09.10",
          cash1: "1231"
        },
        {
          username: "John Brown",
          usermobile: 18,
          userbalance: "100",
          shopName: "1231",
          shopPhone: "12312312312",
          reason: "1231",
          cash: "1231",
          time: "1999.09.10",
          cash1: "1231"
        }
      ],
      files: [], //需要上传的文件list
      qrCode:"",//商家二维码
    };
  },
  mounted() {
    this.formItem.id = this.$route.query.id;
    this.uploadData.id = this.$route.query.id;
    this.getDetail();
    this.getCompanyDetail();
  },
  methods: {
    //商家详情
    getDetail() {
      let idx = this.$route.query.id;
      this.$http.post("/detailsShop", { id: idx }).then(res => {
        this.formItem = Object.assign({}, res.data);
        this.formItem.stimulateActivitySwitch = String(
          res.data.stimulateActivitySwitch
        );
        this.formItem.disableStatus = String(res.data.disableStatus);
        this.formItem.openStatus = String(res.data.openStatus);
        this.formItem.checkedStatus = String(res.data.checkedStatus);
        // this.formItem.cover = "http://www.lizsh.net/static"+res.data.cover;
        // this.qrCode = "http://www.lizsh.net/static"+res.data.qrCodeUrl;
        this.formItem.cover = res.data.cover;
        this.qrCode = res.data.qrCodeUrl;
      });
    },
    //企业详情
    getCompanyDetail() {
      let idx = this.$route.query.id;
      this.$http.post("/tShopAuth", { shop_id: idx }).then(res => {
        this.companyDetail = Object.assign({}, res.data);
        console.log(this.companyDetail);
        // this.companyDetail.
      });
    },
    handleTabRemove(name) {
      this["tab" + name] = false;
    },
    areaChange() {},
    handleSubmit() {
      this.modal1 = true;
      let params = {
        id: this.uploadData.id,
        path: this.formItem.cover
      };
      this.$http.post("/tjDetailsShopPic", params).then(res => {
        console.log(res);
      });
    },
    ok() {
      this.$Message.info("更新成功");
    },
    //下载二维码
    handleDownCode(){
      console.log(this.formItem.qrCodeUrl);
      // let formData = new FormData();
      // formData.append("fileurl", this.formItem.qrCodeUrl);
      // let params =  formData;
      // let config = {
      //   headers: { "Content-Type": "multipart/form-data" }
      // };
      this.$http.get("http://www.lizsh.net/bgApi/downloadImage?fileurl="+this.formItem.qrCodeUrl).then(res=>{
        
         window.location.href="http://www.lizsh.net/bgApi/downloadImage?fileurl="+ this.formItem.qrCodeUrl;
      })

    },
    cancel() {},
    //图片上传之前
    handleUpload(file) {
      let _this = this;
    
      _this.files.push(file);
      console.log(_this.files);
      return false;
    },
    handleCompanyDetail() {
      if (this.files.length > 0) {
        this.modal2 = true;
        let formData = new FormData();
        formData.append("companyName", this.companyDetail.companyName);
        formData.append("addr", this.companyDetail.addr);
        formData.append("legalUser", this.companyDetail.legalUser);
        formData.append("legalIdentity", this.companyDetail.legalIdentity);
        formData.append("legalMobile", this.companyDetail.legalMobile);
        formData.append("credentials1", this.companyDetail.credentials1);
        formData.append("credentials2", this.companyDetail.credentials2);
        let config = {
          headers: { "Content-Type": "multipart/form-data" }
        };
        for (let i = 0; i < this.files.length; i++) {
          formData.append("files", this.files[i]);
        }
        console.log(formData);
         let params = formData;
          axios
            .post(
              "http://www.lizsh.net/bgApi/updateShopAuth",
              params,
              config
            )
            .then(res => {
              console.log(res);
            });
      }

      // this.$http.post("/updateShopAuth", params).then(res => {
      //   console.log(res);
      // });
    },
    handleReset() {},
    handleSearch() {},
    onSuccess(response, file, fileList) {
      this.formItem.cover = response.data;
    },
    onCompanySuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    handleDateSelect() {},
    radioChange(value) {
      if (value == "1") {
        this.$Message.warning("请填写驳回理由");
        return;
      }
    },
    handleSubmitDetail() {
      let params = Object.assign({}, this.formItem);
      this.$http.post("/UpdShop", params).then(res => {
        console.log(res);
        this.$router.push({path:"/mall/list"});
      });
    },

    //获取上传图片信息
    getFile(event) {
      this.files.push(event.target.files[0]);
      console.log(this.files);
      // if(file){
      //   consle.log("123");
      //   var reader = new FileReader();

      //   reader.onload = function(e){
      //     document.querySelector("#businessImg").attr("src",e.target.result)
      //     console.log(e.target.result)
      //   }
      //   reader.readAsDataURL(file.files[0]);
      // }else{
      //   document.querySelector("#businessImg").attr("src",e.target.result);
      // }
    }
  }
};
</script>
<style lang="less" scoped>
.shop-title {
  position: relative;
  width: 100%;
  background: #093151;
  line-height: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  text-indent: 20px;
  margin-bottom: 15px;
}

.shop-content {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.pickerMap {
  width: 100%;
  height: 388px;
  margin-top: 10px;
}
.shop-boot {
  position: relative;
  button {
    width: 30%;
    margin: 30px auto;
    display: block;
  }
}
.shop-picture {
  position: relative;
  padding: 20px 40px;
  overflow: hidden;
  ul {
    position: relative;
    overflow: hidden;
    li {
      list-style-type: none;
      float: left;
      width: 50%;
      .shop-pic-title {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #093151;
        color: #fff;
        border-right: 1px solid #fff;
      }
      .shop-pic-content {
        padding: 20px 40px;
        margin: 30px 50px;
        border: 1px solid #ccc;

        img {
          display: block;
          margin: auto;
          width: 120px;
          height: 120px;
        }
        .ivu-upload {
          display: flex;
          justify-content: center;
          .ivu-upload-select {
            display: block;
          }
        }

        button {
          display: block;
          margin: 30px auto;
        }
      }
    }
  }
  .shop-pic-btn {
    position: relative;
    overflow: hidden;
    margin: auto;
    button {
      display: block;
      margin: auto;
    }
  }
}
.company-detail {
  position: relative;
  width: 1000px;
  margin: auto;
  .company-info {
    position: relative;
    overflow: hidden;
    border: 1px solid #093151;
    border-bottom: none;
    .company-info-title {
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #093151;
      color: #fff;
      border-bottom: 1px solid #ccc;
    }
    .company-info-desc {
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #093151;
    }
  }
  .company-picture {
    position: relative;
    overflow: hidden;
    .company-picture-title {
      height: 130px;
      line-height: 130px;
      text-align: center;
      background: #093151;
      border-bottom: 1px solid #ccc;
      color: #fff;
    }
    .company-picture-desc {
      height: 130px;
      line-height: 130px;
      border-bottom: 1px solid #093151;
      border-right: 1px solid #093151;
      img {
        display: block;
        margin: auto;
        width: 100px;
        height: 100px;
        top: 50%;
        position: relative;
        transform: translateY(-50%);
      }
    }
    .ivu-upload {
      height: 130px;
      border-bottom: 1px solid #093151;
      border-right: 1px solid #093151;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .company-btn-submit {
    position: relative;
    button {
      display: block;
      margin: 30px auto;
      width: 100px;
    }
  }
}
.comment-header {
  position: relative;
  background: #093151;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}
.search-tp {
  position: relative;
  margin-bottom: 20px;
  .dt-search-cell {
    height: 35px;
    line-height: 35px;
    padding: 0px 20px 0px 0px;
    display: inline-block;
  }
  .dt-search-operation {
    position: absolute;
    top: 0px;
    right: 0px;
    height: 35px;
    line-height: 35px;
  }
}
.ivu-page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

</style>
