import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, Appearance, ScrollView, ToastAndroid, Platform, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { authAxios } from '../services/config'; // Adjust the path accordingly
import Header from '../Header'; // Import Header component
import Footer from '../Footer'; // Import Footer component
import FormData from 'form-data';


const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [activeIcon, setActiveIcon] = useState('info');
  const [expandedSection, setExpandedSection] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
console.log(profileImage, "profileImageprofileImageprofileImageuseNavigation")
  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveIcon('info'); 
      fetchUserDetails(); // Fetch user details when focused
    }, [])
  );

  

  const fetchUserDetails = async () => {
    try {
      const response = await authAxios().get('/profile/getUserDetails');
      console.log(response.data, "User data fetched");
      setUserData(response.data.data); // Access the data property from the response
      setProfileImage({ uri: response.data.data.image });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch user details.');
    } finally {
      setLoading(false);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      let permissionResult;

      if (Platform.OS === 'android') {
        permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      } else if (Platform.OS === 'ios') {
        permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }

      if (permissionResult === RESULTS.GRANTED) {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Thank you for giving permission', ToastAndroid.SHORT);
        }
        return true;
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show('To upload an image, please give permission', ToastAndroid.SHORT);
        }
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const openGallery = async () => {
    const permissionGranted = await requestGalleryPermission();
  
    if (permissionGranted) {
      launchImageLibrary({}, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Error', 'Failed to pick an image.');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          const source = { uri: selectedImage.uri };
          setProfileImage(source);
          setImageModalVisible(false); // Close modal after selecting an image
          
          // Call function to upload the image
          await updateProfileImage(selectedImage);
        }
      });
    }
  };

  const updateProfileImage = async (image) => {
    console.log(image, "imageeeeeeee");
  
    const formData = new FormData();
    formData.append('displayPicture', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'photo.jpg',
    });
    console.log(formData, "formDataformData");
  
    try {
      const response = await authAxios().put('/profile/updateDisplayPicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data, "responseresponseresponse");
  
      if (response.data.success) {
        // Update profileImage with the new image URL
        setProfileImage({ uri: response.data.data.image });
        // Update userData with the new data
        setUserData(response.data.data);
        ToastAndroid.show('Image updated successfully', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed to update image', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error updating image:', error);
      ToastAndroid.show('Failed to update image', ToastAndroid.SHORT);
    }
  };
  
  
  const removeImage = () => {
    setProfileImage(null);
    setImageModalVisible(false); // Close modal after removing the image
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    navigation.navigate(iconName.charAt(0).toUpperCase() + iconName.slice(1)); // Ensure correct route name
  };

  const toggleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';
  const activeColor = '#007AFF'; // Blue color for active icons

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      {/* Header */}
      <Header profileImage={profileImage?.uri} onProfilePress={() => setImageModalVisible(true)} />
        {console.log(profileImage, "below header")}

      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Image Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={imageModalVisible}
          onRequestClose={() => setImageModalVisible(false)}
        >
          <Pressable style={styles.centeredView} onPress={() => setImageModalVisible(false)}>
            <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
              <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
                <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Update Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={removeImage}>
                <Text style={[styles.modalText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Remove Image
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        {/* User Information Card */}
        <View style={styles.userCard}>
          <TouchableOpacity style={styles.userImagePlaceholder} onPress={openGallery}>
            {console.log(userData, "userDtaa")}
            {profileImage || userData?.image ? (
              <Image
              source={{ uri: profileImage?.uri || userData?.image }}
              style={styles.profileImage}
            />
            ) : (
              <Ionicons name="camera-outline" size={54} color={currentTextColor} />
            )}
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {userData ? `${userData.firstName} ${userData.lastName}` : 'User Name'}
            </Text>
            <TouchableOpacity style={styles.editIcon} onPress={() => setImageModalVisible(true)}>
              <Ionicons name="pencil-outline" size={20} color={activeColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expandable Cards */}
        <ScrollView style={styles.mainContent}>
          {/* My Profile */}
          <TouchableOpacity style={styles.card} onPress={() => toggleExpand('profile')}>
            <Text style={styles.cardTitle}>My Profile</Text>
            <Ionicons
              name={expandedSection === 'profile' ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color={currentTextColor}
            />
          </TouchableOpacity>
          {expandedSection === 'profile' && (
            <View style={styles.cardContent}>
              <Text>Name: {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}</Text>
              <Text>Mobile Number: {userData && userData.additionalDetails ? userData.additionalDetails.contactNumber : 'Loading...'}</Text>
              <Text>Email: {userData ? userData.email : 'Loading...'}</Text>
              <Text>Date of Birth: {userData && userData.additionalDetails ? userData.additionalDetails.dateOfBirth : 'Loading...'}</Text>
              <Text>Gender: {userData && userData.additionalDetails ? userData.additionalDetails.gender : 'Loading...'}</Text>
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Enrolled Courses */}
          <TouchableOpacity style={styles.card} onPress={() => toggleExpand('courses')}>
            <Text style={styles.cardTitle}>Enrolled Courses</Text>
            <Ionicons
              name={expandedSection === 'courses' ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={20}
              color={currentTextColor}
            />
          </TouchableOpacity>
          {expandedSection === 'courses' && (
            <View style={styles.cardContent}>
              <ScrollView>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Course Name</Text>
                    <Text style={styles.tableHeaderText}>Duration</Text>
                    <Text style={styles.tableHeaderText}>Progress</Text>
                  </View>
                  {/* Replace with dynamic course data */}
                  {userData && userData.courses.map((courseId, index) => (
                    <View key={index} style={styles.tableRow}>
                      <View style={styles.courseImageContainer}>
                        <Image source={{ uri: 'course_image_url_here' }} style={styles.courseImage} />
                      </View>
                      <View style={styles.tableCell}>
                        <Text>{`Course ${index + 1}`}</Text> {/* Adjust this to use real course data */}
                      </View>
                      <View style={styles.tableCell}>
                        <Text>Duration</Text> {/* Adjust this to use real course data */}
                      </View>
                      <View style={styles.tableCell}>
                        <View style={styles.progressBarBackground}>
                          <View style={[styles.progressBarFill, { width: '50%' }]} /> {/* Adjust this to use real course data */}
                          <Text style={styles.progressText}>50%</Text> {/* Adjust this to use real course data */}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Footer */}
      <Footer activeIcon={activeIcon} onIconPress={handleIconPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  modalButton: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
  },
  userCard: {
    alignItems: 'center',
    padding: 20,
  },
  userImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  userInfo: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editIcon: {
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 16,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 10,
    position: 'absolute',
    top: -2,
    left: 0,
    right: 0,
  },
  courseImageContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Dashboard;