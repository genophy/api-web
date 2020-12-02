import { LangUtil } from '@/libs/util';

/**
 * @description 经纬度坐标
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export const CusCoordinate = (point, defaultValue = '-', splitStr = ',') => {
  if (!point || LangUtil.isNil(point.lng) || LangUtil.isNil(point.lat)) {
    return defaultValue;
  }
  return [`${point.lng}`, `${point.lat}`].join(splitStr);
};
