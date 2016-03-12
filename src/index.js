var utils = require('./utils');

/**
 * @name transform
 * @param {object} imageData
 * Iterate over the array applying the brightness transformation
 */
function transform(imageData, adjustment) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] += adjustment;
        data[i+1] += adjustment;
        data[i+2] += adjustment;
    }

    return imageData;
}

/**
 * @name imageBrightness
 * @param {object} options
 * @param {string} options.data
 * @param {string} options.adjustment - adjustment value to apply
 * @param {bool} options.asDataURL
 */
module.exports = function imageBrightness(options) {
    var element;
    var data;
    var factor
    var canvas;
    var context;

    if (!options.data || !options.adjustment) {
        throw new Error('image-brightness:: invalid options provided');
    }

    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = utils.getPixels(canvas, context, options.data);

    result = transform(options.data, options.adjustment);

    if (options.asDataURL) {
        return utils.convertToDataURL(canvas, context, result);
    }

    return result;
}
