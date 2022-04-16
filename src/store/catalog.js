import offerFixture from './fixtures/offer.json';
import demandFixture from './fixtures/demand.json';
import { axios } from '@/plugins/axios';

export const state = () => ({
    items: [],
    // вспомогательные поля для каталогов
    offer: [],
    demand: [],
});

export const mutations = {
    SET_CATALOG(state, payload) {
        state.items = [...payload];
    },
    SET_OFFER(state, payload) {
        state.offer = [...payload];
    },
    SET_DEMAND(state, payload) {
        state.demand = [...payload];
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

    async GET_SERVICES({ commit }) {
        const offer = [];
        const demand = [];
        const response = await axios.get('/products/list', {
            withCredentials: true,
        });
        console.log(response);
        response.data.forEach((service) => {
            if (!!service.field_tip) {
                if (!!service.field_tip[0]) {
                    if (!!service.field_tip[0].value) {
                        if (service.field_tip[0].value === 'Потребность') {
                            demand.push(service);
                        }
                        if (service.field_tip[0].value === 'Предложение') {
                            offer.push(service);
                        }
                    }
                }
            }
        });
        commit('SET_OFFER', offer);
        commit('SET_DEMAND', demand);
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
