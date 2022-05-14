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
        console.log('user', rootState.users.user);
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
};

export const getters = {};

export default { namespaced: true, state, mutations, actions, getters };
