import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Appearance, Dimensions } from 'react-native';
import { colors } from '../colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Homescreen = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const handleLogin = () => {
    navigation.navigate("LOGIN");
  };

  const handleSignup = () => {
    navigation.navigate("SIGNIN");
  };

  const isDarkMode = theme === 'dark';
  const currentTextColor = isDarkMode ? colors.darkText : colors.black;
  const currentBackgroundColor = isDarkMode ? colors.darkBackground : colors.white;
  const highlightTextColor = isDarkMode ? colors.primary : colors.red;

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      <Image source={require("../images/Frame8.png")} style={styles.logo} />
      <Image source={require("../images/idclogo.png")} style={styles.bannerImage} />

      <Text className="text-white" style={[styles.title,  { color: highlightTextColor,  }]}>
        INNOVATION DEVELOPMENT COUNCIL
      </Text>
      <Text style={[styles.subTitle, { color: currentTextColor }]}>
        Build skills for today, tomorrow, and beyond.
        <Text style={[styles.highlightText, { color: highlightTextColor }]}>
          Education to future-proof your career
        </Text>
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleSignup}
        >
          <Text style={[styles.signupButtonText, { color: currentTextColor }]}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: height * 0.05,
    width: width * 0.4,
    marginVertical: height * 0.03,
    resizeMode: 'contain',
  },
  bannerImage: {
    height: height * 0.3,
    width: width * 0.9,
    resizeMode: 'contain',
    marginTop: height * 0.03,
    marginBottom: height * 0.1,
  },
  highlightText: {
    color: colors.red,
     // This will be overridden in code based on theme
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: height * 0.04,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    marginTop: height * 0.02,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    width: '80%',
    height: height * 0.08,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
  },
  signupButtonText: {
    fontSize: 18,
  },
});
