import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Default from "@/layouts/default.vue";
import Fullwidth from "@/layouts/fullwidth.vue";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Fullwidth,
    children: [
      {
        path: '',
        component: HomeView,
        meta: {
          layout: 'full-width',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/auth',
    component: Default,
    children: [
      {
        path: '',
        component: AuthView,
        meta: {
          layout: 'default'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const foundUser = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.requiresAuth && !foundUser) {
    next('/auth');
  } else if (to.path === '/auth' && foundUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
