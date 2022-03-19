/**
 * @description numberToPrice Преобразует переданое число в цену с глифом валюты
 * @param { Number } price число
 * @param { String } currency Валюта в формате RUB
 * @return { String } Возвращает число приобразованное в цену с глифом валюты
 * */

function numberToPrice(price, currency = 'RUB') {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(parseFloat(price.toString()));
}

export { numberToPrice };
export default numberToPrice;
