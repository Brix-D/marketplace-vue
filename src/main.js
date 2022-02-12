import Vue from 'vue';
require('dotenv').config();
import colors from 'vuetify/es5/util/colors';
import App from './App.vue';
import router from './router';

import store from './store';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
