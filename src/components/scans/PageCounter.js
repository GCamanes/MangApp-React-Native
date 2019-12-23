import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColors.palette.blackSmoke,
    width: AppSizes.screen.width * 0.25,
    height: AppSizes.screen.width * 0.08,
    borderRadius: 4,
    borderColor: AppColors.palette.white,
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPage: {
    color: AppColors.palette.white,
    fontSize: AppFonts.t15.size,
  },
  slash: {
    color: AppColors.palette.red,
    fontSize: AppFonts.t15.size,
    marginHorizontal: 3,
  },
});

const PageCounter = ({ pageInfo }) => (
  <View>
    {pageInfo ? (
      <View style={styles.container}>
        <Text style={styles.textPage}>
          {pageInfo.page}
        </Text>
        <Text style={styles.slash}>
          /
        </Text>
        <Text style={styles.textPage}>
          {pageInfo.last}
        </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={AppColors.palette.red} />
      </View>
    )}
  </View>
);

PageCounter.propTypes = {
  pageInfo: PropTypes.shape({
    page: PropTypes.number.isRequired,
    last: PropTypes.number.isRequired,
  }),
};

PageCounter.defaultProps = {
  pageInfo: null,
};

const mapStateToProps = (state) => ({
  pageInfo: state.scan.pageInfo,
});

export default connect(mapStateToProps, null)(PageCounter);
