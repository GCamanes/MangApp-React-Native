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
  },
  input: {
    width: AppSizes.screen.width80,
    height: 40,
    marginVertical: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: AppColors.palette.blackSmoke,
    backgroundColor: AppColors.palette.whiteSmoke,
    borderColor: AppColors.palette.yellow,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: AppFonts.t16.size,
    textAlignVertical: 'center',
  },
  loginButton: {
    height: 40,
    backgroundColor: AppColors.palette.whiteSmoke,
    position: 'absolute',
    borderRadius: 50,
  },
  loginTouchable: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: AppFonts.t16.size,
    color: AppColors.palette.black,
    fontWeight: 'bold',
  },
});

export default styles;
