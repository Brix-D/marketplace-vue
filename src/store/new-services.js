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
    async GET_SUGGESTION_SERVICES({ commit }, { typeCatalog, typeBundle }) {
        const result = [];
        const response = await axios.get(`/api/v1/catalog/${typeCatalog}`, {
            withCredentials: true,
            params: {
                product: typeBundle,
                _format: 'json',
            },
        });
        response.data.forEach((contact) => {
            const contactId = parseInt(contact.id[0].value);
            result.push(...contact.products.map((service) => prettifyService(contactId, service)));
        });
        commit('SET_SUGGESTION', { bundle: typeBundle, type: typeCatalog, data: result });
    },
    async CREATE_SERVICE(
        { commit, rootGetters, dispatch },
        { bundle, title, description, type, price, category }
    ) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            dispatch('token/GET_CSRF', null, { root: true });
        }
        let bundleField;
        switch (bundle) {
            case 'service':
                bundleField = 'uslugi';
                break;
            case 'goods':
                bundleField = 'default';
                break;
            default:
                bundleField = null;
                throw 'Неверный тип bundle';
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
                type: [{ target_id: bundleField }],
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
                // field_tip: [
                //     {
                //         value: type,
                //     },
                // ],
                field_price: [{ number: price, currency_code: 'RUB' }],
                field_deficit: [{ value: true }],
                field_category: [{ value: category }],
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
        let offerIds = [];
        let demandIds = [];
        Object.keys(state.items).forEach((bundle) => {
            Object.keys(state.items[bundle]).forEach((type) => {
                state.items[bundle][type].forEach((item) => {
                    if (type === 'offer') {
                        offerIds.push({ target_id: item.id });
                    }
                    if (type === 'demand') {
                        demandIds.push({ target_id: item.id });
                    }
                });
            });
        });
        console.log('offerIds', offerIds);
        console.log('demandIds', demandIds);
        // state.items.forEach((bundle) => {
        //     bundle.forEach((type) => {
        //         demandIds.push({ target_id: service.id });
        //     });
        // });
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
