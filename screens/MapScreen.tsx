import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import RestaurantMapView from '../components/RestaurantMapView';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <RestaurantMapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
