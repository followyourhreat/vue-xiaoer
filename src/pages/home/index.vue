<template>
  <div style="padding: 10px">
    <Row>
      <Col span="16" style="height: 800px">
        <Row>
          <Col span="8">
            <div class="colPage" style="height: 300px">
              <div style="height: 300px;display: flex;justify-content: space-around;align-content: flex-start;">
                <div>
                  <p class="podium"></p>
                  <p>昨日销售额</p>
                  <h3 class="number text-yellow">{{index.day_money}}</h3>
                  <p>本月销售额</p>
                  <h3 class="number">{{index.month_money}}</h3>
                </div>
                <div>
                  <p class="briefcase"></p>
                  <p>昨日商品出售数(件)</p>
                  <h3 class="number text-yellow">{{index.day_num}}</h3>
                  <p>本月商品出售数(件)</p>
                  <h3 class="number">{{index.month_num}}</h3>
                </div>
              </div>
            </div>
          </Col>
          <Col span="16">
            <div class="colPage" style="height: 300px">
              <dt-Section title="新增用户数">
                <ButtonGroup slot="action">
                  <Button :type="date==7?'ghost':'info'" @click="handleDate(7)">最近7天</Button>
                  <Button :type="date==30?'ghost':'info'" @click="handleDate(30)">最近30天</Button>
                </ButtonGroup>
                <dt-CheckNoData :isNoData="!trendData.length">
                  <dt-Trend color="#F2C700" name="新增用户数" :data="trendData"/>
                </dt-CheckNoData>
              </dt-Section>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <div class="colPage" style="height: 460px">
              <dt-Section title="商品销售量排行榜">
                <dt-cell v-for="(item, index) in goodsrank" :key="index" :name="item.goods_name" :number="item.sale_total" unit="件" :width="`${item.percent}%`"></dt-cell>
              </dt-Section>
            </div>
          </Col>
          <Col span="12">
            <div class="colPage" style="height: 460px">
              <dt-Section :title="`用户年龄分段(${userageTotal}人)`">
                <dt-circle container="container1" :seriesData="userage"></dt-circle>
              </dt-Section>
              <dt-Section :title="`用户性别比例(${usersexTotal}人)`">
                <dt-circle container="container2" :seriesData="usersex"></dt-circle>
              </dt-Section>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span="8"style="height: 800px">
        <div class="colPage" style="height: 780px">
          <dt-Section title="销售地区排行榜">
            <dt-Map :mapData="mapData" />
            <Table ref="table" :data="arrList" :columns="columns" no-data-text="暂时没有数据" style="margin: 0px 10px;"></Table>
          </dt-Section>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <div class="colPage" style="height: 460px">
          <dt-Section title="任务参与人数排行榜">
            <dt-cell v-for="(item, index) in taskrank" :key="index" :name="item.task_name" :number="item.join_num" unit="人" :width="`${item.percent}%`"></dt-cell>
          </dt-Section>
        </div>
      </Col>
      <Col span="8">
        <div class="colPage" style="height: 460px">
          <dt-Section title="积分兑换商品排行榜">
            <dt-cell v-for="(item, index) in pointsgoods" :key="index" :name="item.goods_name" :number="item.points" unit="积分" :width="`${item.percent}%`"></dt-cell>
          </dt-Section>
        </div>
      </Col>
      <Col span="8">
        <div class="colPage" style="height: 460px">
          <dt-Section title="设备地区排行榜">
            <dt-cell v-for="(item, index) in devicearea" :key="index" :name="item.province" :number="item.device_num" unit="件" :width="`${item.percent}%`"></dt-cell>
          </dt-Section>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        index: {},
        date: 7,
        trendData: [],
        mapData: [],
        arrList: [],
        columns: [
          { title: '排名', key: 'rank' },
          { title: '地区名称', key: 'province' },
          { title: '交易额', key: 'total_money' },
        ],
        userage: [],
        userageTotal: '',
        usersex: [],
        usersexTotal: '',
        goodsrank: [],
        taskrank: [],
        pointsgoods: [],
        devicearea: [],
      }
    },
    mounted () {
      this.getIndex()
      this.getNew()
      this.getAge()
      this.getSex()
      this.getGoodRank()
      this.getTaskRank()
      this.getPointRank()
      this.getDeviceList()
      // this.trendData = [['2018-11-01',10],['2018-11-02',24],['2018-11-03',8],['2018-11-04',40],['2018-11-05',16]];
      // this.mapData = [{city: '广西', value: '10'},{city: '广东', value: '20'},{city: '北京', value: '30'}];
    },
    methods: {
      //切换时间
      handleDate(val){
        this.date = val
        this.getNew();
      },
      //商品统计
      getIndex(){
        this.$post('statistic/index',{}).then( res => {
          this.index = res.data
          this.mapData = res.data.rank.map( item =>{
            return {city: item.province, value: Number(item.total_money)}
          })
          this.arrList = res.data.rank
        })
      },
      //新增用户
      getNew(){
        this.$post('statistic/usernew',{range: this.date}).then( res => {
          this.trendData = res.data.trends.map( item =>{
            return [item.date,Number(item.new_user)]
          })
        })
      },
      //年龄
      getAge(){
        this.$post('statistic/userage',{}).then( res => {
          var arr = res.data;
          this.userageTotal = arr.total_user;
          this.userage = [
            ['小于5岁',Number(arr.age_lt_5)],
            ['5-10岁',Number(arr.age_5_10)],
            ['10-15岁',Number(arr.age_10_15)],
            ['15-20岁',Number(arr.age_15_20)],
            ['20-25岁',Number(arr.age_20_25)],
            ['25-30岁',Number(arr.age_25_30)],
            ['30-35岁',Number(arr.age_30_35)],
            ['35-40岁',Number(arr.age_35_40)],
            ['40-45岁',Number(arr.age_40_45)],
            ['45-50岁',Number(arr.age_45_50)],
            ['大于50岁',Number(arr.age_gt_55)]
          ]
        })
      },
      //性别
      getSex(){
        this.$post('statistic/usersex',{}).then( res => {
          var arr = res.data;
          this.usersexTotal = arr.total_user;
          this.usersex = [
            ['男性',Number(arr.male_user)],
            ['女性',Number(arr.female_user)],
            ['未知',Number(arr.unknow_sex)]
          ]
        })
      },
      //商品销量排行榜
      getGoodRank(){
        this.$post('statistic/goodsrank',{}).then( res => {
          this.goodsrank = res.data
        })
      },
      //参与人数排行榜
      getTaskRank(){
        this.$post('statistic/taskrank',{}).then( res => {
          this.taskrank = res.data
        })
      },
      //兑换商品排行榜
      getPointRank(){
        this.$post('statistic/pointsgoods',{}).then( res => {
          this.pointsgoods = res.data
        })
      },
      //设备地区排行榜
      getDeviceList(){
        this.$post('statistic/devicearea',{}).then( res => {
          this.devicearea = res.data
        })
      },
    },
  };
</script>
<style lang="less" scoped>
  .colPage {
    background: #171721;
    margin: 10px;
  }
  .title-icon{
    font-size: 20px;
    line-height: 50px;
  }
  .text-yellow{
    color: #F2C700;
  }
  .number{
    line-height: 100px;
    font-size: 30px;
  }
  .podium{
    margin: 20px 0px 10px 0px;
    height: 28px;
    background: url('../../assets/home.png') no-repeat;
  }
  .briefcase{
     margin: 20px 0px 10px 0px;
    height: 28px;
    background: url('../../assets/home.png') no-repeat;
  }
</style>