import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, Linking, Modal, Pressable, Appearance } from 'react-native';
import FontAwesome6Brands from 'react-native-vector-icons/FontAwesome6';
import ParentComponent from '../ParentComponent'; // Adjust path as necessary

const { width } = Dimensions.get('window');

const Homescreenmain = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());        
  const [selectedCourse, setSelectedCourse] = useState(null);
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
  const currentMarqueeTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f2f2f2';

  return (
    <ParentComponent navigation={navigation}>
      <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
        {/* Profile Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Add to Cart')}>
                <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => console.log('Buy Now')}>
                <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* Moving Marquee Notification */}
        <View style={styles.marqueeContainer}>
          <Animated.View style={[styles.marqueeText, { transform: [{ translateX: scrollX }] }]}>
            <Text style={[styles.marqueeTextContent, { color: currentMarqueeTextColor }]}>
              Special Notification: Don't miss out on our latest courses!
            </Text>
          </Animated.View>
        </View>

        {/* Content */}
        <ScrollView style={styles.contentContainer}>
          {/* Featured Courses Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Featured Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
                style={styles.courseCard}
                onLongPress={() => {
                  setSelectedCourse('Feature 1');
                  setModalVisible(true);
                }}
              >
                <Image style={styles.courseImage} source={require("../images/ai2.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Feature 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai2.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Feature 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai2.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Feature 3</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Top Courses Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Top Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/fullstack.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Top 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/fullstack.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Top 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/fullstack.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Top 3</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* AI Courses Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>AI Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>AI Intro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai2.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>AI Advanced</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai2.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>AI Advanced</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Full Stack Development Courses Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Full Stack Development Courses</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/fullstack.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Full Stack 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/fullstack.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Full Stack 2</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Personality Development Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Personality Development</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.courseCard}>
                <Image style={styles.courseImage} source={require("../images/ai.jpg")} />
                <Text style={[styles.courseText, { color: currentTextColor }]}>Personal Growth</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Suggested Trainers Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: currentTextColor }]}>Suggested Trainers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.trainerCard} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/arya-chaurasia/')}>
                <Image style={styles.trainerImage} source={require("../images/arya1.jpg")} />
                <Text style={[styles.trainerText, { color: currentTextColor }]}>Arya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trainerCard} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/mohd-arman17/')}>
                <Image style={styles.trainerImage} source={require("../images/armaan.jpg")} />
                <Text style={[styles.trainerText, { color: currentTextColor }]}>Armaan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trainerCard} onPress={() => openLinkedInProfile('https://www.linkedin.com/in/gulshan-yadav-30a980175/')}>
                <Image style={styles.trainerImage} source={require("../images/gulsan.jpg")} />
                <Text style={[styles.trainerText, { color: currentTextColor }]}>Gulshan</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => Linking.openURL('https://discord.com/invite/EMC4KdUv')}
        >
          <FontAwesome6Brands name="discord" size={30} color="#7289da" />
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
    height: 50,
    overflow: 'hidden',
  },
  marqueeText: {
    flexDirection: 'row',
    width: width * 2,
  },
  marqueeTextContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  courseCard: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: width * 0.45, 
    height: 160, 
  },
  courseImage: {
    width: '100%', 
    height: 120, // Increased height for better visuals
    borderRadius: 10,
  },
  courseText: {
    marginTop: 5,
    textAlign: 'center',
  },
  trainerCard: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  trainerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  trainerText: {
    marginTop: 5,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Homescreenmain;
