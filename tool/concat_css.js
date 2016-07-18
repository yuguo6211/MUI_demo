"use strict";

const exec = require('child_process').exec,
      Helper = require('./helper'),
      path = require('path'),
      PC = require("../project.config"),
      DistFolder = PC.css.dist + '/controller';



let cmds = Helper.walkDirectory(DistFolder,1).map((item)=> {
  let _controller = path.basename(item)
  let cmd = 'cat ' + item + '/*.css >> ' + item + '.min.css'
  return cmd
},[]).join( '&& ')
exec(cmds, ()=> {
})
