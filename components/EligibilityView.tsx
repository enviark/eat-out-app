import * as React from 'react';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import fallbackData from '../dates.json';

export default function RestaurantMapView() {
  const [isEligible, setEligible] = React.useState(false);

  React.useEffect(() => {
    updateEligibility(fallbackData);

    fetch('https://api.eatoutmap.uk/api/dates').then((r) => r.json())
      .then((data) => {
        if (data.message) {
          updateEligibility(data.message);
        }
      })
  }, []);

  const updateEligibility = (dates: string[]) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let iso = today.toISOString();
    setEligible(dates.indexOf(iso) > 0);
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Ionicons size={30} name={isEligible ? 'ios-pin' : 'ios-cloudy-night'} />
        <Text style={styles.text}>
          {isEligible ? 
            'Enjoy 50% off food and non-alcoholic drinks (up to £10 per diner) today.'
            :
            'Check back on Monday, Tuesday, or Wednesday for 50% off.'
          }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    left: 0,
    padding: 16,
    paddingLeft: 0,
    marginTop: 32,
    opacity: 0.75,
  },
  info: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#F1F1F1',
      flexGrow: 1,
      marginLeft: 16,
      borderRadius: 32,
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 16,
      fontSize: 16
  }
});
