import { Constants } from '@/libs/util';

/**
 * @description
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export default class AreaUtil {
  /**
   * 获取级联codes
   * @param areaCode
   * @returns {string|*[]}
   */
  static getCascadeCodes(areaCode) {
    const areaCodeStr = `${areaCode}`;
    if (areaCodeStr && areaCodeStr.length >= 6) {
      const areaListSeq = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.AREA_LIST_SEQ));
      const parentCodes = window.$lodash.find(areaListSeq, item => item.code === areaCodeStr)?.parentCodes || [];
      return [...parentCodes, areaCodeStr];
    }
    return [areaCodeStr];
  }

  /**
   * 获取级联name
   * @param areaCode
   */
  static getCascadeNames(areaCode) {
    const areaCodeStr = `${areaCode}`;
    if (areaCodeStr && areaCodeStr.length >= 6) {
      const areaListSeq = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.AREA_LIST_SEQ));
      const parentObj   = window.$lodash.find(areaListSeq, item => item.code === areaCodeStr);
      if (parentObj) {
        return [...parentObj.parentNames, parentObj.name];
      }
      return [];
    }
    return [];
  }
}
