import { axios } from '@/plugins/axios';
import { prettifyProductIds, prettifyService } from '@/utils';

export const state = () => ({
    categories: [],
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
    SET_CATEGORIES(state, categories) {
        state.categories = [...categories];
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
    async GET_CATEGORIES({ commit }, { typeCatalog, typeBundle }) {
        const response = await axios.get(`/api/v1/categories/${typeCatalog}`, {
            withCredentials: true,
            params: {
                product: typeBundle,
                _format: 'json',
            },
        });
        console.log(`categories ${typeCatalog} ${typeBundle}`, response.data);
        commit('SET_CATEGORIES', response.data);
    },
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
            result.push(...contact.products.map((service) => prettifyService(service, contactId)));
        });
        commit('SET_SUGGESTION', { bundle: typeBundle, type: typeCatalog, data: result });
    },
    async GET_SERVICES({ commit, dispatch, rootGetters }, { contactDataId }) {
        const response = await dispatch(
            'profile/GET_CONTACT_DATA',
            { contactDataId },
            { root: true }
        );
        let resultOffer = {
            service: [],
            goods: [],
        };
        let resultDemand = {
            service: [],
            goods: [],
        };
        if (!!response) {
            const { products_offer: productsOffer, products_demand: productsDemand } = response;

            productsOffer.forEach((product) => {
                const prettifiedProduct = prettifyService(product, contactDataId);
                if (prettifiedProduct.type === '????????????') {
                    resultOffer.service.push(prettifiedProduct);
                } else if (prettifiedProduct.type === '??????????') {
                    resultOffer.goods.push(prettifiedProduct);
                }
            });
            // ???????????? ?????????????????? ????????????????, ?????????????????? ???????????????????? ????????????, ?? ???????????? ??????????????????
            productsDemand.forEach((product) => {
                const prettifiedProduct = prettifyService(product, contactDataId);
                if (prettifiedProduct.type === '????????????') {
                    resultDemand.service.push(prettifiedProduct);
                } else if (prettifiedProduct.type === '??????????') {
                    resultDemand.goods.push(prettifiedProduct);
                }
            });
        }
        commit('SET_CURRENT', { bundle: 'service', type: 'offer', data: resultOffer.service });
        commit('SET_CURRENT', { bundle: 'goods', type: 'offer', data: resultOffer.goods });
        commit('SET_CURRENT', {
            bundle: 'service',
            type: 'demand',
            data: resultDemand.service,
        });
        commit('SET_CURRENT', { bundle: 'goods', type: 'demand', data: resultDemand.goods });
    },
    async CREATE_SERVICE(
        { commit, rootGetters, dispatch },
        { bundle, title, description, type, price, categoryId }
    ) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            await dispatch('token/GET_CSRF', null, { root: true });
        }
        let bundleField;
        let categoryField;
        switch (bundle) {
            case 'service':
                bundleField = 'uslugi';
                categoryField = 'field_kategoriya_uslug';
                break;
            case 'goods':
                bundleField = 'default';
                categoryField = 'field_kategoriya_tovara';
                break;
            default:
                bundleField = null;
                categoryField = null;
                throw '???????????????? ?????? bundle';
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
                        target_id: 1,
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
                [categoryField]: [{ target_id: categoryId }],
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
    async CREATE_SERVICE_VARIATION(
        { commit, rootGetters, dispatch },
        { bundle, article, productId, price, title }
    ) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            await dispatch('token/GET_CSRF', null, { root: true });
        }
        let bundleField;
        switch (bundle) {
            case 'service':
                bundleField = 'uslugi';
                break;
            case 'goods':
                bundleField = 'goods';
                break;
            default:
                bundleField = null;
                throw '???????????????? ?????? bundle';
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const data = {
            type: [
                {
                    target_id: bundleField,
                },
            ],
            sku: [
                {
                    value: article.toString(),
                },
            ],
            title: [
                {
                    value: title,
                },
            ],
            product_id: [
                {
                    target_id: productId,
                },
            ],
            price: [
                {
                    number: price,
                    currency_code: 'RUB',
                },
            ],
        };
        const response = await axios.post('/entity/commerce_product_variation', data, {
            withCredentials: true,
            params: {
                _format: 'json',
            },
            headers: {
                'X-CSRF-Token': token,
            },
        });
    },
    PREPARE_CONTACT_DATA({ state }, { company, email, phone }) {
        const { offerIds, demandIds } = prettifyProductIds(state.items);
        console.log('offerIds', offerIds);
        console.log('demandIds', demandIds);
        return {
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
        };
    },
    async CREATE_CONTACT_DATA({ commit, dispatch, rootGetters, state }, { company, email, phone }) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            await dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const data = await dispatch('PREPARE_CONTACT_DATA', { company, email, phone });
        console.log('data on create', data);
        await axios.post('/entity/contactdata', data, {
            withCredentials: true,
            headers: {
                'X-CSRF-Token': token,
            },
            params: {
                _format: 'json',
            },
        });
    },
    async EDIT_CONTACT_DATA(
        { commit, dispatch, rootGetters, state },
        { contactDataId, company, email, phone }
    ) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            await dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const data = await dispatch('PREPARE_CONTACT_DATA', { company, email, phone });
        await axios.patch(`/contactdata/${contactDataId}`, data, {
            withCredentials: true,
            headers: {
                'X-CSRF-Token': token,
            },
            params: {
                _format: 'json',
            },
        });
    },
};
export const getters = {
    SUGGESTION: (state) => (bundle, type) => state.suggestion[bundle][type],
    CURRENT: (state) => (bundle, type) => state.items[bundle][type],
};

export default { namespaced: true, state, mutations, actions, getters };
