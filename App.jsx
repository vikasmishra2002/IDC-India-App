import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { store, persistor } from './src/Redux/store';
import MainNavigator from './src/MainNavigator'; 

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a delay for splash screen visibility
    const loadApp = async () => {
      // Wait for async operations if any
      await new Promise(resolve => setTimeout(resolve, 400)); // Adjust this time if needed

      // Indicate that the app has finished loading
      setIsLoaded(true);

      // Hide splash screen after loading is complete
      SplashScreen.hide();
    };

    loadApp();
  }, []);

  if (!isLoaded) {
    // You can return a loading spinner or null here while the state is loading
    return null; // Or a loading component
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
