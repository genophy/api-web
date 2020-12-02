<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 20:24)
  Version   :
  Usage     :
    - template
      <CompActionInfoReqList></CompActionInfoReqList>
    - props
    - event
    - method

-->

<template>
  <div class="c__action-info-req-list">
    <div v-for="(item,idx) in list" :key="idx" class="req-list">
      <CompActionInfoReqItem :param="item" :seq="idx +1"></CompActionInfoReqItem>
    </div>

  </div>


</template>

<script>
import CompActionInfoReqItem from '@/views/main/components/CompActionInfoReqItem';

export default {
  name      : 'CompActionInfoReqList',
  components: {CompActionInfoReqItem},
  props     : {
    // request params
    list: {
      type   : Array,
      default: null
    }
  },
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false     // 是否正在提交

    };
  },
  computed  : {},
  watch     : {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {},
  methods   : {
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
.c__action-info-req-list {
  position : relative;
  border   : 1px solid var(--c-border);

  .req-list {


    &__info {
      display  : flex;
      position : relative;
      padding  : 8px 32px;

      &.required:before {
        content          : '';
        display          : block;
        position         : absolute;
        top              : 30%;
        left             : 16px;
        height           : 40%;
        width            : 6px;
        background-image : linear-gradient(to right, var(--c-error), transparent);
      }

      .name {
        min-width   : 100px;
        font-weight : 800;
      }

      .label {
        min-width : 200px;
      }

      .desc {
        color     : var(--c-font-sub);
        min-width : 200px;
      }

      .type {
        min-width : 100px;

      }

      .value {
        min-width : 100px;
      }


    }

    &__children {
      padding : 16px 56px;
    }
  }
}
</style>

