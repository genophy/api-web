import Vue from 'vue';
import VueRouter from 'vue-router';

// 屏蔽路由错误
const originalPush       = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(() => {
    // 若路由导航重复
    // if (err.name === 'NavigationDuplicated') {
    //   ModalUtil.openMsgInfo({message: '当前页面已打开', duration: 600});
    // }
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path    : '/',
    redirect: '/main'
  },
  {
    path     : '/main',
    name     : 'Main',
    component: () => import('@/views/main/Main.vue')
  },
  {
    path    : '**',
    name    : '404',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
