//import _ from 'underscore'
const APIUrl = SITE.API.url
let Helper = {
  /**
   * 根据查询操作符返回对应的值
   */
  symbol: (s)=> {
    return {
      //'=': '$eq',    //等于
      '<': '$lt',    //小于
      '<=': '$lte',    //小于等于
      '>': '$gt',    //大于
      '>=': '$gte',    //大于等于
      '!=': '$ne',    //不等于
      'in': '$in',    //包含
      'notin': '$nin' ,    //不包含
      //'$exists': '',    //这个Key有值
      //'$select': '',    //匹配另一个查询的返回值
      //'$dontSelect' : '',    //排除另一个查询的返回值
      //'$all': '',    //包括所有的给定的值
    }[s]
  },
  
  // 根据传入的 where 参数的 ? 匹配对应的值
  // ["id > ? and age > ?", 1]
  paraVal: (index, val)=> {
    let result = val[index]
    while(!result){
      result = val[index-1]
    }
    return result
  },

  // 组合JSON对象
  jsonG: (key, val)=> {
    let json = {}
    json[key] = val
    return json
  },

  // 解析 ["id > ? " ," age > 20"] => [{"id": {"gt": 1}}, {'age': {'$gt': 20}}]
  parseQ: (arr, val)=> {
    console.log(arr)
    let paraIndex = 1
    return arr.map((item)=> {
      let oper = item.split(/\s+/)  // ["id", ">", "?"]
      if (oper[2] == '?') {
        oper[2] = Helper.paraVal(paraIndex, val)
        paraIndex ++
      }
      return Helper.jsonG(
        oper[0],
        Helper.jsonG(Helper.symbol(oper[1]), oper[2]) 
      )


    })
  }
}

class Table {
  constructor(table, ismock){
    this.table = table
    this.query = {}
    this.whereOr = {}
    this.whereRex = {}
    this.includeRex = []
    this.ismock = ismock
  }
  
  // 初始化查询条件
  reset(){
    this.query = {}
    this.whereRex = {}
    this.whereOr = {}
    this.includeRex = []
    return this
  }

  new(initData){
    return new Model(this.table, initData, this.ismock)
  }

  get(initData){
    return new Model(this.table, initData, this.ismock)
  }

  // Post.where(["id > ?", 0]).where({age: 4}).where(["age > ? or name != ?", 12, 'hxh'])
  // where={"$or":[{"pubUserCertificate":{"$gt":2}},{"pubUserCertificate":{"$lt":3}}]}
  // ?where={"id":{"$gte": 1}, "age": 56, name: {$in: ['h','b']}}
  // ?where={$or: [{"id":{"$gte": 1}}, {"age": 56}]}
  whereQuery(val){
    if (val.length) {
      // ["id > ? or age > 20", 1]
      // {$or: [{"id":{"$gte": 1}}, {"age": {"$gte": 20}}]}
      let orws = val[0].split(' or ')
      if (orws.length > 1) { 
        val = {'$or': Helper.parseQ(orws, val)}
      }else{
        // ["id > ? and age > 20", 1]
        // {"id":{"$gte": 1}}
        val = Helper.parseQ(val[0].split(' and '), val).reduce((total, item)=> {
          return _.extend(total, item)
        }, {})
      }
    }
    return val
  }
  where(val){  
    this.whereRex = _.extend(this.whereRex, this.whereQuery(val))
    return this
  }

  or(val){
    this.whereOr = _.extend(this.whereOr, this.whereQuery(val))
    return this
  }
  
  order(val){
    this.query['order'] = val
    return this
  }
  
  limit(val){
    this.query['limit'] = val
    return this
  }

  skip(val){ 
    this.query['skip'] = val
    return this 
  }
   
  //Order.include('user_poi_users')
  //Order.include('user_poi_users, mem_poi_users')
  //Order.include({'user_poi_users': 'id,mem'})
  //Order.include({'user_poi_users': 'id,mem', 'mem_poi_users': '*'})
  //Order.include({'user_poi_users': ['id', {comment_poi_comments: '*'}, 'name']})
  include(val){
    /*if (typeof(val) == 'string') {
      val.split(',').forEach((item)=> {
        this.includeRex[item] = '*'
      })
    }else{
      this.includeRex = _.extend(this.includeRex, val)
    }*/
    this.includeRex.push(val)
    return this
  }

  first(){ 
    return new Promise((resolve)=> {
      this.skip(0).limit(1).all((data)=> {
        resolve(data.items[0])
      })
    })
  }

  find(id){
    let url = APIUrl + 'classes/'+ this.table + '/' + id
    return new Promise((resolve)=> {
      API.ajax(url, 'get', {include: this.includeRex.join(',')}, (data)=> {
        resolve(data)
      })
    })
  }
  
  /**
   * 返回所有查询数据
   * @param  {Function} callback   回调
   * @param  {[type]}   pagination 分页参数
   */
  all(callback, pagination){ 
    let model = this

    if (pagination){
      pagination.page = pagination.page || 1
      pagination.pagesize = pagination.pagesize || 15
      this.skip((pagination.page - 1) * pagination.pagesize).limit(pagination.pagesize)
      API.loading('show', pagination.wraper)
    }
    
    //- 删除值为 null 的键
    _.each(this.whereRex, (v, k)=> {
      if (v === null) {
        delete this.whereRex[k]
      }
    })

    // 处理 or 查询
    
    let orvals = _.map(this.whereOr, (v,k)=> {
      return Helper.jsonG(k, v)
    })
    if (orvals.length > 0) {
      this.where({'$or': orvals})
    }
    

    this.query['where'] = JSON.stringify(this.whereRex) 
    //this.query['include'] = JSON.stringify(this.includeRex)
    this.query['include'] = this.includeRex.join(',')

    if (!this.query['order']) {
      this.query['order'] = '-create_time'
    }

    
    let params = _.map(this.query, (v, k)=> {
      return k + "=" + v
    }).join('&')
    let url = APIUrl + 'classes/'+ this.table + '?' + params
    
    if(model.ismock){
      let data = window.MOCK.Table[model.table]
      if (pagination) {
        API.loading('hide', pagination.wraper)
        API.pagination(data.count, pagination, ()=> {
          //this.skip(pagination.page - 1).limit(pagination.pagesize)
          this.all(callback, pagination)
        })
      }
      callback(data)

    }else{
      API.ajax(url, 'get', {}, (data)=> {
        //- 分页
        if (pagination) {
          console.log("进来了")
          API.loading('hide', pagination.wraper)
          API.pagination(data.count, pagination, ()=> {
            //this.skip(pagination.page - 1).limit(pagination.pagesize)
            this.all(callback, pagination)
          })
        }

        // 将每条数据转换成 model 对象
        //for(let i = 0; i < data.items.length; i++){
        //  data.items[i] = model.new(data.items[i]) 
        //}

        callback(data)
      })   
    } 
  } 
}


class Model {
  constructor(table, initData, ismock){
    this.table = table
    this.fields = {}
    if (initData) {
      _.each(initData, (v, k)=> {
        this.fields[k] = v
      })
    }
    this.ismock = ismock
  } 

  set(field, val){
    this.fields[field] = val
  }

  save(){
    let model = this
    let url = APIUrl + 'classes/'+ this.table
    return  new Promise((resolve)=> {
      if (this.ismock) {
        resolve({ status: 200 })
      }else{
        API.ajax(url, 'POST', model.fields, (data)=> {
          resolve(data)
        })
      }
    })
     
  }

  update(){
    let model = this
    console.log(this.fields)
    let url = APIUrl + 'classes/'  + this.table + '/' + this.fields.id
    return  new Promise((resolve)=> {
      if (this.ismock) {
        resolve({ status: 200 })
      }else{
        API.ajax(url, 'PUT', model.fields, (data)=> {
          resolve(data)
        }) 
      }
    })
  }

  destroy(){
    let url = APIUrl + 'classes/' + this.table + '/' + this.fields.id
    return  new Promise((resolve)=> {
      if (this.ismock) {
        resolve({ status: 200 })
      }else{
        API.ajax(url, 'DELETE', {}, (data)=> {
          resolve(data)
        })
      } 
    })
  }
}

window.DPJAV = {
  Model: Model,
  extend: (table, ismock)=> {
    return new Table(table, ismock)
  }
}

/*export default {
  Model: Model,
  extend: (table)=> {
    return new Table(table)
  }
}
*/


//let Post = AV.extend('post')
//let post = Post.find(1)  // select * from post where id = 1
//let post = Post.first




//let query = new AV.Query(post)
//query.find(1)
