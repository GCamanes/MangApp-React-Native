import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './homePage.styles';

class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(HomePage);
