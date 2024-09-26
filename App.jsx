// App.js
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
    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 400));

      setIsLoaded(true);

      SplashScreen.hide();
    };

    loadApp();
  }, []);

  if (!isLoaded) {
    return null;
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
