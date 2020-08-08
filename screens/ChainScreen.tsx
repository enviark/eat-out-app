import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AlphabetList from 'react-native-section-alphabet-list';
import chains from '../data/chains';

export default function ChainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Participating Chains</Text>
        <Text style={styles.subtitle}>Large chains are not on our map, however we've provided a list of all chains (25+ stores) taking part in the Eat Out to Help Out scheme.</Text>
      </View>
      <AlphabetList style={styles.list} data={chains} renderItem={ListItem} renderSectionHeader={SectionHeader} indexLetterColor="white" ></AlphabetList>
    </View>
  );
}

const ListItem = (props: any) => {
  return <Text style={styles.listing}>{props.value}</Text>
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
  list: {
    flexGrow: 1,
    paddingHorizontal: 16,
    marginBottom: 72,
    backgroundColor: '#FFFFFF'
  },
  listHeader: {
    fontSize: 20,
    marginVertical: 8,
    fontWeight: "bold",
    backgroundColor: '#F1F1F1',
    padding: 8
  },
  listing: {
    fontSize: 16
  }
});
