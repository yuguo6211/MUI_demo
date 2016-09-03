let model;
class Designer extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    
  }
}
Core.expose('dataanalysis', 'designer', Designer)
