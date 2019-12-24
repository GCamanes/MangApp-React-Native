import PropTypes from 'prop-types';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import AppColors from '../../app/app.colors';
import AppSizes from '../../app/app.sizes';
import AppStyles from '../../app/app.styles';
import Icon from '../../components/common/Icon';
import PageCounter from '../../components/scans/PageCounter';
import styles from './scansPage.styles';
import * as ScanActions from '../../redux/actions/scan-actions';
import * as ChapterActions from '../../redux/actions/chapter-actions';

class ScansPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      asReadPopInBottom: new Animated.Value(-100),
    };
  }

  onScroll = (e) => {
    const { getScanInfos, scans, setPageCounter } = this.props;
    let offset = e.nativeEvent.contentOffset.x / (AppSizes.screen.width);
    offset = parseFloat((offset * 100).toFixed(0)) / 100;
    if (Number.isInteger(offset)) {
      getScanInfos(scans[offset].url, offset);
      setPageCounter(offset + 1, scans.length);
    }
    if (offset + 1 === scans.length) {
      this.showAsReadPopIn();
    }
  }

  onZoomAfter = (event, gestureState, zoomableViewEventObject) => {
    this.setState({ scrollEnabled: zoomableViewEventObject.zoomLevel === 1 });
  }

  onDoubleTapAfter = (event, gestureState, zoomableViewEventObject) => {
    this.setState({ scrollEnabled: zoomableViewEventObject.zoomLevel === 1 });
  }

  hideAsReadPopIn = () => {
    const { asReadPopInBottom } = this.state;
    Animated.timing(asReadPopInBottom, {
      toValue: -100,
      duration: 1000,
    }).start();
  };

  showAsReadPopIn = () => {
    const { asReadPopInBottom } = this.state;
    const { selectedChapter } = this.props;
    if (!selectedChapter.isRead) {
      Animated.timing(asReadPopInBottom, {
        delay: 2000,
        toValue: 0,
        duration: 1000,
      }).start();
    }
  };

  markChapterAsRead = () => {
    const { asReadPopInBottom } = this.state;
    const { markChapterAsRead, selectedChapter, selectedManga } = this.props;
    markChapterAsRead(selectedManga, selectedChapter.id, true);
    Animated.timing(asReadPopInBottom, {
      delay: 500,
      toValue: -100,
      duration: 1000,
    }).start();
    setTimeout(() => Actions.pop(), 1000);
  };

  render() {
    const { loadingStatus, scans, selectedChapter } = this.props;
    const { asReadPopInBottom, scrollEnabled } = this.state;

    if (loadingStatus.loading) {
      return (
        <View style={AppStyles.loadingView}>
          <ActivityIndicator size="large" color={AppColors.palette.red} />
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
              onZoomAfter={this.onZoomAfter}
              onDoubleTapAfter={this.onDoubleTapAfter}
            >
              {scan.infos ? (
                <Image source={{ uri: scan.url }} style={{ height: scan.infos.height, width: scan.infos.width }} />
              ) : (
                <ActivityIndicator size="large" color={AppColors.palette.red} />
              )}
            </ReactNativeZoomableView>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.backView}
          onPress={() => Actions.pop()}
        >
          <Icon name="arrowThinLeft" style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.pageCounterView}>
          <PageCounter />
        </View>

        <Animated.View style={{ ...styles.chapterReadView, bottom: asReadPopInBottom }}>
          <Text style={styles.chapterReadText}>
            {`Mark chapter ${selectedChapter.number} as read ?`}
          </Text>
          <TouchableOpacity onPress={this.markChapterAsRead} style={styles.chapterReadTouchable}>
            <Icon name="checkMark" style={styles.chapterReadValidateText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.hideAsReadPopIn} style={styles.chapterReadTouchable}>
            <Icon name="close" style={styles.chapterReadDeniedText} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

ScansPage.propTypes = {
  getScanInfos: PropTypes.func.isRequired,
  loadingStatus: PropTypes.object,
  markChapterAsRead: PropTypes.func.isRequired,
  scans: PropTypes.array.isRequired,
  selectedChapter: PropTypes.object.isRequired,
  selectedManga: PropTypes.object.isRequired,
  setPageCounter: PropTypes.func.isRequired,
};

ScansPage.defaultProps = {
  loadingStatus: { loading: false },
};

const mapStateToProps = (state) => ({
  loadingStatus: state.app[AppConstants.ROUTES.scans],
  scans: state.scan.scans,
  selectedChapter: state.chapter.selectedChapter,
  selectedManga: state.manga.selectedManga,
});

export default connect(
  mapStateToProps,
  { ...ChapterActions, ...ScanActions },
)(ScansPage);
