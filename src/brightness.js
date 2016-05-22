/**
 * @name transform
 * @param {object} imageData
 * Iterate over the array applying the brightness transformation
 */
export function transform(data, length, adjustment) {
    for (let i = 0; i < length; i += 4) {
        data[i] += adjustment;
        data[i + 1] += adjustment;
        data[i + 2] += adjustment;
    }
}
