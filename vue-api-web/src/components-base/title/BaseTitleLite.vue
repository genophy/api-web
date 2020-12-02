<!--
  FileDesc  :
  Author    : g_eno_phy
  Date      : 2020-05-09 14:00
  Version   :
  Usage     :
    - template
      <BaseTitleLite></BaseTitleLite>

    - props

    - event

    - method

-->

<template>
  <div class="b__title-lite">
    <div class="title">
      <slot></slot>
    </div>
    <div class="end-line"></div>
    <div class="stuff-wrapper">
      <slot name="stuff"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name    : 'BaseTitleLite',
  props   : {},
  data() {
    return {};
  },
  computed: {},
  watch   : {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ public ] ____________________________________________________ */

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

.b__title-lite {
  position    : relative;
  display     : flex;
  align-items : center;

  .title {
    flex-shrink : 0;
    display     : inline-block;
    position    : relative;
    font-size   : 16px;
    font-weight : 400;
    padding     : 4px 8px 4px 0;
    color       : #546e7a;
  }

  .end-line {
    flex-grow  : 1;
    border-top : 1px solid rgba(145, 191, 243, 0.24);

  }

  .stuff-wrapper {
    flex-shrink : 0;
  }
}
</style>
