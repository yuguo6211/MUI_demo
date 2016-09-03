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

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	module.exports = __webpack_require__(21);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Customer = function (_Basic) {
	  _inherits(Customer, _Basic);

	  function Customer() {
	    _classCallCheck(this, Customer);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Customer.prototype.init = function init() {
	    this.register(['initBar', 'initLine']);
	    model.initLine();
	    model.initBar();
	  };

	  Customer.prototype.initLine = function initLine() {
	    var lineChart = echarts.init(document.getElementById('lineChart'));
	    var lineChartoption = {
	      legend: {
	        data: ['新顾客', '老顾客']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '新顾客',
	        type: 'line',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '老顾客',
	        type: 'line',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    lineChart.setOption(lineChartoption);
	  };

	  Customer.prototype.initBar = function initBar() {
	    var barChart = echarts.init(document.getElementById('barChart'));
	    var barChartoptions = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'bar',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'bar',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    barChart.setOption(barChartoptions);
	  };

	  return Customer;
	}(Basic);

	Core.expose('dataanalysis', 'customer', Customer);

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Designer = function (_Basic) {
	  _inherits(Designer, _Basic);

	  function Designer() {
	    _classCallCheck(this, Designer);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Designer.prototype.init = function init() {};

	  return Designer;
	}(Basic);

	Core.expose('dataanalysis', 'designer', Designer);

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Designerdetail = function (_Basic) {
	  _inherits(Designerdetail, _Basic);

	  function Designerdetail() {
	    _classCallCheck(this, Designerdetail);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Designerdetail.prototype.init = function init() {
	    this.register(['initBar', 'initLine']);
	    model.initLine();
	    model.initBar();
	  };

	  Designerdetail.prototype.initLine = function initLine() {
	    var lineChart = echarts.init(document.getElementById('lineChart'));
	    var lineChartoption = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'line',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'line',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    lineChart.setOption(lineChartoption);
	  };

	  Designerdetail.prototype.initBar = function initBar() {
	    var barChart = echarts.init(document.getElementById('barChart'));
	    var barChartoptions = {
	      legend: {
	        data: ['新顾客', '老顾客']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '新顾客',
	        type: 'bar',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '老顾客',
	        type: 'bar',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    barChart.setOption(barChartoptions);
	  };

	  return Designerdetail;
	}(Basic);

	Core.expose('dataanalysis', 'designerdetail', Designerdetail);

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var List = function (_Basic) {
	  _inherits(List, _Basic);

	  function List() {
	    _classCallCheck(this, List);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  List.prototype.init = function init() {};

	  return List;
	}(Basic);

	Core.expose('dataanalysis', 'list', List);

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Order = function (_Basic) {
	  _inherits(Order, _Basic);

	  function Order() {
	    _classCallCheck(this, Order);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Order.prototype.init = function init() {};

	  return Order;
	}(Basic);

	Core.expose('dataanalysis', 'order', Order);

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Orderdetail = function (_Basic) {
	  _inherits(Orderdetail, _Basic);

	  function Orderdetail() {
	    _classCallCheck(this, Orderdetail);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Orderdetail.prototype.init = function init() {};

	  return Orderdetail;
	}(Basic);

	Core.expose('dataanalysis', 'orderdetail', Orderdetail);

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Pieweek = function (_Basic) {
	  _inherits(Pieweek, _Basic);

	  function Pieweek() {
	    _classCallCheck(this, Pieweek);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Pieweek.prototype.init = function init() {
	    this.register(['initPie', 'initBar', 'initLine']);
	    model.initLine();
	    model.initBar();
	    model.initPie();
	  };

	  Pieweek.prototype.initLine = function initLine() {
	    var lineChart = echarts.init(document.getElementById('lineChart'));
	    var lineChartoption = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'line',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'line',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    lineChart.setOption(lineChartoption);
	  };

	  Pieweek.prototype.initBar = function initBar() {
	    var barChart = echarts.init(document.getElementById('barChart'));
	    var barChartoptions = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'bar',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'bar',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    barChart.setOption(barChartoptions);
	  };

	  Pieweek.prototype.initPie = function initPie() {
	    var pieChart = echarts.init(document.getElementById('pieChart'));
	    var pieChartoptions = {
	      calculable: false,
	      legend: {
	        left: 'left',
	        data: ['京乐_品牌1', '京乐_品牌2', '京乐_品牌3']
	      },
	      series: [{
	        name: '访问来源',
	        type: 'pie',
	        radius: '65%',
	        center: ['50%', '50%'],
	        data: [{
	          value: 335,
	          name: '京乐_品牌1'
	        }, {
	          value: 310,
	          name: '京乐_品牌2'
	        }, {
	          value: 234,
	          name: '京乐_品牌3'
	        }]
	      }]
	    };
	    pieChart.setOption(pieChartoptions);
	  };

	  return Pieweek;
	}(Basic);

	Core.expose('dataanalysis', 'pieweek', Pieweek);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Storedetail = function (_Basic) {
	  _inherits(Storedetail, _Basic);

	  function Storedetail() {
	    _classCallCheck(this, Storedetail);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Storedetail.prototype.init = function init() {
	    this.register(['initPie', 'initBar', 'initLine']);
	    model.initLine();
	    model.initBar();
	    model.initPie();
	  };

	  Storedetail.prototype.initLine = function initLine() {
	    var lineChart = echarts.init(document.getElementById('lineChart'));
	    var lineChartoption = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'line',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'line',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    lineChart.setOption(lineChartoption);
	  };

	  Storedetail.prototype.initBar = function initBar() {
	    var barChart = echarts.init(document.getElementById('barChart'));
	    var barChartoptions = {
	      legend: {
	        data: ['销售员', '顾客']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '销售员',
	        type: 'bar',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '顾客',
	        type: 'bar',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    barChart.setOption(barChartoptions);
	  };

	  Storedetail.prototype.initPie = function initPie() {
	    var pieChart = echarts.init(document.getElementById('pieChart'));
	    var pieChartoptions = {
	      calculable: false,
	      legend: {
	        left: 'left',
	        data: ['品牌1', '品牌2', '品牌3']
	      },
	      series: [{
	        name: '访问来源',
	        type: 'pie',
	        radius: '65%',
	        center: ['50%', '50%'],
	        data: [{
	          value: 335,
	          name: '品牌1'
	        }, {
	          value: 310,
	          name: '品牌2'
	        }, {
	          value: 234,
	          name: '品牌3'
	        }]
	      }]
	    };
	    pieChart.setOption(pieChartoptions);
	  };

	  return Storedetail;
	}(Basic);

	Core.expose('dataanalysis', 'storedetail', Storedetail);

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Stores = function (_Basic) {
	  _inherits(Stores, _Basic);

	  function Stores() {
	    _classCallCheck(this, Stores);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Stores.prototype.init = function init() {};

	  return Stores;
	}(Basic);

	Core.expose('dataanalysis', 'stores', Stores);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var model = void 0;

	var Supplier = function (_Basic) {
	  _inherits(Supplier, _Basic);

	  function Supplier() {
	    _classCallCheck(this, Supplier);

	    var _this = _possibleConstructorReturn(this, _Basic.call(this));

	    model = _this;
	    _this.init();
	    return _this;
	  }

	  Supplier.prototype.init = function init() {
	    this.register(['initPie', 'initLine']);
	    model.initLine();
	    model.initPie();
	  };

	  Supplier.prototype.initLine = function initLine() {
	    var lineChart = echarts.init(document.getElementById('lineChart'));
	    var lineChartoption = {
	      legend: {
	        data: ['本周', '本月']
	      },
	      grid: {
	        x: 35,
	        x2: 10,
	        y: 30,
	        y2: 25
	      },
	      toolbox: {
	        show: false,
	        feature: {
	          mark: {
	            show: true
	          },
	          dataView: {
	            show: true,
	            readOnly: false
	          },
	          magicType: {
	            show: true,
	            type: ['line', 'bar']
	          },
	          restore: {
	            show: true
	          },
	          saveAsImage: {
	            show: true
	          }
	        }
	      },
	      calculable: false,
	      xAxis: [{
	        type: 'category',
	        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	      }],
	      yAxis: [{
	        type: 'value',
	        splitArea: {
	          show: true
	        }
	      }],
	      series: [{
	        name: '本周',
	        type: 'line',
	        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
	      }, {
	        name: '本月',
	        type: 'line',
	        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	      }]
	    };
	    lineChart.setOption(lineChartoption);
	  };

	  Supplier.prototype.initPie = function initPie() {
	    var pieChart = echarts.init(document.getElementById('pieChart'));
	    var pieChartoptions = {
	      calculable: false,
	      legend: {
	        left: 'left',
	        data: ['民用', '办公', '五金']
	      },
	      series: [{
	        name: '访问来源',
	        type: 'pie',
	        radius: '65%',
	        center: ['50%', '50%'],
	        data: [{
	          value: 335,
	          name: '民用'
	        }, {
	          value: 310,
	          name: '办公'
	        }, {
	          value: 234,
	          name: '五金'
	        }]
	      }]
	    };
	    pieChart.setOption(pieChartoptions);
	  };

	  return Supplier;
	}(Basic);

	Core.expose('dataanalysis', 'supplier', Supplier);

/***/ }
/******/ ]);