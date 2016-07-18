let model;
class Timetest extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    $(".my-colorpicker1").colorpicker();
    var map = new BMap.Map("map");          
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
    var local = new BMap.LocalSearch(map, {
      renderOptions:{map: map}
    });
    //local.search("景点");
  }
}
Core.expose('home', 'Timetest', Timetest)
