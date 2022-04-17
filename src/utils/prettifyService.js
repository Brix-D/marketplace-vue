export function prettifyService(service) {
    return {
        id: service.product_id[0].value,
        title: service.title[0].value,
        description: service.body[0].value,
        type: service.field_tip[0].value,
        category: service.field_category[0].value,
        price: service.field_price[0].number,
    };
}

export default prettifyService;
