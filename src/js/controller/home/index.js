import Morri from '../../module/Morri' 

let model;
class Index extends Basic {
  constructor(){
    super()
    model = this
    //this.init()
  }
  init(){
    // 请求仪表盘数据
    API.get('getDashboard', {},  (data)=> {
      model.mvvm.$set('dashboardList', data.items);
      model.mvvm.$set('todo', data.todo);
      Morri.drawChart(data.chart);
    }, true);
    $('.knob').knob();
  }
}
Core.expose('home', 'index', Index)
