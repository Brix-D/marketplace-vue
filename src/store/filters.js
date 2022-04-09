import allFilters from './fixtures/allFilters.json';

export const state = () => ({
    // Все фильтры для каталога
    items: {},
    // Выбранные фильтры
    selected: {},
});

export const mutations = {
    SET_FILTERS(state, payload) {
        state.items = { ...payload };
    },
};

export const actions = {
    async GET_FILTERS({ commit }) {
        const filters = allFilters;
        commit('SET_FILTERS', filters);
    },
    APPLY_FILTERS({ commit }) {},
};

export const getters = {
    FILTERED_SERVICES: (serviceList) => {},
};

export default { namespaced: true, state, mutations, actions, getters };
