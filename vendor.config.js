var assets =  {
  js: [
    'jquery',
    /*'jquery.validate.min',
    'jquery.form',*/
    'jquery.twbsPagination',
    'es6-promise',
    'moment.min',
    'moment-zh-cn',
    'underscore-min',
    'js.cookie',
    'bootstrap',
    /*'Chart',*/
    'raphael',
    'morris',
    'jquery.knob',
    'jquery.fancybox',
    /*'bootstrap-timepicker',
    'bootstrap-datepicker',
    'bootstrap-colorpicker',*/
    'vue.min',
    'vue-animated-list',
    'AdminLTE',
    'particles.min',
    'store.min',
    /*'zepto.min',*/
    'dropload.min',
    'av'
  ],
  css: [
    'font-awesome',
    'bootstrap',
    'all-skins',
    'jquery.fancybox',
    /*'bootstrap-timepicker',
    'bootstrap-datepicker3',
    'bootstrap-colorpicker',
    'bootstrap-theme',*/
    'animate',
    'morris',
    'AdminLTE',
    'dropload'
  ]
}

for(var key in assets){
  assets[key] = assets[key].map(function(item){
    return './vendor/' + key + '/' + item + '.' + key
  }).join(' ')
}

module.exports = assets
