import Test from './src/com.vue'
import { ElButton } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/button.scss'
console.log('ElButton', ElButton);
Test.install = (app) => {
  app.component(ElButton.name, ElButton)
  app.component(Test.name, Test);
}

export default Test