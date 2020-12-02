<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 17:35)
  Version   :
  Usage     :
    - template
      <CompActionInfoReqItem></CompActionInfoReqItem>
    - props
    - event
    - method

-->

<template>
  <div class="c__action-info-req-item">

    <div class="req-item">
      <div class="req-item__info" :class="{required:param.required}">
        <div class="seq">{{ seq || 0 }}</div>
        <div class="name">{{ param.name || '-' }}</div>
        <div class="type">{{ param.dataType || '-' }}</div>
        <div class="value">{{ param.defaultValue || '-' }}</div>
        <div class="desc">{{ param.description || '-' }}</div>
      </div>
      <div v-if="param.list && param.list[0]" class="req-item__children">
        <CompActionInfoReqItem :list="param.list"></CompActionInfoReqItem>
      </div>

    </div>

  </div>


</template>

<script>

export default {
  name    : 'CompActionInfoReqItem',
  props   : {
    param: {
      type   : Object,
      default: null
    },
    seq  : {
      type   : Number,
      default: 0
    }
  },
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false     // 是否正在提交

    };
  },
  computed: {},
  watch   : {},
  created() {
  },
  mounted() {
  },
  beforeDestroy() {},
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
.c__action-info-req-item {
  position : relative;
  border   : 1px solid var(--c-border-thin);

  .req-item {


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

      .seq {
        width       : 40px;
        color       : var(--c-font-sub);
        font-weight : 800;
      }

      .name {
        min-width   : 160px;
        font-weight : 800;
      }

      .desc {
        color      : var(--c-font-sub);
        word-break : break-all;
      }

      .type {
        min-width : 200px;

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
