import { StyleSheet } from 'react-native';

import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColors.palette.white,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
  },
  mangaImg: {
    height: AppSizes.screen.width * 0.21,
    width: AppSizes.screen.width * 0.14,
    marginRight: 5,
  },
});

export default styles;
