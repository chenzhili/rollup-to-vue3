// import resolve from '@rollup/plugin-node-resolve'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
import vuePlugin from 'rollup-plugin-vue'
// import css from 'rollup-plugin-css-only'
// import scss from 'rollup-plugin-scss'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnano from 'cssnano'
import cssnext from 'postcss-cssnext'
// import image from 'rollup-plugin-img'
import image from '@rollup/plugin-image'
import url from '@rollup/plugin-url'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars'
import { terser } from 'rollup-plugin-terser'
// iconfont 图标处理
import font from 'rollup-plugin-font'
const path = require('path')

// 处理node的内置模块,发布node的第三方{builtins, globals}
// import builtins from 'rollup-plugin-node-builtins';
// import globals from 'rollup-plugin-node-globals';

import { browser, main, module } from './package.json'

const isDev = process.env.NODE_ENV !== 'production'
console.log(isDev)

export default [
  // browser-friendly UMD build
  {
    input: 'src/test/index.js',
    output: {
      name: 'bundle',
      file: module,
      format: 'esm',
      assetFileNames:"icons/[name][extname]" // 对于静态资源的处理
    },
    external: ['vue', 'moment', 'element-plus'], // 这里 还 必须把 element-plus 不做 引入，不然 编译后会出现 bug （对于 vue中 export default的引入，但是vue3 都是 package 引入的方式）说明想用 element-plus 需要 在 主项目用此 框架
    plugins: [
      // 这个一定 要在开始位置
      vuePlugin({
        css: false,
      }),
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      nodeResolve({
        extensions: ['.js', '.vue', '.json'],
      }), // 这样 Rollup 能找到 `ms`
      // css相关修改
      postcss({
        plugins: [
          postcssPresetEnv(),
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false }),
          cssnano(),
        ],
        use: [['sass']],
        inject: false,
        // sourceMap: true,
        extensions: ['.css', '.scss'],
        extract: true, // 输出路径
      }),

      // scss(),
      // css({
      //   output: 'bundle.css'
      // }), // 这个 配合 css：false 来 解决 .vue 文件中的 style 中 .class 报错的问题

      json(),
      eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**'],
      }),
      babel({
        exclude: 'node_modules/**',
        // 使plugin-transform-runtime生效
        babelHelpers: 'runtime',
        extensions: ['.vue'/* ,'.js' // 不能引入 */] // 必须
      }),
      // @rollup/plugin-image
      // image({
      //   exclude: 'node_modules/**'
      // }),

      // rollup-plugin-img
      // image({
      //   hash: false,
      //   output: 'dist/images', // default the root
      //   extensions: /\.(png|jpg|jpeg|gif|svg)$/,
      //   limit: 8192, // default 8192(8k)
      //   exclude: 'node_modules/**'
      // }),

      dynamicImportVars(),
      // @rollup/plugin-url --- 替换所有的 文件 相关的 操作
      url({
        destDir: `./lib/assets`,
        exclude: ['node_modules/**', 'src/iconfont/**'],
        publicPath: './assets/',
        limit: 8192,
      }),
      // 图标处理--- 用于 对于图标 引用import 的 解析
      font({
        svg: './src/iconfont/iconfont.svg',
        unicode: {
          include: ['./src/iconfont/iconfont.woff'],
          prefix: 'icon-',
        },
        css: {
          include: ['./src/iconfont/iconfont.css'],
          prefix: 'icon-',
          common: 'iconfont',
        },
      }),
      terser(),
    ],
  },
]
