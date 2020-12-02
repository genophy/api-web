/**
 * @description 按钮权限，若不包括在内部，则移除
 * @author  g_eno_phy
 * @code
 *   - usage : <button v-cus-btn-permission="btnAdd" >按钮</button>
 * @version 0.1
 *
 */
import { Constants } from '@/libs/util';

export const CusBtnPermission = {
  bind(el, binding) {
    const codes = JSON.parse(localStorage.getItem(Constants.LOCAL_STORAGE.BTN_PERMISSION_CODES) || '[]');
    //  若为在权限列表中未找到 且 不是debugger模式
    if (!~codes.indexOf(`${binding.value}`) && process.env.VUE_APP_DEBUGGER !== 'true') {
      el.hidden = true;
    }
  },
  inserted(el, binding, vnode) {
    // 若组件被隐藏，则直接移除。
    // bind最先执行，然后若未在权限中找到，则会让元素hidden，这里就会判断当hidden后，即可移除元素
    if (el.hidden) {
      vnode.elm.parentElement.removeChild(vnode.elm);
    }
  }
};
