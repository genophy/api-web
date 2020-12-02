<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-01 14:37)
  Version   :
  Usage     :
    - template
      <Main></Main>
    - props
    - event
    - method

-->

<template>
  <div class="v__main ly-h-full ly-p-16">
    <div class="v__main__header header ">
      <div class="header__title">
        <h1>接口查看器</h1>
      </div>
      <div class="header__op">
        <div class="btn-group">
          <el-button type="primary" @click="handleSetProject">设置项目参数</el-button>
          <el-button type="success" @click="handleSetStorage">设置Token</el-button>
        </div>
        <div class="theme-toggle">
          <span v-for="item in themeList" :key="item.name" class="theme-dot" :class="{selected:theme === item.name}" :style="{backgroundColor:item.color}" @click="handleChangeTheme(item)"></span>
        </div>

      </div>
    </div>
    <!-- 项目介绍 -->
    <div class="v__main__intro">
      <div class="intro-group">
        <div class="intro-item">
          <div class="label">名称</div>
          <div class="value">{{ projectInfo.name }}</div>
          <div class="op ly-hover">
            <i class="ixfont ix-cpy" @click="handleCpText(projectInfo.name)"></i>
          </div>
        </div>
        <div class="intro-item">
          <div class="label">请求地址</div>
          <div class="value">{{ projectInfo.url }}</div>
          <div class="op ly-hover">
            <i class="ixfont ix-cpy" @click="handleCpText(projectInfo.url)"></i>
          </div>
        </div>
        <div class="intro-item">
          <div class="label">前缀</div>
          <div class="value">{{ projectInfo.prefix }}</div>
          <div class="op ly-hover">
            <i class="ixfont ix-cpy" @click="handleCpText(projectInfo.prefix)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- 接口内容 -->
    <div v-if="apiList && apiList[0]" class="v__main__body body ">
      <div class="body__side">
        <CompSide :list="apiList" @click="handleSideClick"></CompSide>
      </div>
      <div ref="bodyRef" class="body__center">
        <CompControllerList ref="controllerListRef" :list="apiList"></CompControllerList>
      </div>
    </div>


  </div>
</template>

<script>
import { Constants, HttpClientUtil, ModalUtil } from '@/libs/util';
import { xSet } from '@/libs/x-store';
import CompControllerList from '@/views/main/components/CompControllerList';
import CompSide from '@/views/main/components/CompSide';
import CompSetProject from '@/views/main/components/modal/CompSetProject';
import CompSetToken from '@/views/main/components/modal/CompSetToken';

export default {
  name      : 'Main',
  components: {CompControllerList, CompSide},
  props     : {},
  data() {
    return {
      isQuerying  : false,    // 是否正在查询
      isSubmitting: false,     // 是否正在提交
      theme       : '', // 主题名称
      themeList   : [
        {name: 'default', color: '#fff'},
        {name: 'dark', color: '#222'}
      ],
      projectInfo : {
        name  : '测试项目',
        url   : 'http://0.0.0.0:8080',
        prefix: '/projectDemo'
      },
      apiList     : []
    };
  },
  computed  : {},
  watch     : {},
  created() {
    this.theme = localStorage.getItem(Constants.LOCAL_STORAGE.THEME) || 'default';
  },
  mounted() {
    // HttpClientUtil.get('/apidoc/allInfo.do').then(data => {
    //   this.apiList = data;
    // }).catch(data => {
    //   this.apiList = data;
    // });
    this.apiList = require('@/assets/mock/result.json');
  },
  beforeDestroy() {},
  methods   : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */

    /**
     * 侧边栏点击
     * @param info
     */
    handleSideClick(info) {
      if (info.methodUUID) {
        const anchor = this.$refs.bodyRef.querySelector(`[anchor="${info.methodUUID}"]`);
        const disx   = Math.max(anchor.offsetTop - this.$refs.bodyRef.offsetTop - 70, 0);
        this.$refs.controllerListRef.scrollTop(disx);
      }
    },
    /**
     * 设置项目
     */
    handleSetProject() {
      const modal = new ModalUtil();
      modal.openModal(CompSetProject, {info: this.projectInfo}, {title: '设置项目'}).then(data => {
        if (data) {
          this.projectInfo = data || {};
          localStorage.setItem(Constants.LOCAL_STORAGE.PROJECT, JSON.stringify(this.projectInfo));
        }
        modal.closeModal();
      });
    },
    /**
     * 设置Token
     */
    handleSetStorage() {
      const modal = new ModalUtil();
      modal.openModal(CompSetToken, {}, {title: '设置Token'}).then(() => {
        modal.closeModal();
      });
    },

    /**
     * 改变主题
     * @param info
     */
    handleChangeTheme(info) {
      this.theme = info.name;
      xSet('theme', this.theme, Constants.LOCAL_STORAGE.THEME);
    },

    /**
     * 赋值文本
     * @param text
     */
    handleCpText(text) {
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
.v__main {
  display   : flex;
  flex-flow : column nowrap;

  &__header {
    flex-shrink   : 0;
    border-bottom : 1px solid var(--c-border);
    padding       : 16px;
  }

  &__intro {
    border-bottom : 1px solid var(--c-border);
  }

  &__body {
    flex-grow : 1;
    overflow  : hidden;
  }
}

.header {
  display         : flex;
  justify-content : space-between;

  &__title {
    h1 {
      font-size   : 24px;
      font-weight : 800;
    }
  }

  &__op {
    display   : flex;
    flex-flow : row nowrap;

    .btn-group {
      padding : 0 32px;

      .btn-item {

      }
    }
  }
}

.body {
  display : flex;

  &__side {
    flex-shrink  : 0;
    width        : 400px;
    border-right : 1px solid var(--c-border);
    padding      : 16px;
    overflow     : auto;
  }

  &__center {
    flex-grow   : 1;
    overflow    : hidden;
    margin-left : 16px;
  }
}

.theme-toggle {
  display     : flex;
  align-items : center;

  .label {
    font-size    : 18px;
    margin-right : 12px;
  }

  .theme-dot {
    display       : inline-block;
    position      : relative;
    width         : 24px;
    height        : 24px;
    border-radius : 50%;
    cursor        : pointer;

    &.selected {
      border : 2px solid var(--c-success);

      &:after {
        content     : '✔';
        position    : absolute;
        right       : 4px;
        font-weight : 800;
        color       : var(--c-success)
      }
    }
  }

  .theme-dot + .theme-dot {
    margin-left : 12px;
  }
}

.intro-group {
  display : flex;

  .intro-item {
    display      : flex;
    flex-flow    : row nowrap;
    align-items  : center;
    margin-right : 40px;
    padding      : 16px;

    .label {
      color        : var(--c-font-sub);
      margin-right : 16px;
    }

    .value {
      margin-right : 16px;
    }

    .op > .ixfont {
      font-size : 12px;
      color     : var(--c-font-sub);
    }
  }
}

</style>
