import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Appearance,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Reducers/authSlice';
import { withoutAuthAxios } from '../services/config';
import { colors } from '../colors';
import { fonts } from './fonts';
import Loader from '../Loader'; // Import the Loader component

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignup = () => {
    navigation.navigate('SIGNIN');
  };

  const handleForget = () => {
    navigation.navigate('FORGETPASS');
  };

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await withoutAuthAxios().post('/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      dispatch(login({ user, accessToken: token }));

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Login Successful',
        text2: `Welcome back, ${user.firstName}!`, // Fixed string interpolation
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
        onHide: () => {
          navigation.navigate('HOMESCREENMAIN');
        },
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Please check your credentials and try again.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const currentTextColor = theme === 'dark' ? '#FFFFFF' : '#000000'; // Updated text color
  const currentBgColor = theme === 'dark' ? '#121212' : '#f8f8f8';
  const placeholderTextColor = theme === 'dark' ? '#ccc' : '#666';

  if (loading) {
    return <Loader />; // Show loader when loading
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, padding: 20, backgroundColor: currentBgColor }}>
          {/* Back Arrow */}
          <TouchableOpacity onPress={handleGoBack} style={{ height: 40, width: 40, backgroundColor: colors.gray, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Ionicons name="arrow-back-outline" color={colors.primary} size={25} />
          </TouchableOpacity>

          {/* Logo */}
          <Image source={require('../images/idclogo.png')} style={{ width: 226, height: 111, alignSelf: 'center', marginVertical: 20 }} />

          {/* Welcome Text */}
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontFamily: fonts.Bold, color: currentTextColor }}>Welcome back!</Text>
            <Text style={{ fontSize: 20, fontFamily: fonts.SemiBold, color: '#BC2E23', textAlign: 'center' }}>
              Let's continue your journey to mastering new skills and unlocking opportunities.
            </Text>
          </View>

          {/* Form */}
          <View style={{ marginTop: 40 }}>
            {/* Email Input */}
            <View style={{ borderWidth: 1, borderColor: colors.secondary, borderRadius: 100, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', padding: 2, marginVertical: 10 }}>
              <Ionicons name="mail-outline" size={30} color={colors.secondary} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 10, fontFamily: fonts.Light, color: currentTextColor }}
                placeholder="Enter your email"
                placeholderTextColor={placeholderTextColor}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCompleteType="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ borderWidth: 1, borderColor: colors.secondary, borderRadius: 100, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', padding: 2, marginVertical: 10 }}>
              <SimpleLineIcons name="lock" size={30} color={colors.secondary} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 10, fontFamily: fonts.Light, color: currentTextColor }}
                placeholder="Enter your password"
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureEntry}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                <SimpleLineIcons name={secureEntry ? 'eye' : 'eye-off'} size={20} color={colors.secondary} />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={handleForget}>
                <Text style={{ textAlign: 'right', fontFamily: fonts.SemiBold, marginVertical: 10, color: currentTextColor }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Button Container */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              {/* Login Button */}
              <TouchableOpacity style={{ paddingVertical: 15, borderRadius: 100, alignItems: 'center', flex: 1, marginRight: 10, backgroundColor: '#BC2E23' }} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={{ fontSize: 16, color: '#fff', fontFamily: fonts.SemiBold }}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Google Sign-In Button */}
              <TouchableOpacity style={{ paddingVertical: 10, borderRadius: 100, alignItems: 'center', flex: 1, marginLeft: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#D9D9D9' }}>
                <Image source={require('../images/Google.png')} style={{ height: 25, width: 25, marginRight: 10 }} />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.Light, color: currentTextColor }}>Don’t have an account?</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={{ fontSize: 14, fontFamily: fonts.Bold, marginLeft: 5, color: colors.primary }}>Create one</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 226, 
    height: 111,
    alignSelf: 'center',
    marginVertical: 20,
  },
  textContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    fontFamily: fonts.Bold,
  },
  subheading: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: '#BC2E23', // Updated color
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 40,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: 'right',
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loginButtonWrapper: {
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: fonts.SemiBold,
  },
  googleButtonContainer: {
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  accountText: {
    fontSize: 14,
    fontFamily: fonts.Light,
  },
  signupText: {
    fontSize: 14,
    fontFamily: fonts.Bold,
    marginLeft: 5,
  },
});
