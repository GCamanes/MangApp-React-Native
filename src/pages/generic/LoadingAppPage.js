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
import CustomLoader from '../../components/common/CustomLoader';
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
    backgroundColor: AppColors.palette.blackSmoke,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.loadApp();
  }

  onFireBaseAuthSuccess = () => {
    this.setState({ loading: true });
  }

  loadApp = () => {
    const { loadApp } = this.props;
    loadApp(this.onFireBaseAuthSuccess);
  };

  render() {
    const { version } = this.props;
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={images.logo_original}
          style={{ width: AppSizes.screen.widthTwoThirds, height: AppSizes.screen.widthTwoThirds }}
        />
        <View style={styles.bottomView}>
          {loading && (
            <CustomLoader />
          )}
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
