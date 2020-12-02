/**
 * @description
 * @author  g_eno_phy
 * @version 0.1
 *
 */

export default class PaginationUtil {
  /**
   * 默认分页配置
   */
  static default = (obj = {}) => {
    return Object.assign({current: 1, size: 10, total: 0}, obj);
  };

  /**
   * 解析分页
   * @param _scope
   * @param sources
   * @returns {{}|{}|{pageNow: *, pageSize: *}}
   */
  static resolve = (_scope, ...sources) => {
    if (_scope.pagination && Object.prototype.hasOwnProperty.call(_scope.pagination, 'current') && Object.prototype.hasOwnProperty.call(_scope.pagination, 'size')) {
      return Object.assign({}, {pageNow: _scope.pagination.current, pageSize: _scope.pagination.size}, ...sources);
    }
    return Object.assign({}, ...sources);
  };
}
