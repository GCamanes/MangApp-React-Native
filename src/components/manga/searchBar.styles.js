import { StyleSheet } from 'react-native';

import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  searchBarView: {
    backgroundColor: AppColors.palette.black,
    padding: 10,
    borderBottomEndRadius: 15,
  },
  searchBarSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: AppColors.palette.white,
    borderColor: AppColors.palette.yellow,
    borderWidth: 3,
    paddingHorizontal: 5,
  },
  searchTextInput: {
    height: AppSizes.screen.width * 0.12,
    width: AppSizes.screen.width * 0.75,
    paddingStart: 10,
    fontSize: 20,
    color: AppColors.palette.black,
  },
  image: {
    height: AppSizes.screen.width * 0.07,
    width: AppSizes.screen.width * 0.07,
  },
});

export default styles;
