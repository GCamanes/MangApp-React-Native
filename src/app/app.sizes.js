/**
 * App Theme - Sizes
 */
import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const scale = screenHeight / 570;

export function normalize(size) {
  // return size;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default {
  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    heightHalf: screenHeight * 0.5,
    heightThird: screenHeight * 0.333,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
    width60: screenWidth * 0.6,
    width70: screenWidth * 0.7,
    width80: screenWidth * 0.8,
    width85: screenWidth * 0.85,
    width90: screenWidth * 0.9,
  },
  navbarHeight: (Platform.OS === 'ios') ? 64 : 54,
  statusBarHeight: (Platform.OS === 'ios') ? 16 : 0,

  padding: 20,
  paddingSml: 10,

  borderRadius: 2,
};
