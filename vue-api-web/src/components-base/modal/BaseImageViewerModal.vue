<!--
    FileDesc  :
    Author    :  g_eno_phy
    Date      :  2020-02-21 01:12
    Version   :
    Usage     :
        - template
            <BaseImageViewerModal></BaseImageViewerModal>

        - props
            :images        [{name,url}]        图片列表
            :defaultImage  {String}            默认显示的图片
        - event

        - method
-->

<template>
  <div class="b__image-viewer-modal">
    <div class="image-viewer" :class="{'large-window':isLargeWindow}">
      <div class="title-wrapper">
        <div class="title">{{ title || '图片' }}</div>
        <div class="op-group">
          <span v-if="isLargeWindow" class="op-item view-design-btn btn-contract" @click="isLargeWindow = !isLargeWindow"></span>
          <span v-else class="op-item view-design-btn btn-expand" @click="isLargeWindow = !isLargeWindow">  </span>
          <span class="op-item view-design-btn btn-close" @click="handleClose">  </span>
        </div>
      </div>
      <div class="viewer-wrapper" @mousewheel="handleRollScale">
        <template v-for="(image,index) in images">
          <img v-show="currentImageIdx === index" :key="index" class="image" :src="image.url" :style="imageStyle">
        </template>

      </div>
      <div v-if="images && images[0]" class="control-wrapper">
        <div class="control" @mousewheel="handleRollImage">
          <span class="view-design-btn btn-previous" :class="{disabled: currentImageIdx <= 0}" @click="handlePrevious"></span>
          <span class="view-design-btn btn-next" :class="{disabled: currentImageIdx >= images.length - 1}" @click="handleNext"></span>
        </div>
        <div class="control" @mousewheel="handleRollScale">
          <span class="view-design-btn btn-zoom-out" :class="{disabled: scalePerNum <= 20}" @click="handleZoom('out')"></span>
          <span class="view-design-btn btn-zoom-in" :class="{disabled: scalePerNum >= 200}" @click="handleZoom('in')"></span>
          <span class="view-design-btn custom-font btn-zoom-reset" @click="handleZoom('reset')"></span>
        </div>
        <div class="control" @mousewheel="handleRollRotate">
          <span class="view-design-btn btn-rotate" @click="handleRotate()"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ModalUtil } from '@/libs/util';

export default {
  name    : 'BaseImageViewerModal',
  props   : {
    // 标题
    title       : {
      type   : String,
      default: ''
    },
    // 图片列表 [{name,url}]
    images      : {
      type    : Array,
      default : null,
      required: true
    },
    // 默认是最先显示的是哪个图片的url
    defaultImage: {
      type   : String,
      default: ''
    }
  },
  data() {
    return {
      currentImageIdx: 0, // 当前图片下标
      isLargeWindow  : false, // 是否已经最大化窗口
      scalePerNum    : 100, // 缩放比例
      rotateDegNum   : 0 // 旋转角度
    };
  },
  computed: {
    imageStyle() {
      return {transform: `scale(${this.scalePerNum / 100}) rotate(${this.rotateDegNum}deg)`};
    }
  },
  created() {
  },
  mounted() {
    // 找出当前默认打开的是哪个图片
    if (this.defaultImage) {
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i].url === this.defaultImage) {
          this.currentImageIdx = i;
          break;
        }
      }
    }
  },
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */
    /**
     * 关闭对话框
     */
    handleClose() {
      ModalUtil.emitClose(this, false);
    },
    /**
     * 上一张图片
     */
    handlePrevious() {
      if (this.currentImageIdx > 0) {
        this.scalePerNum  = 100;
        this.rotateDegNum = 0;
        this.currentImageIdx--;
      }
    },
    /**
     * 下一张图片
     */
    handleNext() {
      if (this.currentImageIdx < this.images.length - 1) {
        this.scalePerNum  = 100;
        this.rotateDegNum = 0;
        this.currentImageIdx++;
      }
    },

    /**
     * 缩放
     * @param type
     */
    handleZoom(type) {
      switch (type) {
        case 'in':
          if (this.scalePerNum < 200) {
            this.scalePerNum = this.scalePerNum + 20;
          }
          break;
        case 'out':
          if (this.scalePerNum > 20) {
            this.scalePerNum = this.scalePerNum - 20;
          }

          break;
        case 'reset':
          this.scalePerNum = 100;
          break;
      }
    },

    /**
     * 旋转90度
     */
    handleRotate(type = 'right') {
      switch (type) {
        case 'left':
          this.rotateDegNum = this.rotateDegNum - 90;
          break;
        case 'right':
          this.rotateDegNum = this.rotateDegNum + 90;
          break;
        case 'reset':
          this.rotateDegNum = 0;
          break;
      }
    },

    /**
     * 鼠标滚动翻页
     */
    handleRollImage(event) {
      if (event.wheelDelta < 0) {
        this.handlePrevious();
      } else if (event.wheelDelta > 0) {
        this.handleNext();
      }
    },
    /**
     * 鼠标滚轮缩放
     */
    handleRollScale(event) {
      if (event.wheelDelta < 0) {
        this.handleZoom('in');
      } else if (event.wheelDelta > 0) {
        this.handleZoom('out');
      } else {
        this.handleZoom('reset');
      }
    },
    /**
     * 鼠标滚轮旋转
     * @param event
     */
    handleRollRotate(event) {
      if (event.wheelDelta < 0) {
        this.handleRotate('left');
      } else if (event.wheelDelta > 0) {
        this.handleRotate('right');
      } else {
        this.handleZoom('reset');
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

@title-height   : 32px;

@control-height : 24px;
.image-viewer {
  display          : flex;
  flex-flow        : column nowrap;
  width            : 640px;
  height           : 480px;
  font-size        : 14px;
  background-color : #263238;

  user-select      : none;
  overflow-y       : hidden;

  &.large-window {
    width  : calc(95vw - 40px);
    height : calc(95vh - 40px);
  }

  .title-wrapper {
    display          : flex;
    flex-flow        : row nowrap;
    justify-content  : space-between;
    align-items      : center;
    color            : @color-c-001;
    height           : @title-height;
    background-color : fade(@color-b-007, 24);

    .title {
      padding : 0 16px;
    }

  }

  .viewer-wrapper {
    position        : relative;
    flex-grow       : 1;
    overflow        : hidden;
    display         : flex;
    justify-content : center;

    img {
      height     : 100%;
      object-fit : contain;
    }
  }

  .control-wrapper {
    display          : flex;
    flex-flow        : row nowrap;
    justify-content  : center;
    align-items      : center;

    height           : @control-height;

    color            : @color-b-008;
    background-color : fade(@color-b-007, 24);

    .control {
      display         : flex;
      flex-flow       : row nowrap;
      justify-content : center;
      align-items     : center;

      &:not(:last-child) {
        margin-right : 24px;
      }
    }

  }

}

.view-design-btn {
  display   : inline-block;
  font-size : 16px;
  cursor    : pointer;
  padding   : 0 8px;

  &:not(.custom-font) {
    font-family : "ixfont"; /* iview 字体 */
  }

  &:not(.disabled) {
    color : fade(@color-b-008, 40);

    &:hover, &:focus {
      color : fade(@color-b-008, 100);
    }
  }

  &.disabled {
    color : fade(@color-b-008, 24);
  }
}

.btn-contract:before {
  content : "\e680";
}

.btn-expand:before {
  content : "\e674";
}

.btn-close:before {
  content : "\e615";
}

.btn-previous {
  transform : rotate(180deg);

  &:before {
    content : "\e63c";
  }
}

.btn-next:before {
  content : "\e63c";
}

.btn-zoom-in:before {
  content : "\e672";
}

.btn-zoom-out:before {
  content : "\e6fa";
}

.btn-zoom-reset {
  font-size   : 12px;
  font-weight : bolder;

  &:before {
    content : '1:1';
  }
}

.btn-rotate {

  &:before {
    content : "\e724";

  }
}
</style>
