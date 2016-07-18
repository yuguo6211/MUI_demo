"use strict";

var chokidar = require('chokidar'),
    colors = require('colors'),
    path = require('path'),
    Helper = require('./helper'),
    TC = require('../task.config'),
    tasks = TC.tasks;

console.log('文件监控中....'.green)

let eventsTimer;
// One-liner for current directory, ignores .dotfiles
chokidar.watch('./src').on('all', (event, filepath) => {
  clearTimeout(eventsTimer)  
  eventsTimer = setTimeout(()=> {
    Helper.build(getCmd(filepath))
  },500)
});


/**
 * 根据文件路径得知应该执行什么任务
 * @param  {[string]} filepath 文件路径
 * @return {string}          要执行的命令
 */
const cmdMaps = {
  '.js': ['clear:js','babel', 'webpack', 'minify:js','mock', 'vendor:js'],
  '.scss': ['clear:css','sass', 'concat:css']
}
const getCmd = (filepath)=> {
  return cmdMaps[path.extname(filepath)].map((item)=> {
    return tasks[item]
  })
}
