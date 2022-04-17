import offerFixture from './fixtures/offer.json';
import demandFixture from './fixtures/demand.json';
import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

export const state = () => ({
    items: [],
});

export const mutations = {
    SET_CATALOG(state, payload) {
        state.items = [...payload];
    },
};

export const actions = {
    async GET_CATALOG({ commit }, { type, authorId }) {
        //switch (type) {
        // case 'offer': {
        //     commit('SET_CATALOG', offerFixture);
        //     break;
        // }
        // case 'demand': {
        //     commit('SET_CATALOG', demandFixture);
        //     break;
        // }
        //  default: {

        //}
        if (!['offer', 'demand'].includes(type)) {
            throw 'Incorrect Catalog Type';
        }

        const { data } = await axios.get(`/api/v1/catalog/${type}`, {
            withCredentials: true,
            params: {
                _format: 'json',
                ...(authorId && { author_id: authorId }),
            },
        });
        const dataArray = Object.values(data);
        const catalog = dataArray.map((service) => prettifyService(service));
        console.log('catalog catalog', catalog);
        commit('SET_CATALOG', catalog);
    },
    // async TEST_AXIOS({ commit }) {
    //     console.log('this', this);
    //     const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     console.log(data);
    // },
};

export default { namespaced: true, state, mutations, actions };
