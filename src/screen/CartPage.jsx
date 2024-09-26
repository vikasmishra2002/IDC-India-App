import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Appearance, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { removeFromCart } from '../Redux/Reducers/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const CartPage = ({ navigation }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    calculateTotal();

    return () => themeListener.remove();
  }, [cart]);

  const calculateTotal = () => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  };

  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId));  // Dispatch the correct action
  };

  const handleBuy = (courseId) => {
    // Placeholder for future buy functionality
  };

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      <Header />

      <View style={styles.cartContainer}>
        {cart.length === 0 ? (
          <Text style={[styles.emptyCartText, { color: currentTextColor }]}>Your cart is empty</Text>
        ) : (
          <>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { color: currentTextColor }]}>S. No</Text>
              <Text style={[styles.tableHeaderText, { color: currentTextColor }]}>Course Name</Text>
              <Text style={[styles.tableHeaderText, { color: currentTextColor }]}>Rating</Text>
              <Text style={[styles.tableHeaderText, { color: currentTextColor }]}>Price</Text>
              <Text style={[styles.tableHeaderText, { color: currentTextColor }]}>Option</Text>
            </View>
            <FlatList
              data={cart}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <View style={styles.cartItem}>
                  <Text style={[styles.tableText, { color: currentTextColor }]}>{index + 1}</Text>
                  <Text style={[styles.tableText, { color: currentTextColor }]}>{item.courseName}</Text>
                  <Text style={[styles.tableText, { color: currentTextColor }]}>{item.rating} ★</Text>
                  <Text style={[styles.tableText, { color: currentTextColor }]}>₹{item.price}</Text>
                  <View style={styles.optionContainer}>
                    <TouchableOpacity onPress={() => handleBuy(item._id)} style={styles.buyButton}>
                      <Text style={styles.buttonText}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemove(item._id)} style={styles.removeButton}>
                      <Icon name="trash-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.totalContainer}>
              <Text style={[styles.totalText, { color: currentTextColor }]}>Total: ₹{total}</Text>
            </View>
          </>
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeaderText: { fontSize: 16, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableText: { fontSize: 14, flex: 1, textAlign: 'center' },
  optionContainer: { flexDirection: 'row', flex: 1, justifyContent: 'center' },
  buyButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontSize: 14 },
  totalContainer: { padding: 10, alignItems: 'flex-end' },
  totalText: { fontSize: 18, fontWeight: 'bold' },
});

export default CartPage;
