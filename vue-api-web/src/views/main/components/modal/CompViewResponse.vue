<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-02 18:09)
  Version   :
  Usage     :
    - template
      <CompViewResponse></CompViewResponse>
    - props
    - event
    - method

-->

<template>
  <div class="c__view-response">
    <div v-if="responseStr" class="btn-copy">
      <el-tooltip content="复制" effect="dark">
        <i class="ixfont ix-cpy ly-hover" @click="handleCopy(responseStr)"></i>
      </el-tooltip>
    </div>
    <div class="response-text">
      <p v-html="responseHTML"></p>
    </div>
  </div>
</template>

<script>
import { ModalUtil } from '@/libs/util';

export default {
  name    : 'CompViewResponse',
  props   : {
    text: {
      type: String
    }
  },
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false,    // 是否正在提交
      responseStr : '',
      responseHTML: ''
    };
  },
  computed: {},
  watch   : {
    text: {
      handler(v) {
        try {
          this.responseStr  = JSON.stringify(JSON.parse(this.text || '{}'), null, '  ');
          this.responseHTML = this.responseStr.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');

        } catch (err) {
          this.responseStr  = '';
          this.responseHTML = err.message || 'JSON解析错误';
        }
      },
      immediate: true
    }
  },
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
     * 复制
     * @param text
     */
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
.c__view-response {
  position         : relative;
  padding          : 16px;
  color            : var(--c-dark);
  background-color : var(--c-success-bg);
  box-shadow       : var(--shadow);

  .btn-copy {
    position : absolute;
    z-index  : 1;
    top      : 16px;
    right    : 16px;
  }

  .response-text {
    max-height : 400px;
    font-size  : 12px;
    overflow   : auto;
  }
}
</style>
