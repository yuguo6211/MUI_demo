let model;
class Customer extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    this.register(['initBar','initLine']);
    model.initLine();
    model.initBar();
  }

  initLine() {
    let lineChart = echarts.init(document.getElementById('lineChart'));
    let lineChartoption = {
      legend: {
        data: ['新顾客', '老顾客']
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
        name: '新顾客',
        type: 'line',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '老顾客',
        type: 'line',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }]
    }
    lineChart.setOption(lineChartoption);
  }

  initBar() {
    let barChart = echarts.init(document.getElementById('barChart'));
    let barChartoptions = {
      legend: {
        data: ['本周', '本月']
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
        name: '本周',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '本月',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }]
    }
    barChart.setOption(barChartoptions);
  }
}
Core.expose('dataanalysis', 'customer', Customer)
