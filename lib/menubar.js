module.exports =  [
  {
    name: '系统',
    menus: [
      {
        name: '错误日志',
        icon: 'fa-cog',
        controllers: ['errorlog'],
        subs: [
          {
            name: '错误列表',
            href: '/errorlog/list',
            hide: [],
          }
        ]
      },
      {
        name: '模块管理',
        icon: 'fa-cog',
        controllers: ['apimanage'],
        subs: [
          {
            name: 'api模块管理',
            href: '/apimanage/list',
            hide: [],
          }
        ]
      }
    ]
  }
]
