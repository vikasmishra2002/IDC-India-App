import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header'; // Adjust path as necessary
import Footer from './Footer'; // Adjust path as necessary

const ParentComponent = ({ children, navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [modalVisible, setModalVisible] = useState(false);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      navigation.navigate('HOMESCREENMAIN');
    } else if (tab === 'allCourses') {
      navigation.navigate('COURSES');
    } else if (tab === 'keepLearning') {
      navigation.navigate('PAYMENTS');
    } else if (tab === 'profile') {
      navigation.navigate('DASHBOARD');
    }
  };

  return (
    <View style={styles.container}>
      <Header onProfilePress={() => setModalVisible(true)} />
      {children}
      <Footer activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ParentComponent;
