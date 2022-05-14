import { randomNumber } from '@/utils';

export function prettifyService(service, contactId = null) {
    return {
        id: parseInt(service.product_id[0].value),
        ...(!!contactId && {
            // генерируются рандомные ключи для массива услуг, потому что бек об этом не позаботился
            uniqueId: parseInt(service.product_id[0].value) + contactId + randomNumber(),
        }),
        ...(!!contactId && { contactId }),
        title: service.title[0].value || service.title,
        description: service.description || '',
        type: service.type[0].target_id === 'uslugi' ? 'Услуга' : 'Товар',
        category: service.category,
        categoryId: service.categoryId,
        price: parseFloat(service.field_price[0].number),
        // author: service.author,
        // bundle: service.type[0].target_id,
        photo: service.photo,
        ...(service.isOffer && {
            isOffer: service.isOffer,
        }),
        ...(service.isDemand && {
            isDemand: service.isDemand,
        }),
        variationId: parseInt(service?.default_variation[0]?.target_id),
    };
}

export default prettifyService;
