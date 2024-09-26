import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Appearance,
  Image, // Import Image component
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Google icon
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
    navigation.goBack("HOME");
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
        text2: `Welcome back, ${user.firstName}!`,
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

  const currentTextColor = theme === 'dark' ? '#FFFFFF' : '#000000';
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
        <View style={[styles.container, { backgroundColor: currentBgColor }]}>
          {/* Company Logo */}
          <Image
            source={require('../images/idclogo.png')} // Update the path to your logo
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Back Arrow */}
<TouchableOpacity 
  onPress={handleGoBack} 
  style={{
    position: 'absolute', // Position it absolutely
    top: 40, // Adjust the top margin as needed
    left: 20, // Adjust the left margin for padding
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
  <Ionicons name="arrow-back-outline" color={colors.primary} size={25} />
</TouchableOpacity>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={[styles.headingText, { color: currentTextColor }]}>Welcome back!</Text>
            <Text style={styles.subheading}>
              Let's continue your journey to mastering new skills and unlocking opportunities.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={30} color={colors.secondary} />
              <TextInput
                style={[styles.textInput, { color: currentTextColor }]}
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
            <View style={styles.inputContainer}>
              <SimpleLineIcons name="lock" size={30} color={colors.secondary} />
              <TextInput
                style={[styles.textInput, { color: currentTextColor }]}
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

            <TouchableOpacity onPress={handleForget}>
              <Text style={[styles.forgotPasswordText, { color: currentTextColor }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Button Container */}
            <View style={styles.buttonContainer}>
              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButtonWrapper, { backgroundColor: '#BC2E23' }]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Google Sign-In Button */}
              <TouchableOpacity style={styles.googleButtonContainer}>
                <MaterialCommunityIcons name="google" size={25} color="#BC2E23" />
                <Text style={{ color: '#BC2E23', marginLeft: 10 }}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={[styles.accountText, { color: currentTextColor }]}>Don’t have an account?</Text>
              <TouchableOpacity onPress={handleSignup}>
                <Text style={styles.signupText}>Create one</Text>
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
  logo: {
    width: '100%',
    height: 80, // Adjust the size according to your needs
    marginBottom: 20,
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
    color: '#BC2E23',
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
    marginVertical: 20,
  },
  loginButtonWrapper: {
    backgroundColor: '#BC2E23',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#BC2E23',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  accountText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
  },
  signupText: {
    fontSize: 16,
    color: '#BC2E23',
    fontFamily: fonts.SemiBold,
    marginLeft: 5,
  },
});
