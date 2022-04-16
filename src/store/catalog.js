import offerFixture from './fixtures/offer.json';
import demandFixture from './fixtures/demand.json';
import { axios } from '@/plugins/axios';

export const state = () => ({
    items: [],
});

export const mutations = {
    SET_CATALOG(state, payload) {
        state.items = [...payload];
    },
};

export const actions = {
    async GET_CATALOG({ commit }, { type }) {
        switch (type) {
            case 'offer': {
                commit('SET_CATALOG', offerFixture);
                break;
            }
            case 'demand': {
                commit('SET_CATALOG', demandFixture);
                break;
            }
            default: {
                throw 'Incorrect Catalog Type';
            }
        }
    },
    // async TEST_AXIOS({ commit }) {
    //     console.log('this', this);
    //     const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     console.log(data);
    // },
};

export default { namespaced: true, state, mutations, actions };
