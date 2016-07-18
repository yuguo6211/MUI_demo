let model;
let query;
let perPage = 15;
class List extends Basic {
  constructor(){
    super({
      vue:{
        data:{
          logs:{},
          routeArr: [],//路由option
          errorType: [],//错误类型option
          Pages: [],//页码
          logItem:{},
          aaa: '',
        },
        methods: {
          strToJson: function(str){
            return JSON.stringify(JSON.parse(str), null, "\t");
          }
        }
      }
    })
    model = this
    this.init()
  }

  init(){
    this.register(['tableselect','selectroute','selecttype','serach','preview']);
    // 初始化
    let appId = 'wkPbNhtQY93bzEPkk51IyvfP-gzGzoHsz';
    let appKey = 'F5isrXoKQcqOTjqGXAr9mmRV';
    AV.init({
      appId: appId,
      appKey: appKey
    });
    query = new AV.Query('Log');
    model.listInit()
  }

  /**
   * 显示下拉列表
   * @param  {obj} event 当前操作对象
   * @return {null}
   */
  tableselect(event) {
    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
  }

  /**
   * 选择option路由
   * @param  {obj} event 当前option
   * @return {null}
   */
  selectroute(item) {
    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
    //查询条件
    if(item == 'all') {item = ''};//查询全部
    let str = {
      key: 'route',
      val: item,
    }
    model.queryData(str);
  }

  /**
   * 选择option错误类型
   * @param  {obj} event 当前option
   * @return {null}
   */
  selecttype(item) {
    $(event.target).closest('.filter').find('.dropdown-menu').toggle();
    //查询条件
    if(item == 'all') {item = ''};//查询全部
    let str = {
      key: 'Type',
      val: item,
    }
    model.queryData(str);
  }

  serach() {
    let val = $('#searchinput').val();
    var query = new AV.SearchQuery('Log');
    query.queryString(val);
    query.find().then(function(results) {
      $('#searchinput').val('');
      results.forEach((item)=> {
        if($.inArray(item.attributes.route, model.mvvm.routeArr, 0) < 0){
          model.mvvm.routeArr.push(item.attributes.route)
        }
        if($.inArray(item.attributes.Type, model.mvvm.errorType, 0) < 0){
          model.mvvm.errorType.push(item.attributes.Type)
        }
      })
      model.mvvm.logs = results;
    });
  }

  preview(item) {
    model.mvvm.logItem = item;
    $('.previewlog').modal('show');
  }

  /**
   * 获取商品列表
   */
  listInit(){
    let str = '';
    model.queryData(str);
  }

  //数据库查询
  queryData(str) {
    if(!_.isEmpty(str)){
      query.equalTo(str.key, str.val);
    }
    query.descending('createdAt');
    query.limit(perPage);
    query.count().then(function (count) {
      let pagenum = Math.ceil(count/perPage);
      let showpagenum = 5;
      if(pagenum < showpagenum) {
        showpagenum = pagenum;
      }
      let idobj = $('#pagination-demo');
      idobj.wrap('<ul id="pagination-demo" class="pagination-sm"> </ul>')
      idobj.remove();
      $('#pagination-demo').twbsPagination({
        totalPages: pagenum,//共多少页
        visiblePages: showpagenum,//可见多少页
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        initiateStartPageClick : false,
        onPageClick: function (event, page) {
          $('#page-content').text('Page ' + page);
          let str = '';
          query.skip((page-1)*perPage);
          model.queryData(str);
        }
      });
    }, function (error) {
    });
    
    query.find().then(function (results) {
      results.forEach((item)=> {
        if($.inArray(item.attributes.route, model.mvvm.routeArr, 0) < 0){
          model.mvvm.routeArr.push(item.attributes.route)
        }
        if($.inArray(item.attributes.Type, model.mvvm.errorType, 0) < 0){
          model.mvvm.errorType.push(item.attributes.Type)
        }
      })
      model.mvvm.logs = results;
    }, function (error) {
    });
  }

  

}
Core.expose('errorlog', 'list', List)

