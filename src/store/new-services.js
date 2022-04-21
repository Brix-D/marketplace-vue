import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

export const state = () => ({
    suggestion: {
        service: {
            offer: [],
            demand: [],
        },
        goods: {
            offer: [],
            demand: [],
        },
    },
    items: {
        service: {
            offer: [],
            demand: [],
        },
        goods: {
            offer: [],
            demand: [],
        },
    },
});

export const mutations = {
    SET_SUGGESTION(state, { bundle, type, data }) {
        state.suggestion[bundle][type] = [...data];
    },
    SET_CURRENT(state, { bundle, type, data }) {
        state.items[bundle][type] = [...data];
    },
    // SET_OFFER(state, payload) {
    //     state.existingOffer = [...payload];
    // },
    // SET_DEMAND(state, payload) {
    //     state.existingDemand = [...payload];
    // },
    ADD_SERVICE(state, { bundle, listName, service }) {
        state.items[bundle][listName].push(service);
    },
    EDIT_SERVICE(state, { bundle, listName, service, index }) {
        state.items[bundle][listName][index] = { ...service };
    },
    DELETE_SERVICE(state, { bundle, listName, index }) {
        state.items[bundle][listName].splice(index, 1);
    },
    UPDATE_SERVICE_ID(state, { bundle, listName, index, id }) {
        state.items[bundle][listName][index].id = id;
    },
};

export const actions = {
    // TODO использовать новый запрос
    async GET_SUGGESTION_SERVICES({ commit }, { typeCatalog, typeBundle }) {
        const result = [];
        const response = await axios.get(`/api/v1/catalog/${typeCatalog}`, {
            withCredentials: true,
            params: {
                product: typeBundle,
                _format: 'json',
            },
        });
        response.data.forEach((service) => {
            result.push(prettifyService(service));
        });
        commit('SET_SUGGESTION', { bundle: typeBundle, type: typeCatalog, data: result });
    },
    async CREATE_SERVICE({ commit, rootGetters, dispatch }, { bundle, title, description, type }) {
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
                // TODO uslugi default
                type: [{ target_id: bundle }],
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
export const getters = {
    SUGGESTION: (state) => (bundle, type) => state.suggestion[bundle][type],
    CURRENT: (state) => (bundle, type) => state.items[bundle][type],
};

export default { namespaced: true, state, mutations, actions, getters };
