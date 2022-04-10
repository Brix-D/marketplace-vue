import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import catalog from './catalog';
import filters from './filters';
import activeService from './active-service';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { users, catalog, filters, activeService },
});
