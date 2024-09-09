import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appearance } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from './Redux/Reducers/authSlice';

const Header = ({ profileImage }) => {
  console.log(profileImage, "profileImageprofileImage");

  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout()); // Dispatch the logout action to clear state
    navigation.navigate('LOGIN'); // Navigate to the login screen
  };

  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#fff';
  const currentTextColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./images/avdesh.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Image
        source={require('./images/idclogo.png')}
        style={styles.companyLogo}
      />
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalView, { backgroundColor: currentBackgroundColor }]}>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={[styles.modalText, { color: currentTextColor }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  companyLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
  },
});

export default Header;
