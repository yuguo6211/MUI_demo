let model;
class Stores extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    
  }
}
Core.expose('dataanalysis', 'stores', Stores)
