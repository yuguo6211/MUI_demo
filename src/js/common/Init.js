/**
 * 开始页面（初始化每个Action的逻辑之前）之前要进行的判断
 */

window.SITE.Init = (callback)=> {  

  getLoginState()
  .then(showMenuByRole)
  .then(callback)
}


/**
 * 获取登录状态
 */
function getLoginState(){
  return new Promise((resolve)=> {
    resolve()
    /*API.get('admin/current', {}, (data)=> {
      data.accountTypAlia = {
        company: '公司',
        dealer: '经销商',
        store: '门店'
      }[data.accountTyp]
      SITE.session = data;
      SITE.session.profile_url = SITE.session.profile_url || '/images/avatar.png';
      resolve()
    },()=> {
      if (SITE.router.action != 'login') {
        window.location.href = "/login"  
      }
      resolve()                                                                          
    })*/
  })
}

/**
 * 识别用户身份  显示隐藏菜单
 */
function showMenuByRole(){
  return new Promise((resolve)=> {
    /*if(SITE.session) {
      let role_power = SITE.session.accountTyp;
      let power = '.' + role_power+'-hide';
      $("[class*='-hide']").not(power).show();
    }

    let power = '.company-hide';
    $("[class*='-hide']").not(power).show();*/
    resolve();
  })
}


/**
 * 获取引用表数据
 */
/*function getRefcds(){
  return new Promise((resolve)=> {
    Refcd.all().then((data)=> {
      SITE.Refcds = data
      resolve()
    })
  })
  
}*/
