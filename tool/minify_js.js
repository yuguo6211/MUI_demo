"use strict";

const exec = require('child_process').exec,
      Helper = require('./helper'),
      path = require('path'),
      PC = require("../project.config"),
      DistFolder = PC.js.webpack;

let cmds = Helper.walkDirectory(DistFolder, 1).map((item)=> {
  let _distname = item + '.min.js'
  return 'uglifyjs ' + item +'.js -o ' + _distname + ' --compress'
}).join(" && ")

exec(cmds, ()=> {
})
