import { StyleSheet } from 'react-native';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
  },
  flatList: {
    width: AppSizes.screen.width,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default styles;
