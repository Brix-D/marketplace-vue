import offer from './fixtures/offer.json';
import demand from './fixtures/demand.json';
import { axios } from '@/plugins/axios';

export const state = () => ({
    offer: [],
    demand: [],
});

export const mutations = {
    SET_OFFER(state, payload) {
        state.offer = [...payload];
    },
    SET_DEMAND(state, payload) {
        state.demand = [...payload];
    },
};

export const actions = {
    async GET_OFFER({ commit }) {
        commit('SET_OFFER', offer);
    },
    async GET_DEMAND({ commit }) {
        commit('SET_DEMAND', demand);
    },
    // async TEST_AXIOS({ commit }) {
    //     console.log('this', this);
    //     const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     console.log(data);
    // },
};

export default { namespaced: true, state, mutations, actions };
