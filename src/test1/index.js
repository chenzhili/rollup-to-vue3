import Test1 from './src/com.vue'
Test1.install = (app) => {
  app.component(Test1.name, Test1);
  console.log(app);
}

export default Test1