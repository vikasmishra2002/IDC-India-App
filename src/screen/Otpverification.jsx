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
      navigation.navigate('HOMESCREENMAIN');
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
          source={require('../images/idclogo.png')} // Replace with your actual company logo path
          style={styles.logo}
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
    backgroundColor: '#f5f5f5', // Slightly off-white for a softer look
  },
  header: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    color: '#333', // Darker color for better readability
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Lighter color for subtitle
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
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
