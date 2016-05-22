import imageBrightness from '../src/index';

function applyResults(selector, src) {
    var target;
    var image;

    target = document.querySelectorAll(selector)[0];

    image = document.createElement('img');
    image.setAttribute('src', src);
    target.appendChild(image);
}

window.onload = function () {
    const img = new Image;

    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, img.width, img.height);

        imageBrightness({
            data: data,
            adjustment: 30,
            asDataURL: true
        }).then((results) => {
            applyResults('#target-1', results);
        });

        imageBrightness({
            data: data,
            adjustment: 70,
            asDataURL: true
        }).then((results) => {
            applyResults('#target-2', results);
        });
    };
    img.src = 'dummy.jpg';
};
