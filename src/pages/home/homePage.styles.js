import { StyleSheet } from 'react-native';
import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  appName: {
    fontSize: AppFonts.t15.size,
    fontWeight: 'bold',
    color: AppColors.palette.white,
    marginRight: 20,
    paddingVertical: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.black,
    paddingHorizontal: 15,
  },
  filterAnimatedView: {
    backgroundColor: AppColors.palette.red,
    height: '100%',
    borderRadius: 50,
  },
  filterViewText: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
  },
  filterView: {
    backgroundColor: AppColors.palette.white,
    width: AppSizes.screen.widthHalf,
    height: 40,
    borderRadius: 50,
  },
  header: {
    alignItems: 'center',
    backgroundColor: AppColors.palette.black,
    paddingVertical: 20,
  },
  icon: {
    fontSize: AppFonts.t22.size,
    color: AppColors.palette.white,
  },
  searchTextInput: {
    flex: 1,
    fontSize: AppFonts.t15.size,
    color: AppColors.palette.greyDark,
    paddingVertical: 0,
  },
  touchableHeaderText: {
    textAlign: 'center',
    fontSize: AppFonts.t15.size,
  },
  touchableHeaderView: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
});

export default styles;
