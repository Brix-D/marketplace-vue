import userFixture from './fixtures/user.json';
const isDev = process.env.NODE_ENV === 'development';
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
        if (!isDev) {
            console.log('--- user info data', response.data);
            commit('SET_USER_INFO', response.data);
        } else {
            console.log('--- in development used local user fixture', userFixture);
            commit('SET_USER_INFO', userFixture);
        }
    },
};

export const getters = {
    LOGGED: (state) => state.user.logged,
};

export default { namespaced: true, state, mutations, actions, getters };
