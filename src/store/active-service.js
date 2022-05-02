import { axios } from '@/plugins/axios';
import { prettifyService } from '@/utils';

export const state = () => ({
    item: {},
    loading: true,
});

export const mutations = {
    SET_SERVICE(state, payload) {
        state.item = { ...payload };
    },
    SET_LOADING(state, payload) {
        state.loading = payload;
    },
};

export const actions = {
    async GET_SERVICE({ commit }, { id, contactId }) {
        commit('SET_LOADING', true);
        let { data: service } = await axios.get(`/api/v1/oneproduct/${id}/${contactId}`, {
            withCredentials: true,
            params: {
                _format: 'json',
            },
        });
        service = prettifyService(service);
        commit('SET_SERVICE', service);
        commit('SET_LOADING', false);
    },
    async SAVE_ORDER_ITEM({ commit, state, rootGetters, dispatch }) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const serviceVariationId = state.item.variationId;
        console.log('serviceVariationId', serviceVariationId);
        const data = {
            type: [
                {
                    target_id: 'default',
                },
            ],
            purchased_entity: [
                {
                    target_id: serviceVariationId,
                },
            ],
            unit_price: [
                {
                    number: state.item.price,
                    currency_code: 'RUB',
                },
            ],
        };
        const response = await axios.post('/entity/commerce_order_item', data, {
            withCredentials: true,
            headers: {
                'X-CSRF-Token': token,
            },
            params: {
                _format: 'json',
            },
        });
        console.log('order item response', response.data);
        return response.data.order_item_id[0].value;
    },
    async SAVE_ORDER({ commit, state, rootGetters, dispatch }, { type, orderItemId }) {
        if (!rootGetters['token/CSRF_TOKEN']) {
            dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        let target_id;
        switch (type) {
            case 'offer':
                target_id = 'zakaz_uslugi';
                break;
            case 'demand':
                target_id = 'default';
                break;
            default:
                target_id = null;
                throw 'Неверный тип type';
        }
        const data = {
            type: [
                {
                    target_id,
                },
            ],
            store_id: [
                {
                    target_id: 1,
                },
            ],
            order_number: [
                {
                    value: state.item.title,
                },
            ],
            order_items: [
                {
                    target_id: orderItemId,
                },
            ],
        };
        const response = await axios.post('/entity/commerce_order', data, {
            withCredentials: true,
            headers: {
                'X-CSRF-Token': token,
            },
            params: {
                _format: 'json',
            },
        });
        console.log('response order', response.data);
    },
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
