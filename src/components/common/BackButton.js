import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import AppSizes from '../../app/app.sizes';
import Icon from './Icon';
import backHandler from '../../utils/back-handler';

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
          <Icon name={routerState.index !== 0 ? 'arrowLeft' : 'switch'} />
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
