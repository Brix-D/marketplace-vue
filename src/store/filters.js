import allFilters from './fixtures/allFilters.json';

export const state = () => ({
    // Все фильтры для каталога
    items: {},
    // Выбранные фильтры
    // 'group alias': [1,2,3]
    selected: {},
});

export const mutations = {
    SET_FILTERS(state, payload) {
        state.items = { ...payload };
    },
    APPLY_FILTERS(state, filters) {
        state.selected = JSON.parse(JSON.stringify(filters));
    },
};

export const actions = {
    async GET_FILTERS({ commit }) {
        const filters = allFilters;
        commit('SET_FILTERS', filters);
        commit('APPLY_FILTERS', {});
    },
};

export const getters = {
    FILTERED_SERVICES: (state) => (serviceList) => {
        // если выбрано хоть что-то
        if (Object.keys(state.selected).length) {
            // перебираем выбранные в фильтрах ключи
            return Object.keys(state.selected).reduce((acc, property) => {
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
            }, serviceList);
        } else {
            // если ничего не выбрано - возращаем полный список
            return serviceList;
        }
    },
};

export default { namespaced: true, state, mutations, actions, getters };
