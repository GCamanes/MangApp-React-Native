import AppColors from './app.colors';
import AppFonts from './app.fonts';

const AppStyles = {
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.palette.blackSmoke,
  },
  // NavBar styles
  navbar: {
    backgroundColor: AppColors.palette.black,
    borderBottomWidth: 0,
    elevation: 0,
  },
  navbarTitle: {
    color: AppColors.palette.white,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  navbarButton: {
    tintColor: AppColors.palette.white,
  },
  // Icon Styles
  icon: {
    fontSize: AppFonts.t25.size,
    color: AppColors.palette.white,
  },
};

export default AppStyles;
