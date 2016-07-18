"use strict";

const exec = require('child_process').execSync,
      Helper = require('./helper'),
      path = require('path'),
      colors = require('colors'),
      TC = require('../task.config'),
      tasks = TC.tasks,
      group = TC.group;


// npm run build css
const arg = process.argv[2]
/**
 * 根据用户输入的参数执行对应的命令组
 */
let getCmds = ()=> { 
  if (arg) {
    if(group[arg]){
      return group[arg].map((item)=> {
        return tasks[item]
      })
    }
    if (tasks[arg]) return [tasks[arg]]
  }
  

  let ts = []
  for(let item in tasks){
    ts.push(tasks[item])
  }
  return ts.filter((item)=> {
    return !item.ignore
  })
}


let build =  ()=> { 
  let start = Date.now()
  let prev = Date.now()
  getCmds().forEach((item)=> {
    console.log(('[' + item.tip.green + '] 开始 ...'))
    exec(item.cmd)
    console.log(('[' + item.tip.green + '] 完成，耗时 ' + timeDiff(prev) + ' 秒'))
    prev = Date.now()
  })
  console.log('打包结束，耗时 ' + timeDiff(start) + ' 秒'.green)
}



/*let build = ()=> {
  let cmds = [
    //'console.log("打包开始...".green)'
  ]
  for(let key in tasks){
    cmds.push([
      //'console.log("开始 [' + tasks[key].tip + '] ...".green)',
      tasks[key].cmd,
      //'console.log("[' + tasks[key].tip + '] 完成".green)'
    ].join(' && '))
  } 
  cmds = cmds.join(' && ')

  var start = Date.now();
  var cs = 'echo 开始'
  exec('echo 开始', ()=> {
    //console.log('打包结束，耗时 ' + timeDiff(start)+ ' 秒'.green)
  })
}
*/


let timeDiff = (start)=> {
  return (Date.now() - start) / 1000 
}

build()
