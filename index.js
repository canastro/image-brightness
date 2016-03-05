function getImageElement(selector) {
    var element = document.querySelectorAll(selector)[0];

    if (!element) {
        throw new Error('image-brightness:: no "from" element found');
    }

    return element;
}

function getImageData(context, element) {

    if (element.tagName !== 'IMG') {
        throw new Error('image-brightness:: invalid origin');
    }

    context.drawImage(element, 0, 0 );
    return context.getImageData(0, 0, element.width, element.height);
}

function transform(canvas, context, imageData, adjustment) {
    var data = imageData.data;

    data.forEach(function (item, i) {
        data[i] += adjustment;
        data[i+1] += adjustment;
        data[i+2] += adjustment;
    });

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

function appendResult(selector, src) {

    var target;
    var image;

    if (!selector) {
        return;
    }

    target = document.querySelectorAll(selector)[0];

    if (!target) {
        throw new Error('image-brightness:: no "to" element found');
    }

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

/**
 * @name contrastImage
 * @param {object} options
 * @param {string} options.url - image url
 * @param {string} options.imageData - data of a image extracted from a canvas
 * @param {string} options.from - dom selector of the original image
 * @param {string} options.to - dom selector of the target result
 * @param {string} options.adjustment - adjustment value to apply
 */
module.exports = function contrastImage(options) {
    var element;
    var data;
    var factor
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (!options || !options.adjustment || (!options.url && !options.imageData && !options.from)) {
        throw new Error('image-brightness:: invalid options object');
    }

    if (options.url) {
        element = document.createElement('img');
        element.setAttribute('src', options.url);
        data = getImageData(context, element);
    } else if (options.imageData) {
        data = options.imageData;
    } else if (options.from) {
        element = getImageElement(options.from);
        data = getImageData(context, element);
    }

    if (!data) {
        throw new Error('image-brightness:: no data found');
    }

    result = transform(canvas, context, data, options.adjustment);

    appendResult(options.to, result);

    return result;
}
