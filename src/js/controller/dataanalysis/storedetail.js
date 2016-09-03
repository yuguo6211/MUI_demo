let model;
class Storedetail extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    this.register(['initPie','initBar','initLine']);
    model.initLine();
    model.initBar();
    model.initPie();
  }

  initLine() {
    let lineChart = echarts.init(document.getElementById('lineChart'));
    let lineChartoption = {
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
        type: 'line',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '本月',
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
        data: ['销售员', '顾客']
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
        name: '销售员',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
      }, {
        name: '顾客',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }]
    }
    barChart.setOption(barChartoptions);
  }

  initPie() {
    let pieChart = echarts.init(document.getElementById('pieChart'));
    let pieChartoptions = {
      calculable: false,
      legend: {
        left: 'left',
        data: ['品牌1','品牌2','品牌3']
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        data: [{
          value: 335,
          name: '品牌1'
        }, {
          value: 310,
          name: '品牌2'
        }, {
          value: 234,
          name: '品牌3'
        }]
      }]
    }
    pieChart.setOption(pieChartoptions);
  }
}
Core.expose('dataanalysis', 'storedetail', Storedetail)
