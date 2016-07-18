"use strict";
const fse = require('fs-extra'),
      path = require('path'),
      Helper = require('./helper'),
      PC = require("../project.config")

let build = ()=> { 
  //window.MOCK = {}
  let codes =  Helper.walkDirectory('./dist/js/mock', 1).reduce((result, folder)=> {
    let data = Helper.walk(folder).reduce((last, item)=> {
      last[path.basename(item, '.js')] = require('.' + item)
      return last
    },{})
    return result + ';window.MOCK.' + path.basename(folder) + ' = ' + JSON.stringify(data)

  }, 'window.MOCK={};')
  let ws = fse.createOutputStream(path.dirname(__dirname) + '/dist/js/development.js')
  ws.write(codes)
  
}

build()
