import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import { osName } from 'expo-device';

import RestaurantMapView from '../components/RestaurantMapView';
import { AdMobBanner } from 'expo-ads-admob';

const adUnit = (osName == 'iOS' || osName == 'iPadOS') ? 'ca-app-pub-2883417370695291/7147386410' : 'ca-app-pub-2883417370695291/1359873114';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <RestaurantMapView />
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={adUnit}
        style={{alignSelf: 'center', flexShrink: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});