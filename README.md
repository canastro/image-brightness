# image-brightness

Small library to apply a brightness transformation to a image.

## Install

```
npm install image-brightness --save
```

## Usage
It applies a brightness transformation to a base64 image. If you want a more complete library, please check image-filters that wraps this and other libraries to provide a more complete suite of image filters.

JS file:
```js
var imageBrightness = require('image-brightness');

var result = imageBrightness({
    data: IMAGE_DATA,
    adjustment: 30
});
```
