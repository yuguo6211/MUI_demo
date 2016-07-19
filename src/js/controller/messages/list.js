let model;
class List extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
  }
}
Core.expose('messages', 'list', List)
