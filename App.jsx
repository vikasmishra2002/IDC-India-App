import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import all your screen components
import Homescreen from './src/screen/Homescreen';
import Loginscreen from './src/screen/Loginscreen';
import SignupScreen from './src/screen/SignupScreen';
import Homescreenmain from './src/screen/Homescreenmain';
import Coursesscreen from './src/screen/Coursesscreen';
import Dashboard from './src/screen/Dashboard';
import Batches from './src/screen/Batches';
import Courses from './src/screen/Courses';
import Performance from './src/screen/Performance';
import Payments from './src/screen/Payments';
import Assignments from './src/screen/Assignments';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="HOME" // Start with the home screen
        screenOptions={{
          headerShown: false, // Hide the header for all screens
        }}
      >
        {/* Authentication Screens */}
        <Stack.Screen name="HOME" component={Homescreen} />
        <Stack.Screen name="LOGIN" component={Loginscreen} />
        <Stack.Screen name="SIGNIN" component={SignupScreen} />
        <Stack.Screen name="HOMESCREENMAIN" component={Homescreenmain} />
        
        <Stack.Screen name="courses1" component={Coursesscreen} />
        

        {/* Main App Screens */}
        <Stack.Screen name="DASHBOARD" component={Dashboard} />
        <Stack.Screen name="BATCHES" component={Batches} />
        <Stack.Screen name="COURSES" component={Courses} />
        <Stack.Screen name="PERFORMANCE" component={Performance} />
        <Stack.Screen name="PAYMENTS" component={Payments} />
        <Stack.Screen name="ASSIGNMENTS" component={Assignments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

