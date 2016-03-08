/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 * Create a canvas with the currect size
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 * Get a deep copy of the image data so we don't change the original imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

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
 * @name convertToDataURL
 * @param {object} canvas
 * @param {object} context
 */
function convertToDataURL(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
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

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);

    result = transform(options.data, options.adjustment);

    if (options.asDataURL) {
        return convertToDataURL(canvas, context, result);
    }

    return result;
}
