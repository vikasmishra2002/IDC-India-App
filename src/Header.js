import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Appearance } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './Redux/Reducers/authSlice';

const Header = ({ profileImage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cart.items.length); // Get cart count from Redux

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(logout()); // Dispatch the logout action
    // Reset navigation stack to prevent going back to protected screens
    navigation.reset({
      index: 0,
      routes: [{ name: 'LOGIN' }],
    });
  };

  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#fff';
  const currentTextColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={profileImage ? { uri: profileImage } : require('./images/arya.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Image source={require('./images/idclogo.png')} style={styles.companyLogo} />

      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

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
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  companyLogo: { height: 40, width: 120 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 4,
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
  cartCountText: { color: '#fff', fontSize: 12 },
});

export default Header;
