import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes, { normalize } from '../../app/app.sizes';
import * as AppActions from '../../redux/actions/app-actions';
import images from '../../assets/images';

const styles = StyleSheet.create({
  bottomView: {
    position: 'absolute',
    width: '100%',
    bottom: normalize(30),
    alignItems: 'center',
  },
  bottomText: {
    color: AppColors.palette.white,
    fontSize: AppFonts.t15.size,
    marginTop: normalize(24),
  },
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
    const { version } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={images.loader}
          style={{ width: AppSizes.screen.widthTwoThirds, height: AppSizes.screen.widthTwoThirds }}
        />
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>
            {`Version ${version}`}
          </Text>
        </View>
      </View>
    );
  }
}

LoadingPage.propTypes = {
  loadApp: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  version: state.app.version,
});

export default connect(mapStateToProps, AppActions)(LoadingPage);
