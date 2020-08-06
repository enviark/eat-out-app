import * as React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

import logo from '../assets/images/dd-icon.png';

import MapView, { Region, Marker, LatLng } from 'react-native-maps';
import EligibilityView from './EligibilityView';

interface Restaurant {
  id: string,
  location: LatLng,
  name: string
}

interface EstablishmentQuery {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
  limit: number,
  sample: boolean
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

    try {
      let query: EstablishmentQuery = {
        ...region,
        limit: 300,
        sample: true
      }

      let resp = await fetch('https://api.eatoutmap.uk/api/establishments/within-bounds', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      });
      
      let data = await resp.json();
      let locations = data.message;
  
      if (locations && locations.length > 0) {
        setRestaurants(locations.map(mapResponseToRestaurant));
      }  
    } catch (error) {
      alert(`Unable to fetch restaurants: ${error.message}`);
    }
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={false}
        showsCompass={false}
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
      <EligibilityView />
      <Image source={logo} style={styles.logo} />
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
    width: 96,
    height: 96,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});