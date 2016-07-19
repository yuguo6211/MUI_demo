let model;
class Pieweek extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    let barChart = echarts.init(document.getElementById('barChart'));
    let lineChart = echarts.init(document.getElementById('lineChart'));
    let pieChart = echarts.init(document.getElementById('pieChart'));
    let barChartoptions = {
      legend: {
        data: ['蒸发量', '降水量']
      },
      grid: {
        x: 35,
        x2: 10,
        y: 30,
        y2: 25
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: false,
      xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }],
      yAxis: [{
        type: 'value',
        splitArea: {
          show: true
        }
      }],
      series: [{
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }]
    }
    let lineChart = {
      legend: {
        data: ['蒸发量', '降水量']
      },
      grid: {
        x: 35,
        x2: 10,
        y: 30,
        y2: 25
      },
      toolbox: {
        show: false,
        feature: {
          mark: {
            show: true
          },
          dataView: {
            show: true,
            readOnly: false
          },
          magicType: {
            show: true,
            type: ['line', 'bar']
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: false,
      xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }],
      yAxis: [{
        type: 'value',
        splitArea: {
          show: true
        }
      }],
      series: [{
        name: '蒸发量',
        type: 'line',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '降水量',
        type: 'line',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }]
    }
    
    let pieChartoptions = {
      calculable: false,
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        data: [{
          value: 335,
          name: '直接访问'
        }, {
          value: 310,
          name: '邮件营销'
        }, {
          value: 234,
          name: '联盟广告'
        }, {
          value: 135,
          name: '视频广告'
        }, {
          value: 1548,
          name: '搜索引擎'
        }]
      }]
    }
    barChart.setOption(barChartoptions);
    lineChart.setOption(barChartoptions);
    pieChart.setOption(pieChartoptions);
  }
}
Core.expose('dataanalysis', 'pieweek', Pieweek)
