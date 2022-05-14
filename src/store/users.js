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
        if (!isDev) {
            const response = await axios.get('/api/v1/user-info', {
                withCredentials: true,
                params: {
                    _format: 'json',
                },
            });
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
    CONTACT_DATA_ID: (state) => state.user.contactdata_id,
};

export default { namespaced: true, state, mutations, actions, getters };
