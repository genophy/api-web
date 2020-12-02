<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 18:09)
  Version   :
  Usage     :
    - template
      <CompControllerItem></CompControllerItem>
    - props
    - event
    - method

-->

<template>
  <div class="c__controller-item">
    <template v-if="controller">
      <div class="controller-detail">
        <div class="detail-item">
          <div class="value">{{ controller.name }}</div>
        </div>
        <div class="detail-item">
          <div class="value">{{ controllerClassName }}</div>
        </div>

        <div class="btn-cp ly-hover" @click="handleCopy(controllerClassName)">
          <i class="ixfont ix-cpy"></i>
        </div>
      </div>

      <div v-if="controller.actionList && controller.actionList[0]" class="api-list">
        <template v-for="action in controller.actionList">
          <div :key="action.id" class="api-item">
            <CompActionInfo :action="action"></CompActionInfo>
          </div>
        </template>
      </div>
    </template>

  </div>
</template>

<script>
import { ModalUtil } from '@/libs/util';
import CompActionInfo from '@/views/main/components/CompActionInfo';

export default {
  name      : 'CompControllerItem',
  components: {CompActionInfo},
  props     : {
    controller: {
      type: Object
    }
  },
  data() {
    return {
      isQuerying    : false,    // 是否正在查询
      isSubmitting  : false,     // 是否正在提交
      compController: null
    };
  },
  computed  : {
    controllerClassName() {
      if (this.controller) {
        return this.controller.classList.replace(/[^.]+\./g, '');
      }
      return '';
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

    handleCopy(text) {
      this.$clipboard(text);
      ModalUtil.openMsgSuccess('复制成功');
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

.controller-detail {
  display          : flex;
  position         : sticky;
  top              : 0;
  z-index          : 999;
  height           : 54px;
  background-image : linear-gradient(to right, var(--c-blue), transparent);
  background-color : var(--c-bg);
  border-bottom    : 1px solid var(--c-bg);

  .detail-item {
    display      : flex;
    margin-right : 32px;
    padding      : 16px;

    .label {
      margin-right : 16px;
      color        : var(--c-white);
    }

    .value {
      font-weight : 800;
      color       : var(--c-white);
    }
  }

  .btn-cp {
    position : absolute;
    top      : 16px;
    right    : 16px;
    z-index  : 1;
  }
}

.api-list {
  padding : 16px;

  .api-item {
    padding-bottom : 32px;
  }
}
</style>
