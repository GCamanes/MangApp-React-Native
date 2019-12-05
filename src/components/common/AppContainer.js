import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import backHandler from '../../utils/back-handler';
import * as AppActions from '../../redux/actions/app-actions';

/**
 * Define global stylesheet.
 */
const styles = StyleSheet.create({
  main_container: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    backgroundColor: AppColors.palette.white,
  },
  loading_container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

class AppContainer extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    const { routerState } = this.props;
    backHandler(routerState);
    return true;
  };

  closeErrorView = () => {
    const { closeErrorView } = this.props;
    closeErrorView();
  };

  render() {
    const {
      children,
      loading,
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={AppColors.palette.black}
          barStyle="light-content"
        />

        {/* Main content */}
        { children }

        {/* Loading */}
        {loading && (
          <View style={styles.main_container}>
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" color={AppColors.palette.black}/>
            </View>
          </View>
        )}
      </View>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.any,
  closeErrorView: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  routerState: PropTypes.object.isRequired,
  scene: PropTypes.string.isRequired,
};

AppContainer.defaultProps = {
  children: [],
  error: null,
  loading: false,
};

const mapStateToProps = (state) => ({
  error: state.app.error,
  loading: state.app.loading,
  routerState: state.router.routerState,
  scene: state.router.scene,
});

export default connect(mapStateToProps, AppActions)(AppContainer);
