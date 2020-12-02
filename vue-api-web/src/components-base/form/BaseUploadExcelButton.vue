<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-07-09 15:35)
  Version   :
  Usage     :
    - template
      <BaseUploadExcelButton></BaseUploadExcelButton>
    - props
      :v-model
      label
      url
      fileName
      data
    - event
    - method

-->

<template>
  <div class="b__upload-excel-button">
    <div class="btn-upload" :class="{disabled:isSubmitting}">
      <div class="btn-upload__text">{{ isSubmitting ? '上传中' : label }}</div>
      <input v-if="!isSubmitting" ref="fileInput" class="btn-upload__input" type="file" accept=".xls,.xlsx" @change="handleFileChange"></input>
    </div>
  </div>
</template>

<script>
import { HttpClientUtil, ModalUtil } from '@/libs/util';

export default {
  name    : 'BaseUploadExcelButton',
  props   : {
    // 标签
    label   : {
      type   : String,
      default: '请选择文件上传'
    },
    // 上传的url
    url     : {
      type   : String,
      default: ''
    },
    // 上传的文件名
    fileName: {
      type   : String,
      default: 'file'
    },
    // 表单数据
    data    : {
      type   : Object,
      default: null
    }
  },
  data() {
    return {
      // 是否正在请求数据
      isSubmitting: false
    };
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
    /**
     * 文件改变
     */
    handleFileChange(e) {
      const file = (e.currentTarget.files || [])[0];
      if (file) {
        if (this.url && this.fileName) {
          // 若设置了url表示可以直接上传
          this.isSubmitting     = true;
          const params          = Object.assign({}, this.data);
          params[this.fileName] = file;
          const load            = ModalUtil.openLoading('上传中');
          HttpClientUtil.postFormData(this.url, params).then(resData => {
            ModalUtil.openMsgSuccess(resData.message || '上传成功');
            this.$emit('complete', true);
          }).catch(err => {
            ModalUtil.toastWarn(err, '上传失败');
            this.$emit('complete', false);
          }).finally(() => {
            load.close();
            this.isSubmitting = false;
          });
        } else {
          // 若未设置url。则直接将file $emit:input
          this.$emit('input', file);
        }
      }
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
@import "../../assets/style/variables";

.btn-upload {
  position      : relative;
  width         : 80px;
  height        : 30px;
  border-radius : 4px;
  user-select   : none;
  overflow      : hidden;

  &.disabled {
    background-color : @color-b-007;

    .btn-upload__text, .btn-upload__input {
      cursor : not-allowed;
    }
  }

  &:not(.disabled) {
    background-color : #409eff;

    .btn-upload__text, .btn-upload__input {
      cursor : pointer;
    }

    &:hover {
      opacity : 0.8;
    }
  }

  &__text {
    display         : flex;
    justify-content : center;
    align-items     : center;
    position        : absolute;
    z-index         : 1;
    left            : 0;
    top             : 0;
    width           : 100%;
    height          : 100%;
    color           : #fff;
    pointer-events  : none;
  }

  &__input {
    position  : absolute;
    z-index   : 2;
    left      : 0;
    top       : 0;
    width     : 100%;
    height    : 100%;
    font-size : 0;
    opacity   : 0;

  }
}

</style>
