import { axios } from '@/plugins/axios';

export const state = () => ({
    csrf: '',
});

export const mutations = {
    SET_CSRF(state, payload) {
        state.csrf = payload;
    },
};

export const actions = {
    async GET_CSRF({ commit }) {
        const token = await axios.get('/session/token', {
            withCredentials: true,
        });
        commit('SET_CSRF', token.data);
    },
};

export const getters = {
    CSRF_TOKEN: (state) => state.csrf,
};

export default { namespaced: true, state, mutations, actions, getters };
