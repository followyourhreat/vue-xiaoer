import Highcharts from 'highcharts';

export const credits = {
  enabled: false,
  href: 'http://www.dtston.com',
  text: 'dtston.com'
};

export const setOptionsLine = oKeys => {
  const { color, name, data } = oKeys;
  return {
    chart: {
      backgroundColor: '#171721',
      type: 'area',
      zoomType: 'x'
      // alignTicks: false
    },
    credits,
    title: {
      text: null
    },
    // subtitle: {
    //   text: document.ontouchstart === undefined ? '鼠标拖动可以进行缩放' : '手势操作进行缩放'
    // },
    xAxis: {
      type: 'category',
      lineColor: '#22212F',
      tickColor: '#22212F'
      // crosshair: true,
      // minorTickInterval: 'auto',
      // // endOnTick: true,
      // dateTimeLabelFormats: {
      //   // millisecond: '%H:%M:%S.%L',
      //   // second: '%H:%M:%S',
      //   // minute: '%H:%M',
      //   // hour: '%H:%M',
      //   day: '%m-%d',
      //   week: '%m-%d',
      //   month: '%Y-%m',
      //   year: '%Y'
      // }
    },
    yAxis: {
      title: {
        text: null
      },
      // min: 0,
      // allowDecimals: false,
      // crosshair: true,
      gridLineColor: '#22212F',
      gridLineDashStyle: 'longdash',
    },
    // tooltip: {
    //   dateTimeLabelFormats: {
    //     // millisecond: '%H:%M:%S.%L',
    //     // second: '%H:%M:%S',
    //     // minute: '%H:%M',
    //     // hour: '%H:%M',
    //     day: '%Y-%m-%d',
    //     week: '%m-%d',
    //     month: '%Y-%m',
    //     year: '%Y'
    //   }
    // },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.Color(color).setOpacity(0.5).get('rgba')],
            [1, Highcharts.Color(color).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [{
      name,
      data,
      color
    }]
  }
};
