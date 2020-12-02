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
        <div class="ly-flex ly-justify-between ly-items-center ly-py-8">
          <div class="title">请求参数
            <el-tooltip content="重置" effect="dark">
              <i class="ixfont ix-fresh ly-hover ly-ml-16" @click="handleRestRequest"></i>
            </el-tooltip>

            <el-tooltip content="格式化" effect="dark">
              <i class="ixfont ix-list ly-hover ly-ml-16" @click="handleFormatRequest"></i>
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
        <div class="ly-flex ly-justify-between ly-items-center ly-py-8">
          <div class="ly-flex-grow ly-flex  ly-items-center ">
            <div class="title">返回参数</div>
            <div class="ly-ml-8">
              <el-radio-group v-model="responseType" size="mini">
                <el-radio-button v-for="item in responseTypeList" :key="item.id" :label="item.id">{{ item.name }}</el-radio-button>
              </el-radio-group>
            </div>
          </div>

          <div class="op">
            <el-button type="success" @click="handleSaveResponse">保存</el-button>
          </div>
        </div>
        <div class="body">
          <el-input v-if="responseType === 1" v-model="responseParamsStr" type="textarea" readonly :rows="20" resize="none"></el-input>
          <img v-else-if="responseType === 2" :src="responseParams" alt="">
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { CommonsUtil, Constants, HttpClientUtil, ModalUtil } from '@/libs/util';

export default {
  name    : 'CompParamsSend',
  props   : {
    actionId: {
      type: [String, Number]
    },
    info    : {
      type: Object
    }
  },
  data() {
    return {
      isQuerying           : false,    // 是否正在查询
      isSubmitting         : false,    // 是否正在提交
      requestParamsStr     : '', // 请求参数
      requestParamsStrCache: '', // 请求参数缓存
      responseParams       : null, // 返回参数
      responseParamsStr    : '', // 返回参数
      storageActionRequests: {},
      responseType         : 1,
      responseTypeList     : [
        {id: 1, name: '数据'},
        {id: 2, name: '图片'}
      ]
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
    this.requestParamsStrCache = JSON.stringify(field || {}, null, '  ');


    this.storageActionRequests = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.ACTION_REQUESTS)) || {};
    const actionRequest        = this.storageActionRequests[`action_${this.actionId}`];
    if (actionRequest) {
      this.requestParamsStr = actionRequest;
    } else {
      this.requestParamsStr = this.requestParamsStrCache;
    }
  },
  beforeDestroy() {},
  methods : {
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________________________________________________________________________ */
    /* _____________________ [ handle ] ____________________________________________________ */


    /**
     * 重置request参数
     */
    handleRestRequest() {
      this.requestParamsStr = this.requestParamsStrCache;
      // 缓存请求参数
      this.$_storeActionRequests();
    },

    /**
     * 格式化request
     */
    handleFormatRequest() {
      try {
        this.requestParamsStr = JSON.stringify(JSON.parse(this.requestParamsStr) || {}, null, ' ');
        // 缓存请求参数
        this.$_storeActionRequests();
      } catch (err) {
        ModalUtil.openMsgWarning(err.message || '格式化失败');
      }
    },

    /**
     * 发送
     */
    handleSendRequest() {
      try {
        if (this.isSubmitting) return;
        this.isSubmitting   = false;
        const prefix        = process.env.VUE_APP_URL_PREFIX;
        const url           = this.info.mapping.replace(prefix, '');
        const requestParams = JSON.parse(this.requestParamsStr) || {};
        // 缓存请求参数
        this.$_storeActionRequests();
        switch (this.info.requestMethod) {
          case 'POST':
            HttpClientUtil.postJsonData(url, requestParams).then(data => {
              this.responseParams    = data;
              this.responseParamsStr = JSON.stringify(data || {}, null, ' ');
            }).catch(err => {
              this.responseParams    = data;
              this.responseParamsStr = JSON.stringify(err || {}, null, ' ');
            }).finally(() => {
              this.isSubmitting = false;
            });
            break;
          case 'GET':
            HttpClientUtil.get(url, requestParams).then(data => {
              this.responseParams    = data;
              this.responseParamsStr = JSON.stringify(data || {}, null, ' ');
            }).catch(err => {
              this.responseParams    = data;
              this.responseParamsStr = JSON.stringify(err || {}, null, ' ');
            }).finally(() => {
              this.isSubmitting = false;
            });
            break;
          default:
            this.isSubmitting = false;
            break;
        }
      } catch (err) {
        this.isSubmitting = false;
        console.error(err.message);
        ModalUtil.openMsgWarning(err.message || '格式化失败');
      }

    },
    /**
     * 保存response
     */
    handleSaveResponse() {
      if (this.isSubmitting) return;
      this.isSubmitting = false;

      const modal = new ModalUtil();
      modal.openConfirm({title: '确定保存', msg: '保存后，即覆盖。请慎重操作'}).then(flag => {
        if (flag) {
          HttpClientUtil.postJsonData('/apidoc/saveResponse.do', {
            actionId: this.actionId,
            result  : this.responseParamsStr || '{}'
          }).then(data => {
            ModalUtil.openMsgSuccess('保存成功');
          }).catch(err => {
            if (err === true) {
              ModalUtil.openMsgSuccess('保存成功');
            } else {
              ModalUtil.openMsgError('保存失败');
            }
          }).finally(() => {
            this.isSubmitting = false;
          });
        }
        modal.closeModal();
      });


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
     * 缓存请求参数
     */
    $_storeActionRequests() {
      this.storageActionRequests[`action_${this.actionId}`] = this.requestParamsStr;
      localStorage.setItem(Constants.LOCAL_STORAGE.ACTION_REQUESTS, JSON.stringify(this.storageActionRequests));
    },
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
    }

    .body {
    }
  }
}
</style>
