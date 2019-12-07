import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppSizes, { normalize } from '../../app/app.sizes';
import styles from './loginPage.styles';
import images from '../../assets/images';
import * as UserActions from '../../redux/actions/user-actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      loading: false,
      loginOpacity: new Animated.Value(0),
      loginTop: new Animated.Value(AppSizes.screen.height),
      loginWidth: new Animated.Value(AppSizes.screen.width60),
    };
  }

  componentDidMount() {
    const { loginOpacity, loginTop } = this.state;
    Animated.parallel([
      Animated.timing(loginOpacity, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(loginTop, {
        toValue: AppSizes.screen.height - normalize(130),
        duration: 1000,
      }),
    ]).start();
  }

  onLoginPress = async () => {
    const {
      loginOpacity,
      loginTop,
      loginWidth,
      mail,
      password,
    } = this.state;
    const { login } = this.props;

    const onError = () => {
      Animated.timing(
        loginWidth,
        {
          toValue: AppSizes.screen.width60,
          duration: 300,
          easing: Easing.bounce,
        },
      ).start();
      this.setState({ loading: false });
    }

    const onSuccess = async () => {
      await Animated.parallel([
        Animated.timing(loginTop, {
          toValue: AppSizes.screen.height,
          duration: 1000,
        }),
        Animated.timing(loginOpacity, {
          toValue: 0,
          duration: 500,
        }),
      ]).start();
    }

    this.setState({ loading: true });
    await Animated.timing(
      loginWidth,
      {
        toValue: 40,
        duration: 300,
      },
    ).start();
    login(mail, password, onSuccess, onError);
  }

  render() {
    const {
      loading,
      loginOpacity,
      loginTop,
      loginWidth,
      mail,
      password,
    } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={images.logo_original}
          style={{ width: AppSizes.screen.widthHalf, height: AppSizes.screen.widthHalf }}
        />
        <TextInput
          value={mail}
          onChangeText={(text) => this.setState({ mail: text })}
          placeholder="Mail"
          selectionColor={AppColors.palette.red}
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
          placeholder="Password"
          selectionColor={AppColors.palette.red}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />

        <Animated.View
          style={{
            ...styles.loginButton,
            width: loginWidth,
            opacity: loginOpacity,
            top: loginTop,
          }}
        >
          <TouchableOpacity
            onPress={this.onLoginPress}
            style={styles.loginTouchable}
          >
            {(!loading) ? (
              <Text style={styles.loginText}>
                Login
              </Text>
            ) : (
              <ActivityIndicator size="large" color={AppColors.palette.red} />
            )}

          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, UserActions)(LoginPage);
