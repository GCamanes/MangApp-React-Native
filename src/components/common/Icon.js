import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import FontMangApp from '../../assets/icons/icons-mangapp';
import AppStyles from '../../app/app.styles';

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'mangapp',
  },
});

class Icon extends Component {
  /**
   * Remove some style which  make bugs on android.
   *
   * @param iconStyles
   *  Icon style.
   */
  static safeIconStyle(iconStyles) {
    const style = StyleSheet.flatten(iconStyles);
    delete style.fontWeight;
    return style;
  }

  /**
   * Render function to display component.
   */
  render() {
    const {
      name,
      onPress,
      style,
      styleButton,
    } = this.props;

    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={styleButton}
        >
          <Text style={Icon.safeIconStyle([AppStyles.icon, style, styles.icon])}>
            {FontMangApp[name]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <Text style={Icon.safeIconStyle([AppStyles.icon, style, styles.icon])}>
        {FontMangApp[name]}
      </Text>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.any,
  styleButton: PropTypes.any,
};

Icon.defaultProps = {
  onPress: null,
  style: {},
  styleButton: {},
};

export default Icon;
