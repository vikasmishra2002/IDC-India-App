import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Appearance, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Updated import for icons
import Header from '../Header'; // Import the Header component
import Footer from '../Footer'; // Import the Footer component
import { authAxios } from '../services/axios'; // Import axios configuration
import { withoutAuthAxios } from '../services/config';

const { width } = Dimensions.get('window');

const Coursesscreen = ({ navigation }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await withoutAuthAxios().get('/course/getAllCourses');
        console.log(response.data,"fdgrfvfdfdfd")
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    const themeListener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => themeListener.remove();
  }, []);

  const handleNavigation = (screen) => {
    try {
      navigation.navigate(screen);
    } catch (error) {
      Alert.alert('Error', 'Failed to navigate to the requested screen.');
      console.error('Navigation Error:', error);
    }
  };

  const handleCourseClick = (course) => {
    navigation.navigate('CourseDetail', { course }); // Navigate to a course detail screen
  };

  const currentTextColor = theme === 'dark' ? '#fff' : '#000';
  const currentBackgroundColor = theme === 'dark' ? '#121212' : '#f8f8f8';

  return (
    <View style={[styles.container, { backgroundColor: currentBackgroundColor }]}>
      {/* Header */}
      <Header />

      {/* "Courses" Heading */}
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, { color: currentTextColor }]}>Courses</Text>
        <View style={styles.headingUnderline} />
      </View>

      {/* Loading and Error Handling */}
      {loading && <Text style={[styles.loadingText, { color: currentTextColor }]}>Loading...</Text>}
      {error && <Text style={[styles.errorText, { color: currentTextColor }]}>Error: {error}</Text>}

      {/* Courses List */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course._id}
            style={[styles.card, { backgroundColor: course.backgroundColor || '#E6E6FA' }]} // Default color if not provided
            onPress={() => handleCourseClick(course)}
          >
            <View style={styles.leftContainer}>
              <Text style={[styles.courseTitle, { color: currentTextColor }]}>{course.courseName}</Text>
              <Text style={[styles.trainer, { color: currentTextColor }]}>{course.instructor.name}</Text>
              
              {/* Star Ratings */}
              <View style={styles.ratingContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <MaterialIcons
                    key={index}
                    name="star"
                    size={24}
                    color={index < course.ratingAndReviews.rating ? '#FFD700' : '#D3D3D3'} // Golden for filled stars
                  />
                ))}
                <Text style={[styles.ratingCount, { color: currentTextColor }]}>
                  {course.ratingAndReviews.totalRatings} Ratings
                </Text>
              </View>

              {/* Price */}
              <Text style={[styles.price, { color: currentTextColor }]}>
                ₹{course.price}
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Image source={{ uri: course.thumbnail }} style={styles.courseImage} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer activeTab="COURSES" onTabPress={handleNavigation} />
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    marginVertical: 20,
    marginLeft: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingCount: {
    marginLeft: 10,
    fontSize: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginVertical: 20,
  },
});

export default Coursesscreen;
