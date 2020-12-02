<!--
  FileDesc  : controller
  webUrl    :
  Author    : g_eno_phy (2020-12-01 18:08)
  Version   :
  Usage     :
    - template
      <CompControllerList></CompControllerList>
    - props
    - event
    - method

-->

<template>
  <div ref="controllerListRef" class="c__controller-list" @scroll="handleScrollEnd">
    <template v-for="item in apiList">
      <CompControllerItem :key="item.id" :controller="item"></CompControllerItem>
    </template>
  </div>
</template>

<script>
import { CommonsUtil } from '@/libs/util';
import { xSet, xSubscribe, xUnSubscribe } from '@/libs/x-store';
import CompControllerItem from '@/views/main/components/CompControllerItem';

export default {
  name      : 'CompControllerList',
  components: {CompControllerItem},
  props     : {
    list: {
      type   : Array,
      default: null
    }
  },
  data() {
    return {
      randomId    : CommonsUtil.randomStrId(),
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false,    // 是否正在提交
      apiList     : []
    };
  },
  computed  : {},
  watch     : {},
  created() {
    this.apiList = this.list || [];
  },
  mounted() {
    xSubscribe(`compControllerList_${this.randomId}`, 'methodUUID', (v) => {

    });
  },
  beforeDestroy() {
    xUnSubscribe(`compControllerList_${this.randomId}`);
  },
  methods   : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     * 滚动结束
     */
    handleScrollEnd(e) {
      CommonsUtil.debounce(`controllerList_${this.randomId}`, () => {
        const anchorList = this.$el.querySelectorAll('[anchor]');
        const scrollTop  = this.$refs.controllerListRef.scrollTop;

        const parentOffsetTop = this.$el.parentNode.offsetTop;

        for (let i = 0; i < anchorList.length; i++) {
          const anchor = anchorList[i];
          const disx1  = Math.max(anchor.offsetTop - parentOffsetTop - 70, 0) - scrollTop;
          const disx2  = Math.max(anchor.offsetTop + anchor.offsetHeight - parentOffsetTop - 70, 0) - scrollTop;
          if (disx1 >= 0 || disx2 > 0) {
            const anchorValue = anchor.getAttribute('anchor');
            xSet('methodUUID', anchorValue);
            break;
          }

        }
      }, 300);

    },
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ public ] ____________________________________________________ */

    /**
     * 开始滑动
     * @param num
     */
    scrollTop(num) {
      const that                             = this;
      that.$refs.controllerListRef.scrollTop = num;
    }
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ private: *,query,fetch,action,init ] ________________________ */

  }
};
</script>
<style scoped lang="less">
/*
    01.显示与浮动 (display,float)
    02.定位(position,left,z-index)
    03.尺寸(width,height)
    04.边框及相关属性（margin,padding,border,outline）
    05.字体样式(font)
    06.背景（background）
    07.其它样式(opacity,cursors,transform,...)
*/
.c__controller-list {
  height     : 100%;
  overflow-y : auto;

}
</style>
