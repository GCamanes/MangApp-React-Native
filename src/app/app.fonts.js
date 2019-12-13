import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
export function normalize(size) {
  // return size;
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
function lineHeight(fontSize) {
  const multiplier = (fontSize > 20) ? 0.1 : 0.33;
  return parseInt(fontSize + (fontSize * multiplier), 10);
}
const base = {
  size: normalize(12),
  lineHeight: lineHeight(12),
  fontRegular: 'OpenSans-Regular',
  fontBold: 'OpenSans-Bold',
};
export default {
  t80: { ...base, size: normalize(80), lineHeight: lineHeight(base.size * 8) },
  t70: { ...base, size: normalize(70), lineHeight: lineHeight(base.size * 7) },
  t60: { ...base, size: normalize(60), lineHeight: lineHeight(base.size * 6) },
  t50: { ...base, size: normalize(50), lineHeight: lineHeight(base.size * 5) },
  t40: { ...base, size: normalize(40), lineHeight: lineHeight(base.size * 4) },
  t35: { ...base, size: normalize(35), lineHeight: lineHeight(base.size * 3.5) },
  t30: { ...base, size: normalize(30), lineHeight: lineHeight(base.size * 3) },
  t25: { ...base, size: normalize(25.3), lineHeight: lineHeight(base.size * 2.6) },
  t22: { ...base, size: normalize(22), lineHeight: lineHeight(base.size * 2.4) },
  t19: { ...base, size: normalize(19.3), lineHeight: lineHeight(base.size * 2.2) },
  t18: { ...base, size: normalize(18.7), lineHeight: lineHeight(base.size * 2) },
  t17: { ...base, size: normalize(17.3), lineHeight: lineHeight(base.size * 1.9) },
  t16: { ...base, size: normalize(16), lineHeight: lineHeight(base.size * 1.8) },
  t15: { ...base, size: normalize(15.3), lineHeight: lineHeight(base.size * 1.5) },
  t13: { ...base, size: normalize(13.3), lineHeight: lineHeight(base.size * 1.25) },
  t12: { ...base, size: normalize(12.7), lineHeight: lineHeight(base.size * 1.2) },
  base: { ...base }, // Body/Main
  t11: { ...base, size: normalize(11), lineHeight: lineHeight(base.size * 0.85) },
  t10: { ...base, size: normalize(10.7), lineHeight: lineHeight(base.size * 0.8) },
  t9: { ...base, size: normalize(9.3), lineHeight: lineHeight(base.size * 0.7) },
  t8: { ...base, size: normalize(8), lineHeight: lineHeight(base.size * 0.6) },
};
