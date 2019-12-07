import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import AppFonts from '../../app/app.fonts';
import backHandler from '../../utils/back-handler';
import AppColors from '../../app/app.colors';

class BackButton extends Component {
  onPress = () => {
    const { routerState } = this.props;
    backHandler(routerState);
  };

  render() {
    const { routerState } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={this.onPress} style={{ fontSize: AppFonts.t35.size }}>
          <Text style={{ color: AppColors.palette.white, fontSize: AppFonts.t13.size }}>
            {routerState.index !== 0 ? 'Back' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

BackButton.propTypes = {
  routerState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  routerState: state.router.routerState,
});

export default connect(mapStateToProps, null)(BackButton);
