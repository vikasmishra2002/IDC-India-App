import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, Linking, Modal, Pressable, Appearance } from 'react-native';
import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6';
import ParentComponent from '../ParentComponent'; // Adjust path as necessary

const { width } = Dimensions.get('window');

const Homescreenmain = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const marqueeWidth = width * 2;

    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollX, {
          toValue: -marqueeWidth,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(1000)
      ])
    ).start();
  }, [scrollX]);

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const openLinkedInProfile = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setModalVisible(false);
    navigation.navigate('LOGIN'); // Ensure this matches the registered screen name
  };
  

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#d9d9d9';

  return (
    <ParentComponent navigation={navigation}>
      <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
        {/* Profile Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log("Modal closed");
            setModalVisible(false);
          }}
        >
          <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Moving Marquee Notification */}
        <View style={styles.marqueeContainer}>
          <Animated.View style={[styles.marqueeText, { transform: [{ translateX: scrollX }] }]}>
            <Text style={styles.marqueeTextContent}>
              Special Notification: Don't miss out on our latest courses!
            </Text>
          </Animated.View>
        </View>

        {/* Content */}
        <ScrollView style={styles.contentContainer}>
          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Featured</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/fullstack.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ai.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/lead.jpg")} />
              </View>
            </ScrollView>
          </View>

          {/* Top Courses */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Top Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ds2.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/big.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ai2.jpg")} />
              </View>
            </ScrollView>
          </View>

          {/* Suggested Trainers */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Suggested Trainers</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.card} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/arya-chaurasia/')}>
                <Image style={styles.cardImage} source={require("../images/arya1.jpg")} />
                <Text style={[styles.cardText, { color: currentTextColor }]}>Arya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/mohd-arman17/')}>
                <Image style={styles.cardImage} source={require("../images/armaan.jpg")} />
                <Text style={[styles.cardText, { color: currentTextColor }]}>Armaan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/gulshan-yadav-30a980175/')}>
                <Image style={styles.cardImage} source={require("../images/gulsan.jpg")} />
                <Text style={[styles.cardText, { color: currentTextColor }]}>Gulshan</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* AI Courses */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>AI Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ai.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ai2.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/ai2.jpg")} />
              </View>
            </ScrollView>
          </View>

          {/* Full Stack Development Courses */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Full Stack Development Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/fullstack.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/fullstack.jpg")} />
              </View>
              <View style={styles.featuredItem}>
                <Image style={styles.featuredImage} source={require("../images/fullstack.jpg")} />
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => Linking.openURL('https://discord.com/invite/EMC4KdUv')}
        >
          <FontAwesome6Brands name="discord" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </ParentComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marqueeContainer: {
    height: 45,
    justifyContent: 'center',
    backgroundColor: 'yellow',
    overflow: 'hidden',
    marginBottom: 16,
  },
  marqueeText: {
    flexDirection: 'row',
  },
  marqueeTextContent: {
    fontSize: 16,
    paddingHorizontal: 1,
    color: '#ff0000',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  featuredItem: {
    marginRight: 20,
    width: 300,
    height: 220,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  card: {
    marginRight: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  cardText: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20, // Adjust this value to move the button up or down
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Homescreenmain;
