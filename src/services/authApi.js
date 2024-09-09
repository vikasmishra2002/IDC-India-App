import { setLoading } from "../Redux/Reducers/authSlice";
import { withoutAuthAxios } from "../services/config";
import { ToastAndroid } from 'react-native';

// Send OTP Function
export function sendOtp(email, navigation) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await withoutAuthAxios().post('/auth/sendotp', {
        email,
        checkUserPresent: true,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      ToastAndroid.show("OTP Sent Successfully", ToastAndroid.SHORT);
      navigation.navigate("Otpverify"); 
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      ToastAndroid.show("Could Not Send OTP. User Already Registered, Please Login", ToastAndroid.SHORT);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Sign Up Function
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigation
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await withoutAuthAxios().post('/auth/signup', {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      ToastAndroid.show("Signup Successful", ToastAndroid.SHORT);
      navigation.navigate("LOGIN"); 
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      ToastAndroid.show("Signup Failed", ToastAndroid.SHORT);
      navigation.navigate("SIGNIN"); 
    } finally {
      dispatch(setLoading(false));
    }
  };
}
