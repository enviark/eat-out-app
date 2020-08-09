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
  const [cachedRestaurants, setCachedRestaurants] = React.useState<string[]>([])
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])

  const onChangeComplete = async (region: Region) => {
    // use `setRestaurants` to update markers based on restaurants in `region`

    try {
      let roundedRegion: Region = {
        latitude: parseFloat(region.latitude.toFixed(4)),
        longitude: parseFloat(region.longitude.toFixed(4)),
        latitudeDelta: parseFloat(region.latitudeDelta.toFixed(4)),
        longitudeDelta: parseFloat(region.longitudeDelta.toFixed(4))
      }

      let query: EstablishmentQuery = {
        ...roundedRegion,
        limit: 30,
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
      let locations = data.message.locations;
  
      if (locations && locations.length > 0) {
        let rests = [...restaurants];

        // todo: prioritise cache to keep restaurants in viewable region
        locations.map(mapResponseToRestaurant).forEach((rest: Restaurant) => {
          if (cachedRestaurants.indexOf(rest.id) < 0) {
            rests.push(rest);
            if (rests.length > 4000) {
              rests.shift();
            }
          }
        })
        setRestaurants(rests);
        setCachedRestaurants(rests.map((r) => r.id));
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
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        onRegionChangeComplete={onChangeComplete}
        showsCompass={false}
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