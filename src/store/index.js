import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import token from './token';
import catalog from './catalog';
import filters from './filters';
import activeService from './active-service';
import newServices from './new-services';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { users, catalog, filters, activeService, newServices, token },
});
