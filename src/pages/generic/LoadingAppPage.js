import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import * as AppActions from '../../redux/actions/app-actions';
import images from '../../assets/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.black,
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
        <Image
          source={images.loader}
          style={{ width: AppSizes.screen.widthTwoThirds, height: AppSizes.screen.widthTwoThirds }}
        />
      </View>
    );
  }
}

LoadingPage.propTypes = {
  loadApp: PropTypes.func.isRequired,
};

export default connect(null, AppActions)(LoadingPage);
