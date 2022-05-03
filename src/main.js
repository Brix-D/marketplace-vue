import Vue from 'vue';
import '@/assets/scss/all.scss';
require('dotenv').config();

import App from './App.vue';
import router from './router';
import VueMeta from 'vue-meta';
import store from './store';
import vuetify from './plugins/vuetify';
import { axios } from '@/plugins/axios';
import { toastMessage } from '@/mixins/index';

Vue.use(toastMessage);
Vue.use(VueMeta);
Vue.use({
    install(Vue) {
        Vue.prototype.$axios = axios;
    },
});

Vue.config.productionTip = false;

//let wrapper = window.document.querySelector('.marketplace-wrapper');
//if (wrapper) {
//    let app = window.document.createElement('div');
//   app.setAttribute('id', 'marketplace-app');
//   wrapper.insertBefore(app, wrapper.childNodes[0]);

new Vue({
    router,
    store,
    vuetify,
    async created() {
        await store.dispatch('users/GET_USER_INFO');
    },
    render: (h) => h(App),
}).$mount('#app');
//}
