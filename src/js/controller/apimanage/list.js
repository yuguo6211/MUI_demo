let model;
class List extends Basic {
  constructor(){
    super({
      vue:{
        data:{
          apilist:[],
        }
      }
    })
    model = this
    this.init()
  }
  init(){
    this.register([''])
    this.listInit();
  }


  listInit() {

    API.get('functions/fetch/fetch_notes',null, (data)=> {
      console.log(data)
      model.mvvm.apilist = data.items

    })
  }

}
Core.expose('apimanage', 'list', List)
