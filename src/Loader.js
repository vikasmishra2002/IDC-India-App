import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur'; 

const Loader = () => {
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff5733" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
