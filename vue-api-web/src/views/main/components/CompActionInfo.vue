<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 16:52)
  Version   :
  Usage     :
    - template
      <CompActionInfo></CompActionInfo>
    - props
    - event
    - method

-->

<template>
  <div class="c__action-info" :anchor="action.methodUUID">
    <div class="name">{{ action.name || '-' }}</div>
    <div class="c__action-info__wrapper">
      <div class="header">
        <div class="header__method">{{ actionDetail.requestMethod || '-' }}</div>
        <div class="header__mapping">{{ actionDetail.mapping || '-' }}</div>
        <div class="header__op">

          <el-tooltip content="复制" effect="dark">
            <i class="ixfont ix-cpy ly-hover" @click="handleCpText(actionDetail.mapping)"></i>
          </el-tooltip>


        </div>
      </div>

      <div class="body ">
        <div class="info-title req">
          <div>
            <span class="info-title__t1">request</span>
            <el-tooltip v-if="requestParams && requestParams[0]" content="复制" effect="dark">
              <span class="ixfont ix-cpy ly-hover ly-ml-16" @click="handleCpReqParams">{{ requestParams.length }}</span>
            </el-tooltip>
          </div>
          <div class="req-op">
            <div class="req-op__item">
              <el-button type="warning" size="mini" @click="handleMockSend(action.name,actionDetail)">发送</el-button>
            </div>
          </div>
        </div>
        <div class="req-list">
          <CompActionInfoReqList :list="requestParams"></CompActionInfoReqList>
        </div>
        <div class="info-title res">
          <div>
            <span class="info-title__t1">response</span>
            <el-tooltip v-if="responseParams && responseParams[0]" content="复制" effect="dark">
              <i class="ixfont ix-cpy ly-hover ly-ml-16" @click="handleCpRespParams">{{ responseParams.length }}</i>
            </el-tooltip>
          </div>

          <div class="req-op">
            <div class="req-op__item">
              <el-button type="success" size="mini" @click="handleViewResult(action.name,actionDetail)">查看示例</el-button>
            </div>
          </div>
        </div>
        <div class="resp-list">
          <CompActionInfoRespList :list="responseParams"></CompActionInfoRespList>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ModalUtil } from '@/libs/util';
import CompActionInfoReqList from '@/views/main/components/CompActionInfoReqList';
import CompActionInfoRespList from '@/views/main/components/CompActionInfoRespList';
import CompParamsSend from '@/views/main/components/modal/CompParamsSend';

export default {
  name      : 'CompActionInfo',
  components: {CompActionInfoRespList, CompActionInfoReqList},
  props     : {
    action: {
      type: Object
    }
  },
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false    // 是否正在提交
    };
  },
  computed  : {
    actionDetail() {
      return this.action?.detail || {};
    },
    requestParams() {
      return this.action?.detail?.requestParam?.params || [];
    },
    responseParams() {
      return this.action?.detail?.responseParam?.params || [];
    }
  },
  watch     : {},
  created() {},
  mounted() {

  },
  beforeDestroy() {},
  methods   : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     *  模拟发送
     * @param actionName
     * @param actionDetail {mapping,requestMethod,requestParam:{params}}
     */
    handleMockSend(actionName, actionDetail) {
      const modal = new ModalUtil();
      modal.openModal(CompParamsSend, {info: actionDetail}, {title: actionName || '模拟发送'}).then(() => {
        modal.closeModal();
      });
    },
    /**
     * 查看返回的结果
     * @param actionName
     * @param actionDetail
     */
    handleViewResult(actionName, actionDetail) {

    },
    /**
     * 复制
     * @param text
     */
    handleCpText(text) {
      this.$clipboard(text);
      ModalUtil.openMsgSuccess('复制成功');
    },

    /**
     * 复制req参数
     */
    handleCpReqParams() {
      if (this.requestParams?.length > 0) {
        const text = this.requestParams.map(item => {
          return `${item.name}`;
        }).join('\n');
        this.$clipboard(text);
        ModalUtil.openMsgSuccess('复制成功');
      }
    },
    /**
     * 复制resp参数
     */
    handleCpRespParams() {
      if (this.responseParams?.length > 0) {
        const text = this.responseParams.map(item => {
          return `${item.name}`;
        }).join('\n');
        this.$clipboard(text);
        ModalUtil.openMsgSuccess('复制成功');
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

.c__action-info {
  position      : relative;
  box-shadow    : var(--shadow);
  border-radius : 0 0 16px 16px;

  .name {
    position         : sticky;
    z-index          : 1;
    top              : 54px;
    padding          : 4px 32px;
    font-size        : 14px;
    font-weight      : 800;
    color            : var(--c-bg);
    background-color : var(--c-warn-sub);

    pointer-events   : none;
  }

  &__wrapper {
    padding : 0 16px 16px;

  }


  .header {
    display     : flex;
    line-height : 30px;
    padding-top : 16px;

    &__method {
      flex-shrink : 0;
      width       : 80px;
      height      : 30px;
      font-weight : 800;
      text-align  : center;
      color       : var(--c-font);
      user-select : none;

      &.post {
        color            : var(--c-white);
        background-color : var(--c-success);
      }

      &.get {
        color            : var(--c-white);
        background-color : var(--c-blue);
      }
    }

    &__mapping {
      flex-grow   : 1;
      height      : 30px;
      padding     : 0 16px;
      font-weight : 800;
      color       : var(--c-font);
      border      : 1px solid var(--c-border);
    }

    &__op {
      flex-shrink : 0;
      padding     : 0 16px;

      .ixfont + .ixfont {
        margin-left : 16px;
      }
    }
  }

  .body {
    padding : 16px 0;

    .info-title {
      display         : flex;
      justify-content : space-between;
      padding         : 0 16px;
      height          : 40px;
      line-height     : 40px;
      font-weight     : 800;

      &.req {
        color            : var(--c-white);
        background-image : linear-gradient(to right, var(--c-blue), transparent);
      }

      &.res {
        color            : var(--c-white);
        background-image : linear-gradient(to right, var(--c-success), transparent);
      }

      &__t1 {
        display : inline-block;
        width   : 80px;
      }

      .req-op {
        display       : flex;
        padding-right : 16px;

        &__item {
          flex-shrink : 0;
        }

        .ix-send {
          font-size   : 18px;
          font-weight : 800;
          color       : var(--c-warn);
        }

        .ix-data {
          font-size   : 18px;
          font-weight : 800;
          color       : var(--c-success);
        }

        .ix-cpy {
          font-size : 12px;
          color     : var(--c-font-sub);
        }
      }
    }
  }

}
</style>
