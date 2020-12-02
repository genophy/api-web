<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 17:35)
  Version   :
  Usage     :
    - template
      <CompActionInfoRespItem></CompActionInfoRespItem>
    - props
    - event
    - method

-->

<template>
  <div class="c__action-info-resp-item">

    <div class="resp-item">
      <div class="resp-item__info" :class="{required:compParam.required}">
        <div class="seq">{{ seq || 0 }}</div>
        <div class="name">{{ compParam.name || '-' }}</div>
        <div class="type">{{ compParam.dataType || '-' }}</div>
        <div class="value">{{ compParam.defaultValue || '-' }}</div>
        <div class="desc">{{ compParam.description || '-' }}</div>
      </div>
      <div v-if="compParam.list && compParam.list[0]" class="resp-item__children">
        <CompActionInfoRespList :list="compParam.list"></CompActionInfoRespList>
      </div>

    </div>

  </div>


</template>

<script>

import CompActionInfoRespList from '@/views/main/components/CompActionInfoRespList';

export default {
  name      : 'CompActionInfoRespItem',
  components: {CompActionInfoRespList},
  props     : {
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
      isSubmitting: false    // 是否正在提交
    };
  },
  computed  : {
    compParam() {
      return this.param || {};
    }
  },
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
.c__action-info-resp-item {
  position : relative;
  border   : 1px solid var(--c-border-thin);

  .resp-item {


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
        color     : var(--c-font-sub);
        min-width : 200px;
      }

      .type {
        min-width : 200px;

      }

      .value {
        min-width : 100px;
      }


    }

    &__children {
      padding : 16px 2px 16px 56px;
    }
  }
}
</style>
