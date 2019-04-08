<template>
  <div>
    <Row :gutter="10">
      <Col span="8">
        <Select
          ref="prov"
          v-model="currProvince"
          @on-change="provinceChange"
          placeholder="请选择省"
          not-found-text="暂无数据"
          transfer
          style="width:100%"
        >
          <Option v-for="item in provinceList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <Select
          ref="prov"
          v-model="currCity"
          @on-change="cityChange"
          placeholder="请选择市"
          not-found-text="暂无数据"
          transfer
          style="width:100%"
        >
          <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="8">
        <Select
          ref="prov"
          v-model="currCountry"
          @on-change="countryChange"
          placeholder="请选择区"
          not-found-text="暂无数据"
          transfer
          style="width:100%"
        >
          <Option v-for="item in countryList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
    </Row>
    <Row :gutter="10">
      <Col span="8">
        {{ currProvince }}
        <pre>{{ provinceList }}</pre>
      </Col>
      <Col span="8">
        {{ currCity }}
        <pre>{{ cityList }}</pre>
      </Col>
      <Col span="8">
        {{ currCountry }}
        <pre>{{ countryList }}</pre>
      </Col>
    </Row>
  </div>
</template>

<script>
import areaData from "./areaData.js";
export default {
  name: "alSelector",
  props: {
    value: {
      type: Array
    },
    // 设置数据类型name,code
    dataType: {
      type: String,
      default: "name"
    },
    // 设置是否需要全部
    all: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currProvince: "",
      currCity: "",
      currCountry: "",
      provinceList: [],
      cityList: [],
      countryList: [],
      provinceListOjb: {},
      cityListOjb: {},
      countryOjb: {}
    };
  },
  computed: {},
  watch: {
    value(val) {
      if (this.dataType == "name") {
        this.currProvince = val[0];
        this.currCity = val[1];
        this.currCountry = val[2];
      } else {
        this.currProvince = areaData[86][val[0]];
        this.currCity = areaData[val[0]][val[1]];
        this.currCountry = areaData[val[1]][val[2]];
      }
    },
    currProvince(val) {
      if (val == "全部" || val == "0" || val == "") {
        this.cityListOjb = {};
        this.cityList = [];
        this.currCity = "";
        this.countryListOjb = {};
        this.countryList = [];
        this.currCountry = "";
      } else {
        let code = this.getIndex(this.provinceListOjb, val);
        let obj = areaData[code];
        if (this.all) {
          obj[0] = "全部";
        }
        this.cityListOjb = obj;
        this.cityList = Object.values(obj);
      }
      this.setSelect();
    },
    currCity(val) {
      if (val == "全部" || val == "0" || val == "") {
        this.countryListOjb = {};
        this.countryList = [];
        this.currCountry = "";
      } else {
        let code = this.getIndex(this.cityListOjb, val);
        let obj = areaData[code];
        if (this.all) {
          obj[0] = "全部";
        }
        this.countryListOjb = obj;
        this.countryList = Object.values(obj);
      }
      this.setSelect();
    },
    currCountry(val) {
      this.setSelect();
    }
  },
  mounted() {
    let obj = areaData[86];
    console.log(obj);
    if (this.all) {
      obj[0] = "全部";
    }
    this.provinceListOjb = obj;
    this.provinceList = Object.values(obj);
  },
  methods: {
    // 获取key
    getIndex(list, name) {
      for (const i in list) {
        if (list[i] === name) {
          return i;
        }
      }
    },
    provinceChange(val) {},
    cityChange(val) {},
    countryChange(val) {},
    setSelect() {
      if (this.dataType == "name") {
        this.$emit("input", [
          this.currProvince,
          this.currCity,
          this.currCountry
        ]);
      } else {
        let provinceCode = this.getIndex(
          this.provinceListOjb,
          this.currProvince
        );
        let cityCode = this.getIndex(this.cityListOjb, this.currCity);
        let countryCode = this.getIndex(this.countryListOjb, this.currCountry);
        this.$emit("input", [provinceCode, cityCode, countryCode]);
      }
      this.$emit("on-change", [
        this.currProvince,
        this.currCity,
        this.currCountry
      ]);
    }
  }
};
</script>
