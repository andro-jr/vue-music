import './assets/css/base.css';
import './assets/css/main.css';
import VeeValidatePlugin from '@/includes/validation';
import { auth } from './includes/firebase';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import icon from './directives/icon';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive('icon', icon);

    app.mount('#app');
  }
});
