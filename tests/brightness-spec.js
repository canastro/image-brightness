import { expect } from 'chai';
import { transform } from '../src/brightness';

describe('brightness', () => {
    it('should apply transformation and return as imageData', () => {
        const data = [
            193,
            219,
            242,
            255,
            193,
            219,
            242,
            255
        ];

        const expectedData = [
            198,
            224,
            247,
            255,
            193,
            219,
            242,
            255
        ];

        transform(data, 4, 5);
        expect(data).to.deep.equal(expectedData);
    });
});
