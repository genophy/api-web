<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-02 09:35)
  Version   :
  Usage     :
    - template
      <CompSetProject></CompSetProject>
    - props
    - event
    - method

-->

<template>
  <div class="c__set-project">
    <el-form :model="formField" label-width="100px" class="ly-pr-16">
      <el-form-item label="项目名">
        <el-input v-model="formField.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="请求地址">
        <el-input v-model="formField.url" clearable></el-input>
      </el-form-item>
      <el-form-item label="前缀">
        <el-input v-model="formField.prefix" clearable></el-input>
      </el-form-item>
    </el-form>

    <div class="ly-btn-group-inline gap-none ly-mt-32">
      <el-button class="ly-btn-group-inline__item btn-cancel" @click="handleCancel()">取消</el-button>
      <el-button type="primary" class="ly-btn-group-inline__item" @click="handleSubmit()">确定</el-button>
    </div>

  </div>
</template>

<script>
import { LangUtil, ModalUtil } from '@/libs/util';

export default {
  name    : 'CompSetProject',
  props   : {
    info: {
      type: Object
    }
  },
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false,    // 是否正在提交
      formField   : {
        name  : '',
        url   : '',
        prefix: ''
      }
    };
  },
  computed: {},
  watch   : {},
  created() {},
  mounted() {
    this.formField = LangUtil.assignProperties(this.formField, this.info);
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
.c__set-project {
  width   : 400px;
  padding : 16px;
}
</style>
