import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import service from './service';
import filters from './filters';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: { users, service, filters },
});
