// import allFilters from './fixtures/allFilters.json';
import { axios } from '@/plugins/axios';

export const state = () => ({
    // Все фильтры для каталога
    items: {},
    // Выбранные фильтры
    // 'group alias': [1,2,3]
    selected: {},
    search: '',
});

export const mutations = {
    SET_FILTERS(state, payload) {
        state.items = { ...payload };
    },
    APPLY_FILTERS(state, filters) {
        state.selected = JSON.parse(JSON.stringify(filters));
    },
    APPLY_SEARCH(state, search) {
        state.search = search;
    },
};

export const actions = {
    async GET_FILTERS({ commit }, { type }) {
        // const filters = allFilters;
        if (!['offer', 'demand'].includes(type)) {
            throw 'Incorrect Catalog Type';
        }
        const filters = await axios.get(`/api/v1/filters/${type}`, {
            params: {
                _format: 'json',
            },
        });
        commit('SET_FILTERS', filters.data);
        commit('APPLY_SEARCH', '');
        commit('APPLY_FILTERS', {});
    },
};

export const getters = {
    FILTERED_SERVICES: (state, getters) => (serviceList) => {
        // если выбрано хоть что-то
        if (Object.keys(state.selected).length) {
            // фильтруем список услуг по поиску
            return getters.FOUND_SERVICES(
                Object.keys(state.selected).reduce((acc, property) => {
                    // перебираем выбранные в фильтрах ключи
                    // фильтруем список услуг
                    // находим выбранные вариации данной группы
                    const selectedGroupVariations = state.items.groups
                        .find((commonGroup) => commonGroup.alias === property)
                        .variations.filter((variation) =>
                            state.selected[property].includes(variation.variationId)
                        )
                        .map((variation) => variation.name);
                    const resultByAttribute = acc.filter((service) => {
                        // услуга подлежит показу, если:
                        // у нее нету атрибута из фильтров (защита от несонхронизированных фильтров)
                        // значение атрибута равно одному из значений в фильтрах
                        // значение из фильтров достается по id варианта
                        // услуги еще нет в выборке (если она соотвествует двум и более критериям)
                        if (!service.hasOwnProperty(property)) {
                            return true;
                        }
                        //&&
                        //                         !acc.find((resultService) => resultService.id === service.id)

                        return selectedGroupVariations.includes(service[property]);
                        //    &&
                        //                         !acc.find((resultService) => resultService.id === service.id)
                    });
                    // acc.push(...resultByAttribute);
                    return resultByAttribute;
                }, serviceList)
            );
        } else {
            // если ничего не выбрано - возращаем полный список
            return getters.FOUND_SERVICES(serviceList);
        }
    },
    FOUND_SERVICES: (state) => (serviceList) => {
        return serviceList.filter((service) =>
            service.title.toLowerCase().includes(state.search.toLowerCase())
        );
    },
};

export default { namespaced: true, state, mutations, actions, getters };
