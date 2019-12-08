import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  bar: {
    height: 3,
    width: AppSizes.screen.width * 0.2,
    borderRadius: 10,
    backgroundColor: AppColors.palette.whiteSmoke,
  },
  text: {
    fontSize: AppFonts.t18.size,
    fontWeight: 'bold',
    color: AppColors.palette.yellow,
    marginHorizontal: 15,
  },
});

const MangaSectionTitle = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.bar} />
    <Text style={styles.text}>
      {title}
    </Text>
    <View style={styles.bar} />
  </View>
);

MangaSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MangaSectionTitle;
