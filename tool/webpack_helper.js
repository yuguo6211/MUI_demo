"use strict";
const fse = require('fs-extra'),
      path = require('path'),
      Helper = require('./helper'),
      PC = require("../project.config"),
      DistFolder = PC.webpack.src;

let makeEntry = ()=> { 
  let entrys = Helper.walk(DistFolder, 2).reduce((last, item)=> {
    let _controller = path.basename(path.dirname(item))
    let nm = 'controller/' + _controller
    let _action = path.basename(item)
    if (_action[0] != '_') {
      last[nm] = last[nm] || []
      last[nm].push(DistFolder + '/' + _controller + '/' + _action)
    }
    return last
  },{})
  
  entrys['common'] = Helper.walk('./src/js/common', 1)

  return entrys

}

console.log(makeEntry())
module.exports = {
  makeEntry: makeEntry
}

