/**
 * 引入 所有的 包 进行 一次性的 引入
 */
'use strict'

import Test from './test/index'
import Test1 from './test1/index'

const index = {
  install
}
function install (app){
  app.use(Test);
  app.use(Test1);
}

export default index;

