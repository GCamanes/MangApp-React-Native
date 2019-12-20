import { StyleSheet } from 'react-native';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppFonts from '../../app/app.fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
  },
  pagesView: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: AppColors.palette.blackSmoke,
  },
  iconView: {
    width: AppSizes.screen.width * 0.15,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: AppSizes.screen.width * 0.7,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: AppFonts.t19.size,
    fontWeight: 'bold',
    color: AppColors.palette.white,
  },
  flatList: {
    width: AppSizes.screen.width,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default styles;
