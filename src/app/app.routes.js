import React from 'react';
import {
  Reducer,
  Router,
  Scene,
  Stack,
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import AppConfig from './app.config';
import AppConstants from './app.constants';

import ChaptersPage from '../pages/chapters/ChaptersPage';
import HomePage from '../pages/home/HomePage';
import LoadingAppPage from '../pages/generic/LoadingAppPage';
import LoginPage from '../pages/login/LoginPage';
import LogoutButton from '../components/common/LogoutButton';
import ScansPage from '../pages/scans/ScansPage';
import VersionContainer from '../components/common/VersionContainer';

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
            component={ChaptersPage}
            key={AppConstants.ROUTES.chapters}
          />

          <Scene
            component={HomePage}
            key={AppConstants.ROUTES.home}
            title="MangApp"
            renderBackButton={() => <LogoutButton />}
            renderRightButton={<VersionContainer />}
          />

          <Scene
            component={LoadingAppPage}
            key={AppConstants.ROUTES.loadingApp}
            initial
          />

          <Scene
            component={LoginPage}
            key={AppConstants.ROUTES.login}
          />

          <Scene
            component={ScansPage}
            key={AppConstants.ROUTES.scans}
          />

        </Stack>
      </Router>
    );
  }
}

export default connect()(AppRoutes);
