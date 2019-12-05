import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import CustomLoader from '../../components/common/CustomLoader';
import * as AppActions from '../../redux/actions/app-actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LoadingPage extends Component {
  componentDidMount() {
    this.loadApp();
  }

  loadApp = async () => {
    const { loadApp } = this.props;
    await loadApp();
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomLoader />
      </View>
    );
  }
}

LoadingPage.propTypes = {
  loadApp: PropTypes.func.isRequired,
};

export default connect(null, AppActions)(LoadingPage);
