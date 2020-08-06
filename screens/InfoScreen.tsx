import * as React from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView } from 'react-native';

import logo from '../assets/images/dd-icon.png';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Get <Text style={{fontWeight: '900'}}>50%</Text> off food and non-alcoholic drinks up to £10 per diner.</Text>
        <Text style={styles.subtitle}>Valid on Mondays, Tuesdays, and Wednesdays between 3 and 31 August.</Text>
        <Text style={styles.govLink}>
          For full details, see the&nbsp;
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.gov.uk/guidance/get-a-discount-with-the-eat-out-to-help-out-scheme')}>
            Eat Out to Help Out page on GOV.UK
          </Text>
          .
        </Text>
      </View>
      <View style={styles.appInfo}>
        <Text style={styles.disclaimer}>This app is maintained by Enviark Ltd and is in no way affiliated with HM Revenue & Customs.</Text>
        <Text style={styles.disclaimer}>
          All content is available under the&nbsp;
          <Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/')}>
            Open Government Licence v3.0
          </Text>
          , except where otherwise stated.</Text>
        <Text style={styles.disclaimer}>Have any feedback? Contact us at hello@enviark.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: 24,
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 36
  },
  govLink: {
    fontSize: 18,
    textAlign: 'center'
  },
  appInfo: {
    padding: 16,
    marginTop: 46,
    backgroundColor: '#FFFFFF'
  },
  disclaimer: {
    fontSize: 18,
    marginBottom: 32
  }
});
