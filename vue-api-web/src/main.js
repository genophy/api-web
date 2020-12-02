import App from '@/App.vue';
import directives from '@/libs/directive';
import filters from '@/libs/filter';
import router from '@/libs/router';
import { Constants, LangUtil } from '@/libs/util';
import * as xStore from '@/libs/x-store';
import axios from 'axios';
import elementResizeDetectorMaker from 'element-resize-detector';
import ElementUI from 'element-ui';
import lodash from 'lodash';
import Vue from 'vue';
import Clipboard from 'v-clipboard';

Vue.config.productionTip = false;
// directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

// filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

window.$elementResizer = elementResizeDetectorMaker();  // 元素大小改变监听实例

window.$axios  = Vue.prototype.$axios = axios;
window.$lodash = Vue.prototype.$lodash = lodash;
window.$xStore = Vue.prototype.$xStore = xStore;
window.$router = router;
Vue.use(ElementUI, {size: 'small', zIndex: 1000});
Vue.use(Clipboard);

// 项目路由列表
const routePathTree    = LangUtil.recursionSetProperties(router.options.routes, (item, parent) => {
  if (parent?.fullPath || parent?.path) {
    item.parentNames = (parent.parentNames || []).concat(parent.name);
    item.fullPath    = [(parent.fullPath || parent.path || ''), item.path].filter(v => v).join('/');
  } else {
    item.fullPath = item.path;
  }
  return item;
}, 'children');
const routeFullPathSeq = LangUtil.flattenWithChildrenKey(window.$lodash.cloneDeep(routePathTree), 'children').filter(item => item.fullPath && !~item.fullPath.indexOf('*')).map(item => item.fullPath);

localStorage.setItem(Constants.LOCAL_STORAGE.ROUTE_LIST, JSON.stringify(routePathTree));
localStorage.setItem(Constants.LOCAL_STORAGE.ROUTE_LIST_SEQ, JSON.stringify(routeFullPathSeq));

window.$vue = new Vue({
  router,
  store : xStore.xInstance,
  render: h => h(App)
}).$mount('#app');
