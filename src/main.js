import Vue from 'vue';
import '@/assets/scss/all.scss';
require('dotenv').config();

import App from './App.vue';
import router from './router';

import store from './store';
import vuetify from './plugins/vuetify';
import axios from '@/plugins/axios';

Vue.use(axios);

Vue.config.productionTip = false;

let wrapper = window.document.querySelector('.marketplace-wrapper');
if (wrapper) {
    let app = window.document.createElement('div');
    app.setAttribute('id', 'marketplace-app');
    wrapper.insertBefore(app, wrapper.childNodes[0]);

    new Vue({
        router,
        store,
        vuetify,
        render: (h) => h(App),
    }).$mount('#marketplace-app');
}
