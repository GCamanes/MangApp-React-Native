import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import styles from './scansPage.styles';
import AppStyles from '../../app/app.styles';
import CustomLoader from '../../components/common/CustomLoader';

class ScansPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { loadingStatus, scans } = this.props;
    console.log('SCANS', scans);
    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <CustomLoader />
        </View>
      );
    }
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

ScansPage.propTypes = {
  loadingStatus: PropTypes.object,
  scans: PropTypes.array.isRequired,
};

ScansPage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  loadingStatus: state.app[AppConstants.ROUTES.scans],
  scans: state.scan.scans,
});

export default connect(mapStateToProps, null)(ScansPage);
