/**
 * @description
 *    - {validator: FormValidateUtil.integerPositive, trigger: 'blur'}
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export default class FormValidateUtil {
  /**
   * 名称
   * @param rule
   * @param value
   * @param callback
   */
  static name = (rule, value, callback) => {
    if (/^[\u4e00-\u9fa5a-z0-9]{2,16}$/i.test(value)) {
      callback();
    } else {
      callback(new Error('名称为2-16位中英文字母及数字'));
    }
  };

  /**
   * 校验relation-url  /xxx/xxxx/xxx.xx/xx
   * @param rule
   * @param value
   * @param callback
   */
  static relationUrl = (rule, value, callback) => {
    if (/^(\/([0-9a-z_\-#()])+)*(\/([0-9a-z_\-#.()])+)$/i.test(value)) {
      callback();
    } else {
      callback(new Error('请输入合法url'));
    }
  };

  /**
   * 校验ip
   * @param rule
   * @param value
   * @param callback
   */
  static ip = (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (/^([0-9]{1,3}.){3}[0-9]{1,3}$/.test(value) && value.split('.').filter(v => (Number(v) && Number(v) >= 0 && Number(v) <= 255)).length === 4) {
      callback();
    } else {
      callback(new Error('请输入合法ip'));
    }
  };

  /**
   * 可为负数的数字，可有小数点
   * @param rule
   * @param value
   * @param callback
   */
  static number = (rule, value, callback) => {
    if (!/^-?(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
      callback(new Error('请输入合法数字'));
    } else {
      callback();
    }
  };

  /**
   * 只能是正数的数字，可有小数点
   * @param rule
   * @param value
   * @param callback
   */
  static numberPositive = (rule, value, callback) => {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
      callback(new Error('请输入不小于0的数字'));
    } else {
      callback();
    }
  };

  /**
   * 可为负数的小数点后两位数字
   * @param rule
   * @param value
   * @param callback
   */
  static numberD2 = (rule, value, callback) => {
    if (!/^-?(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
      callback(new Error('请输入合法数字'));
    } else if (!/^-?(0|[1-9]\d*)(\.\d{1,2})?$/.test(value)) {
      callback(new Error('输入的数字，只能精确到小数点后两位'));
    } else {
      callback();
    }
  };

  /**
   * 只能是正数的小数点后两位数字
   * @param rule
   * @param value
   * @param callback
   */
  static numberPositiveD2 = (rule, value, callback) => {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
      callback(new Error('请输入不小于0的数字'));
    } else if (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value)) {
      callback(new Error('输入的数字，只能精确到小数点后两位'));
    } else {
      callback();
    }
  };

  /**
   * 只能是整数的数字
   * @param rule
   * @param value
   * @param callback
   */
  static integer = (rule, value, callback) => {
    if (!/^-?(0|[1-9]\d*)$/.test(value)) {
      callback(new Error('请输入整数'));
    } else {
      callback();
    }
  };

  /**
   * 只能是正整数的数字
   * @param rule
   * @param value
   * @param callback
   */
  static integerPositive = (rule, value, callback) => {
    if (!/^(0|[1-9]\d*)$/.test(value)) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  };

  /**
   * 手机号
   * @param rule
   * @param value
   * @param callback
   */
  static mobilePhone = (rule, value, callback) => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error('11位手机号格式有误'));
    } else {
      callback();
    }
  };

  /**
   * 微信OpenId
   * @param rule
   * @param value
   * @param callback
   */
  static weChatOpenId = (rule, value, callback) => {
    if (value && !/^[a-z0-9_\-=]{28}$/i.test(value)) {
      callback(new Error('openId格式有误'));
    } else {
      callback();
    }
  };

  /**
   * 必须同时包含字母与数字
   * @param rule
   * @param value
   * @param callback
   */
  static onlyLetterNumber = (rule, value, callback) => {
    if (!/^([0-9]+[a-z0-9]*[a-z]+[a-z0-9]*|[a-z]+[a-z0-9]*[0-9]+)+[a-z0-9]*$/i.test(value)) {
      callback(new Error('必须同时包含字母与数字'));
    } else {
      callback();
    }
  };

  /**
   * 只能包含中文字母和数字
   * @param rule
   * @param value
   * @param callback
   */
  static zhLetterAndNumber = (rule, value, callback) => {
    // 后台不支持下划线查询所以除去下划线
    if (!/^([\u4e00-\u9fa5]|[a-z0-9])*$/i.test(value)) {
      callback(new Error('只能输入中文，字母与数字'));
    } else {
      callback();
    }
  };

  /**
   * 只能包含字母和数字
   * @param rule
   * @param value
   * @param callback
   */
  static letterAndNumber = (rule, value, callback) => {
    if (!/^[a-z0-9]*$/i.test(value)) {
      callback(new Error('只能输入字母与数字'));
    } else {
      callback();
    }
  };

  /**
   * 验证第一个密码，必须要与第二个确认密码配合使用
   *
   *      formRule: {
   *          password: [
   *              { validator: (rule, value, callback)=> { ViewDesignValidateUtil.password1(this.$refs.formField1Ref, 'password2')(rule, value, callback); } }
   *          ]
   *      }
   * @param formRef               表单Ref对象
   * @param password2FieldName    第二个确认密码的字段名
   * @returns {function(...[*]=)}
   */
  static password1of2 = function (formRef, password2FieldName) {
    return (rule, value, callback) => {
      if (value.length < 6 || !(/[a-z]/i.test(value) && /[0-9]/.test(value))) {
        callback(new Error('新密码必须为6-20位字母+数字组合，支持特殊字符'));
      } else {
        if (formRef.model[password2FieldName] !== '') {
          // 对第二个密码框单独验证
          formRef.validateField(password2FieldName);
        }
        callback();
      }
    };
  };

  /**
   * 验证第二个确认密码，必须要与第一个密码配合使用
   *      formRule: {
   *          password2: [
   *              { validator: (rule, value, callback)=> { ViewDesignValidateUtil.password1(this.$refs.formField1Ref, 'password')(rule, value, callback); } }
   *          ]
   *      }
   * @param formRef               表单Ref对象
   * @param password1FieldName    第一个密码的字段名
   * @returns {function(...[*]=)}
   */
  static password2of2 = function (formRef, password1FieldName) {
    return (rule, value, callback) => {
      if (value !== formRef.model[password1FieldName]) { // 与第一个密码进行对比
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    };
  };

  /**
   * cron表达式
   * @param rule
   * @param value
   * @param callback
   */
  static cron = (rule, value, callback) => {
    if (!value) return callback();
    // 值数组
    const valArr = `${value}`.split(' ').filter(val => val);
    if (valArr.length === 6 || valArr.length === 7) {
      // 秒
      if (!/^([0-9]|[1-5][0-9])([-,/]([0-9]|[1-5][0-9]))?$/.test(valArr[0]) && valArr[0] !== '*') {
        return callback(new Error('时间元素 第1个【秒】，有误'));
      }
      // 分
      if (!/^([0-9]|[1-5][0-9])([-,/]([0-9]|[1-5][0-9]))?$/.test(valArr[1]) && valArr[1] !== '*') {
        return callback(new Error('时间元素 第2个【分】，有误'));
      }
      // 时
      if (!/^(1?[0-9]|2[0-3])([-,/](1?[0-9]|2[0-3]))?$/.test(valArr[2]) && valArr[2] !== '*') {
        return callback(new Error('时间元素 第3个【时】，有误'));
      }
      // 日期
      if (!/^([12]?[0-9]|3[0-1])([-,/]([12]?[0-9]|3[0-1]))?$/.test(valArr[3]) && !/^[LWC*?]$/i.test(valArr[3])) {
        return callback(new Error('时间元素 第4个【日期】，有误'));
      }
      // 月
      if (!/^([1-9]|1[0-2]|[a-z]{3})([-,/]([1-9]|1[0-2]|[a-z]{3}))?$/i.test(valArr[4]) && valArr[4] !== '*') {
        return callback(new Error('时间元素 第5个【月份】，有误'));
      }
      // 星期
      if (!/^([1-7]|[a-z]{3})([-,/#]([1-7]|[a-z]{3}))?$/i.test(valArr[5]) && !/^([1-7]?[LWC#]|[*?])$/i.test(valArr[5])) {
        return callback(new Error('时间元素 第6个【星期】，有误'));
      }

      if ((valArr[3] !== '?' && valArr[5] !== '?') || (valArr[3] === '?' && valArr[5] === '?')) {
        return callback(new Error('时间元素 第4个与第6个必须只能有一个为【?】'));
      }

      // 年
      if (valArr[6]) {
        if (!/^(19[7-9][0-9]|20[0-9]{2})([-,/](19[0-9]{2}|20[0-9]{2}))?$/.test(valArr[6]) && valArr[6] !== '*') {
          return callback(new Error('时间元素 第7个【年】，有误'));
        }
      }
      return callback();
    } else {
      return callback(new Error('cron表达式的时间元素只能有6个或7个'));
    }
  };
}
