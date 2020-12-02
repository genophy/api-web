<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy
  Date      : 2020-06-19 14:08
  Version   :
  Usage     :
    - template
      <BaseFabs></BaseFabs>
    - props
    - event
    - method

-->

<template>
  <div class="b__fabs">
    <!-- // 列表 [{iconClass,name,color}] -->
    <div v-for="(item,index) in list" :key="index" class="b__fabs__item" @click="handleItemClick(index)">
      <div class="b__fabs__item__container btn-restart" :style="{color: item.color || '#333'}">
        <span class="b__fabs__item__icon" :class="item.iconClass"></span>
        <div class="b__fabs__item__hover-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name    : 'BaseFabs',
  props   : {
    // 列表 [{iconClass,name,color}]
    list: {
      type   : Array,
      default: () => { return []; }
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch   : {},
  created() {},
  mounted() {
  },
  beforeDestroy() {},
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     * 元素点击
     * @param index
     */
    handleItemClick(index) {
      this.$emit('on-click', index);
    }
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

.b__fabs {
  display     : flex;
  flex-flow   : column;
  align-items : flex-end;
  position    : absolute;
  right       : 8px;
  top         : 60px;
  user-select : none;

  &__item {
    display    : flex;
    overflow-x : hidden;
    cursor     : pointer;

    &:active {
      opacity : 0.8;
    }

    &:hover > &__container {
      transform : translateX(0);
    }

    &__container {
      //width       : 100%;
      display     : flex;
      align-items : center;
      padding     : 8px 0;
      transform   : translateX(calc(100% - 28px));
      transition  : all 300ms linear;
    }

    &__icon {
      flex-shrink : 0;
      display     : block;
      width       : 28px;
      height      : 28px;
      line-height : 28px;
      font-size   : 24px;
      align-items : center;
    }

    &__hover-text {
      flex-shrink : 0;
      overflow    : hidden;
      margin-left : 4px;
      font-size   : 16px;
      //width       : 0;
      transition  : all 300ms linear;
      text-align  : left;
    }

    &:hover {
      .ly-fab-group__item__hover-text {
        //width : 120px;
      }
    }
  }
}

</style>
