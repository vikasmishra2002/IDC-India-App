import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { authAxios } from '../services/config'; // Make sure the path is correct
import Header from '../Header';
import Footer from '../Footer';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await authAxios().get('/profile/getEnrolledCourses');
        if (response.data.success) {
          setEnrolledCourses(response.data.data);
        } else {
          setError('Failed to load enrolled courses');
        }
      } catch (err) {
        setError('An error occurred while fetching enrolled courses');
        console.log('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <View key={course._id} style={styles.courseCard}>
              <Image source={{ uri: course.thumbnail }} style={styles.courseImage} resizeMode="cover" />
              <View style={styles.detailsContainer}>
                <Text style={styles.courseName}>{course.courseName}</Text>
                <Text style={styles.instructor}>Instructor: {course.instructor.name}</Text>
                <Text style={styles.description}>{course.courseDescription}</Text>
                <Text style={styles.rating}>Rating: {course.ratingAndReviews.rating} ⭐</Text>
                <Text style={styles.price}>Price: ₹{course.price}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noCoursesText}>No enrolled courses found.</Text>
        )}
      </ScrollView>
      <Footer activeTab="ENROLLED" onTabPress={(tab) => console.log(`Navigate to ${tab}`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 50, // Space for footer
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  courseCard: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  detailsContainer: {
    padding: 15,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  instructor: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: '#777',
  },
  rating: {
    fontSize: 16,
    marginTop: 5,
    color: '#ffa500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#4caf50',
  },
  noCoursesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EnrolledCourses;
