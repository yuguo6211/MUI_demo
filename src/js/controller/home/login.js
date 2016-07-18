let model;
class Login extends Basic {
  constructor(){
    super({
      vue: {
        data: {
          loginData: '',
        }
      }
    })
    model = this
    this.init()
  }
  init(){
    this.register(['login']);
    //注册执行enter事件
    document.onkeydown = function(e){ 
      var ev = document.all ? window.event : e;
      if(ev.keyCode==13) {
        model.login();
       }
    }
  }
  
   //登录
  login(){
    Cookies.set('token', '')
    let username = $.trim(model.mvvm.loginData.username);
    let pwd = $.trim(model.mvvm.loginData.password);
    model.mvvm.loginData.user_type = "admin";//用户类型
    if(username == '') {Core.alert('danger', '用户名不能为空');return ;}
    if(pwd == '') {Core.alert('danger', '密码不能为空');return ;}
    API.get('admin/login', model.mvvm.loginData, (data)=> {
      Cookies.set('token', data.token)
      Core.alert('success', '登录成功')
      window.location.href="/"
    },()=> {
      Core.alert('danger', '用户名或密码错误')
    })
  }

}
Core.expose('home', 'login', Login)
