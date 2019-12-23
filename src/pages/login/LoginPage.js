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
import Icon from '../../components/common/Icon';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      loading: false,
      hidingPassword: true,
      loginOpacity: new Animated.Value(0),
      loginTop: new Animated.Value(AppSizes.screen.height),
      loginMarginLeft: new Animated.Value(0),
      loginMarginRight: new Animated.Value(0),
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

  onHidingPasswordPress = () => {
    const { hidingPassword } = this.state;
    this.setState({ hidingPassword: !hidingPassword });
  }

  onLoginPress = async () => {
    const {
      loginMarginLeft,
      loginMarginRight,
      loginOpacity,
      loginTop,
      mail,
      password,
    } = this.state;
    const { login } = this.props;

    const onError = () => {
      this.setState({ loading: false });
      Animated.sequence([
        Animated.timing(
          loginMarginRight,
          {
            toValue: 150,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginRight,
          {
            toValue: 0,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginLeft,
          {
            toValue: 150,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginLeft,
          {
            toValue: 0,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginRight,
          {
            toValue: 75,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginRight,
          {
            toValue: 0,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginLeft,
          {
            toValue: 75,
            duration: 50,
          },
        ),
        Animated.timing(
          loginMarginLeft,
          {
            toValue: 0,
            duration: 50,
          },
        ),
      ]).start();
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
    login(mail, password, onSuccess, onError);
  }

  render() {
    const {
      hidingPassword,
      loading,
      loginMarginLeft,
      loginMarginRight,
      loginOpacity,
      loginTop,
      mail,
      password,
    } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={images.logo_original}
          style={{ width: AppSizes.screen.widthHalf, height: AppSizes.screen.widthHalf }}
        />
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>
            MAIL
          </Text>
          <TextInput
            value={mail}
            onChangeText={(text) => this.setState({ mail: text })}
            placeholder="luffy.D.monkey@one-piece.fr"
            placeholderTextColor={AppColors.palette.greyLight}
            selectionColor={AppColors.palette.red}
            keyboardType="email-address"
            style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => { this.passwordTextInput.focus(); }}
            blurOnSubmit={false}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>
            PASSWORD
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              ref={(input) => { this.passwordTextInput = input; }}
              value={password}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="*****"
              selectionColor={AppColors.palette.red}
              placeholderTextColor={AppColors.palette.greyLight}
              secureTextEntry={hidingPassword}
              style={{ ...styles.input, flex: 1, marginRight: 5 }}
              autoCapitalize="none"
              onSubmitEditing={this.onLoginPress}
              returnKeyType="go"
            />
            <Icon
              name={hidingPassword ? 'viewHide' : 'viewShow'}
              onPress={this.onHidingPasswordPress}
              style={{ color: AppColors.palette.greyDark }}
            />
          </View>
        </View>

        <Animated.View
          style={{
            ...styles.loginButton,
            opacity: loginOpacity,
            top: loginTop,
          }}
        >
          <TouchableOpacity
            onPress={this.onLoginPress}
            style={styles.loginTouchable}
          >
            {(!loading) ? (
              <Animated.Text
                style={{
                  ...styles.loginText,
                  marginLeft: loginMarginLeft,
                  marginRight: loginMarginRight,
                }}
              >
                LOGIN
              </Animated.Text>
            ) : (
              <ActivityIndicator size="large" color={AppColors.palette.white} />
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
