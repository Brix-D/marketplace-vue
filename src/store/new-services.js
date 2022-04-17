import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

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
    EDIT_SERVICE(state, { listName, service, index }) {
        state[listName][index] = { ...service };
    },
    DELETE_SERVICE(state, { listName, index }) {
        state[listName].splice(index, 1);
    },
    UPDATE_SERVICE_ID(state, { listName, index, id }) {
        state[listName][index].id = id;
    },
};

export const actions = {
    // TODO использовать новый запрос
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
        if (!rootGetters['token/CSRF_TOKEN']) {
            dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const response = await axios.post(
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
        console.log('product_id', response.data.product_id);
        return response.data.product_id[0].value;
    },
    async CREATE_CONTACT_DATA({ commit, dispatch, rootGetters, state }, { company, email, phone }) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        let demandIds = state.newDemand.map((service) => {
            return { target_id: service.id };
        });
        let offerIds = state.newOffer.map((service) => {
            return { target_id: service.id };
        });
        await axios.post(
            '/entity/contactdata',
            {
                title: [
                    {
                        value: company,
                    },
                ],
                field_email: [
                    {
                        value: email,
                    },
                ],
                field_phone: [
                    {
                        value: phone,
                    },
                ],
                bundle: [
                    {
                        target_id: 'predpriyatie',
                        target_type: 'contactdata_type',
                    },
                ],
                field_potrebnosti: demandIds,
                field_predlozhenie: offerIds,
            },
            {
                withCredentials: true,
                headers: {
                    'X-CSRF-Token': token,
                },
                params: {
                    _format: 'json',
                },
            }
        );
    },
};

export default { namespaced: true, state, mutations, actions };
