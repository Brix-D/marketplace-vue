export function prettifyService(service) {
    return {
        id: parseInt(service.product_id[0].value),
        title: service.title[0].value,
        description: service.description || service.body[0].value,
        type: service.field_tip[0].value,
        category: service.field_category[0].value,
        price: parseFloat(service.field_price[0].number),
        author: service.author,
        bundle: service.type[0].target_id,
        // TODO сделать человеко читаемое имя на беке
    };
}

export default prettifyService;
