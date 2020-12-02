import { AreaUtil } from '@/libs/util';

/**
 * 地区code转义
 * @constructor
 * @param areaCode
 * @param defaultValue
 * @param splitStr
 * @returns {"-" | any | string}
 */
export const CusAreaConvert = (areaCode, defaultValue = '-', splitStr = '/') => {
  if (!areaCode) {
    return defaultValue || areaCode;
  }
  return AreaUtil.getCascadeNames(areaCode).join(splitStr) || defaultValue;
};
