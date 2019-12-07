import {Alert, Platform, ToastAndroid} from 'react-native';

export default function showAlert(text, title = 'Warning') {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      250,
    );
  } else {
    Alert.alert(title, text);
  }
}
