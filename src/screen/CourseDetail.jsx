import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { authAxios } from '../services/config'; 
import { addToCart } from '../Redux/Reducers/cartSlice';
import Header from '../Header';
import Footer from '../Footer';

const { width, height } = Dimensions.get('window');

const CourseDetail = ({ navigation }) => {
  const route = useRoute();
  const { course } = route.params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await authAxios().post('/course/getFullCourseDetails', { courseId: course._id });
        if (response.data.success) {
          setCourseDetails(response.data.data.courseDetails);
        } else {
          setError('Failed to load course details');
        }
      } catch (err) {
        setError('An error occurred while fetching course details');
        console.log('Fetch error:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [course]);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(item => item._id === course._id);

    if (alreadyInCart) {
      Alert.alert('Warning', 'This course is already in the cart!');
    } else {
      dispatch(addToCart(courseDetails));
      Alert.alert('Success', 'Course added to cart!');
    }
  };

  const handleBuyNow = () => {
    navigation.navigate('Payments', { courseId: courseDetails._id });
  };

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
        <View style={styles.header}>
          <Text style={styles.headerText}>{courseDetails.courseName}</Text>
        </View>
        <Image source={{ uri: courseDetails.thumbnail }} style={styles.courseImage} resizeMode="cover" />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Instructor: {courseDetails.instructor.name}</Text>
          <Text style={styles.description}>{courseDetails.courseDescription}</Text>
          <Text style={styles.price}>Price: ₹{courseDetails.price}</Text>
          <Text style={styles.rating}>Rating: {courseDetails.ratingAndReviews.rating} ⭐</Text>
        </View>

        {/* Add to Cart and Buy Now Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer activeTab="COURSES" onTabPress={navigation.navigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  errorContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  errorText: { 
    color: 'red', 
    fontSize: 18 
  },
  contentContainer: { 
    padding: 20, 
    paddingBottom: 50, // Space for footer
    backgroundColor: '#fff', 
    flexGrow: 1 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 20 
  },
  headerText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  courseImage: { 
    width: '100%', 
    height: height * 0.25, 
    borderRadius: 10 
  },
  detailsContainer: { 
    padding: 20, 
    backgroundColor: '#fdfdfd', 
    borderRadius: 10, 
    marginTop: 20, 
    elevation: 3 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  description: { 
    fontSize: 16, 
    marginTop: 10, 
    color: '#666' 
  },
  price: { 
    fontSize: 18, 
    marginTop: 10, 
    color: '#4caf50', 
    fontWeight: 'bold' 
  },
  rating: { 
    fontSize: 16, 
    marginTop: 10, 
    color: '#ffa500' 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 30 
  },
  buyButton: { 
    flex: 0.48, 
    backgroundColor: 'green', 
    padding: 15, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cartButton: { 
    flex: 0.48, 
    backgroundColor: 'blue', 
    padding: 15, 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});

export default CourseDetail;
