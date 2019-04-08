<template>
  <Select :value="value" v-bind="$attrs" v-on="$listeners" @on-change="onChange">
    <Option v-for="(item, i) in arrList" :value="item.value" :key="i">{{ item.label }}</Option>
  </Select>
</template>

<script>
// 引用配置的selectConfig列表
import * as arrList from "./selectConfig";
export default {
  props: {
    url: String,
    value: String
  },
  data() {
    return {
      item: ""
    };
  },
  computed: {
    arrList() {
      return arrList[this.url];
    }
  },
  methods: {
    onChange(val) {
      this.item = this.arrList.filter(item => {
        return item.value == val;
      });
    },
    getBalel() {
      return this.item.length > 0 ? this.item[0].label : "";
    }
  }
};
</script>

<style lang="less" scoped>
</style>
