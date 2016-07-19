var assets =  {
  js: [
    'jquery',
    'mui',
    'vue.min',
    'js.cookie',
    'underscore-min',
    'echarts-all'
  ],
  css: [
    'mui',
    'font-awesome',
    'bootstrap',
  ]
}

for(var key in assets){
  assets[key] = assets[key].map(function(item){
    return './vendor/' + key + '/' + item + '.' + key
  }).join(' ')
}

module.exports = assets
