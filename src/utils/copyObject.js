export function copyObject(item) {
    return JSON.parse(JSON.stringify(item));
}

export default copyObject;
