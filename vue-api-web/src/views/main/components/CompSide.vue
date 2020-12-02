<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 16:25)
  Version   :
  Usage     :
    - template
      <CompSide></CompSide>
    - props
    - event
    - method

-->

<template>
  <div class="c__side">
    <div v-for="item in apiList" :key="item.name" class="api-item">
      <div class="api-name" :class="{'selected': item.methodUUID === selectedMethodUUID}" :style="{paddingLeft:`${level*24 + 16}px`}" @click="handleClickApi(item)">{{ item.name }}</div>
      <div v-if="item.actionList && item.actionList[0]" class="api-children">
        <CompSide :list="item.actionList" :level="level + 1" @click="handleClickApi"></CompSide>
      </div>
    </div>
  </div>
</template>

<script>
import { CommonsUtil } from '@/libs/util';
import { xSet, xSubscribe, xUnSubscribe } from '@/libs/x-store';

export default {
  name    : 'CompSide',
  props   : {
    list : {
      type   : Array,
      default: null
    },
    // 层级
    level: {
      type   : Number,
      default: 0
    }
  },
  data() {
    return {
      randomId          : CommonsUtil.randomStrId(),
      isQuerying        : false,    // 是否正在查询
      isSubmitting      : false,     // 是否正在提交
      apiList           : [],
      selectedMethodUUID: '' //  当前选中的methodUUID
    };
  },
  computed: {},
  watch   : {},
  created() {
    this.apiList = this.list || [];
  },
  mounted() {
    xSubscribe(`compSide_${this.randomId}`, 'methodUUID', (v) => {
      this.selectedMethodUUID = v;
    });
  },
  beforeDestroy() {
    xUnSubscribe(`compSide_${this.randomId}`);
  },
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     * 点击api
     * @param info
     */
    handleClickApi(info) {
      if (!info.methodUUID) return;
      xSet('methodUUID', info.methodUUID);
      this.$emit('click', info);
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
.c__side {
  .api-name {
    cursor        : pointer;
    padding       : 8px 16px;
    border-radius : 8px;

    &:hover {
      font-weight : 800;
      filter      : brightness(90%);
    }

    &.selected {
      font-weight      : 800;
      color            : var(--c-bg);
      background-color : var(--c-warn-sub);
    }
  }
}
</style>
