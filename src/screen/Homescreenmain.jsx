import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, Linking, Modal, Pressable, Appearance } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../colors'; // Ensure this file exists and is correctly referenced
import { fonts } from '../fonts'; // Ensure this file exists and is correctly referenced

const { width, height } = Dimensions.get('window');

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
          duration: 9000, // Adjust duration for smooth scrolling
          useNativeDriver: true,
        }),
        Animated.timing(scrollX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(1000) // Wait for 1 second before starting the animation again
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
    setModalVisible(false);
    navigation.navigate('LOGIN'); // Ensure your Login screen route is correct
  };

  const handleDashboard = () => {
    setModalVisible(false);
    navigation.navigate('DASHBOARD');
  };


  const handlecoures = () => {
    navigation.navigate('courses1');
  };


  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image 
            source={require("../images/avdesh.png")} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Image 
          source={require("../images/idclogo.png")}
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
            <TouchableOpacity style={styles.modalButton} onPress={handleDashboard}>
              <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                Dashboard
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

      {/* Moving Marquee Notification */}
      <View style={styles.marqueeContainer}>
        <Animated.View
          style={[
            styles.marqueeText,
            { transform: [{ translateX: scrollX }] },
          ]}
        >
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

        {/* Newest Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Newest Courses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.newestCourse}>
              <Image style={styles.newestImage} source={require("../images/ds2.jpg")} />
              <Text style={[styles.cardText, { color: currentTextColor }]}>Machine Learning</Text>
            </View>
            <View style={styles.newestCourse}>
              <Image style={styles.newestImage} source={require("../images/big.jpg")} />
              <Text style={[styles.cardText, { color: currentTextColor }]}>FullStack Development</Text>
            </View>
            <View style={styles.newestCourse}>
              <Image style={styles.newestImage} source={require("../images/ai2.jpg")} />
              <Text style={[styles.cardText, { color: currentTextColor }]}>Artificial Intelligence</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: theme === 'dark' ? '#333' : 'white' }]}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="home-outline" size={24} color="blue" />
          <Text style={[styles.footerLabel, { color: currentTextColor }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={handlecoures}>
          <SimpleLineIcons name="book-open" size={24} color={currentTextColor} />
          <Text style={[styles.footerLabel, { color: currentTextColor }]}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="chatbubble-outline" size={24} color={currentTextColor} />
          <Text style={[styles.footerLabel, { color: currentTextColor }]}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="bookmark-outline" size={24} color={currentTextColor} />
          <Text style={[styles.footerLabel, { color: currentTextColor }]}>Saved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  companyLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
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
  marqueeContainer: {
    height: 40,
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#FF5050', // Red background
  },
  marqueeText: {
    flexDirection: 'row',
    width: width * 2, // Adjusted to accommodate long scrolling text
  },
  marqueeTextContent: {
    fontSize: 16,
    paddingHorizontal: 20,
    color: '#FFFFFF', // White text
    fontWeight: 'bold', // Bold text
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 14,
    color: 'blue',
  },
  featuredItem: {
    marginRight: 15,
  },
  featuredImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  card: {
    alignItems: 'center',
    marginRight: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  cardText: {
    fontSize: 14,
    marginTop: 10,
  },
  newestCourse: {
    alignItems: 'center',
    marginRight: 15,
  },
  newestImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default Homescreenmain;
