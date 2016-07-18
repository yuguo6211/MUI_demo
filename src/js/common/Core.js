window.Core = {
  /**
   * 暴露当前类到指定的全局命名空间下
   * @param  {string} Controller 控制器名
   * @param  {string} action     action名
   * @param  {class} myClass    要暴露的类
   * @return {void}           
   */
  expose: (Controller, action, myClass)=> {
    if (!window.APP) {window.APP = {}}
    if (!window.APP[Controller]) {window.APP[Controller] = {}}
    window.APP[Controller][action] =  myClass
  },

  /**
   * 弹出提示框
   * @param  {string} typ 消息类型：success, info, warning, danger
   * @param  {string} msg 消息内容
   * @param  {object} options 额外配置 delay 消失延时 top 距离顶部距离 
   */
  alert: (typ, msg, options)=> {
    options = options || {}
    let delay = options.delay || 3000
    let top = options.top || 10
    let box = $('<div class="alert alert-' + typ + ' alert-tip" role="alert" ><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg + '</div>')
    $('body').append(box)
    box.animate({top: top}, ()=> {
      setTimeout(()=> {
        box.remove()
      }, delay)
    })
  },

  /**
   * 文件上传
   */
  uploadForm: ($wraper,callback)=> {
    let url =  SITE.API.url + 'upload'
    let $file = $('<input type="file"  name="files"/>')
    $wraper.append($file)
    $file.change(function(){
      if($file.val() == ''){return false;}
      $wraper.append('<div class="mask"><i class="fa fa-circle-o-notch fa-spin  fa-fw margin-bottom loading"></i></div>')

      let form = $("<form class='uploadform' method='post' enctype='multipart/form-data' action='" + url + "'></form>")
      $file.wrap(form);

      $wraper.find('form').ajaxSubmit(API.body(url, 'post', {
          mode: $wraper.attr('data-mode') || 'image',
          mutiple: '0'
        }, function(data){
          $file.unwrap();
          $wraper.find('.mask').remove()
          Core.alert('success', '文件上传成功')


          // 数据绑定
          let dataModel = $wraper.attr('data-model')
          if(dataModel){
            let model = dataModel.split('.').reduce((result, m)=> {
              result = result[m]
              return result
            }, window.MVVM) 
            
            if (_.isArray(model)) {
              //let val = {}
              //val[$wraper.attr('data-key')] = data.url 
              model.push(data.url) 
            } else{
              window.MVVM.$set(dataModel, data.url)
            }
          }
          
          if(callback){callback(data)}
        }))

    });
  },

  /**
   * 表单提交加验证
   */
  
  submiForm: ($form, validation, action)=> {
    $($form).validate( 
      _.extend(validation, {
        submitHandler: ()=> {
          let fields = _.reduce($($form).find('[name]'), (result, item)=> {
            result[item.name] = $(item).val()
            return result
          }, {})
          action(fields)
        } 
      })
    )
  },

  
  /**
   * 第三方插件绑定数据
   */
  bind: ($el, val)=> {
    let dataModel = $el.attr('data-model')
    if(dataModel){
      let model = dataModel.split('.').reduce((result, m)=> {
        result = result[m]
        return result
      }, MVVM) 
      
      if (_.isArray(model)) {
        //let val = {}
        //val[$wraper.attr('data-key')] = data.url 
        model.push(val) 
      } else{
        MVVM.$set(dataModel, val)
      }
    }
  },


  /**
   * 本地存储
   */
  
  localstore: {
    set: (key, val, exp)=> {
      store.set(key, { val: val, exp: exp, time: new Date().getTime() })
    },
    get: (key)=>  {
      var info = store.get(key)
      if (!info) { return null }
      if (new Date().getTime() - info.time > info.exp) { return null }
      return info.val
    }
  }
  
}
