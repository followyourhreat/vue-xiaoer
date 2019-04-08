<template>
  <div class="cell">
    <div :id="container" style="width:100%;height:150px"></div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  export default {
    name: 'circle',
    props: {
      container: {
        type: String,
        default: 'container'
      },
      seriesData: Array
    },
    data() {
      return {
        option: {}
      };
    },
    watch: {
      seriesData(){
        this.handleCreate()
      }
    },
    computed: {
      
    },
    mounted() {
      
    },
    methods: {
      handleCreate() {
        var chart = Highcharts.chart(this.container, {
          credits: {
            enabled: false
          },
          chart: {
            marginTop: 0,
            marginBottom: 0,
            spacing: [0,0,0,0],
            backgroundColor: '#171721',
            plotBackgroundColor: '#171721',
            plotBorderColor: '#171721',
            plotBorderWidth: 0,
            plotShadow: false,
            type: 'pie'
          },
          colors: ['#21D78F', '#ECF444', '#8244F4', '#F4AB44', '#D944F4', '#FF5700', '#44D3F4', '#2BA9FC'],
          legend: {
            align: 'right',
            verticalAlign: 'middle',
            width: 250,
            itemStyle: {color: 'rgba(255,255,255,0.70)'},
            itemHoverStyle: {color: 'rgba(255,255,255,1)'},
            labelFormat: '{name}({y}%)'
          },
          title: {
            text: ''
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              animation: false,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            type: 'pie',
            name: '占比',
            minSize: 150,
            innerSize: '80%',
            data: this.seriesData
          }]
        });
      }
    },
  };
</script>
<style lang="less" scoped>
  
</style>
