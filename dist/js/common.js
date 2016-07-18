/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var baseurl = SITE.API.url;

	var loadingTimer = void 0;

	window.API = {

	  body: function body(url, method, data, successHandler, errorHandler) {
	    return {
	      type: method,
	      url: url,
	      data: data,
	      crossDomain: true,
	      headers: {
	        "X-DP-Key": "hahha",
	        "X-DP-ID": "222",
	        "X-DP-Token": Cookies.get('token')
	      },
	      success: successHandler,
	      error: errorHandler
	    };
	  },

	  ajax: function ajax(url, method, data, successHandler, errorHandler) {
	    $.ajax(API.body(url, method, data, successHandler, errorHandler));
	  },
	  /**
	   * 发送Get请求获取数据
	   * @param  {string} apiName        API名
	   * @param  {object} params         请求参数
	   * @param  {function} successHandler 请求成功回调
	   * @param  {boolen} ismock 是否走本地的mock数据
	   * @return {void}                
	   */
	  get: function get(apiName, params, successHandler, errorHandler, ismock) {
	    if (ismock) {
	      setTimeout(function () {
	        successHandler(window.MOCK[apiName]);
	      }, 1500);
	    } else {
	      var url = baseurl + apiName;
	      API.ajax(url, 'get', params, successHandler, errorHandler);
	    }
	  },

	  post: function post(apiName, data, successHandler, errorHandler, ismock) {
	    if (ismock) {
	      setTimeout(function () {
	        successHandler(window.MOCK[apiName]);
	      }, 1500);
	    } else {
	      var url = baseurl + apiName;
	      API.ajax(url, 'post', data, successHandler, errorHandler);
	    }
	  },

	  put: function put(apiName, data, successHandler, errorHandler, ismock) {
	    if (ismock) {
	      setTimeout(function () {
	        successHandler(window.MOCK[apiName]);
	      }, 1500);
	    } else {
	      var url = baseurl + apiName;
	      API.ajax(url, 'put', data, successHandler, errorHandler);
	    }
	  },

	  /**
	   * 获取数据列表集合
	   * @param  {string} apiName        API名
	   * @param  {object} params         请求参数
	   * @param  {function} successHandler 请求成功回调
	   * @param  {object} extra   额外参数  {wraper: '', pagination: {}}
	   * pagination: 默认值为 {pagesize: 15, page: 1}
	   * loading: {enable: true, wraper: '#'}
	   * @param  {[type]} ismock         是否走本地的mock数据
	   */
	  list: function list(apiName, params, successHandler, extra, ismock) {
	    extra = extra || {};
	    var wraper = $(extra.wraper || '#data-list');
	    var paginationOption = extra.pagination || {};

	    loadingHander('show', wraper);

	    if (ismock) {
	      (function () {
	        var data = window.MOCK[apiName];
	        pagination(data.count, paginationOption, wraper, function (event, p) {
	          paginationOption.page = p;
	          API.list(apiName, params, successHandler, extra, ismock);
	        });
	        setTimeout(function () {
	          loadingHander('hide', wraper);
	          successHandler(data);
	        }, 1500);
	      })();
	    } else {
	      var url = baseurl + '?apiname=' + apiName;
	      pagination(data.count, paginationOption, wraper, function (event, p) {
	        loadingHander('hide', wraper);
	        paginationOption.page = p;
	        API.list(apiName, params, successHandler, extra, ismock);
	      });
	    }
	  },

	  /**
	  * 显示分页
	  * @param  {object}   data       请求返回的数据对象
	  * @param  {object}   option 分页配置对象
	  * @param  {string}   wraper     外部容器
	  * @param  {Function} callback   点击分页回调
	  */
	  pagination: function pagination(count, option, callback) {
	    var pagesize = option.pagesize || 15;
	    var page = option.page || 1;
	    var wraper = $(option.wraper || '#data-list');

	    if (wraper.length < 1 || count < 1) {
	      return;
	    }

	    var paper = wraper.find('div.pagination');
	    if (paper.length < 1) {
	      return;
	    }

	    paper.wrap('<div class="pagination"></div>');
	    paper.remove();

	    var totalPages = Math.ceil(count / pagesize);
	    console.log(totalPages, page);
	    wraper.find('div.pagination').twbsPagination({
	      totalPages: totalPages,
	      visiblePages: 7,
	      startPage: page,
	      initiateStartPageClick: false,
	      first: '首页',
	      prev: '«',
	      next: '»',
	      last: '末页',
	      onPageClick: function onPageClick(event, p) {
	        option.page = p;
	        callback();
	      }
	    });
	  },

	  /**
	  * 显示加载进度
	  * @param  {string} state   状态：显示或隐藏
	  * @param  {object} loading loading 配置对象
	  * @param  {string} wraper  外部容器
	  */
	  loading: function loading(state, wraper) {
	    var $wraper = $(wraper || '#data-list');
	    if ($wraper.length < 1) {
	      return;
	    }
	    var loadingWraper = $wraper.find('.loading');
	    if (loadingWraper.length < 1) {
	      return;
	    }

	    var dataList = $wraper.find('.data-list');

	    loadingWraper.empty();
	    clearTimeout(loadingTimer);
	    if (state == 'show') {
	      loadingTimer = setTimeout(function () {
	        if (dataList) {
	          dataList.hide();
	        }
	        loadingWraper.append('<div class="sk-rotating-plane"></div>');
	      }, 500);
	    } else {
	      if (dataList) {
	        dataList.show();
	      }
	    }
	  }

	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//import _ from 'underscore'
	var APIUrl = SITE.API.url;
	var Helper = {
	  /**
	   * 根据查询操作符返回对应的值
	   */
	  symbol: function symbol(s) {
	    return {
	      //'=': '$eq',    //等于
	      '<': '$lt', //小于
	      '<=': '$lte', //小于等于
	      '>': '$gt', //大于
	      '>=': '$gte', //大于等于
	      '!=': '$ne', //不等于
	      'in': '$in', //包含
	      'notin': '$nin' }[s];
	  },

	  // 根据传入的 where 参数的 ? 匹配对应的值
	  // ["id > ? and age > ?", 1]
	  paraVal: function paraVal(index, val) {
	    var result = val[index];
	    while (!result) {
	      result = val[index - 1];
	    }
	    return result;
	  },

	  // 组合JSON对象
	  jsonG: function jsonG(key, val) {
	    var json = {};
	    json[key] = val;
	    return json;
	  },

	  // 解析 ["id > ? " ," age > 20"] => [{"id": {"gt": 1}}, {'age': {'$gt': 20}}]
	  parseQ: function parseQ(arr, val) {
	    console.log(arr);
	    var paraIndex = 1;
	    return arr.map(function (item) {
	      var oper = item.split(/\s+/); // ["id", ">", "?"]
	      if (oper[2] == '?') {
	        oper[2] = Helper.paraVal(paraIndex, val);
	        paraIndex++;
	      }
	      return Helper.jsonG(oper[0], Helper.jsonG(Helper.symbol(oper[1]), oper[2]));
	    });
	  }
	};

	var Table = function () {
	  function Table(table, ismock) {
	    _classCallCheck(this, Table);

	    this.table = table;
	    this.query = {};
	    this.whereOr = {};
	    this.whereRex = {};
	    this.includeRex = [];
	    this.ismock = ismock;
	  }

	  // 初始化查询条件


	  Table.prototype.reset = function reset() {
	    this.query = {};
	    this.whereRex = {};
	    this.whereOr = {};
	    this.includeRex = [];
	    return this;
	  };

	  Table.prototype.new = function _new(initData) {
	    return new Model(this.table, initData, this.ismock);
	  };

	  Table.prototype.get = function get(initData) {
	    return new Model(this.table, initData, this.ismock);
	  };

	  // Post.where(["id > ?", 0]).where({age: 4}).where(["age > ? or name != ?", 12, 'hxh'])
	  // where={"$or":[{"pubUserCertificate":{"$gt":2}},{"pubUserCertificate":{"$lt":3}}]}
	  // ?where={"id":{"$gte": 1}, "age": 56, name: {$in: ['h','b']}}
	  // ?where={$or: [{"id":{"$gte": 1}}, {"age": 56}]}


	  Table.prototype.whereQuery = function whereQuery(val) {
	    if (val.length) {
	      // ["id > ? or age > 20", 1]
	      // {$or: [{"id":{"$gte": 1}}, {"age": {"$gte": 20}}]}
	      var orws = val[0].split(' or ');
	      if (orws.length > 1) {
	        val = { '$or': Helper.parseQ(orws, val) };
	      } else {
	        // ["id > ? and age > 20", 1]
	        // {"id":{"$gte": 1}}
	        val = Helper.parseQ(val[0].split(' and '), val).reduce(function (total, item) {
	          return _.extend(total, item);
	        }, {});
	      }
	    }
	    return val;
	  };

	  Table.prototype.where = function where(val) {
	    this.whereRex = _.extend(this.whereRex, this.whereQuery(val));
	    return this;
	  };

	  Table.prototype.or = function or(val) {
	    this.whereOr = _.extend(this.whereOr, this.whereQuery(val));
	    return this;
	  };

	  Table.prototype.order = function order(val) {
	    this.query['order'] = val;
	    return this;
	  };

	  Table.prototype.limit = function limit(val) {
	    this.query['limit'] = val;
	    return this;
	  };

	  Table.prototype.skip = function skip(val) {
	    this.query['skip'] = val;
	    return this;
	  };

	  //Order.include('user_poi_users')
	  //Order.include('user_poi_users, mem_poi_users')
	  //Order.include({'user_poi_users': 'id,mem'})
	  //Order.include({'user_poi_users': 'id,mem', 'mem_poi_users': '*'})
	  //Order.include({'user_poi_users': ['id', {comment_poi_comments: '*'}, 'name']})


	  Table.prototype.include = function include(val) {
	    /*if (typeof(val) == 'string') {
	      val.split(',').forEach((item)=> {
	        this.includeRex[item] = '*'
	      })
	    }else{
	      this.includeRex = _.extend(this.includeRex, val)
	    }*/
	    this.includeRex.push(val);
	    return this;
	  };

	  Table.prototype.first = function first() {
	    var _this = this;

	    return new Promise(function (resolve) {
	      _this.skip(0).limit(1).all(function (data) {
	        resolve(data.items[0]);
	      });
	    });
	  };

	  Table.prototype.find = function find(id) {
	    var _this2 = this;

	    var url = APIUrl + 'classes/' + this.table + '/' + id;
	    return new Promise(function (resolve) {
	      API.ajax(url, 'get', { include: _this2.includeRex.join(',') }, function (data) {
	        resolve(data);
	      });
	    });
	  };

	  /**
	   * 返回所有查询数据
	   * @param  {Function} callback   回调
	   * @param  {[type]}   pagination 分页参数
	   */


	  Table.prototype.all = function all(callback, pagination) {
	    var _this3 = this;

	    var model = this;

	    if (pagination) {
	      pagination.page = pagination.page || 1;
	      pagination.pagesize = pagination.pagesize || 15;
	      this.skip((pagination.page - 1) * pagination.pagesize).limit(pagination.pagesize);
	      API.loading('show', pagination.wraper);
	    }

	    //- 删除值为 null 的键
	    _.each(this.whereRex, function (v, k) {
	      if (v === null) {
	        delete _this3.whereRex[k];
	      }
	    });

	    // 处理 or 查询

	    var orvals = _.map(this.whereOr, function (v, k) {
	      return Helper.jsonG(k, v);
	    });
	    if (orvals.length > 0) {
	      this.where({ '$or': orvals });
	    }

	    this.query['where'] = JSON.stringify(this.whereRex);
	    //this.query['include'] = JSON.stringify(this.includeRex)
	    this.query['include'] = this.includeRex.join(',');

	    if (!this.query['order']) {
	      this.query['order'] = '-create_time';
	    }

	    var params = _.map(this.query, function (v, k) {
	      return k + "=" + v;
	    }).join('&');
	    var url = APIUrl + 'classes/' + this.table + '?' + params;

	    if (model.ismock) {
	      var data = window.MOCK.Table[model.table];
	      if (pagination) {
	        API.loading('hide', pagination.wraper);
	        API.pagination(data.count, pagination, function () {
	          //this.skip(pagination.page - 1).limit(pagination.pagesize)
	          _this3.all(callback, pagination);
	        });
	      }
	      callback(data);
	    } else {
	      API.ajax(url, 'get', {}, function (data) {
	        //- 分页
	        if (pagination) {
	          console.log("进来了");
	          API.loading('hide', pagination.wraper);
	          API.pagination(data.count, pagination, function () {
	            //this.skip(pagination.page - 1).limit(pagination.pagesize)
	            _this3.all(callback, pagination);
	          });
	        }

	        // 将每条数据转换成 model 对象
	        //for(let i = 0; i < data.items.length; i++){
	        //  data.items[i] = model.new(data.items[i]) 
	        //}

	        callback(data);
	      });
	    }
	  };

	  return Table;
	}();

	var Model = function () {
	  function Model(table, initData, ismock) {
	    var _this4 = this;

	    _classCallCheck(this, Model);

	    this.table = table;
	    this.fields = {};
	    if (initData) {
	      _.each(initData, function (v, k) {
	        _this4.fields[k] = v;
	      });
	    }
	    this.ismock = ismock;
	  }

	  Model.prototype.set = function set(field, val) {
	    this.fields[field] = val;
	  };

	  Model.prototype.save = function save() {
	    var _this5 = this;

	    var model = this;
	    var url = APIUrl + 'classes/' + this.table;
	    return new Promise(function (resolve) {
	      if (_this5.ismock) {
	        resolve({ status: 200 });
	      } else {
	        API.ajax(url, 'POST', model.fields, function (data) {
	          resolve(data);
	        });
	      }
	    });
	  };

	  Model.prototype.update = function update() {
	    var _this6 = this;

	    var model = this;
	    console.log(this.fields);
	    var url = APIUrl + 'classes/' + this.table + '/' + this.fields.id;
	    return new Promise(function (resolve) {
	      if (_this6.ismock) {
	        resolve({ status: 200 });
	      } else {
	        API.ajax(url, 'PUT', model.fields, function (data) {
	          resolve(data);
	        });
	      }
	    });
	  };

	  Model.prototype.destroy = function destroy() {
	    var _this7 = this;

	    var url = APIUrl + 'classes/' + this.table + '/' + this.fields.id;
	    return new Promise(function (resolve) {
	      if (_this7.ismock) {
	        resolve({ status: 200 });
	      } else {
	        API.ajax(url, 'DELETE', {}, function (data) {
	          resolve(data);
	        });
	      }
	    });
	  };

	  return Model;
	}();

	window.DPJAV = {
	  Model: Model,
	  extend: function extend(table, ismock) {
	    return new Table(table, ismock);
	  }
	};

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	window.Core = {
	  /**
	   * 暴露当前类到指定的全局命名空间下
	   * @param  {string} Controller 控制器名
	   * @param  {string} action     action名
	   * @param  {class} myClass    要暴露的类
	   * @return {void}           
	   */
	  expose: function expose(Controller, action, myClass) {
	    if (!window.APP) {
	      window.APP = {};
	    }
	    if (!window.APP[Controller]) {
	      window.APP[Controller] = {};
	    }
	    window.APP[Controller][action] = myClass;
	  },

	  /**
	   * 弹出提示框
	   * @param  {string} typ 消息类型：success, info, warning, danger
	   * @param  {string} msg 消息内容
	   * @param  {object} options 额外配置 delay 消失延时 top 距离顶部距离 
	   */
	  alert: function alert(typ, msg, options) {
	    options = options || {};
	    var delay = options.delay || 3000;
	    var top = options.top || 10;
	    var box = $('<div class="alert alert-' + typ + ' alert-tip" role="alert" ><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg + '</div>');
	    $('body').append(box);
	    box.animate({ top: top }, function () {
	      setTimeout(function () {
	        box.remove();
	      }, delay);
	    });
	  },

	  /**
	   * 文件上传
	   */
	  uploadForm: function uploadForm($wraper, callback) {
	    var url = SITE.API.url + 'upload';
	    var $file = $('<input type="file"  name="files"/>');
	    $wraper.append($file);
	    $file.change(function () {
	      if ($file.val() == '') {
	        return false;
	      }
	      $wraper.append('<div class="mask"><i class="fa fa-circle-o-notch fa-spin  fa-fw margin-bottom loading"></i></div>');

	      var form = $("<form class='uploadform' method='post' enctype='multipart/form-data' action='" + url + "'></form>");
	      $file.wrap(form);

	      $wraper.find('form').ajaxSubmit(API.body(url, 'post', {
	        mode: $wraper.attr('data-mode') || 'image',
	        mutiple: '0'
	      }, function (data) {
	        $file.unwrap();
	        $wraper.find('.mask').remove();
	        Core.alert('success', '文件上传成功');

	        // 数据绑定
	        var dataModel = $wraper.attr('data-model');
	        if (dataModel) {
	          var model = dataModel.split('.').reduce(function (result, m) {
	            result = result[m];
	            return result;
	          }, window.MVVM);

	          if (_.isArray(model)) {
	            //let val = {}
	            //val[$wraper.attr('data-key')] = data.url 
	            model.push(data.url);
	          } else {
	            window.MVVM.$set(dataModel, data.url);
	          }
	        }

	        if (callback) {
	          callback(data);
	        }
	      }));
	    });
	  },

	  /**
	   * 表单提交加验证
	   */

	  submiForm: function submiForm($form, validation, action) {
	    $($form).validate(_.extend(validation, {
	      submitHandler: function submitHandler() {
	        var fields = _.reduce($($form).find('[name]'), function (result, item) {
	          result[item.name] = $(item).val();
	          return result;
	        }, {});
	        action(fields);
	      }
	    }));
	  },

	  /**
	   * 第三方插件绑定数据
	   */
	  bind: function bind($el, val) {
	    var dataModel = $el.attr('data-model');
	    if (dataModel) {
	      var model = dataModel.split('.').reduce(function (result, m) {
	        result = result[m];
	        return result;
	      }, MVVM);

	      if (_.isArray(model)) {
	        //let val = {}
	        //val[$wraper.attr('data-key')] = data.url 
	        model.push(val);
	      } else {
	        MVVM.$set(dataModel, val);
	      }
	    }
	  },

	  /**
	   * 本地存储
	   */

	  localstore: {
	    set: function set(key, val, exp) {
	      store.set(key, { val: val, exp: exp, time: new Date().getTime() });
	    },
	    get: function get(key) {
	      var info = store.get(key);
	      if (!info) {
	        return null;
	      }
	      if (new Date().getTime() - info.time > info.exp) {
	        return null;
	      }
	      return info.val;
	    }
	  }

	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 开始页面（初始化每个Action的逻辑之前）之前要进行的判断
	 */

	window.SITE.Init = function (callback) {

	  getLoginState().then(showMenuByRole).then(getRefcds).then(callback);
	};

	/**
	 * 获取登录状态
	 */
	function getLoginState() {
	  return new Promise(function (resolve) {
	    resolve();
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
	  });
	}

	/**
	 * 识别用户身份  显示隐藏菜单
	 */
	function showMenuByRole() {
	  return new Promise(function (resolve) {
	    /*if(SITE.session) {
	      let role_power = SITE.session.accountTyp;
	      let power = '.' + role_power+'-hide';
	      $("[class*='-hide']").not(power).show();
	    }
	      let power = '.company-hide';
	    $("[class*='-hide']").not(power).show();*/
	    resolve();
	  });
	}

	/**
	 * 获取引用表数据
	 */
	function getRefcds() {
	  return new Promise(function (resolve) {
	    Refcd.all().then(function (data) {
	      SITE.Refcds = data;
	      resolve();
	    });
	  });
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var State = DPJAV.extend('pre_selectable_states');

	var filerRefcd = function filerRefcd(items, typ, name) {
	  if (typ) {
	    if (name) {
	      return _.filter(items, function (item) {
	        return item.state_types == typ && (item.old_value == name || item.name == name);
	      })[0];
	    }
	    return _.filter(items, function (item) {
	      return item.state_types == typ;
	    });
	  }

	  return items;
	};

	var RefcdClass = function () {
	  function RefcdClass() {
	    _classCallCheck(this, RefcdClass);
	  }

	  /**
	   * 引用表数据类型映射
	   * @param  {string} typ   引用类型
	   */

	  RefcdClass.prototype.all = function all(typ, name) {
	    var _this = this;

	    return new Promise(function (resolve) {
	      if (!_this.RefcdData) {
	        State.limit(200).all(function (data) {
	          _this.RefcdData = data.items;
	          resolve(filerRefcd(_this.RefcdData, typ));
	        });
	      } else {
	        resolve(filerRefcd(_this.RefcdData, typ, name));
	      }
	    });
	  };

	  return RefcdClass;
	}();

	window.Refcd = new RefcdClass();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	window.TableHlper = {
	  help: function help() {
	    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	//let Refcd = require('../module/Refcd')
	var vuearea = __webpack_require__(8);
	//let vueeducation = require('../component/education.vue')

	var model = void 0;
	/**
	 * 基础类，包含一些公用的方法和属性
	 */

	var Basic = function () {
	  function Basic() {
	    var initData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Basic);

	    model = this;

	    var mvvmDefault = {
	      el: 'body',
	      data: {
	        session: SITE.session
	      },
	      components: {
	        'vue-area': vuearea
	      }
	    };

	    /**
	     * 扩展 vue 对象 computed 、 components
	     */
	    _.each(initData.vue, function (v, k) {
	      if (_.has(mvvmDefault, k)) {
	        mvvmDefault[k] = _.extend(mvvmDefault[k], v);
	      } else {
	        mvvmDefault[k] = v;
	      }
	    });

	    /**
	     * vue 实例化 子类中也会用到
	     * 子类通过 this.mvvm.$set() 添加vue data 数据
	     * 子类通过 this.register([]) 注册 vue methods
	     */

	    this.mvvm = new Vue(mvvmDefault);

	    window.MVVM = this.mvvm;
	    this.initBasic();
	  }

	  Basic.prototype.mvvmExtend = function mvvmExtend(data) {
	    model.mvvmData = data;
	  };

	  /**
	   * 基础类里面的初始化方法 可以通过在子类中重写来覆盖，实现定制
	   * @return {void} 
	   */


	  Basic.prototype.initBasic = function initBasic() {
	    this.register(['logout', 'refresh', 'switch_state', 'destroy']);

	    /**
	     * 引用表别名显示过滤器
	     */

	    Vue.filter('refcd', function (value, typ) {
	      var ref = _.filter(SITE.Refcds, function (item) {
	        return item.state_types == typ && (item.old_value == value || item.name == value);
	      })[0];
	      return ref ? ref.alias : value;
	    });

	    // 日期格式化过滤器
	    Vue.filter('localDate', function (value) {
	      moment.locale('Chinese (Simplified)');
	      return moment(parseInt(value)).format('YYYY-MM-DD hh:mm:ss');
	    });
	  };

	  /**
	   * 注册某些方法到 vue 上
	   * @param  {string} method 方法名
	   * @return {void}        
	   */


	  Basic.prototype.register = function register(methods) {
	    var _this = this;

	    methods.forEach(function (item) {
	      _this.mvvm[item] = _this[item];
	    });
	  };

	  // 注销


	  Basic.prototype.logout = function logout() {
	    Cookies.set('token', undefined);
	    window.location.href = "/login";
	  };

	  /**
	   * 刷新列表
	   * @return {null}
	   */


	  Basic.prototype.refresh = function refresh() {
	    model.list();
	    Core.alert('success', '刷新成功');
	  };

	  /**
	   * 结合万能接口的数据列表初始化方法
	   * @param  {string} methodName   数据列表方法名
	   * @param  {object} table   数据表对象
	   * @param  {Array} fields  MVVM中的表头赋值
	   * @param  {string} flag 数据集合赋给MVVM中的哪个变量名
	   */


	  Basic.prototype.initListData = function initListData(methodName, flag, table, fields, beforeFillData) {

	    // 对ID 字段统一进行排序
	    var IdField = _.find(fields, function (item) {
	      return item.key == 'id';
	    });

	    if (IdField) {
	      IdField.key = 'create_time';
	      IdField.order = '-';
	    }

	    model.mvvm.$set(flag + '.fields', fields);

	    // 注册方法
	    model[methodName] = function () {
	      table.all(function (data) {
	        if (beforeFillData) {
	          beforeFillData(data.items).then(function (items) {
	            data.items = items;
	            model.mvvm.$set(flag + '.data', data.items);
	          });
	        } else {
	          model.mvvm.$set(flag + '.data', data.items);
	        }
	      }, {});
	    };

	    // 表格数据过滤
	    model.mvvm[flag + 'TableFilter'] = function (event, item, option) {
	      item.name = option.name;
	      $(event.target).closest('.dropdown-menu').hide();
	      var para = {};
	      para[item.key] = option.value;
	      table.where(para);
	      model[methodName]();
	    };

	    // 字段排序
	    model.mvvm[flag + 'TableOrder'] = function (event, item) {
	      item.order = item.order == '+' ? '-' : '+';
	      table.order(item.order + item.key);
	      model[methodName]();
	    };

	    // 删除方法
	    model.mvvm['destroy'] = function (item) {
	      if (!confirm('确定删除该记录')) {
	        return false;
	      }
	      table.get(item).destroy().then(function () {
	        Core.alert('success', '删除成功');
	        model.mvvm[flag].data.$remove(item);
	      });
	    };

	    //启用禁用
	    model.mvvm['switch_state'] = function (item) {
	      var tmp = _.clone(item);
	      tmp.switch_state = tmp.switch_state == 'on' ? 'off' : 'on';
	      table.get({
	        id: item.id,
	        switch_state: tmp.switch_state
	      }).update().then(function (data) {
	        item.switch_state = tmp.switch_state;
	        Core.alert('success', '切换状态成功');
	      });
	    };

	    // 初始化表头字段
	    this.initFields(fields);
	  };

	  /**
	   * 初始化表头字段
	   */


	  Basic.prototype.initFields = function initFields(fields) {
	    var _this2 = this;

	    _.each(fields, function (item) {
	      if (item.options && typeof item.options == 'function') {
	        item.options.call(_this2, function (data) {
	          item.options = data;
	        });
	      }

	      if (item.refcd) {}
	    });
	  };

	  /**
	   * 用引用表的数据初始化表头字段
	   */


	  Basic.prototype.initRefcd = function initRefcd(refcdtyp) {
	    return function (set) {
	      Refcd.all(refcdtyp).then(function (data) {
	        set(data.map(function (item) {
	          return {
	            name: item.alias,
	            value: item.old_value == 0 ? item.name : item.old_value
	          };
	        }));
	      });
	    };
	  };

	  return Basic;
	}();

	window.Basic = Basic;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(9)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/js/component/area.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(10)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-51c0868e/area.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var Province = DPJAV.extend('pre_province');
	var City = DPJAV.extend('pre_city');
	var District = DPJAV.extend('pre_district');
	var isinit = true;

	exports.default = {
	  props: ['province', 'city', 'district', 'disabled', 'allowps', 'allowcs', 'allowds'],

	  data: function data() {
	    return {
	      provinces: [],
	      citys: [],
	      districts: []
	    };
	  },

	  methods: {
	    filterArea: function filterArea(allowwhats, data, canbeempty) {
	      var areas = allowwhats && allowwhats.length > 0 ? _.filter(data.items, function (item) {
	        return allowwhats.indexOf(item.id.toString()) >= 0;
	      }) : data.items;

	      return areas.length < 1 && !canbeempty ? data.items : areas;
	    },

	    initProvince: function initProvince() {
	      var _this = this;

	      Province.limit(2000).all(function (data) {
	        _this.provinces = _this.filterArea(_this.allowps, data, true);
	      });

	      if (!isinit) {
	        this.province = -1;
	        this.city = -1;
	        this.citys = [];
	        this.district = -1;
	        this.districts = [];
	      }
	    },

	    switchProvince: function switchProvince() {
	      var _this2 = this;

	      if (!(parseInt(this.province) + 2 > 0)) {
	        this.province = -1;
	      }

	      if (!isinit) {
	        this.city = -1;
	        this.district = -1;
	        this.districts = [];
	      }

	      if (this.province == -1) {
	        return;
	      }
	      City.where({ ProvinceID: this.province }).limit(2000).all(function (data) {
	        _this2.citys = _this2.filterArea(_this2.allowcs, data);
	      });
	    },

	    switchCity: function switchCity() {
	      var _this3 = this;

	      console.log('city', this.city);
	      if (!(parseInt(this.city) + 2 > 0)) {
	        this.city = -1;
	      }

	      if (!isinit) {
	        this.district = -1;
	      }
	      if (this.city == -1) {
	        return;
	      }

	      District.where({ CityID: this.city }).limit(2000).all(function (data) {
	        _this3.districts = _this3.filterArea(_this3.allowds, data);
	      });
	    },

	    switchDistrict: function switchDistrict() {
	      if (!(parseInt(this.district) + 2 > 0)) {
	        this.district = -1;
	      }
	    },

	    switchInit: function switchInit() {
	      isinit = false;
	    }

	  },
	  created: function created() {
	    isinit = true;

	    this.$watch('province', function () {
	      this.switchProvince();
	    });

	    this.$watch('city', function () {
	      this.switchCity();
	    });

	    this.$watch('district', function () {
	      this.switchDistrict();
	    });

	    this.$watch('allowps', function () {
	      this.initProvince();
	    });

	    this.initProvince();
	    this.switchProvince();
	    this.switchCity();
	    this.switchDistrict();
	  }
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"row\"><div class=\"col-md-4\"><select v-model=\"province\" @change=\"switchInit\" disabled=\"{{disabled}}\" class=\"form-control\"><option value=\"-1\">=选择省=</option><option v-for=\"p in provinces\" value=\"{{p.id}}\">{{p.ProvinceName}}</option></select></div><div class=\"col-md-4\"><select v-model=\"city\" @change=\"switchInit\" disabled=\"{{disabled}}\" class=\"form-control\"><option value=\"-1\">=选择市=</option><option v-for=\"c in citys\" value=\"{{c.id}}\">{{c.CityName}}</option></select></div><div class=\"col-md-4\"><select v-model=\"district\" @change=\"switchInit\" disabled=\"{{disabled}}\" class=\"form-control\"><option value=\"-1\">=选择区=</option><option v-for=\"d in districts\" value=\"{{d.id}}\">{{d.DistrictName}}</option></select></div></div>";

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	$(function () {
	  // lightbox
	  $(".fancybox").fancybox({
	    arrows: false
	  });
	});

/***/ }
/******/ ]);