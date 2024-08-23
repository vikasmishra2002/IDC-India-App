import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, Appearance, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [activeIcon, setActiveIcon] = useState('info');
  const navigation = useNavigation();

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveIcon('info'); // Set 'info' as active icon when Dashboard screen is focused
    }, [])
  );

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('LOGIN');
  };

  const handleHome = () => {
    setModalVisible(false);
    navigation.navigate('HOMESCREENMAIN');
  };

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    switch (iconName) {
      case 'batches':
        navigation.navigate('BATCHES');
        break;
      case 'courses':
        navigation.navigate('COURSES');
        break;
      case 'performance':
        navigation.navigate('PERFORMANCE');
        break;
      case 'payments':
        navigation.navigate('PAYMENTS');
        break;
      case 'assignments':
        navigation.navigate('ASSIGNMENTS');
        break;
      case 'info':
      default:
        navigation.navigate('DASHBOARD');
        break;
    }
  };

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';
  const activeColor = '#007AFF'; // Blue color for active icons

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: currentBackgroundColor }]}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image 
            source={require('../images/avdesh.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Image 
          source={require('../images/idclogo.png')}
          style={styles.companyLogo}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={currentTextColor} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Ionicons name="notifications-outline" size={24} color={currentTextColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
            <TouchableOpacity style={styles.modalButton} onPress={handleHome}>
              <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={{ color: currentTextColor }}>Dashboard Content  Goes Here</Text>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: currentBackgroundColor }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.footerContainer}
        >
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('info')}
          >
            <SimpleLineIcons 
              name="info" 
              size={24} 
              color={activeIcon === 'info' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>INFO</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('batches')}
          >
            <SimpleLineIcons 
              name="book-open" 
              size={24} 
              color={activeIcon === 'batches' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>BATCHES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('courses')}
          >
            <Ionicons 
              name="school-outline" 
              size={24} 
              color={activeIcon === 'courses' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>COURSES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('performance')}
          >
            <Ionicons 
              name="bar-chart-outline" 
              size={24} 
              color={activeIcon === 'performance' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>PERFORMANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('payments')}
          >
            <Ionicons 
              name="wallet-outline" 
              size={24} 
              color={activeIcon === 'payments' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>PAYMENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('assignments')}
          >
            <Ionicons 
              name="document-text-outline" 
              size={24} 
              color={activeIcon === 'assignments' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>ASSIGNMENTS</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => handleIconPress('more')}
          >
            <Ionicons 
              name="ellipsis-horizontal" 
              size={24} 
              color={activeIcon === 'more' ? activeColor : currentTextColor} 
            />
            <Text style={[styles.footerText, { color: currentTextColor }]}>MORE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    elevation: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  companyLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100, // Width for each icon item
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 250,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
});
