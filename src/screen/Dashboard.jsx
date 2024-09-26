import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, Appearance, ScrollView, ToastAndroid, Platform, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { authAxios } from '../services/config'; 
import Header from '../Header'; 
import Footer from '../Footer'; 
import FormData from 'form-data';

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [activeIcon, setActiveIcon] = useState('info');
  const [expandedSection, setExpandedSection] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  

  useEffect(() => {
    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setActiveIcon('info');
      fetchUserDetails(); 
    }, [])
  );

  const fetchEnrolledCourses = async () => {
    try {
      setLoading(true);

      const response = await authAxios().get('/profile/getEnrolledCourses');
      console.log(response.data.data, "responseresponseresponseresponse")
  
      if (response.data.success) {
        setEnrolledCourses(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      setError("Could not fetch enrolled courses.");
    } finally {
      setLoading(false);
    }
  };
  const fetchUserDetails = async () => {
    try {
      const response = await authAxios().get('/profile/getUserDetails');
      setUserData(response.data.data);
      setProfileImage({ uri: response.data.data.image });
    } catch (err) {
      setError(error);
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

      return permissionResult === RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  const openGallery = async () => {
    const permissionGranted = await requestGalleryPermission();
  
    if (permissionGranted) {
      launchImageLibrary({}, async (response) => {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setProfileImage({ uri: selectedImage.uri });
          await updateProfileImage(selectedImage);
        }
      });
    }
  };

  const updateProfileImage = async (image) => {
    const formData = new FormData();
    formData.append('displayPicture', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || 'photo.jpg',
    });

    try {
      const response = await authAxios().put('/profile/updateDisplayPicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setProfileImage({ uri: response.data.data.image });
        setUserData(response.data.data);
        ToastAndroid.show('Image updated successfully', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Failed to update image', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Failed to update image', ToastAndroid.SHORT);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImageModalVisible(false); 
  };

  const handleProfileUpdated = () => {
    fetchUserDetails(); 
    ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
  };

  const handleEditProfile = () => {
    navigation.navigate('editprofile', {
      onProfileUpdated: handleProfileUpdated, 
    });
  };

  const handleenrolled = () => {
    navigation.navigate('enrollCourses')
  }

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    navigation.navigate(iconName.charAt(0).toUpperCase() + iconName.slice(1)); 
  };

  const toggleExpand = (section) => {
    if (section === 'enrolledCourses' && !enrolledCourses.length) {
      fetchEnrolledCourses(); 
    }
    setExpandedSection(expandedSection === section ? null : section);
  };
  

  
  

  const currentTextColor = theme === 'dark' ? '#433E39' : '#433E39'; 
  const currentBackgroundColor = theme === 'dark' ? '#d9d9d9' : '#d9d9d0'; 
  const activeColor = '#007AFF'; 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      <Header profileImage={profileImage?.uri} onProfilePress={() => setImageModalVisible(true)} />

      <View style={{ flex: 1 }}>
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

        <View style={styles.userCard}>
          <TouchableOpacity style={styles.userImagePlaceholder} onPress={openGallery}>
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

        <ScrollView style={styles.mainContent}>
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
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Field</Text>
        <Text style={styles.tableHeaderText}>Details</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Name</Text>
        <Text style={styles.tableCell}>{userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Mobile Number</Text>
        <Text style={styles.tableCell}>{userData && userData.additionalDetails ? userData.additionalDetails.contactNumber : 'Loading...'}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Email</Text>
        <Text style={styles.tableCell}>{userData ? userData.email : 'Loading...'}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Date of Birth</Text>
        <Text style={styles.tableCell}>{userData && userData.additionalDetails ? userData.additionalDetails.dateOfBirth : 'Loading...'}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>Gender</Text>
        <Text style={styles.tableCell}>{userData && userData.additionalDetails ? userData.additionalDetails.gender : 'Loading...'}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>About</Text>
        <Text style={styles.tableCell}>{userData && userData.additionalDetails ? userData.additionalDetails.about : 'Loading...'}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
      <Text style={styles.editText}>Edit</Text>
    </TouchableOpacity>
  </View>
)}


<TouchableOpacity style={styles.card} onPress={() => toggleExpand('enrolledCourses')}>
  <Text style={styles.cardTitle}>Enrolled Courses</Text>
  <Ionicons
    name={expandedSection === 'enrolledCourses' ? 'chevron-up-outline' : 'chevron-down-outline'}
    size={20}
    color={currentTextColor}
  />
</TouchableOpacity>
{expandedSection === 'enrolledCourses' && (
  <View style={styles.cardContent}>
    {enrolledCourses.length > 0 ? (
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>S.No.</Text>
          <Text style={styles.tableHeaderText}>Course Name</Text>
          <Text style={styles.tableHeaderText}>Duration</Text>
          <Text style={styles.tableHeaderText}>Progress (%)</Text>
        </View>
        {enrolledCourses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tableRow}
            onPress={() => handleenrolled()} 
          >
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Image source={{ uri: course.thumbnail || 'default_image_url' }} style={styles.courseImage} />
            <Text style={styles.tableCell}>{course.courseName}</Text>
            <Text style={styles.tableCell}>{course.totalDuration || 'N/A'}</Text>
            <Text style={styles.tableCell}>{course.progressPercentage || 0}%</Text>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <Text>No enrolled courses available.</Text>
    )}
  </View>
)}



        </ScrollView>
      </View>

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
    backgroundColor: '#fff',
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
    borderRadius: 10,
    backgroundColor: '#007AFF',
    marginVertical: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
  },
  userCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 20,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardContent: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 10,
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
  noCoursesText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  table: {
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  courseImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default Dashboard;
