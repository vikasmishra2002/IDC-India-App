import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Appearance, Dimensions } from 'react-native';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Homescreen = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    // Listener to detect theme changes
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    // Cleanup listener on component unmount
    return () => themeListener.remove();
  }, []);

  // Determine if dark mode is active
  const isDarkMode = theme === 'dark';
  const currentTextColor = isDarkMode ? colors.darkText : colors.black;
  const currentBackgroundColor = isDarkMode ? colors.darkBackground : colors.white;
  const highlightTextColor = isDarkMode ? colors.primary : colors.red;

  // Function to handle login button press
  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  // Function to handle signup button press
  const handleSignup = () => {
    navigation.navigate("SIGNIN");
  };

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      <Image source={require("../images/Frame8.png")} style={styles.logo} />
      <Image source={require("../images/idclogo.png")} style={styles.bannerImage} />

      {/* Main title */}
      <Text style={[styles.title, { color: highlightTextColor }]}>
        INNOVATION DEVELOPMENT COUNCIL
      </Text>

      {/* Subtitle with highlighted text */}
      <Text style={[styles.subTitle, { color: currentTextColor }]}>
        Build skills for today, tomorrow, and beyond.
        <Text style={[styles.highlightText, { color: highlightTextColor }]}>
          Education to future-proof your career
        </Text>
      </Text>

      <View style={styles.buttonContainer}>
        {/* Login button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Signup button */}
        <TouchableOpacity
          style={[styles.button, styles.signupButton, { borderColor: highlightTextColor }]}
          onPress={handleSignup}
        >
          <Text style={[styles.buttonText, { color: highlightTextColor }]}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: height * 0.06,
    width: width * 0.4,
    marginBottom: height * 0.03,
    resizeMode: 'contain',
  },
  bannerImage: {
    height: height * 0.25,
    width: width * 0.8,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: height * 0.035,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  subTitle: {
    fontSize: height * 0.02,
    paddingHorizontal: width * 0.1,
    textAlign: 'center',
    marginBottom: height * 0.04,
    lineHeight: height * 0.03,
  },
  highlightText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: height * 0.02,
  },
  button: {
    width: '45%',
    paddingVertical: height * 0.015,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  signupButton: {
    borderColor: colors.red,
  },
  buttonText: {
    fontSize: height * 0.02,
    color: colors.white,
    fontWeight: 'bold',
  },
});
