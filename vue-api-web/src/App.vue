<template>
  <div id="app" :theme="theme">
    <BasePageLoader></BasePageLoader>
    <router-view/>
  </div>
</template>

<script>
import BasePageLoader from '@/components-base/util/BasePageLoader';
import { Constants } from '@/libs/util';
import { xSubscribe, xUnSubscribe } from '@/libs/x-store';

export default {
  components: {BasePageLoader},
  data() {
    return {
      theme: '' // 主题名称
    };
  },
  created() {
    this.theme = localStorage.getItem(Constants.LOCAL_STORAGE.THEME) || 'default';
  },
  mounted() {
    xSubscribe('theme_1', 'theme', (v) => {
      this.theme = v;
    });
  },
  beforeDestroy() {
    xUnSubscribe('theme_1');
  }
};
</script>
<style lang="less">
@import "~element-ui/lib/theme-chalk/index.css";
@import "./assets/style/index";


body {
  overflow : auto;
}

#app {
  font-family             : Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing  : antialiased;
  -moz-osx-font-smoothing : grayscale;
  height                  : 100%;
  min-height              : 400px;
  min-width               : 1024px;
  color                   : var(--c-font);
  background-color        : var(--c-bg);
}
</style>
