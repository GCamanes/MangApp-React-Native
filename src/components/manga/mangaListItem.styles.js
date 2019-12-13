import { StyleSheet } from 'react-native';

import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColors.palette.whiteSmoke,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    padding: 5,
  },
  infosView: {
    flex: 5,
    marginRight: 5,
  },
  favoriteView: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  favoriteTouchableView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  mangaImg: {
    height: AppSizes.screen.width * 0.21,
    width: AppSizes.screen.width * 0.14,
    marginRight: 5,
    borderRadius: 5,
  },
  icon: {
    fontFamily: 'mangapp',
  },
});

export default styles;
