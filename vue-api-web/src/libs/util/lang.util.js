/**
 * @description
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export default class LangUtil {
  /**
   * 对象删除属性
   * @param obj
   * @param properties
   */
  static objDelProperties(obj, ...properties) {
    const res = window.$lodash.cloneDeep(obj);
    properties.forEach(prop => {
      if (Object.prototype.hasOwnProperty.call(res, prop)) {
        delete res[prop];
      }
    });
    return res;
  }

  /**
   * 过滤掉所有空属性
   * @param obj
   * @param defaultValue 若没有设置默认值，则删除obj的key属性
   * @returns {any}
   */
  static objFilterNil(obj, defaultValue) {
    const res = window.$lodash.cloneDeep(obj);
    Object.keys(res).forEach(key => {
      if (this.isNil(res[key])) {
        if (defaultValue === null || defaultValue === undefined) {
          delete res[key];
        } else {
          res[key] = defaultValue;
        }
      }
    });
    return res;
  }

  /**
   * 过滤下拉框中值为'-1' 或 -1 的内容为''
   * @param obj
   * @param selectorKeys
   */
  static objFilterSelector(obj, ...selectorKeys) {
    const returnObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 若发现了下拉框值
        if (selectorKeys && selectorKeys.includes(key)) {
          returnObj[key] = `${obj[key]}` === '-1' ? '' : obj[key];
        } else {
          returnObj[key] = obj[key];
        }
      }
    }
    return returnObj;
  }

  /**
   * 展开array
   * @param list
   * @param childrenKey 子列表key
   */
  static flattenWithChildrenKey(list, childrenKey) {
    list      = list || [];
    const arr = [];
    list.forEach(item => {
      // 若存在子列表，则进行递归处理
      if (item[childrenKey]) {
        arr.push(...this.flattenWithChildrenKey(item[childrenKey], childrenKey));
        item[childrenKey] = undefined;
      }
      arr.push(item);
    });
    return arr;
  }

  /**
   * 遍历list里参数，并处理
   * @param list
   * @param callback 参数有item parent
   * @param childrenKey 子列表key
   * @param parent 父级对象
   * @return {any[]}
   */
  static recursionSetProperties(list, callback = (item, parent) => item, childrenKey = '', parent) {
    return (list || []).map(item => {
      if (typeof callback === 'function') {
        item = callback(item, parent);
      }
      if (item[childrenKey]) { // 若存在子列表，则进行递归处理
        item[childrenKey] = this.recursionSetProperties(item[childrenKey], callback, childrenKey, item);
      }
      return item;
    });
  }

  /**
   * 遍历obj里参数，从其中找出objForm所有存在的参数，进行传值。
   * <br>
   *    callbackMap是传值辅助函数
   * <br>
   *    callbackMap : {name,age:val=>Number(val),score}
   * @param obj
   * @param objFrom
   * @param callbackMap
   */
  static assignProperties(obj, objFrom, callbackMap = {}) {
    const objRes = window.$lodash.cloneDeep(obj);
    Object.keys(objRes).forEach(key => {
      // 若objForm存在key，则继续
      if (typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key)) {
        // 若callbackMap中也存在这个key，且callbackMap[key]是函数，则返回函数处理后的结果
        if (callbackMap && Object.prototype.hasOwnProperty.call(callbackMap, key) && typeof callbackMap[key] === 'function') {
          objRes[key] = callbackMap[key](objFrom[key]);
        } else {
          // 直接赋值objForm中的值
          if (objFrom && Object.prototype.hasOwnProperty.call(objFrom, key)) {
            objRes[key] = objFrom[key];
          }
        }
      }
    });
    return objRes;
  }

  /**
   * 值是否为空
   *  - 若是 undefined 或 null 则表示空，包括字符串的 'undefined' 'null' 'none'
   * @param val
   * @returns {boolean}
   */
  static isNil(val) {
    return !!(typeof val === 'undefined' || val === null || ~['undefined', 'null'].indexOf(`${val}`.toLowerCase()));
  }
}
