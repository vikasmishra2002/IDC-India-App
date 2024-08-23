import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, Pressable, Appearance } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { colors } from '../colors';
import { fonts } from '../fonts';

const { width } = Dimensions.get('window');

const courses = [
  {
    id: 1,
    title: 'Artificial intelligence',
    trainer: 'Avdesh Singh',
    hours: '20h 12m',
    lessons: '10 lessons',
    image: require('../images/ai.jpg'),
    backgroundColor: '#E6E6FA', 
  },
  {
    id: 2,
    title: 'Machine Learning',
    trainer: 'Gulshan Yadav',
    hours: '43h 12m',
    lessons: '24 lessons',
    image: require('../images/ai2.jpg'),
    backgroundColor: '#AFEEEE',
  },
];

const Coursesscreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('LOGIN');
  };

  const handleDashboard = () => {
    setModalVisible(false);
    navigation.navigate('DASHBOARD');
  };

  const handleHome = () => {
    navigation.navigate('HOMESCREENMAIN');
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

      {/* "My Courses" Heading */}
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, { color: currentTextColor }]}>Courses</Text>
        <View style={styles.headingUnderline} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {courses.map((course) => (
          <View key={course.id} style={[styles.card, { backgroundColor: course.backgroundColor }]}>
            <View style={styles.leftContainer}>
              <Text style={[styles.courseTitle, { color: currentTextColor }]}>{course.title}</Text>
              <Text style={[styles.trainer, { color: currentTextColor }]}>{course.trainer}</Text>
              <View style={styles.courseInfo}>
                <View style={styles.courseDetailBox}>
                  <Text style={[styles.courseDetail, { color: currentTextColor }]}>{course.hours}</Text>
                </View>
                <View style={styles.courseDetailBox}>
                  <Text style={[styles.courseDetail, { color: currentTextColor }]}>{course.lessons}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rightContainer}>
              <Image source={course.image} style={styles.courseImage} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: theme === 'dark' ? '#333' : 'white' }]}>
        <TouchableOpacity style={styles.footerItem} onPress={handleHome}>
          <Ionicons name="home-outline" size={24} color={currentTextColor} />
          <Text style={[styles.footerLabel, { color: currentTextColor }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <SimpleLineIcons name="book-open" size={24} color="blue" />
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
  headingContainer: {
    marginVertical: 20,
    marginLeft: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  headingUnderline: {
    marginTop: 10,
    marginBottom: 20,
    width: 380,
    height: 2,
    backgroundColor: '#FF5050', // Adjust the color as needed
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
    marginRight: 15,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trainer: {
    fontSize: 14,
    marginBottom: 10,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDetailBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  courseDetail: {
    fontSize: 12,
  },
  rightContainer: {
    width: width * 0.4,
    height: 120, // Increased the height for a larger image
  },
  courseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default Coursesscreen;

