<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-02 09:53)
  Version   :
  Usage     :
    - template
      <CompSetToken></CompSetToken>
    - props
    - event
    - method

-->

<template>
  <div class="c__set-token">
    <el-form :model="formField" label-width="100px" class="ly-pr-16">
      <el-form-item label="token">
        <el-input v-model.trim="formField.token" type="textarea" maxlength="4000" :autosize="{minRows:2,maxRows:6}" resize="none" show-word-limit clearable></el-input>
      </el-form-item>
    </el-form>

    <div class="ly-btn-group-inline gap-none ly-mt-32">
      <el-button class="ly-btn-group-inline__item btn-cancel" @click="handleCancel()">取消</el-button>
      <el-button type="primary" class="ly-btn-group-inline__item" @click="handleSubmit()">确定</el-button>
    </div>
  </div>
</template>

<script>
import { Constants, ModalUtil } from '@/libs/util';

export default {
  name    : 'CompSetToken',
  props   : {},
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false,   // 是否正在提交
      formField   : {
        token: ''
      }
    };
  },
  computed: {},
  watch   : {},
  created() {},
  mounted() {
    this.formField.token = localStorage.getItem(Constants.LOCAL_STORAGE.TOKEN);
  },
  beforeDestroy() {},
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    handleCancel() {
      ModalUtil.emitClose(this);
    },
    handleSubmit() {
      localStorage.setItem(Constants.LOCAL_STORAGE.TOKEN, this.formField.token);
      ModalUtil.emitClose(this, this.formField);
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
.c__set-token {
  width   : 400px;
  padding : 16px;
}
</style>
