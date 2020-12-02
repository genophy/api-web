<!--
  FileDesc  :
  webUrl    :
  Author    : g_eno_phy (2020-12-02 12:12)
  Version   :
  Usage     :
    - template
      <CompParamsSend></CompParamsSend>
    - props
    - event
    - method

-->

<template>
  <div class="c__params-send">

    <div class="c__params-send__body">
      <div class="c__params-send__side">
        <div class="header">
          <div class="title  ">请求参数
            <el-tooltip content="刷新" effect="dark">
              <i class="ixfont ix-fresh ly-hover ly-ml-16" @click="handleFormatRequest"></i>
            </el-tooltip>
          </div>
          <div class="op">
            <el-button type="warning" @click="handleSendRequest">发送</el-button>
          </div>
        </div>
        <div class="body">
          <el-input v-model="requestParamsStr" type="textarea" :rows="20" resize="none"></el-input>
        </div>
      </div>

      <div class="c__params-send__side">
        <div class="header">
          <div class="title">返回参数</div>
          <div class="op">
            <el-button type="success" @click="handleSaveResponse">保存</el-button>
          </div>
        </div>
        <div class="body">
          <el-input v-model="responseParamsStr" type="textarea" readonly :rows="20" resize="none"></el-input>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { CommonsUtil, HttpClientUtil, ModalUtil } from '@/libs/util';

export default {
  name    : 'CompParamsSend',
  props   : {
    info: {
      type: Object
    }
  },
  data() {
    return {
      isQuerying       : false,    // 是否正在查询
      isSubmitting     : false,    // 是否正在提交
      requestParamsStr : '', // 请求参数
      responseParamsStr: '' // 返回参数
    };
  },
  computed: {},
  watch   : {},
  created() {},
  mounted() {
    const field      = Object.create(null);
    const paramsList = this.$_rebuildParamsList(this.info?.requestParam?.params);
    paramsList.filter(item => item.label).map(item => {
      let val = item.value;
      if (item.type === 2) {
        val = Number(val) || '';
      } else if (item.type === 3) {
        val = JSON.parse(`${val || '{}'}`);
      } else if (item.type === 4) {
        val = JSON.parse(`${val || '[]'} `);
      }
      return {label: item.label, value: val};
    }).forEach(item => {
      field[item.label] = item.value;
    });
    this.requestParamsStr = JSON.stringify(field || {}, null, '  ');

  },
  beforeDestroy() {},
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */


    /**
     * 格式化request
     */
    handleFormatRequest() {
      try {
        this.requestParamsStr = JSON.stringify(JSON.parse(this.requestParamsStr) || {}, null, ' ');
      } catch (err) {
        ModalUtil.openMsgWarning(err.message || '格式化失败');
      }
    },

    /**
     * 发送
     */
    handleSendRequest() {
      try {
        const prefix        = process.env.VUE_APP_URL_PREFIX;
        const url           = this.info.mapping.replace(prefix, '');
        const requestParams = JSON.parse(this.requestParamsStr) || {};
        switch (this.info.requestMethod) {
          case 'POST':
            HttpClientUtil.postJsonData(url, requestParams).then(data => {
              this.responseParamsStr = JSON.stringify(data || {}, null, ' ');
            }).catch(err => {
              this.responseParamsStr = JSON.stringify(err || {}, null, ' ');
            });
            break;
          case 'GET':
            HttpClientUtil.get(url, requestParams).then(data => {
              this.responseParamsStr = JSON.stringify(data || {}, null, ' ');
            }).catch(err => {
              this.responseParamsStr = JSON.stringify(err || {}, null, ' ');
            });
            ;
            break;
        }
      } catch (err) {
        ModalUtil.openMsgWarning(err.message || '格式化失败');
      }

    },
    /**
     * 保存response
     */
    handleSaveResponse() {
      // this.responseParamsStr = JSON.stringify(JSON.parse(this.responseParamsStr) || {}, null, ' ');

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
     * 重建参数列表
     * @param params
     * @returns {*|[]}
     */
    $_rebuildParamsList(params) {
      let fieldList = [];
      if (params && params.length > 0) {
        fieldList = params.map(item => {
          let type = 1;
          if (/number/gi.test(item.dataType)) {
            type = 2;
          } else if (/object/gi.test(item.dataType)) {
            type = 3;
          } else if (/array/gi.test(item.dataType)) {
            type = 4;
          }

          let defaultValue = '';
          if (!/^(null|undefined|none)$/i.test(item.defaultValue)) {
            defaultValue = item.defaultValue;
          }

          return {
            randomId: CommonsUtil.randomStrId(),
            label   : item.name,
            value   : defaultValue,
            type    : type,
            required: item.required
          };
        });
      }
      return fieldList;
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
.c__params-send {

  padding : 16px;


  &__body {
    display : flex;
  }

  &__side {
    width   : 400px;
    padding : 0 8px;

    &:not(:first-child) {
      border-left : 1px solid var(--c-border);
    }

    .header {
      display         : flex;
      flex-flow       : row nowrap;
      justify-content : space-between;
      align-items     : center;
      padding         : 8px 0;
    }

    .body {
    }
  }
}
</style>
