import PropTypes from 'prop-types';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';
import CustomLoader from '../../components/common/CustomLoader';
import styles from './scansPage.styles';
import * as ScanActions from '../../redux/actions/scan-actions';

class ScansPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  onScroll = (e) => {
    const { getScanInfos, scans } = this.props;
    let offset = e.nativeEvent.contentOffset.x / (AppSizes.screen.width);
    offset = parseFloat((offset * 100).toFixed(0)) / 100;
    if (Number.isInteger(offset)) {
      getScanInfos(scans[offset].url, offset);
    }
  }

  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
    this.setState({ scrollEnabled: zoomableViewEventObject.zoomLevel === 1 });
  }

  render() {
    const { loadingStatus, scans } = this.props;
    const { scrollEnabled } = this.state;

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <CustomLoader />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          onScroll={this.onScroll}
          pagingEnabled
          ref={(node) => this.scroll = node}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={50}
          scrollEnabled={scrollEnabled}
        >
          {scans.map((scan, index) => (
            <ReactNativeZoomableView
              style={styles.viewScan}
              key={`scan_${index}`}
              maxZoom={2}
              minZoom={1}
              zoomStep={1}
              initialZoom={1}
              onZoomAfter={this.logOutZoomState}
            >
              {scan.infos ? (
                <Image source={{ uri: scan.url }} style={{ height: scan.infos.height, width: scan.infos.width }} />
              ) : (
                <ActivityIndicator size="large" color={AppColors.palette.red} />
              )}
            </ReactNativeZoomableView>
          ))}
        </ScrollView>
      </View>
    );
  }
}

ScansPage.propTypes = {
  getScanInfos: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, ScanActions)(ScansPage);
