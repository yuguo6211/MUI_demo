let model;
class Orderdetail extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
  }
}
Core.expose('dataanalysis', 'orderdetail', Orderdetail)
