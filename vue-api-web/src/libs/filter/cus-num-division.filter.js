/**
 * 数字相除
 * @constructor
 * @param number 数字
 * @param divNum 被除数
 * @param defaultValue
 * @returns {*}
 */
export const CusNumDivision = (number, divNum, fixNUm = 2, defaultValue = 0) => {
  number = Number(number);
  if (/^[0-9.-]+$/.test(number)) {
    // 若divNum也是数字，且不为0
    return (/\d+/.test(divNum) && Number(divNum) !== 0) ? (number / Number(divNum)).toFixed(fixNUm) : (number).toFixed(fixNUm);
  }
  return defaultValue;
};
