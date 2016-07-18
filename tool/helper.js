"use strict";

const fs = require("fs"),
      exec = require('child_process').execSync,
      path = require('path');

/**
 * 读取某文件夹下的所有文件
 * @param  {string} dir        要遍历的文件夹
 * @param  {integer} level 要查询的文件层级 默认为所有
 * @return {array}            查询的文件列表集合
 */
let walk = (dir,level)=> {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach((file)=> {
      file = dir + '/' + file
      var stat = fs.statSync(file)
      if (stat && stat.isDirectory()) results = results.concat(walk(file))
      else results.push(file)
  })

  return getFilesByLevel(dir, results, level)
}

let walkDirectory = (dir,level)=> {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach((file)=> {
      file = dir + '/' + file
      var stat = fs.statSync(file)
      if (stat && stat.isDirectory()){
        results.push(file)
        results = results.concat(walkDirectory(file))
      }
  })

  return getFilesByLevel(dir, results, level)
}

/**
 * 过滤出指定层级的文件
 * @param  {string} files 要过滤的文件集合
 * @param  {integer} level 层级
 * @return {array}       新的文件集合
 */
let getFilesByLevel = (dir, files, level)=> {
  if (!level) return files;
  if (!/\/$/.test(dir)) dir += '/' 
  return files.filter((item)=> {
    return item.split(dir)[1].split('/').length === level
  })
}


/**
 * 执行自动化任务
 * @param  {string} cmds 命令集合
 */
let build =  (cmds)=> { 
  let start = Date.now()
  let prev = Date.now()
  cmds.forEach((item)=> {
    console.log(('[' + item.tip.green + '] 开始 ...'))
    exec(item.cmd,(err)=> {
      console.log("ok")
      if (err) {
        console.error(err)
        return
      }
    })
    console.log(('[' + item.tip.green + '] 完成，耗时 ' + timeDiff(prev) + ' 秒'))
    prev = Date.now()
  })
  console.log(('所有任务完成，耗时 ' + timeDiff(start) + ' 秒').magenta)
}


let timeDiff = (start)=> {
  return (Date.now() - start) / 1000 
}

 
module.exports = {
  walk: walk,
  walkDirectory: walkDirectory,
  build: build
}
