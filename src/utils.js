/**
 *
 * @param {Array} array
 * @param {String} item
 * @returns {Array}
 */
export function without(array, item) {
    return array.filter(i => i !== item);
}
