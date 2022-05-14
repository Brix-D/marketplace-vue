/**
 * приводит ид продукта к виду объектов для последюущего запроса на создание или редакирование контакт даты
 * @param {Object} items массив стора с продуктами
 * @returns {{demandIds: *[], offerIds: *[]}}
 */
export function prettifyProductIds(items) {
    let offerIds = [];
    let demandIds = [];
    Object.keys(items).forEach((bundle) => {
        Object.keys(items[bundle]).forEach((type) => {
            items[bundle][type].forEach((item) => {
                if (type === 'offer') {
                    offerIds.push({ target_id: item.id });
                }
                if (type === 'demand') {
                    demandIds.push({ target_id: item.id });
                }
            });
        });
    });
    return { offerIds, demandIds };
}

export default prettifyProductIds;
