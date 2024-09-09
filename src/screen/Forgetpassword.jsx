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
import { sendResetLink } from '../services/authApi'; // Ensure this function is implemented


const Forgetpassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLinkSent, setIsLinkSent] = useState(false);
  const handleSignup = () => {
    navigation.navigate('SIGNIN');
  };
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../images/idclogo.png')} // Replace with your logo path
          style={styles.logo}
        />
      </View>
      
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/otpimage.png')} // Replace with your image path
          style={styles.image}
        />
      </View>
      
      {/* Title */}
      <Text style={styles.title}>Forget Password</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>
      Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
      </Text>
      
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      {/* Send Reset Link Button */}
      <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handleSignup}>
          <Ionicons name="arrow-back-outline" size={20} color="red" />
          <Text style={styles.footerText}>Back To Signup</Text>
        </TouchableOpacity>

      {/* Open Gmail Button */}
      {isLinkSent && (
        <TouchableOpacity
          style={styles.openGmailButton}
          onPress={() => Linking.openURL('https://mail.google.com')}
        >
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text style={styles.openGmailText}>
            Open Gmail
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Forgetpassword;

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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  openGmailButton: {
    backgroundColor: '#d44638', // Gmail color
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  openGmailText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});
