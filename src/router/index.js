import { createRouter, createWebHistory } from 'vue-router';
import HomeViewVue from '@/views/HomeView.vue';
import AboutViewVue from '@/views/AboutView.vue';
import ManageViewVue from '@/views/ManageView.vue';
import useUserStore from '@/stores/user';
import SongViewVue from '@/views/SongView.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeViewVue
  },
  {
    name: 'about',
    path: '/about',
    component: AboutViewVue
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: ManageViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongViewVue
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next();
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
