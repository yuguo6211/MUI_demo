let model;
class Userinfo extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
    
  }
}
Core.expose('setting', 'userinfo', Userinfo)
