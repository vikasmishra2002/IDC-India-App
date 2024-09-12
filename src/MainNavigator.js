import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Homescreen from './screen/Homescreen';
import Loginscreen from './screen/Loginscreen';
import SignupScreen from './screen/SignupScreen';
import Homescreenmain from './screen/Homescreenmain';
import Coursesscreen from './screen/Coursesscreen';
import Dashboard from './screen/Dashboard';
import Payments from './screen/Payments';
import Otpverification from './screen/Otpverification';
import Forgetpassword from './screen/Forgetpassword';
import CourseDetail from './screen/CourseDetail'
import CartPage from './screen/CartPage';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Set the loaded state to true when the app is ready
    const checkAuthentication = async () => {
      // Simulate a delay for rehydration (you can add actual rehydration check here if needed)
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    };
    checkAuthentication();
  }, []);

  if (!isLoaded) {
    
    return null; // Or a loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'HOMESCREENMAIN' : 'HOME'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HOME" component={Homescreen} />
        <Stack.Screen name="LOGIN" component={Loginscreen} />
        <Stack.Screen name="SIGNIN" component={SignupScreen} />
        <Stack.Screen name="HOMESCREENMAIN" component={Homescreenmain} />
        <Stack.Screen name="OTPVERIFY" component={Otpverification} />
        <Stack.Screen name="FORGETPASS" component={Forgetpassword} />
        <Stack.Screen name="COURSES" component={Coursesscreen} />
        <Stack.Screen name="DASHBOARD" component={Dashboard} />
        <Stack.Screen name="PAYMENTS" component={Payments} />
        <Stack.Screen name="CourseDetail" component={CourseDetail}/>
        <Stack.Screen name="cartpage" component={CartPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
