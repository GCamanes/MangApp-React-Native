import React from 'react';
import {
  Reducer,
  Router,
  Scene,
  Stack,
} from 'react-native-router-flux';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConfig from './app.config';
import AppConstants from './app.constants';

import HomePage from '../pages/home/HomePage';
import LoadingAppPage from '../pages/generic/LoadingAppPage';
import LoginPage from '../pages/login/LoginPage';

class AppRoutes extends React.Component {
  reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      if (state) {
        this.props.dispatch({ type: 'ROUTER_STATE_CHANGED', payload: state });
      }
      return defaultReducer(state, action);
    };
  };

  render() {
    return (
      <Router createReducer={this.reducerCreate}>
        <Stack key="root" {...AppConfig.navbarProps}>

          <Scene
            component={HomePage}
            key={AppConstants.ROUTES.home}
            title="MangApp"
            renderBackButton={() => <View />}
          />

          <Scene
            component={LoadingAppPage}
            hideNavBar
            key={AppConstants.ROUTES.loadingApp}
            initial
          />

          <Scene
            component={LoginPage}
            hideNavBar
            key={AppConstants.ROUTES.login}
          />

        </Stack>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
