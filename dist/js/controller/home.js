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

	__webpack_require__(22);
	module.exports = __webpack_require__(23);


/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Index = function (_Basic) {
	  _inherits(Index, _Basic);

	  function Index() {
	    _classCallCheck(this, Index);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Index.prototype.init = function init() {};

	  return Index;
	}(Basic);

	Core.expose('home', 'index', Index);

/***/ },

/***/ 23:
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Login = function (_Basic) {
	  _inherits(Login, _Basic);

	  function Login() {
	    _classCallCheck(this, Login);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this, {
	      vue: {
	        data: {
	          loginData: ''
	        }
	      }
	    }));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Login.prototype.init = function init() {
	    this.register(['login']);
	    //注册执行enter事件
	    document.onkeydown = function (e) {
	      var ev = document.all ? window.event : e;
	      if (ev.keyCode == 13) {
	        model.login();
	      }
	    };
	  };

	  //登录


	  Login.prototype.login = function login() {
	    Cookies.set('token', '');
	    var username = $.trim(model.mvvm.loginData.username);
	    var pwd = $.trim(model.mvvm.loginData.password);
	    model.mvvm.loginData.user_type = "admin"; //用户类型
	    if (username == '') {
	      Core.alert('danger', '用户名不能为空');return;
	    }
	    if (pwd == '') {
	      Core.alert('danger', '密码不能为空');return;
	    }
	    API.get('admin/login', model.mvvm.loginData, function (data) {
	      Cookies.set('token', data.token);
	      Core.alert('success', '登录成功');
	      window.location.href = "/";
	    }, function () {
	      Core.alert('danger', '用户名或密码错误');
	    });
	  };

	  return Login;
	}(Basic);

	Core.expose('home', 'login', Login);

/***/ }

/******/ });