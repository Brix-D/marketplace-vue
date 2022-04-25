export function prettifyService(contactId, service) {
    return {
        id: parseInt(service.product_id[0].value),
        uniqueId: parseInt(service.product_id[0].value) + contactId,
        title: service.title[0].value || service.title,
        description: service.description || '',
        type: service.type[0].target_id === 'uslugi' ? 'Услуга' : 'Товар',
        category: service.category,
        price: parseFloat(service.field_price[0].number),
        // author: service.author,
        // bundle: service.type[0].target_id,
        // TODO сделать фото на беке
        //photo: process.env.VUE_APP_BASE_API_URI + service.field_photo,
    };
}

export default prettifyService;
