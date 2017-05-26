import {PixelRatio, Platform, Dimensions} from 'react-native';

var pixel = 1 / PixelRatio.get();
var maxHeight = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').height);
var maxWidth = PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('window').width);
var scaleHeight = maxHeight/960;
var scaleWidth = maxWidth/640;
var pixRatio = PixelRatio.get();
var containScale = scaleWidth > scaleHeight ? scaleHeight : scaleWidth;
var coverScale = scaleWidth > scaleHeight ? scaleWidth: scaleHeight;

module.exports = {
  /*最小线宽*/
  pixel: pixel,

  pixelRatio: pixRatio,

  dp2px: (dp) => { return dp / pixel; },

  px2dp: (px) => { return px * pixel; },

  px2RN: (design) => { return design * pixel * containScale; },

  fontSize2RN: (size) => { return size * pixel * containScale; },

  randomInt: (n) => { return Math.floor(Math.random()*n); },

  /*屏幕尺寸*/
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
}

