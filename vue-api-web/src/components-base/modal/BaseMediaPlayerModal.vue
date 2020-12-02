<!--
    FileDesc  :  音视频播放弹框
    Author    :  g_eno_phy
    Date      :  2020-02-20 11:38
    Version   :
    Usage     :
        - template
            <BaseMediaPlayerModal></BaseMediaPlayerModal>

        - props
            :name       {String}            名称
            :src        {String}            url地址
            :type       {String}            类型
        - event
        - method
-->

<template>
  <div class="b__media-player-modal">
    <div class="media-player" :class="{'large-window':isLargeWindow}">
      <div class="title-wrapper">
        <div class="title">{{ type === 'video' ? '视频' : '音频' }}</div>
        <div class="op-group">
          <template v-if="type === 'video'">
            <span v-if="isLargeWindow" class="op-item view-design-btn btn-contract" @click="isLargeWindow = !isLargeWindow"></span>
            <span v-else class="op-item view-design-btn btn-expand" @click="isLargeWindow = !isLargeWindow">  </span>
          </template>

          <span class="op-item view-design-btn btn-close" @click="handleClose">  </span>
        </div>
      </div>
      <div class="viewer-wrapper" @click="handlePlayPause">
        <video v-if="type === 'video'" ref="video" preload="auto" class="video">
          <source :src="src" type="video/mp4">
        </video>
        <div v-else class="audio-wrapper">
          <div class="audio-container">
            <div class="icon-music"></div>
            <div class="media-name">{{ name }}</div>
          </div>
          <audio ref="audio" preload="auto" class="audio">
            <source :src="src" type="audio/mpeg">
          </audio>
        </div>

      </div>
      <div class="control-wrapper">
        <div class="control">
          <span v-if="isPlaying" class="view-design-btn btn-pause active" @click="handlePlayPause"></span>
          <span v-else class="view-design-btn btn-play active" @click="handlePlayPause"></span>
        </div>
        <div class="current-time">{{ currentTime }}</div>
        <div class="progress">
          <div class="progress__inner">
            <div ref="progressDot" class="progress__dot" :class="{'playing':isPlaying}"></div>
            <div class="progress__total"></div>
          </div>

        </div>
        <div class="total-time">{{ totalTime }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { Constants } from '@/libs/util';

export default {
  name    : 'BaseMediaPlayerModal',
  props   : {
    // 多媒体名称
    name: {
      type    : String,
      default : '',
      required: true
    },
    // 多媒体地址
    src : {
      type    : String,
      default : '',
      required: true
    },
    // 类型 audio video
    type: {
      type    : String,
      default : '',
      required: true

    }
  },
  data() {
    return {
      mediaRef       : null,
      isPlaying      : false, // 是否正在播放
      isLargeWindow  : false, // 是否已经最大化窗口
      currentSeconds : 0, // 当秒
      totalSeconds   : 0, // 总秒i
      currentPerNum  : 0, // 当前百分比
      playingInterval: null // 播放心跳
    };
  },
  computed: {
    // 当前时间
    currentTime() {
      const minutes = Math.floor(this.currentSeconds / 60);
      const seconds = Math.floor(this.currentSeconds % 60);
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    },
    // 总时间
    totalTime() {
      const minutes = Math.floor(this.totalSeconds / 60);
      const seconds = Math.floor(this.totalSeconds % 60);
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
    // // 当前进度百分比
    // currentPerNum() {
    //     return Math.floor(this.currentSeconds / this.totalSeconds * 100);
    // }
  },
  watch   : {
    // 当前进度监听（禁止在内部对多媒体进行操作）
    currentSeconds(v) {
      this.$refs.progressDot.style.left = `${this.currentPerNum}%`;
    },
    // 是否正在播放
    isPlaying(v) {
      // 若需要播放，则开始播放
      if (v) {
        this.mediaRef.play();
        this.$_setPlayingInterval();
      } else {
        // 若未播放结束，且未暂停，则暂停播放
        if (!this.mediaRef.ended && !this.mediaRef.paused) {
          this.mediaRef.pause();
        }

        this.$_clearPlayingInterval();
      }
    }
  },
  mounted() {
    this.mediaRef = this.type === 'video' ? this.$refs.video : this.$refs.audio;

    // 判断视频有无就绪
    const m = setInterval(() => {
      if (this.mediaRef.readyState) {
        clearInterval(m);
        // 设置视频播放时间
        this.totalSeconds = this.mediaRef.duration;
        // 设置进度百分比
        this.$_setProgressDot(this.currentPerNum);

        // 设置进度点鼠标事件监听
        this.$_setProgressDotMouseEventListener();
      }
    }, 300);
  },
  beforeDestroy() {
    // 暂停播放心跳监听
    this.$_clearPlayingInterval();
    // 暂停播放
    if (this.mediaRef) {
      this.mediaRef.pause();
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
      this.$emit(Constants.EMIT.CLOSE_THIS_MODAL, true);
    },
    /**
     * 播放或暂停
     */
    handlePlayPause() {
      // 设置值
      this.isPlaying = !this.isPlaying;
    },
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ public ] ____________________________________________________ */

    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ private: *,query,fetch,action,init ] ________________________ */
    /**
     * 设置进度百分比
     * @param currentPerNum
     */
    $_setProgressDot(currentPerNum = 0) {
      if (currentPerNum < 0) {
        currentPerNum = 0;
      } else if (currentPerNum > 100) {
        currentPerNum = 100;
      }
      this.currentPerNum                = currentPerNum;
      this.$refs.progressDot.style.left = `${currentPerNum}%`;
    },
    /**
     * 暂停播放心跳监听
     */
    $_setPlayingInterval() {
      if (this.playingInterval) {
        clearInterval(this.playingInterval);
        this.playingInterval = null;
      }
      // 设置视频播放时间
      this.currentSeconds = this.mediaRef.currentTime;

      // 播放心跳
      this.playingInterval = setInterval(() => {
        // 设置视频播放时间
        this.currentSeconds = this.mediaRef.currentTime;
        // 若播放结束，也清空播放状态
        if (this.mediaRef.ended) {
          this.isPlaying      = false;
          this.currentSeconds = 0;
          // 清空播放播放
          this.$_clearPlayingInterval();
        }
        // 设置播放进度
        this.$_setProgressDot(Math.floor(this.currentSeconds / this.totalSeconds * 100));
      }, 500);
    },
    /**
     * 清空播放心跳监听
     */
    $_clearPlayingInterval() {
      // 若未暂停，则暂停播放
      if (!this.mediaRef.paused) {
        this.mediaRef.pause();
      }
      if (this.playingInterval) {
        clearInterval(this.playingInterval);
        this.playingInterval = null;
      }
    },
    /**
     * 设置进度点鼠标事件监听
     */
    $_setProgressDotMouseEventListener() {
      const that = this;
      // 鼠标按下
      that.$refs.progressDot.addEventListener('mousedown', (event) => {
        event               = event || window.event;
        const _parentTarget = that.$refs.progressDot.parentElement;

        const startX = event.clientX - event.target.offsetLeft; // 起始点坐标
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }

        // 暂停播放
        that.isPlaying = false;

        document.onmousemove = function (ev) {
          ev = ev || window.event;

          const disX   = ev.clientX - startX; // 移动的横向坐标距离
          const perNum = Math.floor(disX / _parentTarget.offsetWidth * 100);
          that.$_setProgressDot(perNum);
        };
        document.onmouseup   = function (ev) {
          document.onmousemove      = null;
          document.onmouseup        = null;
          // 根据百分比，计算当前播放的秒
          that.currentSeconds       = Math.round(that.totalSeconds * that.currentPerNum / 100);
          that.mediaRef.currentTime = that.currentSeconds;
          // 开始播放
          that.isPlaying            = true;
        };
      });
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

@title-height   : 32px;

@control-height : 24px;
.media-player {
  display          : flex;
  flex-flow        : column nowrap;
  width            : 640px;
  height           : 380px;
  font-size        : 14px;
  background-color : @color-cus-001;

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
    align-items     : center;

    .video {
      position   : absolute;
      top        : 0;
      left       : 0;
      right      : 0;
      bottom     : 0;
      max-width  : 100%;
      max-height : 100%;
      margin     : auto;
      object-fit : contain;

    }

    .audio-wrapper {
      display         : flex;
      flex-flow       : column nowrap;
      align-items     : center;
      justify-content : center;
      height          : 100%;
      width           : 100%;

      .audio-container {
        display         : flex;
        flex-flow       : column nowrap;
        justify-content : center;
        align-items     : center;
        height          : 100%;
        width           : 100%;
        padding         : 0 24px;

        .icon-music {

          color : fade(@color-b-008, 24);

          &:before {
            display     : inline-block;
            content     : "\F3E9";
            font-family : "Ionicons"; /* iview 字体 */
            font-size   : 120px;
          }
        }

        .media-name {
          color      : @color-b-008;
          font-size  : 16px;
          text-align : center;
          word-break : break-all;
        }
      }

    }
  }

  .control-wrapper {
    display          : flex;
    flex-flow        : nowrap;
    align-items      : center;

    height           : @control-height;

    color            : @color-b-008;
    background-color : fade(@color-b-007, 24);

    padding          : 0 16px;

    .current-time, .total-time {
      display     : flex;
      align-items : center;
      font-size   : 12px;
      padding     : 0 8px;
    }

    .progress {
      flex-grow : 1;
      position  : relative;
      height    : @control-height;
      overflow  : hidden;

      &__inner {
        position    : relative;
        height      : @control-height;
        width       : calc(100% - 14px);

        margin-left : -7px;
        /*overflow    : hidden;*/
      }

      &__dot {
        position  : absolute;
        z-index   : 2;
        left      : 0; // 这里是进度设置
        top       : 50%;
        transform : translateY(-50%);
        width     : 2px;
        height    : 12px;
        padding   : 8px;
        cursor    : pointer;

        &.playing {
          transition : all 500ms linear;
        }

        &:before {
          content          : "";
          display          : block;
          position         : absolute;
          z-index          : 2;
          right            : 8px;
          width            : 100vw;
          height           : 2px;
          transform        : translateY(-50%);
          background-color : @color-b-008;
          pointer-events   : none;
        }

        &:after {
          content          : "";
          display          : block;
          position         : absolute;
          z-index          : 3;
          width            : 2px;
          height           : 12px;
          top              : 50%;
          transform        : translate(-50%, -50%);
          background-color : @color-b-008;
          pointer-events   : none;

        }
      }

      &__total {
        display          : block;
        position         : absolute;
        top              : 50%;
        width            : 100%;
        height           : 2px;
        background-color : fade(@color-b-008, 24);
        transform        : translateY(-50%);
      }
    }

  }

  .view-design-btn {
    display     : inline-block;
    font-family : "Ionicons"; /* iview 字体 */
    font-size   : 16px;
    cursor      : pointer;
    padding     : 0 8px;

    &:not(.active) {
      color : fade(@color-a-001, 40);

      &:hover, &:focus {
        color : fade(@color-a-001, 100);
      }
    }

    &.active {
      color : fade(@color-b-008, 100);
    }
  }

  .btn-contract:before {
    content : "\F38F";
  }

  .btn-expand:before {
    content : "\F39E";
  }

  .btn-close:before {
    content : "\f379";
  }

  .btn-play:before {
    content : "\F273";
  }

  .btn-pause:before {
    content : "\F259";
  }
}
</style>
