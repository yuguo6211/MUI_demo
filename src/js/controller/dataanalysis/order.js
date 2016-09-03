let model;
class Order extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    
  }
}
Core.expose('dataanalysis', 'order', Order)
