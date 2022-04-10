import activeService from './fixtures/activeService.json';

export const state = () => ({
    item: {},
});

export const mutations = {
    SET_SERVICE(state, payload) {
        state.item = { ...payload };
    },
};

export const actions = {
    async GET_SERVICE({ commit }, { alias }) {
        commit('SET_SERVICE', activeService);
    },
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
