import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { Region } from 'react-native-maps';
import * as Location from 'expo-location';

export default function RestaurantMapView() {
  const [postCode, setPostCode] = React.useState<string | null>()
  const [restaurants, setRestaurants] = React.useState([])

  const onChange = async (region: Region) => {
    // use `setRestaurants` to update markers based on restaurants in `region`
    let locs = await Location.reverseGeocodeAsync(region);
    if (locs.length > 0) {
      let loc = locs[0];
      if (loc.postalCode && loc.postalCode.length > 4) {
        setPostCode(loc.postalCode);
      }
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>
        {postCode}
      </Text>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        onRegionChangeComplete={onChange}
      >
        {
          // render <Marker> for each item in `restaurants`
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
