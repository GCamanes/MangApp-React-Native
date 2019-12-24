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
    marginLeft: 10,
  },
  backIcon: {
    color: AppColors.palette.black,
    fontSize: AppFonts.t18.size,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: AppStyles.navbar.height,
    alignItems: 'center',
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
