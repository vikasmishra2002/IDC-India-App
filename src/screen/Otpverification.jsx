import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { sendOtp, signUp } from '../services/authApi';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRefs = React.useRef([]);

  useEffect(() => {
    if (!signupData) {
      navigation.navigate('Signup');
    }
  }, [signupData, navigation]);

  const handleTextChange = (text, index) => {
    let otpCopy = [...otp];
    otpCopy[index] = text;
    setOtp(otpCopy);

    if (text.length > 0) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerifyAndSignup = () => {
    const otpCode = otp.join('');
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otpCode, navigation));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../images/idclogo.png')}
          style={styles.logo}
        />
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/otpimage.png')}
          style={styles.image}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Verify Email</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>A verification code has been sent to you. Enter the code below</Text>

      {/* OTP Input Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => inputRefs.current[index] = ref}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, index)}
            textAlign="center"
            value={value}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyAndSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.verifyButtonText}>Verify Email</Text>
        )}
      </TouchableOpacity>

      {/* Footer Links */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color="red" />
          <Text style={styles.footerText}>Back To Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => dispatch(sendOtp(signupData.email, navigation))}>
          <Ionicons name="time-outline" size={20} color="red" />
          <Text style={styles.footerText}>Resend it</Text>
        </TouchableOpacity>
      </View>

      {/* Toast Notification */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 25,
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  otpBox: {
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
  },
  verifyButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default OtpVerificationScreen;
