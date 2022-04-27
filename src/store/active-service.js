import activeService from './fixtures/activeService.json';
import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

export const state = () => ({
    item: {},
});

export const mutations = {
    SET_SERVICE(state, payload) {
        state.item = { ...payload };
    },
};

export const actions = {
    async GET_SERVICE({ commit }, { id }) {
        let { data: service } = await axios.get(`/api/v1/oneproduct/${id}`, {
            withCredentials: true,
            params: {
                _format: 'json',
            },
        });
        service = prettifyService(service);
        commit('SET_SERVICE', service);
    },
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
