<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-08-04 18:24)
  Version   :
  Usage     :
    - template
      <BaseTableImage></BaseTableImage>
    - props
    - event
    - method

-->

<template>
  <div class="b__table-image">
    <img v-if="isImagePrepared" :src="imgUrl" class="img" :class="{'preview-able':previewAble}" alt="图片" @click="handlePreview">
    <div v-else-if="imgUrl" class="icon-default ixfont ix-img"></div>
    <div v-else>{{ defaultValue }}</div>
  </div>
</template>

<script>
import BaseImageViewerModal from '@/components-base/modal/BaseImageViewerModal';
import { ModalUtil } from '@/libs/util';

export default {
  name    : 'BaseTableImage',
  props   : {

    // 标题
    title       : {
      type   : String,
      default: '图片'
    },
    // 图片
    imgUrl      : {
      type   : String,
      default: ''
    },
    // 图片列表
    imgUrlList  : {
      type   : Array,
      default: () => {
        return [];
      }
    },
    // 是否可以查看
    previewAble : {
      type   : Boolean,
      default: true
    },
    // 默认值
    defaultValue: {
      type   : String,
      default: '-'
    }
  },
  data() {
    return {
      // 是否可以查看图片
      isImagePrepared: false
    };
  },
  computed: {},
  watch   : {
    imgUrl: {
      handler(v) {
        const img  = new Image();
        img.src    = v || '';
        // 图片成功加载后，改变src值
        img.onload = () => {
          this.isImagePrepared = true;
        };
      },
      immediate: true
    }
  },
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

    /**
     * 预览
     */
    handlePreview() {
      if (this.previewAble) {
        const modal    = new ModalUtil();
        let imgUrlList = [{name: '', url: this.imgUrl}];
        if (this.imgUrlList?.length > 0) {
          imgUrlList = this.imgUrlList;
        }
        modal.openModal(BaseImageViewerModal, {title: this.title, images: imgUrlList, defaultImage: this.imgUrl}).then(() => {
          modal.closeModal();
        });
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

.b__table-image {
  height          : 40px;
  width           : 100%;
  text-align      : center;
  display         : flex;
  flex-flow       : row nowrap;
  justify-content : center;
  align-items     : center;
  position        : relative;

  .img {
    width      : 100%;
    height     : 100%;
    object-fit : contain;

    &.preview-able {
      cursor : pointer;
    }
  }

  .icon-default {
    font-size : 24px;
    color     : #999;
  }
}

.btn-upload {
  position    : absolute;
  right       : 0;
  user-select : none;
  overflow    : hidden;

  &.disabled {
    background-color : #999;
    cursor           : not-allowed;

  }

  &:not(.disabled) {
    color  : #409eff;
    cursor : pointer;

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
