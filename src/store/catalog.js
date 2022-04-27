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
        // const dataArray = Object.values(data);
        const catalog = [];
        data.forEach((contact) => {
            const contactId = parseInt(contact.id[0].value);
            catalog.push(...contact.products.map((service) => prettifyService(service, contactId)));
        });

        commit('SET_CATALOG', catalog);
    },
};

export default { namespaced: true, state, mutations, actions };
