import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Appearance } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../colors'; // Ensure this file exists and is correctly referenced
import { fonts } from './fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Loginscreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme());

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

  const handleLogin = () => {
    navigation.navigate('HOMESCREENMAIN'); // Navigate to Homescreenmain on successful login
  };

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBgColor = theme === 'dark' ? '#121212' : '#f8f8f8';
  const placeholderTextColor = theme === 'dark' ? '#ccc' : '#666';

  return (
    <View style={[styles.container, { backgroundColor: currentBgColor }]}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name="arrow-back-outline" color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.headingText, { color: currentTextColor }]}>Hey,</Text>
        <Text style={[styles.headingText, { color: currentTextColor }]}>Welcome</Text>
        <Text style={[styles.headingText, { color: currentTextColor }]}>Back,</Text>
        <Text style={[styles.headingText, { color: currentTextColor }]}>IDC User</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="Enter your email"
            placeholderTextColor={placeholderTextColor}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
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
        <TouchableOpacity>
          <Text style={[styles.forgotPasswordText, { color: currentTextColor }]}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={[styles.continueText, { color: currentTextColor }]}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image source={require('../images/Socialicons.png')} style={styles.googleImage} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={[styles.accountText, { color: currentTextColor }]}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={[styles.signupText, { color: colors.primary }]}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Loginscreen;

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
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    fontFamily: fonts.SemiBold,
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
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    fontFamily: fonts.Regular,
  },
  signupText: {
    fontFamily: fonts.Bold,
  },
});
