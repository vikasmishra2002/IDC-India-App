import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { sendResetLink } from '../services/authApi';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Email Required',
        text2: 'Please enter your email address.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
      });
      return;
    }

    try {
      const response = await sendResetLink(email);

      if (response.success) {
        setIsLinkSent(true);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Reset Link Sent',
          text2: 'Please check your email for the password reset link.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Email Not Registered',
          text2: response.message || 'The email address is not registered.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 40,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Request Failed',
        text2: error.response ? error.response.data.message || 'Please try again later.' : 'An unexpected error occurred.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 40,
      });
    }
  };

  const handleSignin = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Logo */}
      <View style={styles.header}>
        <Image
          source={require('../images/idclogo.png')} // Replace with your company logo
          style={styles.logo}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Forgot Password?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Enter your registered email address below to receive password reset instructions.
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="e.g. john@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Send Reset Link Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Open Gmail Button */}
      {isLinkSent && (
        <TouchableOpacity
          style={styles.gmailButton}
          onPress={() => Linking.openURL('https://mail.google.com')}
        >
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.gmailButtonText}>Open Gmail</Text>
        </TouchableOpacity>
      )}

      {/* Footer: Back to Sign In */}
      <TouchableOpacity style={styles.footerButton} onPress={handleSignin}>
        <Ionicons name="arrow-back-outline" size={20} color="red" />
        <Text style={styles.footerText}>Back to Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex:0.5,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
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
  backButton: {
    padding: 5,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gmailButton: {
    backgroundColor: '#d44638',
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  gmailButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
  },
});
