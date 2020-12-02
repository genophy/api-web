/**
 * @description
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export default class Constants {
  /**
   * 缓存前缀
   */
  static STORAGE_PREFIX = process.env.VUE_APP_STORAGE_PREFIX || 'VUE_API_WEB_';

  /**
   *
   * @type {{MENU_LIST_SEQ: string, ROUTE_LIST: string, BTN_PERMISSION_LIST: string, MENU_LIST: string, USER_NAME: string, ROUTE_LIST_SEQ: string}}
   */
  static  LOCAL_STORAGE = {
    TOKEN          : `${this.STORAGE_PREFIX}LOCAL_TOKEN`,
    USER_NAME      : `${this.STORAGE_PREFIX}LOCAL_STORAGE_USER_NAME`, // 用户名
    THEME          : `${this.STORAGE_PREFIX}LOCAL_STORAGE_THEME`, // 主题
    PROJECT        : `${this.STORAGE_PREFIX}LOCAL_STORAGE_PROJECT`, // 项目名
    ACTION_REQUESTS: `${this.STORAGE_PREFIX}LOCAL_STORAGE_ACTION_REQUESTS` // action请求对象 {'action_{id}':{}}
  };

  /** mark modal 组件关闭的时间间隙： 默认300毫秒。点击关闭，触发隐藏动画（300毫秒），之后直接删除元素 */
  static MODAL_CLOSE_DURATION = 300;

  /**
   * 触发
   */
  static EMIT = {
    CLOSE_THIS_MODAL: 'on-close-this-modal'
  };

  static  CODE = {
    /* Response状态码 */
    RESPONSE_STATUS: {
      '401': '请重新登录',
      '502': '无法连接服务器',
      '503': '服务器重启中，请稍后',
      '404': '未找到资源'
    }
  };

  /**
   * 配置
   */
  static PARAMS = {
    // 性别
    SEX_TYPE: [
      {id: '0', name: '女'},
      {id: '1', name: '男'}
    ]

  };


  // 页面路由类型
  static ROUTER_TYPE = {
    fullScreen: [], // 需要全屏的页面
    skip      : [], // 默认跳过的页面
    button    : [] // 按钮
  };

  /**
   * 不包括在默认显示的路由中
   * @type {[string]}
   */
  static  EXCLUDE_DEFAULT_ROUTES = [];
}
