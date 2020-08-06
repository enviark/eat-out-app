import * as React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

import MapView, { Region, Marker, LatLng } from 'react-native-maps';
import logo from '../assets/images/dd-icon.png';

interface Restaurant {
  id: string,
  location: LatLng,
  name: string
}

function mapResponseToRestaurant(resp: any): Restaurant {
  return {
    id: resp._id,
    name: resp.name,
    location: {
      latitude: resp.location.coordinates[1],
      longitude: resp.location.coordinates[0]
    }
  }
}

export default function RestaurantMapView() {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])

  const onChange = async (region: Region) => {
    // use `setRestaurants` to update markers based on restaurants in `region`

    let url = new URL('https://api.eatoutmap.uk/api/establishments');

    let resp = await fetch('https://api.eatoutmap.uk/api/establishments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(region)
    });
    
    let data = await resp.json();
    let locations = data.message;

    if (locations.length > 0) {
      setRestaurants(locations.map(mapResponseToRestaurant));
    }
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        onRegionChangeComplete={onChange}
        mapType="mutedStandard"
      >
        {restaurants.map((restaurant) => {
          return <Marker
            key={restaurant.id}
            coordinate={restaurant.location}
            title={restaurant.name}
          />
        })}
      </MapView>
      <Image source={logo} style={styles.logo}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 96,
    height: 96
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
