<template>
  <div class="cell">
    <div class="cell-item" style="width: 80px;text-align: right;padding: 0px 10px;">
      <p>{{name}}</p>
      <p class="number">{{number}}({{unit}})</p>
    </div>
    <div class="cell-item" style="flex: 1;">
      <div class="line">
        <div class="line-color" :style="{width: width}"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cell',
    props: {
      name: String,
      number: String,
      unit: String,
      width: String,
    },
    data() {
      return {

      };
    },
    computed: {
      
    },
    methods: {

    },

    mounted() {

    }
  };
</script>
<style lang="less" scoped>
  .cell{
    display: flex;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    padding: 10px;
    .number{
      color: #F2C700;
    }
    .line{
      background: #22212F;
      height: 20px;
      width: 100%;
    }
  }
  .cell:nth-child(2n+1){
    .line-color{
      background: #F2C700;
      height: 20px;
      width: 0%;
    }
  }
  .cell:nth-child(2n){
    .line-color{
      background: #FF5700;
      height: 20px;
      width: 0%;
    }
  }
</style>
