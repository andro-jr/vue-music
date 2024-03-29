import './assets/css/base.css';
import './assets/css/main.css';
import VeeValidatePlugin from '@/includes/validation';
import { auth } from './includes/firebase';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import icon from './directives/icon';
import 'nprogress/nprogress.css';

import i18n from './includes/i18n';

import { registerSW } from 'virtual:pwa-register';
import GlobalComponents from './includes/_globals';
import progressBar from './includes/progress-bar';

registerSW({ immediate: true });

progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(i18n);
    app.use(GlobalComponents);
    app.directive('icon', icon);

    app.mount('#app');
  }
});
