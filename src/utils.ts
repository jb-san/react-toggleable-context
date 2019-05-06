/**
 *
 * @param {Array} array
 * @param {String} item
 * @returns {Array}
 */
export function without(array: Array<string>, item: string) {
    return array.filter(i => i !== item);
}

export function normalizeId(id: string) {
    return (id && id.replace(/^#/, '')) || '';
}
