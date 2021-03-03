/* 基本的 配置文件 */
module.exports = {
  formatTypes: [
    { format: 'esm', min: false, suffix: '.js'},
    { format: 'esm', min: true, suffix: '.min.js'},
  ],
  // 不需要 打入包的 第三方文件
  external: ['vue', 'moment', 'element-plus'],
  distDir: '../lib', // 输出的 目录文件
  srcDir: '../src',
  assetFileNames: "icons/[name][extname]" // 对于静态资源的处理
}