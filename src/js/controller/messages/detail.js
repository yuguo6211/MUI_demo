let model;
class Detail extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
  }
}
Core.expose('messages', 'detail', Detail)
