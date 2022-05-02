import activeService from './fixtures/activeService.json';
import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

export const state = () => ({
    item: {},
    loading: true,
});

export const mutations = {
    SET_SERVICE(state, payload) {
        state.item = { ...payload };
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
};

export const actions = {
    async GET_SERVICE({ commit }, { id, contactId }) {
        commit('SET_LOADING', true);
        let { data: service } = await axios.get(`/api/v1/oneproduct/${id}/${contactId}`, {
            withCredentials: true,
            params: {
                _format: 'json',
            },
        });
        service = prettifyService(service);
        commit('SET_SERVICE', service);
        commit('SET_LOADING', false);
    },
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
