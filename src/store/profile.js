import { axios } from '@/plugins/axios';
import { prettifyContactData } from '@/utils';

export const state = () => ({
    isCompany: true,
    isPerson: false,
    user: {
        name: '',
        email: '',
        phone: '',
    },
    company: {
        ogrn: '',
        okved: '',
        address: '',
        certificate: '',
        ownership: '',
    },
    companyForms: [
        { value: 'Частная собственность', text: 'Частная собственность' },
        { value: 'Федеральная собственность', text: 'Федеральная собственность' },
    ],
});

export const mutations = {
    SET_USER(state, payload) {
        state.user = { ...payload };
    },
    SET_COMPANY(state, payload) {
        state.company = { ...payload };
    },
};

export const actions = {
    async GET_CONTACT_DATA({ commit, dispatch, rootState }) {
        const contactDataId = rootState.users.user.contactdata_id;
        console.log('contactDataId', contactDataId);
        if (!!contactDataId) {
            // получаем контакт дату
            const { data: response } = await axios.get(`/api/v1/onecontactdata/${contactDataId}`, {
                withCredentials: true,
                params: {
                    _format: 'json',
                },
            });
            // из-за недосмотра возвращется массив с объектами, берем нулевой элемент
            console.log('contactData', response[0]);
            const { user, company } = prettifyContactData(response[0]);
            commit('SET_USER', user);
            commit('SET_COMPANY', company);
        } else {
            // ставим контакт дату в пустые значения
            commit('SET_USER', { name: '', email: '', phone: '' });
            commit('SET_COMPANY', {
                ogrn: '',
                okved: '',
                address: '',
                certificate: '',
                ownership: '',
            });
        }
    },
    async SAVE_CONTACT_DATA({ commit, dispatch, rootState, state, rootGetters }) {
        const contactDataId = rootState.users.user.contactdata_id;
        if (!rootGetters['token/CSRF_TOKEN']) {
            await dispatch('token/GET_CSRF', null, { root: true });
        }
        const token = rootGetters['token/CSRF_TOKEN'];
        const config = {
            withCredentials: true,
            params: {
                _format: 'json',
            },
            headers: {
                'X-CSRF-Token': token,
            },
        };
        const data = {
            bundle: [
                {
                    target_id: 'predpriyatie',
                    target_type: 'contactdata_type',
                },
            ],
            title: [
                {
                    value: state.user.name,
                },
            ],
            field_phone: [
                {
                    value: state.user.phone,
                },
            ],
            field_email: [
                {
                    value: state.user.email,
                },
            ],
            field_ogrn: [
                {
                    value: state.company.ogrn,
                },
            ],
            field_okved: [
                {
                    value: state.company.okved,
                },
            ],
            field_ownership: [
                {
                    value: state.company.ownership,
                },
            ],
            field_address: [
                {
                    value: state.company.address,
                },
            ],
            field_certificate: [
                {
                    value: state.company.certificate,
                },
            ],
        };
        let response;
        if (!!contactDataId) {
            ({ data: response } = await axios.patch(`/contactdata/${contactDataId}`, data, config));
        } else {
            ({ data: response } = await axios.post('/entity/contactdata', data, config));
        }
        console.log('save response', response);
    },
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
