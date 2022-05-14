/**
 * приводит контакт к виду двух объектов user и company
 * @param contactData
 * @returns {{company, user}}
 */
export function prettifyContactData(contactData) {
    const user = {
        name: contactData.title[0].value,
        email: contactData.field_email[0].value,
        phone: contactData.field_phone[0].value,
    };
    const company = {
        ogrn: contactData.field_ogrn[0].value,
        okved: contactData.field_okved[0].value,
        address: contactData.field_address[0].value,
        certificate: contactData.field_certificate[0].value,
        ownership: contactData.field_ownership[0].value,
    };
    return { user, company };
}

export default prettifyContactData;
