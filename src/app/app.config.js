import React from 'react';

import AppColors from './app.colors';
import AppStyles from './app.styles';

const AppConfig = {
  navbarProps: {
    back: true,
    hideNavBar: false,
    titleStyle: AppStyles.navbarTitle,
    navigationBarStyle: AppStyles.navbar,
    navBarButtonColor: AppStyles.navbarButton.tintColor,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      backgroundColor: AppColors.palette.white,
      paddingTop: 64,
    },
  },
};

export default AppConfig;
