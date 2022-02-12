export const state = () => ({
    items: [],
});

export const mutations = {
    SET_USERS(state, payload) {
        state.items = [...payload];
    },
};

export const actions = {
    async GET_USERS({ commit }) {},
};

export default { namespaced: true, state, mutations, actions };
