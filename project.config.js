/**
 * 前端自动化任务配置项
 */
module.exports = {
  assets: {
    src: './src',
    dist: './dist'
  },
  js: {
    src: './src/js',
    dist: './dist/js', 
    doc: {
      src: './src/js/',
      conf: 'jsdoc.conf.json'
    },
    vendor: {
      src: 'vendor/js/*.js',
      dist: 'dist/vendor.min.js'
    }
  },
  webpack: {
    src: './src/js/controller',
    dis: '/dist/js/controller'
  },
  css: {
    src: './src/css',
    dist: './dist/css'
  },
  test: {
    src: './test'
  },
  eslint: {
    src: './src/js'
  }
}
