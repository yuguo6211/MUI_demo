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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13);


/***/ },

/***/ 13:
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;
	var query = void 0;
	var perPage = 15;

	var List = function (_Basic) {
	  _inherits(List, _Basic);

	  function List() {
	    _classCallCheck(this, List);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this, {
	      vue: {
	        data: {
	          logs: {},
	          routeArr: [], //路由option
	          errorType: [], //错误类型option
	          Pages: [], //页码
	          logItem: {},
	          aaa: ''
	        },
	        methods: {
	          strToJson: function strToJson(str) {
	            return JSON.stringify(JSON.parse(str), null, "\t");
	          }
	        }
	      }
	    }));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  List.prototype.init = function init() {
	    this.register(['tableselect', 'selectroute', 'selecttype', 'serach', 'preview']);
	    // 初始化
	    var appId = 'wkPbNhtQY93bzEPkk51IyvfP-gzGzoHsz';
	    var appKey = 'F5isrXoKQcqOTjqGXAr9mmRV';
	    AV.init({
	      appId: appId,
	      appKey: appKey
	    });
	    query = new AV.Query('Log');
	    model.listInit();
	  };

	  /**
	   * 显示下拉列表
	   * @param  {obj} event 当前操作对象
	   * @return {null}
	   */


	  List.prototype.tableselect = function tableselect(event) {
	    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
	  };

	  /**
	   * 选择option路由
	   * @param  {obj} event 当前option
	   * @return {null}
	   */


	  List.prototype.selectroute = function selectroute(item) {
	    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
	    //查询条件
	    if (item == 'all') {
	      item = '';
	    }; //查询全部
	    var str = {
	      key: 'route',
	      val: item
	    };
	    model.queryData(str);
	  };

	  /**
	   * 选择option错误类型
	   * @param  {obj} event 当前option
	   * @return {null}
	   */


	  List.prototype.selecttype = function selecttype(item) {
	    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
	    //查询条件
	    if (item == 'all') {
	      item = '';
	    }; //查询全部
	    var str = {
	      key: 'Type',
	      val: item
	    };
	    model.queryData(str);
	  };

	  List.prototype.serach = function serach() {
	    var val = $('#searchinput').val();
	    var query = new AV.SearchQuery('Log');
	    query.queryString(val);
	    query.find().then(function (results) {
	      $('#searchinput').val('');
	      results.forEach(function (item) {
	        if ($.inArray(item.attributes.route, model.mvvm.routeArr, 0) < 0) {
	          model.mvvm.routeArr.push(item.attributes.route);
	        }
	        if ($.inArray(item.attributes.Type, model.mvvm.errorType, 0) < 0) {
	          model.mvvm.errorType.push(item.attributes.Type);
	        }
	      });
	      model.mvvm.logs = results;
	    });
	  };

	  List.prototype.preview = function preview(item) {
	    model.mvvm.logItem = item;
	    $('.previewlog').modal('show');
	  };

	  /**
	   * 获取商品列表
	   */


	  List.prototype.listInit = function listInit() {
	    var str = '';
	    model.queryData(str);
	  };

	  //数据库查询


	  List.prototype.queryData = function queryData(str) {
	    if (!_.isEmpty(str)) {
	      query.equalTo(str.key, str.val);
	    }
	    query.descending('createdAt');
	    query.limit(perPage);
	    query.count().then(function (count) {
	      var pagenum = Math.ceil(count / perPage);
	      var showpagenum = 5;
	      if (pagenum < showpagenum) {
	        showpagenum = pagenum;
	      }
	      var idobj = $('#pagination-demo');
	      idobj.wrap('<ul id="pagination-demo" class="pagination-sm"> </ul>');
	      idobj.remove();
	      $('#pagination-demo').twbsPagination({
	        totalPages: pagenum, //共多少页
	        visiblePages: showpagenum, //可见多少页
	        first: '首页',
	        prev: '上一页',
	        next: '下一页',
	        last: '尾页',
	        initiateStartPageClick: false,
	        onPageClick: function onPageClick(event, page) {
	          $('#page-content').text('Page ' + page);
	          var str = '';
	          query.skip((page - 1) * perPage);
	          model.queryData(str);
	        }
	      });
	    }, function (error) {});

	    query.find().then(function (results) {
	      results.forEach(function (item) {
	        if ($.inArray(item.attributes.route, model.mvvm.routeArr, 0) < 0) {
	          model.mvvm.routeArr.push(item.attributes.route);
	        }
	        if ($.inArray(item.attributes.Type, model.mvvm.errorType, 0) < 0) {
	          model.mvvm.errorType.push(item.attributes.Type);
	        }
	      });
	      model.mvvm.logs = results;
	    }, function (error) {});
	  };

	  return List;
	}(Basic);

	Core.expose('errorlog', 'list', List);

/***/ }

/******/ });