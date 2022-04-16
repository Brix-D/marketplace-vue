import { axios } from '@/plugins/axios';

export const state = () => ({
    existingOffer: [],
    existingDemand: [],
    newOffer: [],
    newDemand: [],
});

export const mutations = {
    SET_OFFER(state, payload) {
        state.existingOffer = [...payload];
    },
    SET_DEMAND(state, payload) {
        state.existingDemand = [...payload];
    },
    ADD_SERVICE(state, { listName, service }) {
        state[listName].push(service);
    },
    DELETE_SERVICE(state, { listName, index }) {
        state[listName].splice(index, 1);
    },
};

function prettifyService(service) {
    return {
        id: service.product_id[0].value,
        title: service.title[0].value,
        description: service.body[0].value,
        type: service.field_tip[0].value,
    };
}

export const actions = {
    async GET_SERVICES({ commit }) {
        const offer = [];
        const demand = [];
        const response = await axios.get('/products/list', {
            withCredentials: true,
        });
        response.data.forEach((service) => {
            if (!!service.field_tip) {
                if (!!service.field_tip[0]) {
                    if (!!service.field_tip[0].value) {
                        if (service.field_tip[0].value === 'Потребность') {
                            demand.push(prettifyService(service));
                        }
                        if (service.field_tip[0].value === 'Предложение') {
                            offer.push(prettifyService(service));
                        }
                    }
                }
            }
        });
        commit('SET_OFFER', offer);
        commit('SET_DEMAND', demand);
        // const emptyService = {
        //     id: performance.now(),
        //     title: '',
        //     description: '',
        // };
        // commit('ADD_SERVICE', { listName: 'newOffer', emptyService });
        // commit('ADD_SERVICE', { listName: 'newDemand', emptyService });
    },
    async CREATE_SERVICE({ commit, rootGetters, dispatch }, { title, description, type }) {
        dispatch('token/GET_CSRF', null, { root: true });
        const token = rootGetters['token/CSRF_TOKEN'];
        await axios.post(
            '/entity/commerce_product',
            {
                title: [
                    {
                        value: title,
                    },
                ],
                body: [
                    {
                        value: description,
                    },
                ],
                type: [{ target_id: 'uslugi' }],
                variations: [
                    {
                        target_id: 0,
                    },
                ],
                stores: [
                    {
                        target_id: 0,
                    },
                ],
                default_variation: [{ target_id: null }],
                field_tip: [
                    {
                        value: type,
                    },
                ],
                field_price: [{ number: 0, currency_code: 'RUB' }],
                field_deficit: [{ value: true }],
                field_category: [{ value: 'нет' }],
            },
            {
                withCredentials: true,
                headers: {
                    'X-CSRF-Token': token,
                },
            }
        );
    },
};

export default { namespaced: true, state, mutations, actions };
