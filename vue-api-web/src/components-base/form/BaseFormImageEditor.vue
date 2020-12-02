<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-08-04 18:24)
  Version   :
  Usage     :
    - template
      <BaseFormImageEditor></BaseFormImageEditor>
    - props
    - event
    - method

-->

<template>
  <div class="b__form-image-editor ">
    <!-- 当前图片列表 -->
    <div v-for="item in fileList" :key="item.uuid" class="img-item">
      <i class="icon-del ixfont ix-close" @click="handleDel(item)"></i>
      <img :src="item.url" class="img" :class="{'preview-able':previewAble}" alt="图片" @click="handlePreview">
    </div>
    <!-- 新增按钮 -->
    <div v-if="fileList.length < limit" class="btn-upload">
      <i class="icon-add ixfont ix-add"></i>
      <input v-for="cache in fileCache" :key="cache" ref="fileInput" class="btn-upload__input" type="file" accept=".jpg,.png,.jpeg" @change="handleAddFile"></input>
    </div>

  </div>
</template>

<script>
import BaseImageViewerModal from '@/components-base/modal/BaseImageViewerModal';
import { HttpClientUtil, ImageConvertUtil, ModalUtil } from '@/libs/util';
import CommonsUtil from '@/libs/util/commons.util';

export default {
  name    : 'BaseFormImageEditor',
  props   : {
    // 标题
    title      : {
      type   : String,
      default: '图片'
    },
    // 是否可以查看
    previewAble: {
      type   : Boolean,
      default: true
    },
    // 图片的url [{name,url}]
    imgList    : {
      type   : Array,
      default: () => {
        return [];
      }
    },
    // 允许有多少图片
    limit      : {
      type   : Number,
      default: 1
    },
    // 每张图片的宽度 300 px
    width      : {
      type   : Number,
      default: 300
    },
    // 是否禁用
    disabled   : {
      type   : Boolean,
      default: false
    }
  },
  data() {
    return {
      // 是否正在请求数据
      isSubmitting: false,
      fileCache   : [CommonsUtil.randomStrId()],
      // 图片列表 [{uuid,name,url}]
      fileList    : []
    };
  },
  computed: {},
  watch   : {
    id: {
      handler(v) {
        if (v) {
          this.$_getImage();
        } else {
          this.imgUrl = '';
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    this.fileList = this.imgList.map(item => {
      item.uuid = CommonsUtil.randomStrId();
      return item;
    });
  },
  beforeDestroy() {},
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     * 预览
     * @param file
     * @param file.name
     * @param file.url
     */
    handlePreview(file) {
      if (this.previewAble) {
        const modal = new ModalUtil();
        modal.openModal(BaseImageViewerModal, {title: this.title, images: this.fileList, defaultImage: file.url}).then(() => {
          modal.closeModal();
        });
      }
    },

    /**
     * 更换图片
     */
    async handleAddFile(e) {
      const file     = (e.currentTarget.files || [])[0];
      this.fileCache = [CommonsUtil.randomStrId()];
      if (file) {
        const base64Url = await ImageConvertUtil.fileResizeToDataURL(file);
        this.fileList.push({
          name: file.name,
          uuid: CommonsUtil.randomStrId(),
          url : base64Url
        });

        this.$emit('data', file);
        this.$emit('input', this.fileList);
      }
    },

    /**
     * 删除图片
     * @param file
     * @param file.uuid
     */
    handleDel(file) {
      this.fileList = this.fileList.filter(item => item.uuid !== file.uuid);
      this.$emit('input', this.fileList);
    },

    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ public ] ____________________________________________________ */

    /**
     * 设置图片列表
     * @param imgList
     */
    setImgList(imgList = []) {
      this.fileList = imgList.map(item => {
        item.uuid = CommonsUtil.randomStrId();
        return item;
      });
    },
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ private: *,query,fetch,action,init ] ________________________ */

    /**
     * 获取图片
     */
    $_getImage() {
      this.imgUrl = '';
      if (!this.getUrl || !this.id || CommonsUtil.throttling(`BaseFormImageEditor${this.id}`)) {
        return;
      }
      HttpClientUtil.postQuery(this.getUrl, {id: this.id}).then(({object}) => {
        const imgUrl = object;
        const img    = new Image();
        img.src      = imgUrl;
        img.onload   = () => {
          this.imgUrl = imgUrl;
        };
      }).catch(() => { });
    }
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

.b__form-image-editor {
  display   : flex;
  flex-wrap : wrap;
  padding   : 16px 0;

  .img-item {
    position      : relative;
    margin-right  : 8px;
    margin-bottom : 8px;
    width         : 96px;
    height        : 96px;

    .img {
      width      : 100%;
      height     : 100%;
      object-fit : cover;
    }

    .icon-del {
      position      : absolute;
      right         : -12px;
      top           : -12px;
      font-size     : 16px;
      width         : 24px;
      height        : 24px;
      line-height   : 24px;
      color         : #ff3d00;
      background    : rgba(255, 255, 255, 0.64);
      text-align    : center;
      border-radius : 50%;
      cursor        : pointer;

      &:hover {
        opacity : 0.8;

      }
    }
  }

  .btn-upload {
    display         : flex;
    justify-content : center;
    align-items     : center;
    position        : relative;
    margin-right    : 8px;
    margin-bottom   : 8px;
    width           : 96px;
    height          : 96px;
    color           : #409eff;
    border          : 1px dashed #dcdfe6;
    border-radius   : 4px;
    cursor          : pointer;
    overflow        : hidden;
    user-select     : none;

    &:hover {
      opacity : 0.8;
    }

    .icon-add {
      font-size : 32px;
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
      cursor    : pointer;

    }
  }
}

</style>
