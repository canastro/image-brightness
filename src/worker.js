import { transform } from './brightness';

module.exports = function (self) {
    self.addEventListener('message', (e) => {
        const adjustment = e.data.params.adjustment;

        const canvasData = e.data.data;
        const binaryData = canvasData.data;

        const length = e.data.length;
        const index = e.data.index;

        transform(binaryData, length, adjustment);

        self.postMessage({
            result: canvasData,
            index
        });

        self.close();
    });
};
