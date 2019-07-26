<template>
  <div class="index-body">
    <div class="index-title">欢迎使用利众生活云平台管理系统</div>
    <div class="index-list">
      <ul>
        <li>
          <div class="index-list-icon">
            <Icon type="ios-contact" size="48"/>
          </div>
          <div class="index-num">
            <span>{{membersCount}}个</span>
            <span>会员总数</span>
          </div>
        </li>
        <li>
          <div class="index-list-icon">
            <Icon type="ios-albums" size="48"/>
          </div>
          <div class="index-num">
            <span>{{merchantCount}}家</span>
            <span>商家总数</span>
          </div>
        </li>
        <li>
          <div class="index-list-icon">
            <Icon type="ios-cart" size="48"/>
          </div>
          <div class="index-num">
            <span>{{OrderCount}}笔</span>
            <span>30天交易笔数</span>
          </div>
        </li>
        <li>
          <div class="index-list-icon">
            <Icon type="ios-calendar" size="48"/>
          </div>
          <div class="index-num">
            <span>￥{{countOrder_money}}</span>
            <span>近三十天营业额</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="index-current">
      <ul class>
        <li class="latest-Info">
          <div class="info-title">今日会员信息</div>
          <div class="info-content">
            <span>今日新增会员</span>
            <span>{{countDay}}个</span>
          </div>
          <div class="info-content">
            <span>未定位会员</span>
            <span>{{countNotUser}}个</span>
          </div>
          <div class="info-data">
            <span>Top排行榜</span>
            <ul>
              <li>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
              </li>
            </ul>
          </div>
        </li>
        <li class="latest-Info">
          <div class="info-title">今日商家信息</div>
          <div class="info-content">
            <span>今日新增商家</span>
            <span>{{newBusinessCount}}个</span>
          </div>

          <div class="info-data">
            <span>Top排行榜</span>
            <ul>
              <li>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
              </li>
            </ul>
          </div>
        </li>
        <li class="latest-Info">
          <div class="info-title">今日流水统计</div>

          <div class="info-content">
            <span>今日总流水</span>
            <span>￥{{countOnDay_money}}</span>
          </div>
          <div class="info-data">
            <span>Top排行榜</span>
            <ul>
              <li>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
              </li>
            </ul>
          </div>
        </li>
        <li class="latest-Info">
          <div class="info-title">今日交易笔数统计</div>
          <div class="info-content">
            <span>今日总流水</span>
            <span>{{countOrderPay_statusDay}}</span>
          </div>

          <div class="info-data">
            <span>Top排行榜</span>
            <ul>
              <li>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
                <span>北京</span>
                <span>10个</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OrderCount: "", //30天交易笔数
      countOrder_money: "", //30天总流水
      countOnDay_money: "", //今日总流水
      countOrderPay_statusDay: "", //今日交易笔数
      merchantCount: "", //商家总数
      newBusinessCount: "", //今日商家总数
      membersCount: "", //会员总数
      countDay: "", //今日会员总数
      countNotUser: "" //今日未定位会员总数
    };
  },
  computed: {},
  mounted() {
    this.getOrderCount();
    this.getCountOrderMoney();
    this.getCountDayMoney();
    this.getMerchantCount();
    this.getNewBusinessCount();
    this.getMembersCount();
    this.getCountDay();
    this.getCountNotUser();
    this.getCountOrderPay_statusDay();
  },
  methods: {
    //30天交易笔数
    getOrderCount() {
      this.$http.get("/OrderCount").then(res => {
        this.OrderCount = res.data;
      });
    },
    //30天总流水
    getCountOrderMoney() {
      this.$http.get("/countOrder_money").then(res => {
        this.countOrder_money = res.data;
      });
    },
    //今日总流水
    getCountDayMoney() {
      this.$http.get("/countOnDay_money").then(res => {
        this.countOnDay_money = res.data;
      });
    },
    //今日交易笔数
    getCountOrderPay_statusDay() {
      this.$http.get("/countOrderPay_statusDay").then(res => {
        this.countOrderPay_statusDay = res.data;
      });
    },
    //商家总数
    getMerchantCount() {
      this.$http.get("/merchantCount").then(res => {
        this.merchantCount = res.data;
      });
    },
    //今日商家总数
    getNewBusinessCount() {
      this.$http.get("/newBusinessCount").then(res => {
        this.newBusinessCount = res.data;
      });
    },
    //会员总数
    getMembersCount() {
      this.$http.get("/countUser").then(res => {
        this.membersCount = res.data;
      });
    },
    //今日会员总数
    getCountDay() {
      this.$http.get("/countDay").then(res => {
        this.countDay = res.data;
      });
    },
    //今日未定位会员总数
    getCountNotUser() {
      this.$http.get("/countNotUser").then(res => {
        this.countNotUser = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.index-title {
  position: relative;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #093151;
  color: #fff;
  margin: 20px auto;
}
.index-list {
  position: relative;

  ul {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 20px;
    li {
      float: left;
      width: 25%;
      list-style-type: none;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      .index-list-icon {
        position: relative;
        width: 48px;
        text-align: center;
        float: left;
        padding-right: 20px;
        border-right: 1px solid #ccc;
      }
      .index-num {
        position: relative;
        float: left;
        height: 100%;
        align-items: center;
        padding-left: 20px;
        span {
          position: relative;
          display: block;
          text-align: left;
        }
        span:nth-child(1) {
          color: #f33;
        }
      }
    }
  }
}
.index-current {
  position: relative;
  ul {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 10px;
    li {
      width: 25%;
      margin: 20px 10px;
      float: left;
      border: 1px solid #ccc;
      list-style-type: none;
      .info-title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #093151;
        color: #fff;
      }
      .info-content {
        height: 30px;
        line-height: 30px;
        position: relative;
        border-bottom: 1px solid #ccc;
        span {
          width: 50%;
          display: block;
          float: left;
          text-align: center;
        }
        span:nth-child(1) {
          border-right: 1px solid #ccc;
        }
      }
      .info-data {
        position: relative;
        span {
          display: block;
          width: 50%;
          text-align: center;
          height: 30px;
          line-height: 30px;
        }
        ul {
          li {
            width: 100%;
            border: 1px dashed #093151;
            span {
              display: block;
              float: left;
            }
          }
        }
      }
    }
  }
}
</style>
