import { StyleSheet } from 'react-native';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';

const imgHeight = AppSizes.screen.width * 0.43 * 1.5;
const imgWidth = AppSizes.screen.width * 0.43;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.palette.white,
    marginBottom: 20,
    borderRadius: 5,
  },
  gradientView: {
    height: imgHeight * 0.7,
    width: imgWidth,
    position: 'absolute',
    bottom: -5,
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  mangaImg: {
    height: imgHeight,
    width: imgWidth,
    borderRadius: 5,
  },
  text: {
    fontSize: AppFonts.t16.size,
    color: AppColors.palette.white,
    fontWeight: 'bold',
  },
});

export default styles;
