import {
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
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
