<template>
  <div class="test">
    <div class="d-test">sdfsdfsfsdf {{test}} {{testTime}}</div>
    <img
      :src="testImg"
      alt="加载失败"
    />
    <!-- <Button>tets</Button> -->
    <el-button>tets</el-button>
    <i
      class="iconfont"
      :class="iconWuliubaifang"
    >{{iconWuliubaifang}}</i>
  </div>
</template>
<script>
import { ref, reactive, toRef, toRefs, computed } from "vue";
import testImg from "./test.jpg";
import { iconWuliubaifang } from "../../iconfont/iconfont.css";
import moment from "moment";
// import { ElButton } from 'element-plus';
// import { Button, Select } from 'element-ui';
export default {
  name: "Test",
  components: {
    // Button
    // ElButton
  },
  setup() {
    const testImg1 = testImg;
    const iconWuliubaifang1 = iconWuliubaifang;
    const test = ref("hello world");
    const testTime = computed(() => moment());
    console.log(test.value);
    return {
      testImg: testImg1,
      iconWuliubaifang: iconWuliubaifang1,
      test: test.value,
      testTime,
    };
  },
};
</script>
<style scoped lang="scss">
.test {
  .d-test {
    background: blue;
    color: #f00;
  }
}
</style>