import * as React from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, ListView } from 'react-native';
import AlphabetList from 'react-native-section-alphabet-list';
import chains from '../data/chains';

export default function ChainScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Large Chains</Text>
        <Text style={styles.subtitle}>Large chains are not on our map, however we've provided a list of all chains (25 stores+) taking part in the Eat Out to Help Out scheme.</Text>
      </View>
      <AlphabetList style={styles.appInfo} data={chains} renderItem={ListItem} renderSectionHeader={SectionHeader} indexLetterColor="white" ></AlphabetList>
    </ScrollView>
  );
}

const ListItem = (props: any) => {
  return <Text>{props.value}</Text>
}

const SectionHeader = (props: any) => {
  return <Text style={styles.listHeader}>{props.title}</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center'
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
  },
  appInfo: {
    padding: 16,
    paddingTop: 0,
    marginTop: 8,
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontSize: 18,
    marginBottom: 32
  },
  listHeader: {
    fontSize: 20,
    marginTop: 8,
    fontWeight: "bold"
  }
});
