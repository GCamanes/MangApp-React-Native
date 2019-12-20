import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';

const VersionContainer = ({ version }) => (
  <View style={{ paddingHorizontal: 10 }}>
    <Text
      style={{
        color: AppColors.palette.white,
        fontSize: AppFonts.t15.size,
        textAlign: 'right',
      }}
    >
      {`v${version}`}
    </Text>
  </View>
);

VersionContainer.propTypes = {
  version: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  version: state.app.version,
});

export default connect(mapStateToProps, null)(VersionContainer);
