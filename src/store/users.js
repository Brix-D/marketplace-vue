import { axios } from '@/plugins/axios';

export const state = () => ({
    user: {},
});

export const mutations = {
    SET_USER_INFO(state, payload) {
        state.user = { ...payload };
    },
};

export const actions = {
    async GET_USER_INFO({ commit }) {
        const response = await axios.get('/api/v1/user-info', {
            withCredentials: true,
            params: {
                _format: 'json',
            },
        });
        console.log('response', response.data);
        commit('SET_USER_INFO', response.data);
    },
};

export const getters = {
    LOGGED: (state) => state.user.logged,
};

export default { namespaced: true, state, mutations, actions, getters };
