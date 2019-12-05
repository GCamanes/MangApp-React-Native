import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import AppColors from '../../app/app.colors';
import images from '../../assets/images';

const styles = StyleSheet.create({
  loaderView: {
    width: 100,
    height: 32,
    padding: 5,
    backgroundColor: AppColors.palette.whiteSmoke,
    borderRadius: 15,
  },
});

class CustomLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { animatedValue } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          animatedValue,
          {
            toValue: 70,
            duration: 500,
          },
        ),
        Animated.delay(100),
        Animated.timing(
          animatedValue,
          {
            toValue: 0,
            duration: 500,
          },
        ),
        Animated.delay(100),
      ]),
    ).start();
  }

  render() {
    const { animatedValue } = this.state;
    return (
      <View
        style={{
          padding: 2,
          borderRadius: 18,
          backgroundColor: AppColors.palette.black,
        }}
      >
        <View style={styles.loaderView}>
          <Animated.View
            style={{
              width: 21,
              height: 21,
              borderRadius: 50,
              backgroundColor: AppColors.palette.black,
              transform: [{
                translateX: animatedValue,
              }],
            }}
          >
            <Image source={images.loader} style={{ width: 21, height: 21 }} />
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default CustomLoader;
