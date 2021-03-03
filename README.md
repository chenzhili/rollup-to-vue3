# rollup 打包流程 https://zhuanlan.zhihu.com/p/95119407

# 安装的 插件

# rollup 相关
## @rollup/plugin-babel  --- 让我们可以使用es6新特性来编写代码
就是 对 es 代码 进行 兼容标准，尝鲜
## @rollup/plugin-commonjs ---将CommonJS模块转换为 ES2015 供 Rollup 处理

## @rollup/plugin-eslint --- js代码检测

## @rollup/plugin-node-resolve  ---帮助 Rollup 查找外部模块

## @rollup/plugin-replace ---替换实际代码中的 相应关键字

## @rollup/plugin-json --- 将 json 文件 转换成 模块的方式

# 包含对应 babel 相关插件，eslint 相关插件

## babel
@babel/core 核心
@babel/plugin-transform-runtime 多个引用合并
@babel/preset-env es标准的 兼容
包含对应 vue 或者 react 相关语言的 兼容插件，@babel/preset-react
...


# 20210202
## 安装 vue 相关的 rollup
rollup-plugin-vue 注意 现在 有 vue@next 版本，所以 主要
yarn add -D rollup-plugin-vue
## 如何在 rollup 中 混入 css 相关东西；由于 插件开发还包含 图片(svg，iconfont等) 和 文件相关；

### yarn add postcss rollup-plugin-postcss -D  安装 有关css 的 补充 兼容
postcss-preset-env --- 尝鲜 新语法，进行浏览器兼容
postcss-simple-vars --- 给css 加入像 scss 的变量语法
postcss-nested --- 让css 能够像 scss 进行 嵌套写 styles

### 由于 加入 vue 让 eslint 扩展满足 条件要加入 eslint-plugin-vue
rollup-plugin-css-only --- 用于 提取 css

### css的编译器 scss 需要下载 yarn add node-sass -D

## 由于封装的ui库 是 基于 第三方库的，这里要混入 第三方库的 文件；

## 如何 在开发插件后，进行测试；肯定会用到 html，需要 虚拟服务器

## 周边东西，取别名，不混入的 第三方插件

# 20210204

## 加入 rimraf ，用于删除 生成的文件

# 20200207 

## 放入 webpack 测试 组件的 测试，可能选择 vue-cli构建
用 @vue/cli-service 进行 测试，不需要集成 东西

## 解决 css 未生效的问题，具体 感觉是 识别不了 scss
***** 上面的 方式，其实 都不需要，用 postcss 进行 配置 识别 less、scss，css；现在的问题是如何 在 组件 中 混入 样式 ==========> 这个需要人为手动 引入 *******
rollup-plugin-scss --- 这个 不需要
node-sass --- 这个是 必须的

postcss 插件相关：
cssnano --- 优化压缩 css
postcss-cssnext --- 兼容 新的 css 写法

## js 压缩优化 ---- rollup-plugin-terser


## 20210210 完善 rollup 相关插件， 图片处理， icon，svg，file
1、处理 图片相关
@rollup/plugin-image --- rollup的插件集里，但是 会把 图片 转换成 base64，不是通用的 （Images are encoded using base64, which means they will be 33% larger than the size on disk）

rollup-plugin-img --- 这个太老了，导致 连 对应的 依赖 路径 都出问题了；

图片 暂时 选用 @rollup/plugin-image，把所有的 图片 都会 变成 base64

**********************
终极方案，应该用 @rollup/plugin-url
出现的问题：目前打包生成了对应的文件的时候，在 服务中不加载对应的东西，感觉像是 vue-cli-service 这层有问题
发现问题：实际在 devServer 中 实际的 静态资源没在服务启动资源内(在 rollup 的 url插件在处理 这种文件时，只是生成了 地址，没有引用资源，用webpack启动的时候不是相对的依赖导致的)
20210218解决方式：
dev模式下：contentBase强行把内容加载进去（复制到对应的目录中），例子：contentBase: path.join(__dirname, './lib'),
pro模式下：用 copy-webpack-plugin 将 静态资源复制到 生成目录，这里版本太高有问题，目前用的‘5.1.2’
**********************

2、打包 iconfont ----- https://zhuanlan.zhihu.com/p/119210564

## 优化 rollup 相关的 配置，等待明天做 --- 方案： https://github.com/anncwb/lib-starter.git


# 2021018
1、添加 plugin-dynamic-import-vars 可以动态引入 包，import(模块)
2、引入 iconfont 的 插件 rollup-plugin-font ，用于 对于图标 引用import 的 解析

遗留：
1、集成 ui插件 进行 二次组装
2、对于rollup 的 统一 封装，生成 esm，umd(包含了cjs)，生成 js 以及 min.js

# 20210219
1、引入 element-ui，目前 element-plus 还是 beta 版本，先不升级
yarn add element-ui 
按需引入需要
yarn add -D babel-plugin-component

问题：element-ui 搭配 vue3 不行，不存在对应的 引入方式，舍弃 element-ui，用 element-plus;
出现的bug：目前用 rollup的 rollup-plugin-vue 去处理 element-plus 的时候 会 解析出 引入import Vue from 'vue' 这种东西，在vue3中不存在；还是用vue2 和 element-ui做这块

## 集成 element-ui 的 疑问： 由于 基于 第三方框架 进行 二次 开发，涉猎到 需要 混入第三方 对应的 代码，这可能 导致 如果 加载ui组件 的 三方库 和 此库ui库一样，有重复代码
未解决的问题：
1、就是 在 css 中 混入有 element-ui的字体库，没有复制出来；
2、将 rollup 进行 完全的创建

# 20210221 先尝试哈 vue3、element-plus 这块 看能 成功不，确实不行 就降级到 vue2
1、删除相关
yarn remove vue vue-template-compiler --- 跟 vue 相关
yarn remove element-ui babel-plugin-component --- 跟 element相关以及按需加载
yarn remove rollup-plugin-vue --- vue2的版本的 解析 版本 5.0.1

2、安装相关
vue@next 
vue-template-compiler不知道需要不
element-plus babel-plugin-import
rollup-plugin-vue@next

测试external
yarn add moment

**************************
用vue3 能实现 ，但是 不能在  .vue 文件中 按需加载，在 install 方法中 注入，并且以 插件的方式加载（app.use(插件)）
**************************

未实现：将 rollup 进行 工程化

# 20210301 开始对于 rollup 进行 工程化， 完成

# 20210302 完善对于 项目 eslint 的支持，以及 代码合并的 eslint检查
# 20210303 继续完善对应的规则，加入对于 style 的 lint 检测

## 完善 eslint 需要的 插件
// eslint
// @babel/eslint-parser --- 在 babel 配置的，可以运用新的特性
<!-- 让 vscode 识别 vue 文件等 相关 内容，setting.json 中 添加：
  "eslint.validate": ["vue"]
 -->
需要在 .eslintrc 中 配置 @babel/eslint-parser
yarn add -D eslint @babel/eslint-parser

## 添加 有关于 git 的 hooks(钩子)，来做 代码规范的校验
添加 hosky:对于这个 版本 用 husky@4 没有 相关的 证书问题
添加 lint-staged：用于实现每次提交只检查本次提交所修改的文件

### 添加 对应的 hooks 到 package.json 中(可以单独配置)
```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```

### 添加 lint-staged 对应 不同 文件修改，需要执行的 检测工具(可以单独配置)
```json
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint"
    ],
    "src/**/*.{html,vue,css,less,scss,styl}": [
      "stylelint"
    ]
  }

```

## 添加 git commit 的 提交 描述的 统一性，就是约定行 提交规范；

### 添加 Commitlint
yarn add -D @commitlint/config-conventional @commitlint/cli

### 配置 commitlint 的 文件 commitlint.config.js

## 添加 对于 style  样式 的 检测
### 添加 基本需要的 style 相关的 插件
stylelint stylelint-config-standard ---- 基本的  style需要
stylelint-order --- plugin if you want to order things like properties
stylelint-config-standard --- extends recommended one by turning on 60 stylistic rules

yarn add -D stylelint stylelint-config-standard stylelint-order

### 需要创建 两个文件，custom 配置 以及 需要 忽略的 文件
.stylelintignore 文件 --- 忽略文件
stylelint.config.js 文件 --- 动态配置文件


