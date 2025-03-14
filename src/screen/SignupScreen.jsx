import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Appearance,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../colors'; // Import the colors
import { fonts } from './fonts';
import Toast from 'react-native-toast-message';
import { sendOtp } from '../services/authApi';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../Redux/Reducers/authSlice';

const SignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [secureEntry, setSecureEntry] = useState(true);
  const [confirmSecureEntry, setConfirmSecureEntry] = useState(true);
  const [accountType, setAccountType] = useState('Student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = () => {
    if (password !== confirmPassword) {
      alert('Passwords Do Not Match');
      return;
    }

    setLoading(true);
    const signupData = { ...formData, accountType };
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(email, navigation)).finally(() => {
      setLoading(false);
    });

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setAccountType('Student');
  };

  const currentTextColor = theme === 'dark' ? colors.white : colors.black;
  const placeholderTextColor = theme === 'dark' ? '#ccc' : '#666';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primaryRed} />
          <Text style={styles.loaderText}>Processing...</Text>
        </View>
      )}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
        <Ionicons name={"arrow-back-outline"} color={colors.primaryRed} size={25} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={require('../images/idclogo.png')} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.headingText, { color: currentTextColor }]}>Register!</Text>
        <Text style={[styles.headingText1, { color: currentTextColor }]}>Enter your Personal Details.</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="First Name"
            placeholderTextColor={placeholderTextColor}
            value={formData.firstName}
            onChangeText={(value) => handleOnChange("firstName", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="Last Name"
            placeholderTextColor={placeholderTextColor}
            value={formData.lastName}
            onChangeText={(value) => handleOnChange("lastName", value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="Email Address"
            placeholderTextColor={placeholderTextColor}
            value={formData.email}
            onChangeText={(value) => handleOnChange("email", value)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="Create Password"
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureEntry}
            value={formData.password}
            onChangeText={(value) => handleOnChange("password", value)}
          />
          <TouchableOpacity onPress={() => setSecureEntry(prev => !prev)}>
            <SimpleLineIcons name={secureEntry ? "eye" : "eye-off"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={[styles.textInput, { color: currentTextColor }]}
            placeholder="Confirm Password"
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={confirmSecureEntry}
            value={formData.confirmPassword}
            onChangeText={(value) => handleOnChange("confirmPassword", value)}
          />
          <TouchableOpacity onPress={() => setConfirmSecureEntry(prev => !prev)}>
            <SimpleLineIcons name={confirmSecureEntry ? "eye" : "eye-off"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleOnSubmit}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <Text style={[styles.continueText, { color: currentTextColor }]}>or </Text>
        <TouchableOpacity style={[styles.googleButtonContainer, { backgroundColor: colors.primaryGray }]} onPress={() => {/* Handle Google Sign-In */}}>
          <Image source={require("../images/Google.png")} style={styles.googleImage} />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={[styles.accountText, { color: currentTextColor }]}>Already have an account!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
            <Text style={[styles.signupText, { color: colors.primaryRed }]}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.white, // Using primary gray
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.primaryWhite, // Using primary white
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute', // Position it in the header
    top: 20,
    left: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 1,
    marginTop: 1, // Adjust to align with the back button
  },
  logo: {
    marginBottom: 10,
    width: 120, // Increased size
    height: 50,
    resizeMode: 'contain',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primaryRed, // Using primary red
    fontFamily: fonts.SemiBold,
  },
  headingText1: {
    fontSize: 18,
    color: colors.primaryRed, // Using primary red
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.primaryRed, // Using primary red
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  registerButton: {
    backgroundColor: colors.primaryRed, // Using primary red
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.primaryWhite, // Using primary white
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primaryRed, // Using primary red
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    marginTop: 2,
    backgroundColor: colors.primaryGray, // Using primary gray
  },
  googleText: {
    color: colors.primaryRed, // Using primary red
    fontFamily: fonts.Regular,
  },
  continueText: {
    textAlign: "center",
    fontSize: 14,
    marginVertical: 20,
    fontFamily: fonts.Regular,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  accountText: {
    fontSize: 14,
    fontFamily: fonts.Regular,
  },
  signupText: {
    fontSize: 14,
    fontFamily: fonts.Bold,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
});

export default SignupScreen;
