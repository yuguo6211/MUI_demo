let State = DPJAV.extend('pre_selectable_states')

let filerRefcd = (items, typ, name)=> {
  if (typ) {
    if (name) {
      return _.filter(items, (item)=> {
        return item.state_types == typ && (item.old_value == name || item.name == name)
      })[0]
    }
    return _.filter(items, (item)=> {
      return item.state_types == typ
    })
  }

  return items
}

class RefcdClass {
  /**
   * 引用表数据类型映射
   * @param  {string} typ   引用类型
   */
  all(typ, name){
    return new Promise((resolve)=> { 
      if (!this.RefcdData) {
        State.limit(200).all((data)=> {
          this.RefcdData = data.items
          resolve(filerRefcd(this.RefcdData, typ))
        })
      }else{
        resolve(filerRefcd(this.RefcdData, typ, name))
      }
    })
  }
}

window.Refcd = new RefcdClass()
