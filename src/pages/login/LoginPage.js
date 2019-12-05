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
import styles from './loginPage.styles';
import images from '../../assets/images';
import AppSizes, { normalize } from '../../app/app.sizes';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMail: '',
      userPassword: '',
      loading: false,
      loginOpacity: new Animated.Value(0),
      loginTop: new Animated.Value(AppSizes.screen.height),
      loginWidth: new Animated.Value(AppSizes.screen.width60),
    };

    this.buttonOpacity = new Animated.Value(0);
  }

  componentDidMount() {
    const { loginOpacity, loginTop } = this.state;
    Animated.timing(
      loginOpacity,
      {
        toValue: 1,
        duration: 1000,
      },
    ).start();
    Animated.timing(
      loginTop,
      {
        toValue: AppSizes.screen.height - normalize(130),
        duration: 1000,
      },
    ).start();
  }

  onLoginPress = () => {
    const { loginWidth, loading } = this.state;
    if (loading) {
      Animated.timing(
        loginWidth,
        {
          toValue: AppSizes.screen.width60,
          duration: 300,
          easing: Easing.bounce,
        },
      ).start();
      this.setState({ loading: false });
    } else {
      Animated.timing(
        loginWidth,
        {
          toValue: 40,
          duration: 300,
        },
      ).start();
      this.setState({ loading: true });
    }
  }

  render() {
    const {
      loading,
      loginOpacity,
      loginTop,
      loginWidth,
      userMail,
      userPassword,
    } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={images.logo_original}
          style={{ width: AppSizes.screen.widthHalf, height: AppSizes.screen.widthHalf }}
        />
        <TextInput
          value={userMail}
          onChangeText={(text) => this.setState({ userMail: text })}
          placeholder="Mail"
          selectionColor={AppColors.palette.blackSmoke}
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          value={userPassword}
          onChangeText={(text) => this.setState({ userPassword: text })}
          placeholder="Password"
          selectionColor={AppColors.palette.blackSmoke}
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
            style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            {(!loading) ? (
              <Text style={styles.loginText}>
                Login
              </Text>
            ) : (
              <ActivityIndicator size="small" color={AppColors.palette.blackSmoke} />
            )}

          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

export default connect()(LoginPage);
