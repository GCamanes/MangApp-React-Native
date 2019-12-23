import { StyleSheet } from 'react-native';
import AppColors from '../../app/app.colors';
import AppFonts from '../../app/app.fonts';
import AppSizes from '../../app/app.sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.palette.blackSmoke,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    color: AppColors.palette.black,
    fontSize: AppFonts.t15.size,
    paddingHorizontal: 0,
  },
  inputLabel: {
    color: AppColors.palette.greyDark,
    fontSize: AppFonts.t15.size,
  },
  inputView: {
    width: '100%',
    padding: 10,
    paddingBottom: 5,
    backgroundColor: AppColors.palette.white,
    borderRadius: 4,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    backgroundColor: AppColors.palette.red,
    borderRadius: 4,
    position: 'absolute',
    height: 60,
  },
  loginTouchable: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: AppFonts.t16.size,
    color: AppColors.palette.white,
    fontWeight: 'bold',
  },
});

export default styles;
