import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppFonts from '../../app/app.fonts';
import AppStyles from '../../app/app.styles';

const styles = StyleSheet.create({
  backView: {
    backgroundColor: AppColors.palette.white,
    borderRadius: 50,
    padding: 7,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  backIcon: {
    color: AppColors.palette.black,
    fontSize: AppFonts.t18.size,
  },
  chapterReadView: {
    backgroundColor: AppColors.palette.black,
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  chapterReadTouchable: {
    marginLeft: 20,
    padding: 3,
  },
  chapterReadText: {
    color: AppColors.palette.white,
    fontSize: AppFonts.t15.size,
    fontWeight: 'bold',
  },
  chapterReadValidateText: {
    color: AppColors.palette.green,
    fontSize: AppFonts.t19.size,
  },
  chapterReadDeniedText: {
    color: AppColors.palette.red,
    fontSize: AppFonts.t19.size,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
  },
  pageCounterView: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  viewScan: {
    backgroundColor: AppColors.palette.blackSmoke,
    height:
      Platform.OS === 'android'
        ? AppSizes.screen.height - AppStyles.navbar.height - StatusBar.currentHeight
        : AppSizes.screen.height - AppStyles.navbar.height,
    width: AppSizes.screen.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
