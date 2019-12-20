import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import AppSizes from '../../app/app.sizes';
import Icon from './Icon';
import backHandler from '../../utils/back-handler';

class LogoutButton extends Component {
  onPress = () => {
    const { routerState } = this.props;
    backHandler(routerState);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={this.onPress}
          style={{
            width: AppSizes.screen.width * 0.15,
            alignItems: 'center',
          }}
        >
          <Icon name="switch" />
        </TouchableOpacity>
      </View>
    );
  }
}

LogoutButton.propTypes = {
  routerState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  routerState: state.router.routerState,
});

export default connect(mapStateToProps, null)(LogoutButton);
