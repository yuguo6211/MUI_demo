//let Refcd = require('../module/Refcd')
let vuearea = require('../component/area.vue')
//let vueeducation = require('../component/education.vue')

let model;
/**
 * 基础类，包含一些公用的方法和属性
 */




class Basic {
  constructor(initData = {}){ 

    model = this
    
    let mvvmDefault = {
      el: 'body',
      data: {
        session: SITE.session
      },
      components: {
        'vue-area': vuearea,
        //'vue-education': vueeducation
      }
    }


    /**
     * 扩展 vue 对象 computed 、 components
     */
    _.each(initData.vue, (v, k)=> {
      if (_.has(mvvmDefault, k)) {
        mvvmDefault[k] = _.extend(mvvmDefault[k], v)
      }else{
        mvvmDefault[k] = v
      }
    })

    /**
     * vue 实例化 子类中也会用到
     * 子类通过 this.mvvm.$set() 添加vue data 数据
     * 子类通过 this.register([]) 注册 vue methods
     */
    
    this.mvvm = new Vue(mvvmDefault)


    
    
    window.MVVM = this.mvvm
    this.initBasic()
  }

  
  mvvmExtend(data){
    model.mvvmData = data
  }

  
  /**
   * 基础类里面的初始化方法 可以通过在子类中重写来覆盖，实现定制
   * @return {void} 
   */
  initBasic(){
    this.register(['logout', 'refresh', 'switch_state', 'destroy']) 
    
    /**
     * 引用表别名显示过滤器
     */
    
    Vue.filter('refcd', (value, typ)=> {
      let ref = _.filter(SITE.Refcds, (item)=> { 
        return item.state_types == typ && (item.old_value == value || item.name == value)
      })[0]
      return ref ? ref.alias : value
    })
    

   
    

    // 日期格式化过滤器
    Vue.filter('localDate', (value)=> {
      moment.locale('Chinese (Simplified)')    
      return moment(parseInt(value)).format('YYYY-MM-DD hh:mm:ss')
    })  
  }
  
  /**
   * 注册某些方法到 vue 上
   * @param  {string} method 方法名
   * @return {void}        
   */
  register(methods){
    methods.forEach((item)=> {
      this.mvvm[item] = this[item]
    })
  }

  
  
  // 注销
  logout(){
    Cookies.set('token', undefined)
    window.location.href="/login"
  }

  /**
   * 刷新列表
   * @return {null}
   */
  refresh(){
    model.list();
    Core.alert('success','刷新成功');
  }
  
  

  /**
   * 结合万能接口的数据列表初始化方法
   * @param  {string} methodName   数据列表方法名
   * @param  {object} table   数据表对象
   * @param  {Array} fields  MVVM中的表头赋值
   * @param  {string} flag 数据集合赋给MVVM中的哪个变量名
   */
  initListData(methodName, flag, table, fields, beforeFillData){
    
    // 对ID 字段统一进行排序
    let IdField = _.find(fields, (item)=>{
      return item.key == 'id'
    })

    if (IdField) {
      IdField.key = 'create_time'
      IdField.order = '-'
    }

    model.mvvm.$set(flag + '.fields', fields)
    
    // 注册方法
    model[methodName] = ()=> {
      table.all((data)=> {
        if (beforeFillData) {
          beforeFillData(data.items).then((items)=> {
            data.items = items
            model.mvvm.$set(flag + '.data', data.items)
          })
        }else{
          model.mvvm.$set(flag + '.data', data.items)
        }
      }, {})  
    }

    // 表格数据过滤
    model.mvvm[flag + 'TableFilter'] = (event, item, option)=> {
      item.name = option.name
      $(event.target).closest('.dropdown-menu').hide()
      let para = {} 
      para[item.key] = option.value
      table.where(para)
      model[methodName]()

    }

    // 字段排序
    model.mvvm[flag + 'TableOrder'] = (event, item)=> {
      item.order = (item.order == '+' ? '-' : '+')
      table.order(item.order + item.key)
      model[methodName]()
    }

    // 删除方法
    model.mvvm['destroy'] = (item)=> {
      if(!confirm('确定删除该记录')){return false}
      table.get(item).destroy().then(()=> {
        Core.alert('success', '删除成功')
        model.mvvm[flag].data.$remove(item)
      })  
    }

    //启用禁用
    model.mvvm['switch_state'] = (item)=> {
      let tmp = _.clone(item)
      tmp.switch_state = (tmp.switch_state == 'on' ? 'off' : 'on')
      table.get({
        id: item.id,
        switch_state: tmp.switch_state
      }).update().then((data)=> {
        item.switch_state = tmp.switch_state
        Core.alert('success', '切换状态成功')
      })
    }
     
    // 初始化表头字段
    this.initFields(fields)
  }

  /**
   * 初始化表头字段
   */
  initFields(fields){
    _.each(fields, (item)=> {
      if (item.options && typeof(item.options) == 'function') {
        item.options.call(this, (data)=> {
          item.options = data
        })
      }

      if (item.refcd) {
        
      }
    })
  }
  
  /**
   * 用引用表的数据初始化表头字段
   */
  initRefcd(refcdtyp){
    return (set)=> {
      Refcd.all(refcdtyp).then((data)=> {
        set(data.map((item)=> {
          return {
            name: item.alias,
            value: item.old_value == 0 ? item.name : item.old_value
          }
        }))
      })
    }
  }
  


}


window.Basic = Basic
