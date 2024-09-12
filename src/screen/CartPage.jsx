import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';

const CartPage = ({ navigation }) => {
  const cart = useSelector(state => state.cart.items);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      <Header />

      <View style={styles.cartContainer}>
        {cart.length === 0 ? (
          <Text style={[styles.emptyCartText, { color: currentTextColor }]}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={[styles.courseName, { color: currentTextColor }]}>{item.courseName}</Text>
                <Text style={[styles.coursePrice, { color: currentTextColor }]}>₹{item.price}</Text>
              </View>
            )}
          />
        )}
      </View>

      <Footer activeTab="CART" onTabPress={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  cartContainer: { flex: 1, padding: 16 },
  emptyCartText: { textAlign: 'center', fontSize: 18 },
  cartItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  courseName: { fontSize: 16 },
  coursePrice: { fontSize: 14 },
});

export default CartPage;
