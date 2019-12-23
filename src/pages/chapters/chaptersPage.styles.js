import { StyleSheet } from 'react-native';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppFonts from '../../app/app.fonts';

const imgHeight = AppSizes.screen.width * 0.6;

const styles = StyleSheet.create({
  backView: {
    backgroundColor: AppColors.palette.white,
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 50,
    padding: 7,
  },
  backIcon: {
    color: AppColors.palette.black,
    fontSize: AppFonts.t18.size,
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.black,
  },
  favoriteView: {
    backgroundColor: AppColors.palette.white,
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: 4,
    padding: 17,
    opacity: 0.7,
  },
  favoriteIcon: {
    color: AppColors.palette.white,
    fontSize: AppFonts.t22.size,
  },
  gradientView: {
    height: imgHeight * 0.6,
    width: AppSizes.screen.width,
    position: 'absolute',
    bottom: -5,
    paddingHorizontal: 15,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  header: {
    height: imgHeight,
    width: AppSizes.screen.width,
  },
  headerImage: {
    height: imgHeight,
    width: AppSizes.screen.width,
  },
  pagesView: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: AppColors.palette.black,
  },
  iconView: {
    width: AppSizes.screen.width * 0.15,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mangaName: {
    fontSize: AppFonts.t25.size,
    fontWeight: 'bold',
    color: AppColors.palette.white,
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
