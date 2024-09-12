import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Footer = ({ activeTab, onTabPress = () => {} }) => { // Provide default function
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const iconColor = (tabName) => {
    return activeTab === tabName ? 'red' : 'black'; // Change color based on active tab
  };

  const glowingStyle = (tabName) => {
    return activeTab === tabName ? styles.glow : {};
  };

  return (
    <View style={[styles.footer, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <TouchableOpacity style={styles.footerButton} onPress={() => { navigation.navigate('HOMESCREENMAIN'); onTabPress('HOMESCREENMAIN'); }}>
        <Ionicons name="home-outline" size={24} color={iconColor('HOMESCREENMAIN')} style={glowingStyle('HOMESCREENMAIN')} />
        <Text style={[styles.footerButtonText, { color: iconColor('HOMESCREENMAIN') }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => { navigation.navigate('COURSES'); onTabPress('COURSES'); }}>
        <Ionicons name="book-outline" size={24} color={iconColor('COURSES')} style={glowingStyle('COURSES')} />
        <Text style={[styles.footerButtonText, { color: iconColor('COURSES') }]}>All Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => { navigation.navigate('CourseDetail'); onTabPress('CourseDetail'); }}>
        <Ionicons name="chatbox-outline" size={24} color={iconColor('CourseDetail')} style={glowingStyle('CourseDetail')} />
        <Text style={[styles.footerButtonText, { color: iconColor('CourseDetail') }]}>Keep Learning</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => { navigation.navigate('DASHBOARD'); onTabPress('DASHBOARD'); }}>
        <Ionicons name="person-outline" size={24} color={iconColor('DASHBOARD')} style={glowingStyle('DASHBOARD')} />
        <Text style={[styles.footerButtonText, { color: iconColor('DASHBOARD') }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    marginTop: 4,
  },
  glow: {
    textShadowColor: 'red',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default Footer;
