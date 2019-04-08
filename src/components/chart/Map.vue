<template>
  <div ref="map"></div>
</template>

<script>
import $ from 'jsonp'
import Highcharts from 'highcharts'
import Highmaps from 'highcharts/modules/map'
Highmaps(Highcharts)

export default {
  name: 'map',
  props: {
    type: Number,
    mapData: Array
  },
  data: () => ({
    map: null
  }),
  watch: {
    mapData: {
      handler: 'init',
      deep: true
    }
  },
  methods: {
    init(data) {
      // data = data.map(v => ({city: v.city, value: ~~v.value}))
      data = data.map(v => ({city: v.city, value: v.value}))
      $('https://data.jianshukeji.com/jsonp?filename=geochina/china.json', (err, mapData) => {
        if (err) return
        this.map = new Highcharts.Map(this.$refs.map, {
          chart: {
            backgroundColor: '#171721',
          },
          title: null,
          credits: {
            enabled: false
          },
          mapNavigation: {
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          tooltip: {
            useHTML: true,
            headerFormat: `<table><tr><td>{point.name}</td></tr>`,
            pointFormat: `
              <tr><td>所在地：</td><td>{point.properties.fullname}</td></tr>
              <tr><td>{series.name}：</td><td>{point.value}</td></tr>
              <tr><td>经纬度：</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>
            `,
            footerFormat: `</table>`
          },
          colorAxis: {
            min: 0,
            minColor: '#6D5C13',
            maxColor: '#F2C700',
            tickColor: '#ff0000',
            labels: {
              style: { 'color': '#F2C700', 'fontWeight': 'bold' }
            }
          },
          series: [{
            data,
            mapData,
            joinBy: ['name', 'city'],
            name: '数据',
            states: {
              hover: {
                color: Highcharts.getOptions().colors[2]
              }
            }
          }]
        })
      })
    }
  }
}
</script>
