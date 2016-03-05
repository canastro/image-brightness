function copyImageData(ctx, src) {
    var dst = ctx.createImageData(src.width, src.height);
    dst.data.set(src.data);
    return dst;
}

function transform(canvas, context, imageData, adjustment) {
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        data[i] += adjustment;
        data[i+1] += adjustment;
        data[i+2] += adjustment;
    }

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

/**
 * @name imageBrightness
 * @param {object} options
 * @param {string} options.data
 * @param {string} options.adjustment - adjustment value to apply
 */
module.exports = function imageBrightness(options) {
    var element;
    var data;
    var factor
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (!options.data || !options.adjustment) {
        throw new Error('image-brightness:: invalid options provided');
    }

    options.data = copyImageData(context, options.data);

    result = transform(canvas, context, options.data, options.adjustment);

    return result;
}
