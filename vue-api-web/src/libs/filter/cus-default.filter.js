/**
 * @description
 * @author  g_eno_phy
 * @version 0.1
 *
 */
import { LangUtil } from '@/libs/util';

/**
 * 显示value的默认值  {{row.rate | CusDefault(`${rate}%`)}}
 * @constructor
 * @param value
 * @param newValue
 * @param defaultValue
 * @returns {string | string | any}
 */
export const CusDefault = (value, newValue, defaultValue = '-') => {
  return LangUtil.isNil(value) ? defaultValue : (LangUtil.isNil(newValue) ? value : newValue);
};
